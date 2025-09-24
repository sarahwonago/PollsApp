from rest_framework.routers import DefaultRouter
from polls.views import PollViewSet, OptionViewSet, VoteViewSet, RegisterView
from django.urls import path

router = DefaultRouter()
router.register(r"polls", PollViewSet, basename="poll")
router.register(r"options", OptionViewSet, basename="option")
router.register(r"votes", VoteViewSet, basename="vote")

urlpatterns = router.urls

urlpatterns += [
    path("register/", RegisterView.as_view(), name="register"),
]
