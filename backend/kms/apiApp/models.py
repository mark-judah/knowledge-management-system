from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Company(models.Model):
    title = models.CharField(max_length=180, unique=True)
    tagline = models.CharField(max_length=180, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class Department(models.Model):
    title = models.CharField(max_length=180, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class Article(models.Model):
    title = models.CharField(max_length=180, unique=True)
    department = models.ForeignKey(
        Department,
        on_delete=models.CASCADE,
        blank=False
    )
    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        blank=False,
        related_name='owner'

    )
    collaborators = models.TextField(blank=True, null=True)
    article_type = models.CharField(max_length=180)
    chapter = models.CharField(max_length=180, blank=True, null=True)
    duration = models.CharField(max_length=180, blank=True, null=True)
    thumbnail = models.ImageField(upload_to='img')
    tags = models.TextField(blank=True, null=True)
    article_content = models.TextField()
    draft = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class Folder(models.Model):
    title = models.CharField(max_length=180)
    department = models.ForeignKey(
        Department,
        on_delete=models.CASCADE,
        blank=False
    )
    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        blank=False
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    path = models.CharField(max_length=180, blank=True, null=True)

    def __str__(self):
        return self.title


class File(models.Model):
    title = models.CharField(max_length=180)
    department = models.ForeignKey(
        Department,
        on_delete=models.CASCADE,
        blank=False
    )
    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        blank=False
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    file = models.FileField(upload_to='files')
    path = models.CharField(max_length=180, blank=True, null=True)

    def __str__(self):
        return self.title


class Faq(models.Model):
    question = models.CharField(max_length=180, unique=True)
    answer = models.TextField()
    related_article = models.CharField(max_length=180, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.question


class Collaboration(models.Model):
    message = models.CharField(max_length=230)
    seen = models.BooleanField(default=False, blank=True, null=True)
    approved = models.BooleanField(default=False, blank=True, null=True)
    recipient = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        blank=False,
        related_name='recipient'
    )
    sender = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        blank=False,
        related_name='sender'
    )
    department = models.CharField(
        max_length=230, default='', blank=True, null=True)
    article =  models.ForeignKey(
        Article,
        on_delete=models.CASCADE,
        blank=False,
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.message
