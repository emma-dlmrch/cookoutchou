from django.contrib import admin
from .models import *

# Register your models here.

#to be removed when deployed
admin.site.register(SeasonalMonth)
admin.site.register(Moment)
admin.site.register(Label)
admin.site.register(Unit)
admin.site.register(Ingredient)
admin.site.register(Recipe)
admin.site.register(RecipeIngredient)
admin.site.register(Event)
admin.site.register(Meal)
admin.site.register(EventMealRecipe)
