from django.db import models
from django.conf import settings

class Campaign(models.Model):
    class Status(models.TextChoices):
        ACTIVE = 'ACTIVE', 'Activa'
        PAUSED = 'PAUSED', 'Pausada'
        FINISHED = 'FINISHED', 'Finalizada'

    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    start_date = models.DateField()
    end_date = models.DateField()
    budget = models.DecimalField(max_digits=12, decimal_places=2)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.ACTIVE)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='campaigns')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
