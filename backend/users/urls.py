from django.urls import path
from .views import CreateUserView, ListUsersView, LoginView

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('register/', CreateUserView.as_view(), name='register'),
    path('users/', ListUsersView.as_view(), name='user-list'),
]
