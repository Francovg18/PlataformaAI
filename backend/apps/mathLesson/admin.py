from django.contrib import admin
from .models import MathLesson, MathExercise, UserProgress


class MathExerciseInline(admin.TabularInline):
    model = MathExercise
    extra = 1  

# lecciones
@admin.register(MathLesson)
class MathLessonAdmin(admin.ModelAdmin):
    inlines = [MathExerciseInline]
    list_display = ('title', 'course', 'difficulty', 'order', 'xp_value', 'created_at')
    list_filter = ('difficulty', 'course')
    search_fields = ('title', 'course__title')

# Ejercicios a lecciones
@admin.register(MathExercise)
class MathExerciseAdmin(admin.ModelAdmin):
    list_display = ('question_text', 'lesson', 'answer_type', 'correct_answer')
    search_fields = ('question_text', 'correct_answer')
    list_filter = ('answer_type', 'lesson')

# progreso
@admin.register(UserProgress)
class UserProgressAdmin(admin.ModelAdmin):
    list_display = (
        'user', 
        'lesson', 
        'completed', 
        'earned_xp', 
        'accuracy',       
        'retries',        
        'timestamp',      
        'last_updated'
    )
    list_filter = ('completed', 'lesson__course')
    search_fields = ('user__email', 'lesson__title')
