from comments.models import Comments
from rest_framework import serializers


class CommentsSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Posts
        fields = ['title', 'root', 'plainText','publish']
