# Book Paradise Backend

This is the Django REST API backend for the Book Paradise online bookstore.

## Setup

1. Create a virtual environment and activate it.
2. Install dependencies:
   pip install -r requirements.txt
3. Create a MySQL database named `book_paradise`.
4. Copy `.env.example` to `.env` and update values.
5. Run migrations:
   python manage.py makemigrations
   python manage.py migrate
6. Load sample data:
   python manage.py loaddata categories/fixtures/sample_categories.json
   python manage.py loaddata books/fixtures/sample_books.json
7. Start the server:
   python manage.py runserver

## API Docs

Visit http://localhost:8000/api/docs/

## Default API Endpoints

- `/api/accounts/register/`
- `/api/accounts/login/`
- `/api/accounts/profile/`
- `/api/categories/`
- `/api/books/`
- `/api/books/featured/`
- `/api/books/best-selling/`
- `/api/books/latest/`
- `/api/cart/`
- `/api/orders/checkout/`
- `/api/orders/`
- `/api/contact/submit/`
