from django.urls import path

from .views import BestSellingBooksView, BookDetailView, BookListView, FeaturedBooksView, LatestBooksView

urlpatterns = [
    path('', BookListView.as_view(), name='book-list'),
    path('<int:pk>/', BookDetailView.as_view(), name='book-detail'),
    path('featured/', FeaturedBooksView.as_view(), name='featured-books'),
    path('best-selling/', BestSellingBooksView.as_view(), name='best-selling-books'),
    path('latest/', LatestBooksView.as_view(), name='latest-books'),
]
