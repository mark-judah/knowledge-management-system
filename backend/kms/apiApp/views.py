from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from apiApp.models import Company, Department, Article, Faq, Folder, File
from apiApp.serializers import CompanySerializer, FolderSerializerGet, FolderSerializerPost, UserSerializer, DepartmentSerializer, ArticleSerializerGet, ArticleSerializerPost, FaqSerializer, FileSerializer
from django.contrib.auth.models import User, Group
from django.contrib.auth.hashers import make_password
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication
# Create your views here.


class CompanyListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        company = Company.objects.all()
        serializer = CompanySerializer(company, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = CompanySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CompanyUpdateView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def patch(self, request, *args, **kwargs):
        company = Company.objects.get(pk=1)
        serializer = CompanySerializer(company, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_304_NOT_MODIFIED)


class UserListView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = User.objects.all()
        serializer = UserSerializer(user, many=True)
        return Response(serializer.data)


class UserCreateView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        group_exists = Group.objects.filter(
            name=request.data['department']).exists()
        if group_exists:
            group = Group.objects.get(name=request.data['department'])
        else:
            group = Group.objects.create(name=request.data['department'])
        password = make_password(request.data['password'])
        role_data = request.data['role']
        is_superuser = False
        is_staff = False
        if role_data == 'Staff':
            is_staff = True
        if role_data == 'Admin':
            is_superuser = True
        data = {
            "username": request.data['username'],
            "email": request.data['email'],
            "password": password,
            "is_staff": is_staff,
            "is_superuser": is_superuser
        }
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            user = User.objects.get(email=request.data['email'])
            user.groups.add(group)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DepartmentListCreateView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        departments = Department.objects.all()
        serializer = DepartmentSerializer(departments, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = DepartmentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            Group.objects.create(name=request.data['title'])
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ArticleListCreateView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        articles = Article.objects.all()
        serializer = ArticleSerializerGet(articles, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        user = User.objects.get(username=request.data['owner'])
        data = {
            "title": request.data['title'],
            "department": request.data['department'],
            "article_type": request.data['article_type'],
            "chapter": request.data['chapter'],
            "duration": request.data['duration'],
            "thumbnail": request.data['thumbnail'],
            "tags": request.data['tags'],
            "article_content": request.data['article_content'],
            "owner": user.id,
        }
        serializer = ArticleSerializerPost(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class FolderListCreateView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        folders = Folder.objects.all()
        serializer = FolderSerializerGet(folders, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        user = User.objects.get(username=request.data['owner'])
        data = {
            "title": request.data['title'],
            "department": request.data['department'],
            "path": request.data['path'],
            "owner": user.id,
        }
        serializer = FolderSerializerPost(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class FileListCreateView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        files = File.objects.all()
        serializer = FileSerializer(files, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        files_list = request.data.getlist('files[]')
        user = User.objects.get(username=request.data['owner'])

        print(files_list)
        response_data = []
        errors = []

        file_data = ''
        for file in files_list:
            print(file.name)
            file_data = {
                "title": file.name,
                "department": request.data['department_id'],
                "file": file,
                "path": request.data['path'],
                "owner": user.id,
            }
            serializer = FileSerializer(data=file_data)
            if serializer.is_valid():
                serializer.save()
                response_data.append(serializer.data)
            else:
                errors.append(serializer.data)

        if len(errors) > 0:
            return Response(errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(response_data, status=status.HTTP_201_CREATED)


class FaqCreateView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        faqs = Faq.objects.all()
        serializer = FaqSerializer(faqs, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = FaqSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
