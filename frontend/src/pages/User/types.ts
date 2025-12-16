export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  points: number;
}

export interface Order {
  product_details: any;
  status: string;
  created_at: string | number | Date;
  billing_details: any;
  product_id: ReactNode;
  total_price: any;
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  points: number;
  billingDetails: {
    name: string;
    email: string;
    address: string;
  };
  createdAt: string;
}

export interface Store {
  name: string;
  referralCode: string;
  selectedProducts: string[];
  totalPoints: number;
  totalOrders: number;
  orders: Order[];
}

export interface Campaign {
  id: string;
  title: string;
  description?: string;
  platforms?: string[];
  images?: string[];
  active: boolean;
  createdAt: string;
}
