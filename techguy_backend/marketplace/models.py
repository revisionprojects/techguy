from django.db import models

class Application(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    link = models.URLField()
    image = models.ImageField(upload_to='application_images/', blank=True, null=True)  # Add image field

    def __str__(self):
        return self.name