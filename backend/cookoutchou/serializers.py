from rest_framework.serializers import ModelSerializer, ValidationError
from rest_framework import serializers
from .models import *

class UnitSerializer(ModelSerializer):

    class Meta:
        model = Unit
        fields = ['id','name']


class IngredientSerializer(ModelSerializer):

    units = UnitSerializer(many=True, read_only=True)
    
    class Meta:
        model = Ingredient
        fields = ['id','name', 'months', 'units']