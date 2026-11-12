from decimal import Decimal

from django.shortcuts import get_object_or_404, render
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from books.models import Book
from cart.models import Cart
from .models import Order, OrderItem
from .serializers import OrderSerializer, PlaceOrderSerializer


class OrderListView(generics.ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user).order_by('-created_at')


class OrderDetailView(generics.RetrieveAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)


class CheckoutView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PlaceOrderSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        cart = get_object_or_404(Cart, user=request.user)
        total_amount = Decimal('0')
        order = Order.objects.create(
            user=request.user,
            customer_name=serializer.validated_data['customer_name'],
            email=serializer.validated_data['email'],
            mobile=serializer.validated_data['mobile'],
            address=serializer.validated_data['address'],
            city=serializer.validated_data['city'],
            state=serializer.validated_data['state'],
            pincode=serializer.validated_data['pincode'],
            payment_method=serializer.validated_data['payment_method'],
            total_amount=0,
        )
        for item in serializer.validated_data['cart_items']:
            book = Book.objects.get(pk=item['book_id'])
            quantity = int(item.get('quantity', 1))
            price = book.discount_price
            order_item = OrderItem.objects.create(order=order, book=book, quantity=quantity, price=price)
            total_amount += Decimal(str(order_item.subtotal))
        order.total_amount = total_amount
        order.save()
        cart.items.all().delete()
        return Response({'message': 'Order placed successfully.', 'order': OrderSerializer(order).data}, status=status.HTTP_201_CREATED)

# Create your views here.
