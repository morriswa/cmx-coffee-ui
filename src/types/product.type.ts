
export type Product = {
  product_id: number,
  product_name: string,
  description?: string,
  price: number,
  decaf?: string,
  flavored?: string
  single_origin?: string
  first_image?: string;
}

export type CartItem = {
  product_id: number,
  quantity: number,
  product_name: string,
  description?: string,
  vendor_name: string,
  sale_price: number
}

export type OrderItem = {
  product_id: number,
  product_name: string,
  quantity: number,
  each_price: number
  vendor_id: number,
  vendor_name: string,
}

export type Order = {
  order_id: string;
  payment_id: string;
  payment_status: string;
  status: string;
  subtotal: number;
  tax_rate: number;
  tax: number;
  total: number;
  items: OrderItem[]
}

export type ProductReviewStats = {
  average_review_score?: number;
  review_count: number;
}
