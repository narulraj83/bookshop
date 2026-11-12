from rest_framework import serializers

from books.models import Book
from .models import Order, OrderItem


class OrderItemSerializer(serializers.ModelSerializer):
    book_title = serializers.SerializerMethodField()
    book_cover = serializers.SerializerMethodField()

    class Meta:
        model = OrderItem
        fields = ['id', 'book', 'book_title', 'book_cover', 'quantity', 'price', 'subtotal']
        read_only_fields = ['id', 'book_title', 'book_cover', 'subtotal']

    def get_book_title(self, obj):
        return obj.book.title

    def get_book_cover(self, obj):
        return obj.book.cover_image.url if obj.book.cover_image else None


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'customer_name', 'email', 'mobile', 'address', 'city', 'state', 'pincode', 'payment_method', 'total_amount', 'status', 'created_at', 'items']
        read_only_fields = ['id', 'status', 'created_at', 'items']


class PlaceOrderSerializer(serializers.Serializer):
    customer_name = serializers.CharField(max_length=255)
    email = serializers.EmailField()
    mobile = serializers.CharField(max_length=20)
    address = serializers.CharField()
    city = serializers.CharField(max_length=100)
    state = serializers.CharField(max_length=100)
    pincode = serializers.CharField(max_length=20)
    payment_method = serializers.ChoiceField(choices=[('Cash on Delivery', 'Cash on Delivery'), ('Card', 'Card'), ('UPI', 'UPI'), ('Net Banking', 'Net Banking')])
    cart_items = serializers.ListField(child=serializers.DictField(), allow_empty=False)

    def validate_cart_items(self, value):
        if not value:
            raise serializers.ValidationError('Cart is empty.')
        for item in value:
            book_id = item.get('book_id')
            quantity = item.get('quantity', 1)
            if not Book.objects.filter(id=book_id).exists():
                raise serializers.ValidationError(f'Book with id {book_id} not found.')
            if quantity <= 0:
                raise serializers.ValidationError('Quantity must be positive.')
        return value
