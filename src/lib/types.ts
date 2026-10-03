export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  price: number;
  compare_at_price?: number | null;
  unit: string;
  stock: number;
  featured: boolean;
  active: boolean;
  image_emoji: string;
  image_url?: string | null;
};

export type CartItem = Product & { quantity: number };

export type Order = {
  id: string;
  order_number: string;
  status: "placed" | "confirmed" | "preparing" | "shipped" | "delivered" | "cancelled";
  total: number;
  created_at: string;
  customer_name?: string;
  item_count?: number;
};
