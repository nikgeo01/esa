from django.db import models
from django.core.validators import MinLengthValidator, RegexValidator

# Create your models here.

class Contact(models.Model):
    name = models.CharField(
        max_length=100,
        validators=[MinLengthValidator(2, "Name must be at least 2 characters long")]
    )
    email = models.EmailField(
        db_index=True,  # Add index for email lookups
        unique=True,    # Prevent duplicate submissions from same email
    )
    phone = models.CharField(
        max_length=20,
        blank=True,
        validators=[
            RegexValidator(
                regex=r'^\+?1?\d{9,15}$',
                message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed."
            )
        ]
    )
    message = models.TextField(
        validators=[MinLengthValidator(10, "Message must be at least 10 characters long")]
    )
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)  # Add index for sorting
    is_read = models.BooleanField(default=False, db_index=True)  # Add index for filtering

    def __str__(self):
        return f"{self.name} - {self.email}"

    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['email', 'created_at']),
            models.Index(fields=['is_read', 'created_at']),
        ]
