"""
URL configuration for kms project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from apiApp.views import CompanyCreateListView, CompanyUpdateView, UserListUpdateView, UserCreateView, UserActivateDeactivateDestroyView, DepartmentCreateListUpdateDeleteView, ArticleCreateListUpdateDeleteView,ArticlePublishToggleView, FolderCreateListView, FileCreateListView, FaqCreateView, CollaborationCreateUpdateDestroyView, AddCollaboratorView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('company/', CompanyCreateListView.as_view(), name=''),
    path('company/update/', CompanyUpdateView.as_view(), name=''),
    path('users/', UserListUpdateView.as_view(), name=''),
    path('user/', UserCreateView.as_view(), name=''),
    path('user-status/', UserActivateDeactivateDestroyView.as_view(), name=''),
    path('delete-user/', UserActivateDeactivateDestroyView.as_view(), name=''),
    path('departments/', DepartmentCreateListUpdateDeleteView.as_view(), name=''),
    path('articles/', ArticleCreateListUpdateDeleteView.as_view(), name=''),
    path('article-publish-toggle/', ArticlePublishToggleView.as_view(), name=''),
    path('folders/', FolderCreateListView.as_view(), name=''),
    path('files/', FileCreateListView.as_view(), name=''),
    path('faqs/', FaqCreateView.as_view(), name=''),
    path('collaborations/', CollaborationCreateUpdateDestroyView.as_view(), name=''),
    path('add-collaborator/', AddCollaboratorView.as_view(), name='')

]
