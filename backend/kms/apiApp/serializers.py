from rest_framework import serializers
from apiApp.models import Department,Article, Faq,Folder,File

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model=Department
        fields='__all__'

class ArticleSerializerGet(serializers.ModelSerializer):
    department=serializers.CharField(source='department.title')
    class Meta:
        model=Article
        fields='__all__'

class ArticleSerializerPost(serializers.ModelSerializer):
    class Meta:
        model=Article
        fields='__all__'

class FolderSerializer(serializers.ModelSerializer):
    department=serializers.CharField(source='department.title')

    class Meta:
        model=Folder
        fields='__all__'

class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model=File
        fields='__all__'

class FaqSerializer(serializers.ModelSerializer):
    class Meta:
        model=Faq
        fields='__all__'
