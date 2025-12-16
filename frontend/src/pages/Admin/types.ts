export interface Product {
  id: string;
  name: string;
  category?: string;
  type?: string;
  description: string;
  price: number;
  actual_price?: number;
  image: string;
  points: number;
  features?: string[];
  specifications?: { label: string; value: string }[];
}

export interface Order {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  points: number;
  referralCode: string;
  billingDetails: {
    name: string;
    email: string;
    address: string;
    city?: string;
    zipCode?: string;
    country?: string;
  };
  status: string;
  createdAt: string;
}

export interface Campaign {
  id: string;
  title: string;
  description?: string;
  platforms?: string[]; // e.g. ['facebook','twitter']
  images?: string[];
  active: boolean;
  createdAt: string;
}
