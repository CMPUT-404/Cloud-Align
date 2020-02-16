from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from users.models import ExtendAuthorModel
from rest_framework import serializers

User = get_user_model()


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'bio', 'host', 'firstName', 'lastName', 'displayName', 'url', 'github', 'groups']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']


class ExtendAuthorModelSerializer(serializers.HyperlinkedModelSerializer):
    
    def create(self, validated_data):
        #TODO: validate ids
        extAuth = ExtendAuthorModel(authorID=validated_data["authorID"], friendID=validated_data["friendID"])
        extAuth.save()
        return extAuth
    
    @classmethod
    def friends(cls, pk):
        # finds author's friends
        
        results = ExtendAuthorModel.objects.filter(authorID=pk)
         
        json = '"'
        for result in results:
            if (ExtendAuthorModel.objects.filter(authorID=result.friendID, friendID=pk).exists()):
                hostname = User.objects.values_list('host').filter(id=result.friendID)
                json += hostname + '",\n'
            
        if (json == '"'):
            return ''
        return json[:-2] + '\n'
    
    @classmethod
    def listFriends(cls, authorID, authorHostList, pk):
        # find friend with list
        if (not len(authorHostList)):
            return ''
        results = ExtendAuthorModel.objects.values_list('friendID').filter(authorID=pk)
        hosts = []
        for result in results:
            hosts.append(User.objects.values_list('host').filter(id=result.friendID).first())
            
        json = '"'
        for friend in authorHostList:
            if (friend in hosts):
                json += friend + '",\n'
                
        if (json == '"'):
            return ''
        return json[:-2] + '\n'
        
        
    
    class Meta:
        model = ExtendAuthorModel
        fields = ['authorID', 'friendID']