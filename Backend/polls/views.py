from rest_framework import viewsets
from .models import Poll
from .serializers import PollSerializer


class PollViewSet(viewsets.ModelViewSet):
    queryset = Poll.objects.all().order_by("-created_at")
    serializer_class = PollSerializer
