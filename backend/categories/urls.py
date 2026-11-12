from django.urls import path

from .views import CategoryDetailView, CategoryListView

urlpatterns = [
    path('', CategoryListView.as_view(), name='category-list'),
    path('<slug:slug>/', CategoryDetailView.as_view(), name='category-detail'),
]
