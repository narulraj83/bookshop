from django.shortcuts import render, get_object_or_404
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from books.models import Book
from .models import Cart, CartItem
from .serializers import AddToCartSerializer, CartSerializer


class CartView(generics.RetrieveAPIView):
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        cart, _ = Cart.objects.get_or_create(user=self.request.user)
        return cart


class AddToCartView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = AddToCartSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        book = get_object_or_404(Book, id=serializer.validated_data['book_id'])
        cart, _ = Cart.objects.get_or_create(user=request.user)
        cart_item, created = CartItem.objects.get_or_create(cart=cart, book=book)
        if not created:
            cart_item.quantity += serializer.validated_data['quantity']
        else:
            cart_item.quantity = serializer.validated_data['quantity']
        cart_item.save()
        return Response({'message': 'Book added to cart.', 'cart': CartSerializer(cart).data}, status=status.HTTP_200_OK)


class UpdateCartItemView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, item_id):
        cart = get_object_or_404(Cart, user=request.user)
        cart_item = get_object_or_404(CartItem, id=item_id, cart=cart)
        quantity = int(request.data.get('quantity', cart_item.quantity))
        if quantity <= 0:
            cart_item.delete()
            return Response({'message': 'Item removed from cart.'}, status=status.HTTP_200_OK)
        cart_item.quantity = quantity
        cart_item.save()
        return Response({'message': 'Cart updated.', 'cart': CartSerializer(cart).data}, status=status.HTTP_200_OK)


class RemoveCartItemView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, item_id):
        cart = get_object_or_404(Cart, user=request.user)
        cart_item = get_object_or_404(CartItem, id=item_id, cart=cart)
        cart_item.delete()
        return Response({'message': 'Item removed from cart.', 'cart': CartSerializer(cart).data}, status=status.HTTP_200_OK)
