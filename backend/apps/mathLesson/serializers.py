from rest_framework import serializers
from .models import MathLesson, MathExercise, UserProgress
from django.utils import timezone

class MathExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = MathExercise
        fields = '__all__'

class MathLessonSerializer(serializers.ModelSerializer):
    exercises = MathExerciseSerializer(many=True, read_only=True)

    class Meta:
        model = MathLesson
        fields = '__all__'

class UserProgressSerializer(serializers.ModelSerializer):
    lesson_title = serializers.ReadOnlyField(source='lesson.title')

    class Meta:
        model = UserProgress
        fields = [
            'id',
            'user',
            'lesson',
            'lesson_title',
            'completed',
            'earned_xp',
            'accuracy',
            'retries',
            'timestamp',
            'last_updated'
        ]
        read_only_fields = ['user', 'last_updated']

    def update(self, instance, validated_data):
        instance.completed = validated_data.get('completed', instance.completed)
        instance.earned_xp = validated_data.get('earned_xp', instance.earned_xp)
        instance.accuracy = validated_data.get('accuracy', instance.accuracy)
        instance.retries = validated_data.get('retries', instance.retries)
        instance.timestamp = validated_data.get('timestamp', timezone.now())
        instance.save()
        return instance
