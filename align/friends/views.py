from django.shortcuts import render
import json
from django.http import HttpResponse, Http404

# Create your views here.
from django.contrib.auth import get_user_model
from friends.models import FriendRequests
from friends.models import Friends
from friends.models import Followers
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from posts.models import Posts
from posts.serializers import PostsSerializer
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
            response = Response(responseDictionary)

        except:
            responseDictionary["success"] = False
            responseDictionary["message"] = "Friend request not sent"
            response = Response(responseDictionary)

        return response


class FriendViewSet(viewsets.ModelViewSet):
    """
    API endpoint that processes accepting/declining friends requests
    """

    queryset = Friends.objects.all()
    serializer_class = FriendsSerializer

    @action(methods=['post'], detail=False, url_path='requestprocess', url_name='friendRequestProcess')
    def friendRequestProcess(self, request):
        # accept/decline friend request


        # POST /friend/requestprocess
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
                FollowersViewSet.serializer_class.delete(validated_data)        # delete following relation
                validated_data = {"author": friendID, "friend": authorID}
                FriendRequestViewSet.serializer_class.delete(validated_data, supress=True)   # delete reverse friend request
                validated_data = {"author": friendID, "friend": authorID}
                FollowersViewSet.serializer_class.delete(validated_data, supress=True)       # delete reverse follower
                FriendViewSet.serializer_class.create(validated_data)           # create friend
            response = Response(responseDictionary)

        except:
            responseDictionary["success"] = False
            response = Response(responseDictionary)

        return response

    @action(methods=['post'], detail=False, url_path='delete', url_name='friendDelete')
    def friendDelete(self, request):

        # POST /friend/delete
        responseDictionary = {"query":"frienddelete", "success": True}

        try:
            try:
                # swagger
                body = request.body
                requestJson = json.loads(body)
                authorID = requestJson["author"].split('/')[-1]             # person requesting deletion
                friendID = requestJson["friends"].split('/')[-1]            # friend getting deleted
                if (authorID == ''):
                    requestJson["author"].split('/')[-2]
                if (friendID == ''):
                    requestJson["friend"].split('/')[-2]
            except:
                # html form
                requestJson = request.data
                authorID = requestJson["author"].split("/")[-2]
                friendID = requestJson["friend"].split("/")[-2]

            if (not (friendID and authorID)):
                raise ValueError("No friendID or authorID was given")
            validated_data = {"author": authorID, "friend": friendID}
            FriendViewSet.serializer_class.delete(validated_data)       # delete friend relation
            validated_data = {"author": friendID, "friend": authorID}
            FollowersViewSet.serializer_class.create(validated_data)    # create one way follower
            response = Response(responseDictionary)

        except:
            responseDictionary["success"] = False
            response = Response(responseDictionary)

        return response



class AuthorViewSet(viewsets.ModelViewSet):
    """
    API endpoint that asks a service if anyone in the list is a friend.
    """

    queryset = Friends.objects.all()
    serializer_class = FriendsSerializer

    @action(methods=['post', 'get'], detail=True, url_path='friends', url_name='friendInList')
    def friendInList(self, request, pk=None):

        #ID = request.path.split('/')[2]
        #ID = pk

        if (request.method == 'GET'):
            # get friend list of author
            # URL: /author/{author_id}/friends
            responseDictionary = {"query":"friends", "authors": []}
            try:
                responseDictionary["authors"] = FriendsSerializer.friendsList(pk)
                response = Response(responseDictionary)
            except:
                response = Response(responseDictionary)
            return response

        elif (request.method == 'POST'):
            # ask if anyone in the list is a friend
            # URL: ​/author​/{author_id}​/friends
            responseDictionary = {"query":"friends", "author": str(pk), "authors": []}
            try:
                # swagger
                body = request.body
                requestJson = json.loads(body)
                pk = requestJson["author"]
                listOfFriends = requestJson["authors"]
                responseDictionary["authors"] = FriendsSerializer.areFriendsMany(pk, listOfFriends)
                response = Response(responseDictionary)
            except:
                response = Response(responseDictionary)
            return response

        else:
            responseDictionary = {"Error":"Page does not exist"}
            return Response(responseDictionary)

    @action(methods=['get'], detail=True, url_path='friends/(?P<sk>[^/.]+)', url_name='areFriends')
    def areFriends(self, request, pk=None, sk=None):
        # ask if 2 authors are friends
        # URL: /author/{author1_id}/friends/{author2_id}

        responseDictionary = {"query":"friends", "friends": False, "authors": [str(pk),str(sk)]}
        try:
            pkUser = User.objects.get(id=pk)
            skUser = User.objects.get(id=sk)
            pkhost = pkUser.host + '/author/' + str(pk)
            skhost = skUser.host +'/author/' + str(sk)
            if ('http' not in pkhost):
                pkhost = 'http://' + pkhost
            if ('http' not in skhost):
                skhost = 'http://' + skhost
            responseDictionary["authors"] = [pkhost, skhost]
            response = Response(responseDictionary)
            responseDictionary["friends"] = FriendsSerializer.areFriendsSingle(pk,sk)
        except:
            response = Response(responseDictionary)

        return response


class FollowersViewSet(viewsets.ModelViewSet):
    """
    API endpoint that handles followers
    """

    queryset = Followers.objects.all()
    serializer_class = FollowersSerializer


    def create(self, request):
        # accept/decline friend request
        responseDictionary = {"query":"following", "author": '', "followers": [], "message": "not implemented yet"}
        response = Response(responseDictionary)
        return response


    def retrieve(self, request, pk=None):
        # GET /following/authorID

        responseDictionary = {"query":"following", "author": pk, "followers": []}

        try:
            pkUser = User.objects.get(id=pk)
            pkhost = pkUser.host + '/author/' + str(pk)
            if ('http' not in pkhost):
                pkhost = 'http://' + pkhost
            responseDictionary["author"] = pkhost
            responseDictionary["followers"] = FollowersViewSet.serializer_class.following(pk)
            response = Response(responseDictionary)
        except:
            response = Response(responseDictionary)
        return response

    @action(methods=['post'], detail=False, url_path='delete', url_name='deleteFollowing')
    def deleteFollowing(self, request):

        responseDictionary = {"query": "delete following", "success": True}

        try:
            try:
                # swagger
                body = request.body
                requestJson = json.loads(body)
                authorID = requestJson["author"].split('/')[-1]             # person requesting deletion
                friendID = requestJson["following"].split('/')[-1]            # friend getting deleted
                if (authorID == ''):
                    requestJson["author"].split('/')[-2]
                if (friendID == ''):
                    requestJson["following"].split('/')[-2]
            except:
                # html form
                requestJson = request.data
                authorID = requestJson["author"].split("/")[-2]
                friendID = requestJson["following"].split("/")[-2]

            validated_data = {"author": friendID, "friend": authorID}
            FollowersViewSet.serializer_class.delete(validated_data)
            response = Response(responseDictionary)

        except:
            responseDictionary["success"] = False
            response = Response(responseDictionary)

        return response
