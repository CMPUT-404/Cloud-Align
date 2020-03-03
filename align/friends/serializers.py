from django.contrib.auth import get_user_model
from friends.models import FriendRequests
from friends.models import Followers
from friends.models import Friends
from rest_framework import serializers

User = get_user_model()

class FriendRequestSerializer(serializers.HyperlinkedModelSerializer):
    
    @classmethod
    def create(cls, validated_data):
        # create friend request        
        try:
            author = validated_data["author"]     # sending friend request
            friend = validated_data["friend"]     # receiving friend request
            
            if (author==friend):
                raise ValueError("Request is trying to friend itself, not allowed")
        
            if (FriendRequests.objects.filter(authorID=author, friendID=friend).exists()):
                # this relation already exists in the db
                raise ValueError("The author has already sent a friend request")
 
            # not checking this condition for now b/c a follower should be able to send another friend request?
            #if (Followers.objects.filter(author=author, following=friend).exists()):
                # this relation already exists in the db
                #raise ValueError("The author is already following this friend")
                
            if (Friends.objects.filter(author=author, friend=friend).exists()):
                # this relation already exists in the db
                raise ValueError("The author is already mutual friends with this friend")                               
        
            if ((User.objects.filter(id=author).exists()) and (User.objects.filter(id=friend).exists())):
                # verify users (author + friend) exists
                authorUser = User.objects.get(id=author)
                friendUser = User.objects.get(id=friend)
                friendRequest = FriendRequests(authorID=authorUser, friendID=friendUser)
                friendRequest.save()
                return friendRequest
        
        except:
            # users didn't exist or some other problem
            raise RuntimeError("Couldn't create friend request")
  
    @classmethod
    def delete(cls, validated_data, supress=False):
        # delete friend request
        
        try:
            author = validated_data["author"]   # person who received the request
            friend = validated_data["friend"]   # person who made the request
        
            request = FriendRequests.objects.get(authorID=friend, friendID=author)
            request.delete()
        except:
            if (supress):
                return
            raise RuntimeError("Unable to delete friend request")
        
    
    @classmethod
    def friends(cls, ID):
        # ID is author's ID
        # finds author's friends
        # returns a list of friends of authorid=pk as a list containing the friends url
        
        results = FriendRequests.objects.filter(authorID=ID)
        friends = []

        for result in results:
            if (FriendRequests.objects.filter(authorID=result.friendID.id, friendID=ID).exists()):
                userData = User.objects.filter(id=result.friendID.id).first()
                friendhost = userData.host if (userData.host[-1] != '/') else (userData.host[:-1])
                if ('http' not in friendhost):
                    friendhost = 'http://' + friendhost
                friends.append(friendhost + '/author/' + str(userData.id))
                
        return friends
    
    @classmethod
    def listFriends(cls, authorID, authorHostList):
        # ID is author's ID
        # find friend with list
        # returns a list of friend hostnames that were in the list
                
        if (not len(authorHostList)):
            return []
        
        friends = set()
        
        authorIDfriends = FriendRequestSerializer.friends(authorID) # ID's entire friend's list
        # check if any in list is in authors friend's list
        for potentialFriend in authorHostList:
            if (potentialFriend in authorIDfriends):
                friends.add(potentialFriend)
            
        return list(friends)
    
    class Meta:
        model = FriendRequests
        fields = ['authorID', 'friendID']
        
class FriendsSerializer(serializers.HyperlinkedModelSerializer):
    
    @classmethod
    def create(cls, validated_data):
        # create friend
        
        try:
            author = validated_data["author"]   # person who received the request
            friend = validated_data["friend"]   # person who made the request
            
            if (Friends.objects.filter(author=author, friend=friend).exists()):
                # the relation already exists in the database
                raise ValueError("Author is already friends with this friend")
            
            if ((User.objects.filter(id=author).exists()) and (User.objects.filter(id=friend).exists())):
                # verify users (author + friend) exists
                authorUser = User.objects.get(id=author)
                friendUser = User.objects.get(id=friend)
                friend1 = Friends(author=authorUser, friend=friendUser)
                friend2 = Friends(author=friendUser, friend=authorUser)
                friend1.save()
                friend2.save()
        except:
            raise RuntimeError("Unable to create friend")
            
    @classmethod
    def delete(cls, validated_data):
        # create friend
        
        try:
            author = validated_data["author"]   # person who received the request
            friend = validated_data["friend"]   # person who made the request
            
            friend1 = Friends.objects.get(author=author, friend=friend)
            friend2 = Friends.objects.get(author=friend, friend=author)
            friend1.delete()
            friend2.delete()
            
        except:
            raise RuntimeError("Unable to delete friend")
            
    @classmethod
    def areFriendsSingle(cls, author,friend):
        # check if author and friend are friends
        return Friends.objects.filter(author=author, friend=friend).exists()

    @classmethod
    def friendsList(cls, authorID):
        # return friends list
        
        try:
            friends = Friends.objects.filter(author=authorID)         # list of friends
            following = []
        
            for friend in friends:
                host = friend.friend.host
                if ('http' not in host):
                    host = 'http://' + host
                following.append(host + '/author/' + str(friend.friend.id))   
                
            return following
        except:
            RuntimeError("Unable to retrieve friends list")
        
    @classmethod
    def areFriendsMany(cls, author, friendList):
        # return list of people in friendList who are friends
        
        friends = FriendsSerializer.friendsList(author)         # list of authors friends
        areFriends = []
        
        for friend in friendList:
            if friend in friends:
                areFriends.append(friend)
                
        return areFriends        
        
        
    class Meta:
        model = Friends
        fields = ['author', 'friend']
        
        
class FollowersSerializer(serializers.HyperlinkedModelSerializer):
    
    @classmethod
    def create(cls, validated_data):
        # create friend
        try:
            author = validated_data["author"]   # person who is following
            friend = validated_data["friend"]   # person being followed
            
            if (Followers.objects.filter(author=author, following=friend).exists()):
                # the relation already exists in the database
                raise ValueError("Author is already following this friend")
            
            if ((User.objects.filter(id=author).exists()) and (User.objects.filter(id=friend).exists())):
                # verify users (author + friend) exists
                authorUser = User.objects.get(id=author)
                friendUser = User.objects.get(id=friend)
                follow = Followers(author=authorUser, following=friendUser)
                follow.save()
        except:
            raise RuntimeError("Unable to create follower")
            
    @classmethod
    def delete(cls, validated_data, supress=False):
        # delete follower
        
        try:
            author = validated_data["friend"]   # person who is following
            friend = validated_data["author"]   # person being followed
            
            follow = Followers.objects.get(author=author, following=friend)
            follow.delete()
        except:
            if (supress):
                return
            raise RuntimeError("Unable to delete follower")
        
    
    @classmethod
    def following(cls, ID):
        # get list of people ID is following
        
        try:
            follows = Followers.objects.filter(author=ID)       # list of people they follow
            friends = Friends.objects.filter(author=ID)         # list of friends
            
            following = []
            
            for follow in follows:
                host = follow.following.host
                if ('http' not in host):
                    host = 'http://' + host
                following.append(host + '/author/' + str(follow.following.id))
            
            for friend in friends:
                host = friend.friend.host
                if ('http' not in host):
                    host = 'http://' + host
                following.append(host + '/author/' + str(friend.friend.id))
            
            return following     
        
        except:
            raise RuntimeError("Unable to retrieve following list")
        
    
    class Meta:
        model = Followers
        fields = ['author', 'following']        
        
        
        
        
        
        
        