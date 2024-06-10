from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from authentication.models import User


# Months
class SeasonalMonth(models.Model):

    name = models.CharField(max_length=20)
    number = models.PositiveIntegerField(default=1,
    validators=[
            MaxValueValidator(12),
            MinValueValidator(1)
        ])

    def __str__(self):
        return self.name


# Labels for recipes
class Moment(models.Model):

    name = models.CharField(max_length=128)
    def __str__(self):
        return self.name


class Label(models.Model):

    name = models.CharField(max_length=128)
    def __str__(self):
        return self.name


# Object classes 

class Unit(models.Model):

    name = models.CharField(max_length=128)

    def __str__(self):
        return self.name


class Ingredient(models.Model):

    name = models.CharField(max_length=128)
    units = models.ManyToManyField(Unit) # inutile d'ajouter related name au Unit
    months = models.ManyToManyField(SeasonalMonth, related_name='months', blank=True)

    def __str__(self):
        return self.name
    

class Recipe(models.Model):

    name = models.CharField(max_length=128)
    default_guest_number = models.IntegerField(validators=[MinValueValidator(1)])
    instructions = models.TextField(blank=True)
    preparation_time = models.IntegerField(null=True, blank=True) # en minutes
    cooking_time = models.IntegerField(null=True, blank=True) # en minutes
    #liste labels
    labels = models.ManyToManyField(Label, related_name='labels', blank=True)
    #liste moments du repas
    moments = models.ManyToManyField(Moment, related_name='moments', blank=True)

    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='recipes', null=True, blank=True)


    def __str__(self):
        return self.name

# Objet intermédiaire associant ingrédient et sa quantité à une recette
class RecipeIngredient(models.Model):

    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name="recipe_ingredients")
    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE, related_name="recipe_ingredients") #au cas ou on cherche les recettes associées à un ingrédient

    quantity = models.DecimalField(max_digits=8, decimal_places=2)
    unit = models.ForeignKey(Unit, on_delete=models.CASCADE)


class Event(models.Model):

    name = models.CharField(max_length=128)
    start_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True)

class Meal(models.Model):

    date = models.DateTimeField(blank=True, null=True)
    name = models.CharField(default="Repas par défaut", max_length=128)
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name="event_meals")

# Objet intermédiaire associant recette et le nombre de personnes à un événement
class EventMealRecipe(models.Model):
    
    meal = models.ForeignKey(Meal, on_delete=models.CASCADE, related_name="meal_recipes")
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name="event_recipes")

    guest_number =  models.IntegerField(validators=[MinValueValidator(1)])
