from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .serializers import UserSerializer
from .permissions import IsSuperAdmin
from django.contrib.auth import get_user_model

User = get_user_model()

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, IsSuperAdmin]

class ListUsersView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, IsSuperAdmin]
