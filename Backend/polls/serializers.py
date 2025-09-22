from rest_framework import serializers
from .models import Poll, Option, Vote
from django.utils import timezone


class OptionSerializer(serializers.ModelSerializer):
    """Serializer for the Option model."""

    def validate_text(self, value):
        if not value.strip():
            raise serializers.ValidationError("Option text cannot be empty.")
        return value

    class Meta:
        model = Option
        fields = ["id", "text", "poll"]


class PollSerializer(serializers.ModelSerializer):
    """Serializer for the Poll model."""

    options = OptionSerializer(many=True, read_only=True)

    def validate_question(self, value):
        if not value.strip():
            raise serializers.ValidationError("Question cannot be empty.")
        return value

    def validate_expires_at(self, value):
        if value <= timezone.now():
            raise serializers.ValidationError("Expiry date must be in the future.")
        return value

    class Meta:
        model = Poll
        fields = ["id", "question", "created_by", "created_at", "expires_at", "options"]


class VoteSerializer(serializers.ModelSerializer):
    """Serializer for the Vote model."""

    def validate(self, data):
        poll = data["poll"]
        user = data["user"]
        if poll.expires_at <= timezone.now():
            raise serializers.ValidationError("Voting is closed for this poll.")
        if Vote.objects.filter(poll=poll, user=user).exists():
            raise serializers.ValidationError("You have already voted in this poll.")
        return data

    class Meta:
        model = Vote
        fields = ["id", "poll", "option", "user", "voted_at"]
