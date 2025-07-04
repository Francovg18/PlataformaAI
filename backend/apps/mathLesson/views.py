from rest_framework import viewsets, permissions
from .models import MathLesson, MathExercise, UserProgress
from .serializers import MathLessonSerializer, MathExerciseSerializer, UserProgressSerializer
from rest_framework.decorators import action
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

class IsTeacherOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user.is_authenticated and request.user.role == 'profesor'

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return True

class MathLessonViewSet(viewsets.ModelViewSet):
    queryset = MathLesson.objects.all().order_by('order')
    serializer_class = MathLessonSerializer
    permission_classes = [IsTeacherOrReadOnly]

@method_decorator(csrf_exempt, name='dispatch')
class UserProgressViewSet(viewsets.ModelViewSet):
    queryset = UserProgress.objects.all()
    serializer_class = UserProgressSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

    def perform_create(self, serializer):
        user = self.request.user
        lesson = serializer.validated_data.get('lesson')

        existing = UserProgress.objects.filter(user=user, lesson=lesson).first()
        if existing:
            serializer.instance = existing
            serializer.update(existing, serializer.validated_data)
        else:

            serializer.save(user=user)

    def perform_update(self, serializer):
        serializer.save() 
