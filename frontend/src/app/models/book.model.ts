export interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  category: { id: number; name: string; slug: string };
  original_price: number;
  discount_price: number;
  stock: number;
  rating: number;
  cover_image?: string;
  isbn: string;
  is_featured?: boolean;
  is_best_selling?: boolean;
  is_latest?: boolean;
}

export interface PaginatedBooks {
  count: number;
  next: string | null;
  previous: string | null;
  results: Book[];
}
