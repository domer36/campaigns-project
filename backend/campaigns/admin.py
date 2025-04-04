from django.contrib import admin
from .models import Campaign

@admin.register(Campaign)
class CampaignAdmin(admin.ModelAdmin):
    list_display = ('title', 'status', 'budget', 'start_date', 'end_date', 'created_by', 'created_at')
    list_filter = ('status', 'start_date', 'end_date')
    search_fields = ('title', 'description', 'created_by__username')
    readonly_fields = ('created_at',)
