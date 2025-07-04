from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Course(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    target_audience = models.CharField(max_length=255, blank=True)
    cover_image = models.ImageField(upload_to='courses/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    creator = models.ForeignKey(
        User, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True, 
        related_name='created_courses'
    )

    difficulty = models.CharField(
        max_length=50,
        choices=[
            ('básico', 'Básico'),
            ('intermedio', 'Intermedio'),
            ('avanzado', 'Avanzado'),
        ],
        default='básico'
    )

    category = models.CharField(
        max_length=100,
        blank=True,
        help_text="Ej: Matemáticas, Quechua, Educación Cívica"
    )

    language = models.CharField(max_length=50, default='Español')

    estimated_duration = models.PositiveIntegerField(
        blank=True,
        null=True,
        help_text="Duración estimada en minutos"
    )

    xp_reward = models.PositiveIntegerField(
        default=100,
        help_text="Puntos XP otorgados al completar el curso"
    )

    def __str__(self):
        return self.title
