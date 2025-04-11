from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .models import Contact
from .serializers import ContactSerializer
from django.core.mail import send_mail
from django.conf import settings
from django.template.loader import render_to_string

# Create your views here.

class ContactCreateView(generics.CreateAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer

    def create(self, request, *args, **kwargs):
        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            contact = serializer.save()
            
            # Send email notification
            subject = f'New Contact Form Submission from {contact.name}'
            message = render_to_string('contact/email_notification.txt', {
                'name': contact.name,
                'email': contact.email,
                'phone': contact.phone,
                'message': contact.message,
            })
            
            send_mail(
                subject=subject,
                message=message,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=['nikola.b.georgiev.2021@elsys-bg.org'],
                fail_silently=False,
            )
            
            headers = self.get_success_headers(serializer.data)
            return Response(
                {"message": "Thank you for contacting us. We will get back to you soon."},
                status=status.HTTP_201_CREATED,
                headers=headers
            )
        except Exception as e:
            return Response(
                {"error": "An error occurred while processing your request. Please try again later."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class ContactListView(generics.ListAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
