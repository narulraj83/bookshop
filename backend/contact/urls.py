from django.urls import path

from .views import ContactEnquiryCreateView, ContactEnquiryListView

urlpatterns = [
    path('submit/', ContactEnquiryCreateView.as_view(), name='contact-submit'),
    path('', ContactEnquiryListView.as_view(), name='contact-list'),
]
