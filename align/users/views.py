from django.shortcuts import render
import json
from django.http import HttpResponse

# Create your views here.
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from users.models import ExtendAuthorModel
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action

from users.serializers import UserSerializer, GroupSerializer, ExtendAuthorModelSerializer

User = get_user_model()


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


class FriendRequestViewSet(viewsets.ModelViewSet):
    """
    API endpoint that makes a friend request.
    """
    # TODO: fix hardcoding
    
    queryset = ExtendAuthorModel.objects.all()
    serializer_class = ExtendAuthorModelSerializer
    
    def create(self, request):
        # make friend request
        try:
            body = request.body
            requestJson = json.loads(body)
            authorID = requestJson["author"]["id"]
            friendID = requestJson["friend"]["id"]
            if (not (friendID and authorID)):
                raise
            validated_data = {"authorID": authorID, "friendID": friendID}
            FriendRequestViewSet.serializer_class.create(validated_data)
            response = HttpResponse('''{
                                    "query": "friendrequest",
                                    "success": true,
                                    "message": "Friend request sent"
                                    }''')
        except:
            response = HttpResponse('''{
                                    "query": "friendrequest",
                                    "success": false,
                                    "message": "Friend request not sent"
                                    }''')
    
        return response
    
    
class IsFriendViewSet(viewsets.ModelViewSet):
    """
    API endpoint that asks a service if anyone in the list is a friend.
    """
    # TODO: fix hardcoding
    
    queryset = ExtendAuthorModel.objects.all()
    serializer_class = ExtendAuthorModelSerializer
    
    @action(methods=['get'], detail=True, url_path='friends', url_name='friendsList')
    def friendsList(self, request, pk=None):
        # get friend list of author
        
        friends = IsFriendViewSet.serializer_class.friends(pk)
        response = HttpResponse('''{{
                                    "query": "friends",
                                    "authors": [
                                            {}
                                    ]
                                    }}'''.format(friends))
    
        return response
    
    @action(methods=['post', 'get'], detail=True, url_path='friends', url_name='friendInList')
    def friendInList(self, request, pk=None):
        # ask if anyone in the list is a friend
        
        if (request.method == 'GET'):
            # get friend lsit
            friends = IsFriendViewSet.serializer_class.friends(pk)
            response = HttpResponse('''{{
                                    "query": "friends",
                                    "authors": [
                                            {}
                                    ]
                                    }}'''.format(friends))
    
            return response
        
        try:
            body = request.body
            requestJson = json.loads(body)
            authorID = requestJson["author"]
            authorHostList = requestJson["authors"]     
            friends = IsFriendViewSet.serializer_class.listFriends(authorID, authorHostList, pk)
        except:
            friends = ''
        
        response = HttpResponse('''{
                                    "query": "friends",
                                    "author": {},
                                    "authors": [
                                            {}
                                    ]
                                    }'''.format(pk,friends))
    
        return response
    
    @action(methods=['post'], detail=True, url_path='friends/(?P<sk>[^/.]+)', url_name='arefriends')
    def arefriends(self, request, pk=None, sk=None):
        # ask if 2 authors are friends
        #uuid
        
        pkhost = User.objects.filter(id=pk).first().host;
        skhost = User.objects.filter(id=sk).first().host;
        
        if ((ExtendAuthorModel.objects.filter(authorID=pk, friendID=sk).exist()) and (ExtendAuthorModel.objects.filter(authorID=sk, friendID=pk).exist())):
            # the relationship goes both ways, they are firends
            response = HttpResponse('''{{
                                    "query": "friends",
                                    "success": true,
                                    "authors": [
                                            "{}",
                                            "{}"
                                    ]
                                    }}'''.format(pkhost,skhost))
        else:
            response = HttpResponse('''{{
                                    "query": "friends",
                                    "success": false,
                                    "authors": [
                                            "{}",
                                            "{}"
                                    ]
                                    }}'''.format(pkhost,skhost))
    
        return response
    
    
    
    
    
    