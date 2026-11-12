# Book Paradise

Book Paradise is a full-stack online bookstore built with Django REST Framework for the backend and Angular for the frontend. It includes product browsing, category filters, cart management, checkout, user authentication, contact forms, and order history.

## Tech Stack

- Backend: Python 3.11, Django 5, Django REST Framework, JWT auth
- Frontend: Angular 21, TypeScript, Bootstrap 5
- Database: MySQL-ready configuration with SQLite fallback for local development

## Project Structure

- `backend/` - Django REST API project
- `frontend/` - Angular storefront application

## Features

- User registration and login with JWT authentication
- Book listing with search, filters, sorting, and pagination
- Category-based browsing
- Add to cart, update quantity, remove items
- Checkout and order placement
- User profile and password change
- Contact enquiry form
- OpenAPI schema and Swagger docs

## Backend Setup

1. Open a terminal in the project root.
2. Activate the virtual environment:
   ```powershell
   .\.venv\Scripts\Activate.ps1
   ```
3. Go to the backend folder:
   ```powershell
   cd backend
   ```
4. Install dependencies:
   ```powershell
   python -m pip install -r requirements.txt
   ```
5. Copy the environment example file if needed and update values:
   ```powershell
   copy .env.example .env
   ```
6. Run database migrations:
   ```powershell
   python manage.py migrate
   ```
7. Load sample data:
   ```powershell
   python manage.py loaddata categories/fixtures/sample_categories.json
   python manage.py loaddata books/fixtures/sample_books.json
   ```
8. Start the backend server:
   ```powershell
   python manage.py runserver 0.0.0.0:8000
   ```

Backend API docs:
- http://localhost:8000/api/docs/
- http://localhost:8000/api/schema/

## Frontend Setup

1. Open a new terminal.
2. Go to the frontend folder:
   ```powershell
   cd frontend
   ```
3. Install dependencies:
   ```powershell
   npm install
   ```
4. Start Angular:
   ```powershell
   npm start -- --host 0.0.0.0 --port 4200
   ```

Frontend app:
- http://localhost:4200

## Default Admin / Login

You can create a user from the Angular registration page or use Django admin if needed.

## Environment Notes

The backend uses environment variables from `.env` at the project root and `backend/.env` depending on your setup. A sample config is included in:

- `.env.example`
- `backend/.env.example`

## GitHub

Repository:
- https://github.com/narulraj83/bookshop.git
