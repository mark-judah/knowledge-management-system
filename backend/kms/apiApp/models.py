from django.db import models

# Create your models here.
class Department(models.Model):
    title = models.CharField(max_length=180)
    icon = models.ImageField(upload_to='img',blank=True, null=True)

    def __str__(self):
        return self.title
    
class Article(models.Model):
    title = models.CharField(max_length=180)
    department = models.ForeignKey(
        Department,
        on_delete=models.CASCADE,
        blank=False
    )
    article_type = models.CharField(max_length=180)
    chapter = models.CharField(max_length=180,blank=True, null=True)
    duration = models.CharField(max_length=180, blank=True, null=True)
    thumbnail = models.ImageField(upload_to='img')
    tags = models.TextField( blank=True, null=True)
    article_content = models.TextField()
    def __str__(self):
        return self.title
     
class Folder(models.Model):
    title = models.CharField(max_length=180)
    department = models.ForeignKey(
        Department,
        on_delete=models.CASCADE,
        blank=False
    )
    def __str__(self):
        return self.title

class File(models.Model):
    title = models.CharField(max_length=180)
    department = models.ForeignKey(
        Department,
        on_delete=models.CASCADE,
        blank=False
    )
    def __str__(self):
        return self.title

class Faq(models.Model):
    question = models.CharField(max_length=180)
    answer = models.CharField(max_length=180)
    related_article = models.CharField(max_length=180,blank=True,null=True)

    def __str__(self):
        return self.question
