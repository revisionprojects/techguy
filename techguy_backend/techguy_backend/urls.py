from django.contrib import admin  # Import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from marketplace.views import ApplicationViewSet


# Create a router and register the ViewSet
router = DefaultRouter()
router.register(r'applications', ApplicationViewSet, basename='application')

urlpatterns = [
    path('admin/', admin.site.urls),  # This line uses the admin import
    path('api/', include(router.urls)),
]

# Serve media files during development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)