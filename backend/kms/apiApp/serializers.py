from rest_framework import serializers
from apiApp.models import Company, Department, Article, Faq, Folder, File,Collaboration
from django.contrib.auth.models import User


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    groups = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='name',
    )

    class Meta:
        model = User
        fields = '__all__'

    

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'


class ArticleSerializerGet(serializers.ModelSerializer):
    department = serializers.CharField(source='department.title')
    owner = serializers.CharField(source='owner.username')

    class Meta:
        model = Article
        fields = '__all__'


class ArticleSerializerPostPatch(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = '__all__'


class FolderSerializerGet(serializers.ModelSerializer):
    department = serializers.CharField(source='department.title')

    class Meta:
        model = Folder
        fields = '__all__'

class FolderSerializerPost(serializers.ModelSerializer):
    class Meta:
        model = Folder
        fields = '__all__'


class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = '__all__'


class FaqSerializer(serializers.ModelSerializer):
    class Meta:
        model = Faq
        fields = '__all__'

class CollaborationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Collaboration
        fields = '__all__'

class CollaborationSerializerGet(serializers.ModelSerializer):
    sender = serializers.CharField(source='sender.username')
    recipient = serializers.CharField(source='recipient.username')

    class Meta:
        model = Collaboration
        fields = '__all__'