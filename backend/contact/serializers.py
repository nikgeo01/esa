from rest_framework import serializers
from .models import Contact
import re

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ['id', 'name', 'email', 'phone', 'message', 'created_at', 'is_read']
        read_only_fields = ['created_at', 'is_read']

    def validate_email(self, value):
        # Basic email validation pattern
        pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(pattern, value):
            raise serializers.ValidationError("Please enter a valid email address")
        return value

    def validate_phone(self, value):
        if value:
            # Remove any non-digit characters
            cleaned = re.sub(r'\D', '', value)
            if len(cleaned) < 5:
                raise serializers.ValidationError("Phone number must be at least 5 digits")
        return value 