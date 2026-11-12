from rest_framework import serializers

from .models import ContactEnquiry


class ContactEnquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactEnquiry
        fields = ['id', 'name', 'email', 'mobile', 'subject', 'message', 'created_at']
        read_only_fields = ['id', 'created_at']
