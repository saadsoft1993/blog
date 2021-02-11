from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from article.models import Article
from writer.models import Writer


class ArticleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Article
        fields = ['id', 'title', 'content', 'written_by', 'edited_by', 'status']


class WriterSerializer(serializers.ModelSerializer):
    article = serializers.IntegerField(source='writer.count', read_only=True)
    last_30_days = serializers.IntegerField()

    class Meta:
        model = Writer
        fields = ['id', 'username', 'article', 'last_30_days']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Writer
        fields = ['id', 'name', 'username', 'password', 'is_editor']
        read_only_fields = ('id',)

    def create(self, validated_data):
        user = Writer.objects.create(
            username=validated_data['username'],
            name=validated_data['name'],
            is_editor=validated_data['is_editor']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super(CustomTokenObtainPairSerializer, self).validate(attrs)
        data.update({'is_editor': self.user.is_editor})
        data.update({'id': self.user.id})
        return data
