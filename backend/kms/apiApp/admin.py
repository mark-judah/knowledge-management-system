from django.contrib import admin
from apiApp.models import Company, Department,Article, Faq,Folder,File
# Register your models here.
admin.site.register(Company)
admin.site.register(Department)
admin.site.register(Article)
admin.site.register(Folder)
admin.site.register(File)
admin.site.register(Faq)