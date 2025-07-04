# urls.py
from rest_framework.routers import DefaultRouter
from .views import MathLessonViewSet, UserProgressViewSet

router = DefaultRouter()
router.register(r'lessons', MathLessonViewSet, basename='math-lessons')
router.register(r'progress', UserProgressViewSet, basename='user-progress')

urlpatterns = router.urls
