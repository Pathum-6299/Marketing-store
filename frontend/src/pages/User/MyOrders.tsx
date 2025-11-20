import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import {
  ShoppingBag,
  Calendar,
  User,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import { Order } from "./types";

const API_BASE_URL = "http://localhost:8000";

const MyOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/orders/all`);
        if (!res.ok) throw new Error("Failed to fetch orders");

        const data = await res.json();
        console.log("Fetched orders:", data);
        setOrders(data);
      } catch (error) {
        console.error("Error loading orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <Card className="p-12 text-center">
        <p className="text-muted-foreground">Loading your orders...</p>
      </Card>
    );
  }

  if (orders.length === 0) {
    return (
      <Card className="p-12 text-center">
        <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
        <p className="text-muted-foreground">
          No orders yet. Share your product links to start earning!
        </p>
      </Card>
    );
  }

  // 🧮 Calculate totals
  const totalEarnings = orders.reduce(
    (sum, order) => sum + (order.total_price || 0),
    0
  );
  const totalPoints = orders.reduce(
    (sum, order) => sum + (order.points || 0),
    0
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Orders from My Referrals
        </h2>
        <p className="text-muted-foreground">
          Track all orders made through your referral links
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Revenue</p>
              <p className="text-xl font-bold text-foreground">
                ${totalEarnings.toFixed(2)}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Points</p>
              <p className="text-xl font-bold text-foreground">{totalPoints}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map((order) => (
          <Card
            key={order.id}
            className="p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="flex justify-between items-start mb-3">
                  {/* 🖼️ Product Image Section */}
                  {order.product_details?.images &&
                    order.product_details.images.length > 0 && (
                      <div className="mb-4">
                        <img
                          src={order.product_details.images[0]}
                          alt="Product"
                          className="w-48 max-h-48 object-cover rounded-lg border"
                        />
                      </div>
                    )}
                  <div>
                    <h3 className="font-semibold text-foreground text-lg mb-1">
                      Product ID: {order.product_id}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Order ID: {order.id}
                    </p>
                  </div>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold
      ${
        order.status === "pending"
          ? "bg-yellow-100 text-yellow-800"
          : order.status === "completed"
          ? "bg-green-100 text-green-800"
          : order.status === "cancelled"
          ? "bg-red-100 text-red-800"
          : "bg-gray-100 text-gray-700"
      }
    `}
                  >
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </span>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary mb-1">
                      ${order.total_price.toFixed(2)}
                    </div>
                  </div>
                  {/* Stylish Status Badge */}
                </div>
                <div className="grid md:grid-cols-2 gap-4 mt-4 pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Customer:</span>
                    <span className="font-medium text-foreground">
                      {order.billing_details?.name || "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Date:</span>
                    <span className="font-medium text-foreground">
                      {new Date(order.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
