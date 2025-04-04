from django.urls import path
from .views import CampaignDashboardView
from rest_framework.routers import DefaultRouter
from .views import CampaignViewSet

router = DefaultRouter()
router.register(r'campaigns', CampaignViewSet, basename='campaign')

urlpatterns = router.urls + [
    path('dashboard/', CampaignDashboardView.as_view(), name='campaign-dashboard'),
]
