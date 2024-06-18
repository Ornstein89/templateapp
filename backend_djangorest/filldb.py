from datetime import timezone

from django.contrib.auth.models import Group, User
from django.db import transaction

from mainapp.models import *

from faker import Faker
fk = Faker()

def generateUsers():
    with transaction.atomic():
        newuser = User()
        newuser.username = f"admin"
        newuser.set_password(f"praSwu70LqaS")
        newuser.is_active = True
        newuser.first_name = fk.first_name()
        newuser.last_name = fk.last_name()
        newuser.is_staff = True
        newuser.is_superuser = True
        newuser.email = fk.email()
        newuser.save()
        
        for i in range(1, 10):
            newuser = User()
            newuser.username = f"user{i+1}"
            newuser.set_password(f"pass{i+1}")
            newuser.is_active = True
            newuser.first_name = fk.first_name()
            newuser.last_name = fk.last_name()
            newuser.is_staff = False
            newuser.is_superuser = False
            newuser.email = fk.email()
            newuser.save()

def generatePublications():
    with transaction.atomic():
        for i in range(100):
            newpub = Publication()
            newpub.datetime = fk.date_time_this_month(tzinfo=timezone.utc)
            newpub.author = User.objects.order_by("?").first()
            newpub.text = fk.paragraph(nb_sentences=5)
            newpub.title = fk.sentence(nb_words=5)
            newpub.image = "https://cataas.com/cat"
            newpub.save()

def clearAll():
    Publication.objects.all().delete()
    User.objects.all().delete()