from rest_framework.serializers import ModelSerializer, ValidationError
from rest_framework import serializers
from .models import *

class UnitSerializer(ModelSerializer):

    class Meta:
        model = Unit
        fields = ['id', 'name']

class MonthSerializer(ModelSerializer):

    class Meta:
        model = SeasonalMonth
        fields = ['id', 'name']


class MomentSerializer(ModelSerializer):
    
    class Meta:
        model = Moment
        fields = ['id', 'name']


class LabelSerializer(ModelSerializer):
    
    class Meta:
        model = Label
        fields = ['id', 'name']



##Ingredient
class IngredientListSerializer(ModelSerializer):
    
    class Meta:
        model = Ingredient
        fields = ['id', 'name']


class IngredientDetailSerializer(ModelSerializer):

    units = UnitSerializer(many=True, read_only=True)
    months = MonthSerializer(many=True, read_only=True)
    
    class Meta:
        model = Ingredient
        fields = ['id', 'name', 'months', 'units']


##Recipe admin

class RecipeIngredientSerializer(ModelSerializer):

    ingredient = IngredientListSerializer()
    unit = UnitSerializer()

    class Meta:
        model = RecipeIngredient
        fields = ['id', 'quantity', 'unit', 'ingredient']


class AbstractRecipeSerializer(ModelSerializer):
    preparationTime = serializers.IntegerField(source="preparation_time")
    cookingTime = serializers.IntegerField(source="cooking_time")
    nbGuests = serializers.IntegerField(source="default_guest_number")

class RecipeListSerializer(AbstractRecipeSerializer):

    class Meta:
        model = Recipe
        fields = ['id', 'name', 'nbGuests', 'preparationTime', 
                  'cookingTime', 'moments'] #author temp le temps qu'on active token #moments à supprimer?


class RecipeDetailSerializer(AbstractRecipeSerializer):

    labels = LabelSerializer(many=True)
    moments = MomentSerializer(many=True)
    ingredients = RecipeIngredientSerializer(source="recipe_ingredients", many=True)
    
    class Meta:
        model = Recipe
        fields = ['id', 'name', 'nbGuests', 'instructions', 'preparationTime', 
                  'cookingTime', 'labels', 'moments', 'ingredients']


##Recipe-ingredient admin
class RecipeIngredientAdminSerializer(ModelSerializer):

    class Meta:
        model = RecipeIngredient
        fields = ['id', 'quantity', 'unit', 'ingredient', 'recipe']

##Event
class AbstractEventSerializer(ModelSerializer):

    startDate = serializers.DateField(source="start_date")
    endDate = serializers.DateField(source="end_date")


class EventListSerializer(AbstractEventSerializer):
    
    class Meta:
        model = Event
        fields = ['id', 'name', 'startDate', 'endDate']


class EventDetailSerializer(AbstractEventSerializer):

    meals = serializers.SerializerMethodField()
    
    class Meta:
        model = Event
        fields = ['id', 'name', 'startDate', 'endDate', 'meals']

    def get_meal(self, instance):
        queryset = instance.event_meals.all()
        serializer = MealSerializer(queryset, many=True)
        return serializer.data
    
##Meal
class MealSerializer(ModelSerializer):
    
    class Meta:
        model = Meal
        fields = ['id', 'name', 'date']