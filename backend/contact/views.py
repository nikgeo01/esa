from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import Contact
from .serializers import ContactSerializer
from .utils import send_contact_notification
import logging

# Configure logging
logger = logging.getLogger(__name__)

# Create your views here.

class ContactCreateView(generics.CreateAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer

    def create(self, request, *args, **kwargs):
        try:
            logger.info("Received contact form submission")
            
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            contact = serializer.save()
            
            # Send email notification
            email_sent = send_contact_notification(contact)
            
            response_data = {
                "message": "Thank you for contacting us. We will get back to you soon.",
                "email_sent": email_sent
            }
            
            if not email_sent:
                logger.warning("Contact saved but email notification failed")
                response_data["warning"] = "Your message was saved but we couldn't send a notification email."
            
            headers = self.get_success_headers(serializer.data)
            return Response(response_data, status=status.HTTP_201_CREATED, headers=headers)
            
        except Exception as e:
            logger.error(f"Error in contact form submission: {str(e)}", exc_info=True)
            return Response(
                {"error": "An error occurred while processing your request. Please try again later."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class ContactListView(generics.ListAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        queryset = super().get_queryset()
        # Add filtering options
        is_read = self.request.query_params.get('is_read')
        if is_read is not None:
            queryset = queryset.filter(is_read=is_read.lower() == 'true')
        return queryset
