from django.db import models
from django.core.validators import MinValueValidator
from authentication.models import User


# Months
class SeasonalMonth(models.Model):

    name = models.CharField(max_length=20)

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


# Object classe 

class Unit(models.Model):

    name = models.CharField(max_length=128)

    def __str__(self):
        return self.name


class Ingredient(models.Model):

    name = models.CharField(max_length=128)
    unit = models.ForeignKey(Unit, on_delete=models.CASCADE) # inutile d'ajouter related name au Unit
    months = models.ManyToManyField(SeasonalMonth, related_name='months')

    def __str__(self):
        return self.name
    

class Recipe(models.Model):

    name = models.CharField(max_length=128)
    default_guest_number = models.IntegerField(validators=[MinValueValidator(1)])
    instructions = models.TextField(blank=True)
    preparation_time = models.IntegerField() # en minutes
    cooking_time = models.IntegerField() # en minutes
    #liste labels
    labels = models.ManyToManyField(Label, related_name='labels')
    #liste moments du repas
    moments = models.ManyToManyField(Moment, related_name='moments')

    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='recipes')


    def __str__(self):
        return self.name

# Objet intermédiaire associant ingrédient et sa quantité à une recette
class RecipeIngredient(models.Model):

    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name="recipe_ingredients")
    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE, related_name="recipe_ingredients") #au cas ou on cherche les recettes associées à un ingrédient

    quantity = models.DecimalField(max_digits=8, decimal_places=2)


class Event(models.Model):

    name = models.CharField(max_length=128)
    date = models.DateField()

# Objet intermédiaire associant recette et le nombre de personnes à un événement
class EventRecipe(models.Model):
    
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name="event_recipes")
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name="event_recipes")

    guest_number =  models.IntegerField(validators=[MinValueValidator(1)])


