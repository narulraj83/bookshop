from django.urls import path

from .views import AddToCartView, CartView, RemoveCartItemView, UpdateCartItemView

urlpatterns = [
    path('', CartView.as_view(), name='cart'),
    path('add/', AddToCartView.as_view(), name='add-to-cart'),
    path('update/<int:item_id>/', UpdateCartItemView.as_view(), name='update-cart-item'),
    path('remove/<int:item_id>/', RemoveCartItemView.as_view(), name='remove-cart-item'),
]
