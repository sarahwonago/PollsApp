from django.contrib.auth.models import User
from rest_framework.test import APITestCase
from rest_framework import status
from .models import Poll, Option, Vote
from django.utils import timezone
from datetime import timedelta


class PollAPITestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="testpass")
        self.client.force_authenticate(user=self.user)
        self.poll = Poll.objects.create(
            question="Favorite color?",
            created_by=self.user,
            expires_at=timezone.now() + timedelta(days=1),
        )
        self.option = Option.objects.create(poll=self.poll, text="Blue")

    def test_create_poll(self):
        data = {
            "question": "Best programming language?",
            "created_by": self.user.id,
            "expires_at": (timezone.now() + timedelta(days=2)).isoformat(),
        }
        response = self.client.post("/api/polls/", data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_option(self):
        data = {"poll": self.poll.id, "text": "Red"}
        response = self.client.post("/api/options/", data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_vote_once(self):
        data = {"poll": self.poll.id, "option": self.option.id, "user": self.user.id}
        response = self.client.post("/api/votes/", data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        # Try voting again (should fail)
        response = self.client.post("/api/votes/", data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
