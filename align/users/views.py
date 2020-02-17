from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
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