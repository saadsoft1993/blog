from datetime import datetime, timedelta
from django.db.models import Count, Q
from rest_framework import mixins, permissions
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import GenericViewSet
from rest_framework_simplejwt.views import TokenObtainPairView
from article.api.serializer import ArticleSerializer, WriterSerializer, UserSerializer, CustomTokenObtainPairSerializer
from article.models import Article
from writer.models import Writer


class ArticleViewSet(mixins.CreateModelMixin, mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin,
                     GenericViewSet):
    serializer_class = ArticleSerializer
    queryset = Article.objects.all()
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        article = serializer.save()
        article.written_by = self.request.user
        article.save()

    def perform_update(self, serializer):
        article = serializer.save()
        article.edited_by = self.request.user
        article.save()


class CreateUserView(CreateAPIView):
    model = Writer
    permission_classes = [permissions.AllowAny]
    serializer_class = UserSerializer


class WriterListViewSet(mixins.ListModelMixin, GenericViewSet):
    serializer_class = WriterSerializer
    queryset = Writer.objects.all()
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        date = datetime.now() - timedelta(days=30)
        return Writer.objects.all().prefetch_related('writer').annotate(
            last_30_days=Count('writer', filter=Q(writer__created_at__gte=date)))


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
