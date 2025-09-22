from rest_framework import serializers
from .models import Poll, Option, Vote


class OptionSerializer(serializers.ModelSerializer):
    """Serializer for the Option model."""

    class Meta:
        model = Option
        fields = ["id", "text", "poll"]


class PollSerializer(serializers.ModelSerializer):
    """Serializer for the Poll model."""

    options = OptionSerializer(many=True, read_only=True)

    class Meta:
        model = Poll
        fields = ["id", "question", "created_by", "created_at", "expires_at", "options"]


class VoteSerializer(serializers.ModelSerializer):
    """Serializer for the Vote model."""

    class Meta:
        model = Vote
        fields = ["id", "poll", "option", "user", "voted_at"]
