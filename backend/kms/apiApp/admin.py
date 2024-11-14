from django.contrib import admin
from apiApp.models import Department,Article,Folder,File
# Register your models here.
admin.site.register(Department)
admin.site.register(Article)
admin.site.register(Folder)
admin.site.register(File)