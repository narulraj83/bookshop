from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .models import ContactEnquiry
from .serializers import ContactEnquirySerializer


class ContactEnquiryCreateView(generics.CreateAPIView):
    queryset = ContactEnquiry.objects.all()
    serializer_class = ContactEnquirySerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response({'message': 'Enquiry submitted successfully.', 'data': serializer.data}, status=status.HTTP_201_CREATED)


class ContactEnquiryListView(generics.ListAPIView):
    queryset = ContactEnquiry.objects.all().order_by('-created_at')
    serializer_class = ContactEnquirySerializer
    permission_classes = [AllowAny]
