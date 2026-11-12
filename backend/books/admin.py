from django.contrib import admin

from .models import Book


@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'category', 'discount_price', 'stock', 'is_featured', 'is_best_selling', 'is_latest')
    list_filter = ('category', 'is_featured', 'is_best_selling', 'is_latest')
    search_fields = ('title', 'author', 'isbn')
