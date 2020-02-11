from posts.models import Posts
from rest_framework import serializers


class PostsSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Posts
        fields = ['title', 'author', 'plainText', 'images','publish']
