from django.core.mail import send_mail
from django.conf import settings
from django.template.loader import render_to_string
import logging

logger = logging.getLogger(__name__)

def send_contact_notification(contact):
    """
    Send email notification for a new contact form submission.
    Returns True if email was sent successfully, False otherwise.
    """
    try:
        subject = f'New Contact Form Submission from {contact.name}'
        message = render_to_string('contact/email_notification.txt', {
            'name': contact.name,
            'email': contact.email,
            'phone': contact.phone,
            'message': contact.message,
        })
        
        recipient_list = [settings.EMAIL_HOST_USER]  # Send to the configured email
        if hasattr(settings, 'CONTACT_NOTIFICATION_EMAILS'):
            recipient_list.extend(settings.CONTACT_NOTIFICATION_EMAILS)
        
        send_mail(
            subject=subject,
            message=message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=recipient_list,
            fail_silently=False,
        )
        logger.info("Contact notification email sent successfully")
        return True
    except Exception as e:
        logger.error(f"Failed to send contact notification email: {str(e)}", exc_info=True)
        return False 