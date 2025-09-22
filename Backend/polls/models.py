from django.db import models
from django.contrib.auth.models import User


class Poll(models.Model):
    """Model representing a poll."""

    question = models.CharField(max_length=255)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()

    def __str__(self):
        return self.question


class Option(models.Model):
    """Model representing an option in a poll."""

    poll = models.ForeignKey(Poll, related_name="options", on_delete=models.CASCADE)
    text = models.CharField(max_length=255)

    def __str__(self):
        return self.text


class Vote(models.Model):
    """Model representing a vote in a poll."""

    poll = models.ForeignKey(Poll, on_delete=models.CASCADE)
    option = models.ForeignKey(Option, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    voted_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("poll", "user")  # Prevent duplicate voting

    def __str__(self):
        return f"{self.user} voted {self.option} on {self.poll}"
