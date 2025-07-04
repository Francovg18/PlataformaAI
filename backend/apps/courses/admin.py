from django.contrib import admin
from .models import Course

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'difficulty', 'language', 'creator', 'created_at')
    list_filter = ('difficulty', 'language', 'created_at')
    search_fields = ('title', 'category', 'description')
    readonly_fields = ('created_at',)

    fieldsets = (
        ('Información básica', {
            'fields': ('title', 'description', 'category', 'language', 'difficulty')
        }),
        ('Duración y recompensa', {
            'fields': ('estimated_duration', 'xp_reward')
        }),
        ('Otros', {
            'fields': ('cover_image', 'creator', 'created_at')
        }),
    )
