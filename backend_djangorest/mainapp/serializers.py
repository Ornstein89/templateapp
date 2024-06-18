from django.contrib.auth.models import Group, User

from rest_framework import serializers

from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username']

class PublicationSerializer(serializers.ModelSerializer):
    author = UserSerializer() 
    # def create(self, validated_data):
    #     return super().create(validated_data)
    
    class Meta:
        model = Publication
        fields = '__all__'
        