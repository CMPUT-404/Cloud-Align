from posts.models import Posts
from rest_framework import serializers
from django.contrib.auth import get_user_model
User = get_user_model()

#class UserSerializer(serializers.HyperlinkedModelSerializer):
    #class Meta:
        #model = obj.author
        #fields = ['username', 'email', 'bio', 'host', 'firstName', 'lastName', 'displayName', 'url', 'github', 'groups']

class PostsSerializer(serializers.HyperlinkedModelSerializer):
    author_data = serializers.SerializerMethodField()
    contentType = serializers.SerializerMethodField()
    class Meta:
        model = Posts
        fields = ['id','title','author','author_data', 'description','contentType','content','categories','visibilities','visible_to','publish']

    def get_author_data(self,obj):
        return {"id": obj.author.id, "username": obj.author.username, "email": obj.author.email, "bio": obj.author.bio, "host": obj.author.bio, "firstName": obj.author.firstName,"lastName": obj.author.lastName, "displayName": obj.author.displayName,"github":obj.author.github}
        #print(real_id)
        #return User.objects.get(id = real_id)

    def get_contentType(self,obj):
        return ("text/plain")

    def create(self, validated_data):
        return Posts(**validated_data)
