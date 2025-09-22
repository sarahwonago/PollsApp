from rest_framework import viewsets
from .models import Poll
from .serializers import PollSerializer


class PollViewSet(viewsets.ModelViewSet):
    """
    API endpoint for viewing and creating polls.

    list:
    Return a list of all polls.

    create:
    Create a new poll.

    retrieve:
    Return a specific poll by ID.

    update:
    Update a poll.

    partial_update:
    Partially update a poll.

    destroy:
    Delete a poll.
    """

    queryset = Poll.objects.all().order_by("-created_at")
    serializer_class = PollSerializer
