from rest_framework.routers import DefaultRouter
from polls.views import PollViewSet, OptionViewSet, VoteViewSet

router = DefaultRouter()
router.register(r"polls", PollViewSet, basename="poll")
router.register(r"options", OptionViewSet, basename="option")
router.register(r"votes", VoteViewSet, basename="vote")

urlpatterns = router.urls
