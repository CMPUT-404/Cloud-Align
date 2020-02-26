from django.contrib.auth import get_user_model
from friends.models import ExtendAuthorModel
from rest_framework import serializers

User = get_user_model()

class ExtendAuthorModelSerializer(serializers.HyperlinkedModelSerializer):
    
    @classmethod
    def create(cls, validated_data):
        #TODO: combine if statments
                
        author = validated_data["authorID"]
        friend = validated_data["friendID"]
        
        if (ExtendAuthorModel.objects.filter(authorID=author, friendID=friend).exists()):
            # this relation already exists in the db
            raise RuntimeError
        
        if ((User.objects.filter(id=author).exists()) and (User.objects.filter(id=author).exists())):
            # verify users (author + friend) exists
            authorUser = User.objects.get(id=author)
            friendUser = User.objects.get(id=friend)
            extAuth = ExtendAuthorModel(authorID=authorUser, friendID=friendUser)
            extAuth.save()
            return extAuth
        
        # users didn't exist
        raise RuntimeError
    
    @classmethod
    def friends(cls, ID):
        # ID is author's ID
        # finds author's friends
        # returns a list of friends of authorid=pk as a list containing the friends url
        
        results = ExtendAuthorModel.objects.filter(authorID=ID)
        friends = []

        for result in results:
            if (ExtendAuthorModel.objects.filter(authorID=result.friendID.id, friendID=ID).exists()):
                userData = User.objects.filter(id=result.friendID.id).first()
                friendhost = userData.host if (userData.host[-1] != '/') else (userData.host[:-1])
                friends.append('http://' + friendhost + '/author/' + str(userData.id))
                
        return friends
    
    @classmethod
    def listFriends(cls, authorID, authorHostList):
        # ID is author's ID
        # find friend with list
        # returns a list of friend hostnames that were in the list
                
        if (not len(authorHostList)):
            return []
        
        friends = set()
        
        authorIDfriends = ExtendAuthorModelSerializer.friends(authorID) # ID's entire friend's list
        # check if any in list is in authors friend's list
        for potentialFriend in authorHostList:
            if (potentialFriend in authorIDfriends):
                friends.add(potentialFriend)
            
        return list(friends)
    
    class Meta:
        model = ExtendAuthorModel
        fields = ['authorID', 'friendID']