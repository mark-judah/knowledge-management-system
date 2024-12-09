from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from apiApp.models import Company, Department, Article, Faq, Folder, File, Collaboration
from apiApp.serializers import CompanySerializer, FolderSerializerGet, FolderSerializerPost, UserSerializer, DepartmentSerializer, ArticleSerializerGet, ArticleSerializerPostPatch, FaqSerializer, FileSerializer, CollaborationSerializer, CollaborationSerializerGet
from django.contrib.auth.models import User, Group
from django.contrib.auth.hashers import make_password
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication
# Create your views here.


class CompanyCreateListView(APIView):
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


class UserListUpdateView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = User.objects.all()
        serializer = UserSerializer(user, many=True)
        return Response(serializer.data)

    def patch(self, request, *args, **kwargs):
        group_exists = Group.objects.filter(
            name=request.data['department']).exists()
        if group_exists:
            group = Group.objects.get(name=request.data['department'])
        else:
            group = Group.objects.create(name=request.data['department'])
        password = make_password(request.data['password'])
        role_data = request.data['role']
        user_status = request.data['status']
        is_superuser = False
        is_staff = False
        is_active = False
        if role_data == 'Staff':
            is_staff = True
        if role_data == 'Admin':
            is_superuser = True
        if user_status == 'True':
            is_active = True
        if user_status == 'False':
            is_active = False
        data = {
            "username": request.data['username'],
            "email": request.data['email'],
            "password": password,
            "is_staff": is_staff,
            "is_superuser": is_superuser,
            "is_active": is_active
        }
        user = User.objects.get(pk=request.data['id'])
        serializer = UserSerializer(user, data=data)
        if serializer.is_valid():
            serializer.save()
            user.groups.clear()
            user.groups.add(group)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_304_NOT_MODIFIED)


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


class UserActivateDeactivateDestroyView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = User.objects.filter(pk=request.data['id']).update(
            is_active=request.data['is_active'])
        if (user):
            return Response(user, status=status.HTTP_200_OK)
        return Response(user, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        user = User.objects.get(pk=request.data['id'])
        user.delete()
        return Response(status=204)


class DepartmentCreateListUpdateDeleteView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        departments = Department.objects.all()
        serializer = DepartmentSerializer(departments, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        departments_list = request.data['departments']
        response_data = []
        errors = []
        for department in departments_list:
            department_data = {
                "title": department,
            }
            serializer = DepartmentSerializer(data=department_data)
            if serializer.is_valid():
                serializer.save()
                Group.objects.create(name=department)
                response_data.append(serializer.data)
            else:
                errors.append(serializer.data)

        if len(errors) > 0:
            print(errors)
            return Response(errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(response_data, status=status.HTTP_201_CREATED)

    def patch(self, request, *args, **kwargs):
        department = Department.objects.get(pk=request.data['id'])
        serializer = DepartmentSerializer(department, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        department = Department.objects.get(pk=request.data['id'])
        Group.objects.filter(name=department.title).delete()
        department.delete()

        return Response(status=204)


class ArticleCreateListUpdateDeleteView(APIView):
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
            "draft": request.data['draft'],
        }
        serializer = ArticleSerializerPostPatch(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, *args, **kwargs):
        article = Article.objects.get(pk=request.data['id'])
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
            "draft": request.data['draft'],

        }
        serializer = ArticleSerializerPostPatch(article, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs): 
        article = Article.objects.get(pk=request.data['id'])
        article.delete()
        return Response(status=204)

class ArticlePublishToggleView(APIView):
    def patch(self, request, *args, **kwargs):
        article = Article.objects.filter(pk=request.data['id']).update(
            draft=not request.data['draft'])
        if (article):
            return Response('success', status=status.HTTP_200_OK)
        return Response('failed', status=status.HTTP_400_BAD_REQUEST)
    
class FolderCreateListView(APIView):
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


class FileCreateListView(APIView):
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


class CollaborationCreateUpdateDestroyView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        collaborations = Collaboration.objects.all()
        serializer = CollaborationSerializerGet(collaborations, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        recipient = User.objects.get(username=request.data['recipient'])
        sender = User.objects.get(username=request.data['sender'])

        data = {
            "message": request.data['message'],
            "recipient": recipient.id,
            "sender": sender.id,
            "department": sender.groups.all()[0].name,
            "article": request.data['article'],
        }
        
        serializer = CollaborationSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, *args, **kwargs):
        collaboration = Collaboration.objects.filter(pk=request.data['id']).update(
            seen=not request.data['seen'])
        if (collaboration):
            return Response(collaboration, status=status.HTTP_200_OK)
        return Response(collaboration, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs): 
        collaboration = Collaboration.objects.get(pk=request.data['id'])
        collaboration.delete()
        return Response(status=204)

class AddCollaboratorView(APIView):
    def patch(self, request, *args, **kwargs):
        article = Article.objects.filter(pk=request.data['article']).update(
            collaborators=request.data['name'])
        collaboration = Collaboration.objects.filter(pk=request.data['id']).update(
            approved=not request.data['approved'],seen=not request.data['seen'])
        print(collaboration)
        if (article and collaboration):
            return Response('success', status=status.HTTP_200_OK)
        return Response('failed', status=status.HTTP_400_BAD_REQUEST)
