from django.urls import path
from .views import CreateUserView, ListUsersView

urlpatterns = [
    path('register/', CreateUserView.as_view(), name='register'),
    path('users/', ListUsersView.as_view(), name='user-list'),
]
