from rest_framework import serializers
from .models import Campaign

class CampaignSerializer(serializers.ModelSerializer):
    class Meta:
        model = Campaign
        fields = '__all__'
        read_only_fields = ('created_by', 'created_at')

class CampaignLandingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Campaign
        fields = ('title', 'description', 'reach_estimate')