from rest_framework import serializers
from .models import Contact
from django.core.validators import RegexValidator

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
        if not value:  # Skip validation if phone is empty
            return value
            
        # Remove any non-digit characters except '+'
        cleaned = ''.join(c for c in value if c.isdigit() or c == '+')
        
        # Validate the cleaned phone number
        validator = RegexValidator(
            regex=r'^\+?1?\d{9,15}$',
            message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed."
        )
        validator(cleaned)
        return cleaned 