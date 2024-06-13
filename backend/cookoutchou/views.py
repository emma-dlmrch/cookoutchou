from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet
from .models import *
from .serializers import *
import logging

# Create your views here.
# mixin pour définir serializers de détails et de liste (pour plus tard)
class MultipleSerializerMixin:
    detail_serializer_class = None

    def get_serializer_class(self):
        if (self.action == 'retrieve' or self.action == 'update') and self.detail_serializer_class is not None:
            return self.detail_serializer_class
        
        return super().get_serializer_class()
    
    


class IngredientViewSet(ModelViewSet):

    serializer_class = IngredientDetailSerializer

    def get_queryset(self):
        queryset = Ingredient.objects.all()
        return queryset
    

class RecipeViewSet(MultipleSerializerMixin, ModelViewSet):

    detail_serializer_class = RecipeDetailSerializer
    serializer_class = RecipeListSerializer

    def get_queryset(self):
        queryset = Recipe.objects.all()
        return queryset
    
#Ajouter/supprimer/modifier un ingrédient à une recette
class RecipeIngredientViewSet(ModelViewSet):

    serializer_class = RecipeIngredientAdminSerializer

    def get_queryset(self):
        queryset = RecipeIngredient.objects.all()
        return queryset
    
class EventViewSet(MultipleSerializerMixin, ModelViewSet):

    detail_serializer_class = EventListSerializer ##pas de détail pour le moment
    serializer_class = EventListSerializer

    def get_queryset(self):
        queryset = Event.objects.all()
        return queryset