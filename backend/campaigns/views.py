from rest_framework import viewsets, permissions, filters, response, views
from .models import Campaign
from .serializers import CampaignSerializer, CampaignLandingSerializer
from .permissions import IsSuperAdminOrReadOnly, IsOwnerOrSuperAdmin

from django.db import models

class CampaignViewSet(viewsets.ModelViewSet):
    serializer_class = CampaignSerializer
    permission_classes = [IsSuperAdminOrReadOnly, IsOwnerOrSuperAdmin]
    filter_backends = [filters.SearchFilter]
    filterset_fields  = ['status']

    def get_queryset(self):
        user = self.request.user
        if user.role == 'SUPERADMIN':
            return Campaign.objects.all()
        return Campaign.objects.filter(created_by=user)

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class CampaignDashboardView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user

        # Obtiene todas las campañas si el rol es super admin
        # Sino solo regresa las del admin
        if user.role == 'SUPERADMIN':
            campaigns = Campaign.objects.all()
        else:
            campaigns = Campaign.objects.filter(created_by=user)

        total_campaigns = campaigns.count()
        total_budget = campaigns.aggregate(models.Sum('budget'))['budget__sum'] or 0

        campaigns_summary = {}
        # Agrupamos las campañas por status
        for status, _ in Campaign.Status.choices:
            subset = campaigns.filter(status=status)
            campaigns_summary[status] = {
                'total': subset.count(), # Obtenemos el total de campañas por status
                'budget': float(subset.aggregate(models.Sum('budget'))['budget__sum'] or 0) # Sumamos el presupuesto por status
            }

        return response.Response({
            'total_campaigns': total_campaigns,
            'total_budget': float(total_budget),
            'campaigns': campaigns_summary
        })
    
class CampaignLandingView(views.APIView):
    queryset = Campaign.objects.all()
    permission_classes = [permissions.AllowAny]

    def get(self, request, id=None):
        if id:
            try:
                campaign = Campaign.objects.get(id=id)
            except Campaign.DoesNotExist:
                return response.Response({'detail': 'Not found.'}, status=404)

            return response.Response({
                "title": campaign.title,
                "description": campaign.description,
                "reach_estimate": campaign.reach_estimate
            })
        campaigns = Campaign.objects.all()
        serializer = CampaignLandingSerializer(campaigns, many=True)
        return response.Response(serializer.data)