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
    options = OptionSerializer(many=True, read_only=True)

    class Meta:
        model = Poll
        fields = ["id", "question", "created_by", "created_at", "expires_at", "options"]
        read_only_fields = ["id", "created_by", "created_at", "options"]

    def validate_question(self, value):
        if not value.strip():
            raise serializers.ValidationError("Question cannot be empty.")
        return value

    def validate_expires_at(self, value):
        if value <= timezone.now():
            raise serializers.ValidationError("Expiry date must be in the future.")
        return value


class VoteSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Vote
        fields = ["id", "poll", "option", "user", "voted_at"]
        extra_kwargs = {"voted_at": {"read_only": True}}
        validators = []  # disable automatic UniqueTogetherValidator

    def validate(self, data):
        poll = data["poll"]
        option = data["option"]
        user = self.context["request"].user

        # Check poll expiry
        if poll.expires_at <= timezone.now():
            raise serializers.ValidationError("Voting is closed for this poll.")

        # Check duplicate votes
        if Vote.objects.filter(poll=poll, user=user).exists():
            raise serializers.ValidationError("You have already voted in this poll.")

        # Ensure option belongs to poll
        if option.poll_id != poll.id:
            raise serializers.ValidationError(
                "This option does not belong to the poll."
            )

        return data
