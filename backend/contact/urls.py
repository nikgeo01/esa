from django.urls import path
from .views import ContactCreateView, ContactListView

urlpatterns = [
    path('submit/', ContactCreateView.as_view(), name='contact-submit'),
    path('list/', ContactListView.as_view(), name='contact-list'),
] 