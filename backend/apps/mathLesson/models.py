from django.db import models
from apps.courses.models import Course
from django.conf import settings

class MathLesson(models.Model):
    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE,
        related_name='math_lessons'
    )

    title = models.CharField(max_length=255)
    instruction = models.TextField(help_text="Ej: Resuelve la siguiente operación")
    order = models.PositiveIntegerField(default=0)
    difficulty = models.CharField(
        max_length=20,
        choices=[
            ('fácil', 'Fácil'),
            ('media', 'Media'),
            ('difícil', 'Difícil'),
        ],
        default='fácil'
    )
    xp_value = models.PositiveIntegerField(default=20)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} ({self.course.title})"

class MathExercise(models.Model):
    lesson = models.ForeignKey(MathLesson, on_delete=models.CASCADE, related_name='exercises')
    question_text = models.CharField(max_length=255)
    correct_answer = models.CharField(max_length=50)
    answer_type = models.CharField(
        max_length=20,
        choices=[
            ('input', 'Campo de texto'),
            ('multiple_choice', 'Opción múltiple')
        ],
        default='input'
    )
    options = models.JSONField(blank=True, null=True, help_text="Solo para opción múltiple")
    feedback = models.TextField(blank=True)

    def __str__(self):
        return self.question_text

class UserProgress(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='math_progress'
    )
    lesson = models.ForeignKey(
        MathLesson,
        on_delete=models.CASCADE,
        related_name='progress'
    )
    completed = models.BooleanField(default=False)
    earned_xp = models.PositiveIntegerField(default=0)
    accuracy = models.FloatField(default=0.0, help_text="Porcentaje de respuestas correctas")
    retries = models.PositiveIntegerField(default=0, help_text="Cantidad de intentos realizados")
    timestamp = models.DateTimeField(null=True, blank=True, help_text="Fecha de finalización")
    last_updated = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('user', 'lesson')

    def __str__(self):
        estado = "Completado" if self.completed else " En progreso"
        return f"{self.user.email} - {self.lesson.title} - {estado}"

