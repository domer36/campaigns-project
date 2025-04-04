from rest_framework import viewsets, permissions, filters
from .models import Campaign
from .serializers import CampaignSerializer
from .permissions import IsSuperAdminOrReadOnly, IsOwnerOrSuperAdmin

class CampaignViewSet(viewsets.ModelViewSet):
    queryset = Campaign.objects.all()
    serializer_class = CampaignSerializer
    permission_classes = [IsSuperAdminOrReadOnly, IsOwnerOrSuperAdmin]
    filter_backends = [filters.SearchFilter]
    search_fields = ['status']

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)
