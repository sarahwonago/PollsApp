from rest_framework import viewsets, generics
from .models import Poll, Option, Vote
from .serializers import PollSerializer, OptionSerializer, VoteSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly, AllowAny
from .serializers_auth import RegisterSerializer
from rest_framework.decorators import action
from rest_framework.response import Response


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
    permission_classes = [IsAuthenticatedOrReadOnly]

    @action(detail=True, methods=["get"])
    def results(self, request, pk=None):
        poll = self.get_object()
        results = []
        for option in poll.options.all():
            votes = Vote.objects.filter(option=option).count()
            results.append({"option": option.text, "votes": votes})
        return Response({"poll": poll.question, "results": results})


class OptionViewSet(viewsets.ModelViewSet):
    """
    API endpoint for viewing and creating poll options.

    list:
    Return a list of all options.

    create:
    Create a new option for a poll.

    retrieve:
    Return a specific option by ID.

    update:
    Update an option.

    partial_update:
    Partially update an option.

    destroy:
    Delete an option.
    """

    queryset = Option.objects.all()
    serializer_class = OptionSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class VoteViewSet(viewsets.ModelViewSet):
    """
    API endpoint for casting and viewing votes.

    list:
    Return a list of all votes.

    create:
    Cast a vote for a poll option.

    retrieve:
    Return a specific vote by ID.

    update:
    Update a vote.

    partial_update:
    Partially update a vote.

    destroy:
    Delete a vote.
    """

    queryset = Vote.objects.all()
    serializer_class = VoteSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        print("Incoming data:", self.request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=self.request.user)


class RegisterView(generics.CreateAPIView):
    """
    API endpoint for user registration.
    """

    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]
