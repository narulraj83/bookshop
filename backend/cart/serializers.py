from rest_framework import serializers

from books.models import Book
from .models import Cart, CartItem


class CartItemSerializer(serializers.ModelSerializer):
    book_id = serializers.IntegerField(source='book.id', read_only=True)
    book_title = serializers.CharField(source='book.title', read_only=True)
    book_cover = serializers.ImageField(source='book.cover_image', read_only=True)
    unit_price = serializers.DecimalField(source='book.discount_price', max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = CartItem
        fields = ['id', 'book_id', 'book_title', 'book_cover', 'quantity', 'unit_price', 'subtotal']
        read_only_fields = ['id', 'book_id', 'book_title', 'book_cover', 'unit_price', 'subtotal']


class AddToCartSerializer(serializers.Serializer):
    book_id = serializers.IntegerField()
    quantity = serializers.IntegerField(min_value=1, default=1)

    def validate_book_id(self, value):
        try:
            Book.objects.get(pk=value)
        except Book.DoesNotExist:
            raise serializers.ValidationError('Book not found.')
        return value


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    total_items = serializers.SerializerMethodField()
    subtotal = serializers.SerializerMethodField()
    discount = serializers.SerializerMethodField()
    total = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = ['id', 'items', 'total_items', 'subtotal', 'discount', 'total']

    def get_total_items(self, obj):
        return sum(item.quantity for item in obj.items.all())

    def get_subtotal(self, obj):
        return sum((item.book.discount_price * item.quantity) for item in obj.items.all())

    def get_discount(self, obj):
        return sum(((item.book.original_price - item.book.discount_price) * item.quantity) for item in obj.items.all())

    def get_total(self, obj):
        return self.get_subtotal(obj)
