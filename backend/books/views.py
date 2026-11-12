from django.db.models import Q
from django.shortcuts import render
from rest_framework import generics, filters
from rest_framework.permissions import AllowAny

from .models import Book
from .serializers import BookSerializer


class BookListView(generics.ListAPIView):
    queryset = Book.objects.select_related('category').all()
    serializer_class = BookSerializer
    permission_classes = [AllowAny]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'author', 'category__name']
    ordering_fields = ['original_price', 'discount_price', 'created_at']
    ordering = ['-created_at']

    def get_queryset(self):
        queryset = super().get_queryset()
        category = self.request.query_params.get('category')
        min_price = self.request.query_params.get('min_price')
        max_price = self.request.query_params.get('max_price')
        q = self.request.query_params.get('q')

        if category:
            queryset = queryset.filter(category__slug=category)
        if min_price:
            queryset = queryset.filter(discount_price__gte=min_price)
        if max_price:
            queryset = queryset.filter(discount_price__lte=max_price)
        if q:
            queryset = queryset.filter(Q(title__icontains=q) | Q(author__icontains=q) | Q(category__name__icontains=q))
        return queryset


class BookDetailView(generics.RetrieveAPIView):
    queryset = Book.objects.select_related('category').all()
    serializer_class = BookSerializer
    permission_classes = [AllowAny]


class FeaturedBooksView(generics.ListAPIView):
    queryset = Book.objects.filter(is_featured=True).select_related('category')
    serializer_class = BookSerializer
    permission_classes = [AllowAny]


class BestSellingBooksView(generics.ListAPIView):
    queryset = Book.objects.filter(is_best_selling=True).select_related('category')
    serializer_class = BookSerializer
    permission_classes = [AllowAny]


class LatestBooksView(generics.ListAPIView):
    queryset = Book.objects.filter(is_latest=True).select_related('category')
    serializer_class = BookSerializer
    permission_classes = [AllowAny]
