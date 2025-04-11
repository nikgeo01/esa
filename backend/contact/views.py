from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .models import Contact
from .serializers import ContactSerializer
from django.core.mail import send_mail
from django.conf import settings
from django.template.loader import render_to_string
import logging
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# Configure logging
logger = logging.getLogger(__name__)

# Create your views here.

class ContactCreateView(generics.CreateAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer

    def create(self, request, *args, **kwargs):
        try:
            logger.info("Received contact form submission")
            logger.debug(f"Request data: {request.data}")
            
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            contact = serializer.save()
            logger.info(f"Contact saved successfully: {contact}")
            
            # Send email notification
            subject = f'New Contact Form Submission from {contact.name}'
            message = render_to_string('contact/email_notification.txt', {
                'name': contact.name,
                'email': contact.email,
                'phone': contact.phone,
                'message': contact.message,
            })
            
            logger.info("Attempting to send email")
            logger.debug(f"Email settings: HOST={settings.EMAIL_HOST}, PORT={settings.EMAIL_PORT}, USER={settings.EMAIL_HOST_USER}")
            
            try:
                send_mail(
                    subject=subject,
                    message=message,
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=['nikola.b.georgiev.2021@elsys-bg.org'],
                    fail_silently=False,
                )
                logger.info("Email sent successfully")
            except smtplib.SMTPAuthenticationError as e:
                logger.error(f"SMTP Authentication Error: {str(e)}")
                return Response(
                    {"error": "Email service configuration error. Please contact the administrator."},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
            except Exception as e:
                logger.error(f"Email sending error: {str(e)}")
                # Still return success to user since the contact was saved
                logger.info("Contact saved but email failed to send")
            
            headers = self.get_success_headers(serializer.data)
            return Response(
                {"message": "Thank you for contacting us. We will get back to you soon."},
                status=status.HTTP_201_CREATED,
                headers=headers
            )
        except Exception as e:
            logger.error(f"Error in contact form submission: {str(e)}", exc_info=True)
            return Response(
                {"error": f"An error occurred: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class ContactListView(generics.ListAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
