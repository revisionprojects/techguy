from rest_framework.viewsets import ModelViewSet
from .models import Application
from .serializers import ApplicationSerializer
from rest_framework.filters import SearchFilter
from rest_framework.decorators import action
from rest_framework.response import Response

class ApplicationViewSet(ModelViewSet):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    filter_backends = [SearchFilter]
    search_fields = ['name', 'description']  # Fields to filter on

    @action(detail=False, methods=['get'])
    def search(self, request):
        query = request.query_params.get('q', '')
        if query:
            filtered_apps = self.queryset.filter(name__icontains=query)
            serializer = self.get_serializer(filtered_apps, many=True)
            return Response(serializer.data)
        return Response([])