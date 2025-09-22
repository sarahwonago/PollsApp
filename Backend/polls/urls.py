from rest_framework.routers import DefaultRouter
from polls.views import PollViewSet

router = DefaultRouter()
router.register(r"polls", PollViewSet, basename="poll")

urlpatterns = router.urls
