export interface Product {
  details: any;
  basic: any;
  id: string;
  name: string;
  category?: string;
  type?: string;
  description: string;
  price: number;
  actual_price?: number;
  image: string;
  images?: string[]; // Add this
  points: number;
  features?: string[]; // Add this
  specifications?: Array<{ label: string; value: string }>; // Add this
}
export interface BillingDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
  city?: string;
  zipCode?: string;
  country?: string;
}

export interface Order {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  points: number;
  referralCode: string;
  billingDetails: BillingDetails;
  status: string;
  createdAt: string;
}
