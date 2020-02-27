from django.shortcuts import render
import json
from django.http import HttpResponse

# Create your views here.
from django.contrib.auth import get_user_model
from friends.models import FriendRequests
from friends.models import Friends
from friends.models import Followers
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action

from friends.serializers import FriendRequestSerializer
from friends.serializers import FriendsSerializer
from friends.serializers import FollowersSerializer

User = get_user_model()


class FriendRequestViewSet(viewsets.ModelViewSet):
    """
    API endpoint that makes a friend request.
    """

    queryset = FriendRequests.objects.all()
    serializer_class = FriendRequestSerializer

    def create(self, request):
        # make friend request
        responseDictionary = {"query":"friendrequest", "success": True, "message":"Friend request sent"}
        
        try:
            
            try:
                # swagger format
                body = request.body
                requestJson = json.loads(body)
                authorID = requestJson["author"]["id"].split('/')[-1]
                friendID = requestJson["friend"]["id"].split('/')[-1]
                if (authorID == ''):
                    requestJson["author"]["id"].split('/')[-2]
                if (friendID == ''):
                    requestJson["friend"]["id"].split('/')[-2]
            except:
                # html form format
                requestJson = request.data
                authorID = requestJson["authorID"].split("/")[-2]
                friendID = requestJson["friendID"].split("/")[-2]
                
            if (not (friendID and authorID)):
                raise ValueError("No friendID or authorID was given")
            validated_data = {"author": authorID, "friend": friendID}
            FriendRequestViewSet.serializer_class.create(validated_data)        # create request
            FollowersViewSet.serializer_class.create(validated_data)                          # create follower
            response = HttpResponse(json.dumps(responseDictionary))

        except:
            responseDictionary["success"] = False
            responseDictionary["message"] = "Friend request not sent"
            response = HttpResponse(json.dumps(responseDictionary))

        return response
    
    
class FriendViewSet(viewsets.ModelViewSet):
    """
    API endpoint that processes friends requests accept/decline
    """

    queryset = Friends.objects.all()
    serializer_class = FriendsSerializer

    def create(self, request):
        # accept/decline friend request
        responseDictionary = {"query":"friendrequestprocess", "success": True}
        
        try:
            try:
                # swagger
                body = request.body
                requestJson = json.loads(body)
                authorID = requestJson["author"].split('/')[-1]             # person accepting/declining
                friendID = requestJson["friend"].split('/')[-1]             # person who sent request
                friendStatus = requestJson["status"]
                if (authorID == ''):
                    requestJson["author"].split('/')[-2]
                if (friendID == ''):
                    requestJson["friend"].split('/')[-2]
            except:
                # html form
                requestJson = request.data
                authorID = requestJson["author"].split("/")[-2]
                friendID = requestJson["friend"].split("/")[-2]
                friendStatus = "accept"

            if (not (friendID and authorID)):
                raise ValueError("No friendID or authorID was given")
            validated_data = {"author": authorID, "friend": friendID}
            FriendRequestViewSet.serializer_class.delete(validated_data)    # delete friends request
            if (friendStatus == "accept"):
                # create friend
                FollowersViewSet.serializer_class.create(validated_data)
                FriendViewSet.serializer_class.create(validated_data)       # create friend
            response = HttpResponse(json.dumps(responseDictionary))

        except:
            responseDictionary["success"] = False
            response = HttpResponse(json.dumps(responseDictionary))

        return response

class IsFriendViewSet(viewsets.ModelViewSet):
    """
    API endpoint that asks a service if anyone in the list is a friend.
    """
    # TODO: fix hardcoding

    queryset = FriendRequests.objects.all()
    serializer_class = FriendRequestSerializer

    @action(methods=['post', 'get'], detail=True, url_path='friends', url_name='friendInList')
    def friendInList(self, request, pk=None):
        # ask if anyone in the list is a friend
        # URL: ​/author​/{author_id}​/friends

        ID = request.path.split('/')[2]

        if (request.method == "GET"):
            # get friend list of author
            # URL: /author/{author_id}/friends
            responseDictionary = {"query":"friends", "authors": []}
            try:
                friends = IsFriendViewSet.serializer_class.friends(ID)
                responseDictionary["authors"] = friends
                response = HttpResponse(json.dumps(responseDictionary))
            except:
                response = HttpResponse(json.dumps(responseDictionary))
            return response

        # request is a post
        responseDictionary = {"query":"friends", "author": ID, "authors": []}

        try:
            body = request.body
            requestJson = json.loads(body)
            authorID = requestJson["author"]
            ID2 = ''.join(ID.split('-'))
            authorID2 = ''.join(authorID.split('-'))
            if (ID2 != authorID2):
                # bad request
                raise RuntimeError
            authorHostList = requestJson["authors"]     
            friends = IsFriendViewSet.serializer_class.listFriends(authorID, authorHostList)
            responseDictionary["authors"] = friends
        except:
            pass

        response = HttpResponse(json.dumps(responseDictionary))

        return response

    @action(methods=['get'], detail=True, url_path='friends/(?P<sk>[^/.]+)', url_name='arefriends')
    def arefriends(self, request, pk=None, sk=None):
        # ask if 2 authors are friends
        # URL: /author/{author1_id}/friends/{author2_id}

        pk = request.path.split('/')[2]
        sk = request.path.split('/')[4]
        responseDictionary = {"query":"friends", "friends": False, "authors": [pk,sk]}
        response = HttpResponse(json.dumps(responseDictionary))

        try:
            pkhost = User.objects.filter(id=pk).first().host;
            skhost = User.objects.filter(id=sk).first().host;
            pkhost = pkhost if (pkhost[-1] != '/') else (pkhost[:-1])
            skhost = skhost if (skhost[-1] != '/') else (skhost[:-1])
            pkhost = 'http://' + pkhost + '/author/' + pk
            skhost = 'http://' + skhost + '/author/' + sk
            responseDictionary["authors"] = [pkhost, skhost]
            if ((FriendRequests.objects.filter(authorID=pk, friendID=sk).exists()) and (FriendRequests.objects.filter(authorID=sk, friendID=pk).exists())):
                # the relationship goes both ways, they are firends
                responseDictionary["friends"] = True
            response = HttpResponse(json.dumps(responseDictionary))
        except:
                pass

        return response




class FollowersViewSet(viewsets.ModelViewSet):
    """
    API endpoint that processes friends requests accept/decline
    """

    queryset = Friends.objects.all()
    serializer_class = FollowersSerializer