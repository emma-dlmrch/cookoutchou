from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet
from .models import *
from .serializers import *

# Create your views here.
# mixin pour définir serializers de détails et de liste (pour plus tard)
class MultipleSerializerMixin:
    detail_serializer_class = None

    def get_serializer_class(self):
        if (self.action == 'retrieve' or self.action == 'update' ) and self.detail_serializer_class is not None:
            return self.detail_serializer_class

        return super().get_serializer_class()
    
    


class IngredientViewSet(ReadOnlyModelViewSet):

    serializer_class = IngredientSerializer

    def get_queryset(self):
        queryset = Ingredient.objects.all()
        return queryset