from rest_framework import serializers

from categories.serializers import CategorySerializer
from .models import Book


class BookSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    category_name = serializers.SerializerMethodField()
    cover_image = serializers.ImageField(required=False, allow_null=True)

    class Meta:
        model = Book
        fields = [
            'id', 'title', 'author', 'category', 'category_name', 'description', 'isbn',
            'cover_image', 'original_price', 'discount_price', 'stock', 'rating',
            'is_featured', 'is_best_selling', 'is_latest', 'created_at'
        ]

    def get_category_name(self, obj):
        return obj.category.name
