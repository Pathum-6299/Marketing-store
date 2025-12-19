export interface LeaderboardUser {
  id: string;
  rank: number;
  name: string;
  storeName: string;

  sales: number;
  earnings: number;
  conversionRate: number;
  rating: number;

  clicks: number;
  orders: number;
  commissionRate: number;
  topProduct: string;
  joinedAt: string;
}
