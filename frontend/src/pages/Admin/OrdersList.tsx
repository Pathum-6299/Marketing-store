import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingBag,
  Calendar,
  User,
  Mail,
  MapPin,
  Package,
  DollarSign,
} from "lucide-react";

interface Order {
  id: number;
  product_id: string;
  quantity: number;
  total_price: number;
  status: string;
  created_at: string;
  billing_details: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    zip_code: string;
    country: string;
  } | null;
  product_details?: {
    id: number;
    images: string[];
  } | null;
}

const API_BASE_URL = "http://localhost:8000";

const AdminOrdersList = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/orders/all`);
        if (!res.ok) throw new Error("Failed to fetch orders");
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <Card className="p-12 text-center">
        <p className="text-muted-foreground">Loading orders...</p>
      </Card>
    );
  }

  if (orders.length === 0) {
    return (
      <Card className="p-12 text-center">
        <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
        <p className="text-muted-foreground">No orders found</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <Card
          key={order.id}
          className="p-6 hover:shadow-lg transition-shadow border border-border"
        >
          {/* 🖼️ Product Image */}
          {order.product_details?.images &&
            order.product_details.images.length > 0 && (
              <div className="mb-4">
                <img
                  src={order.product_details.images[0]}
                  alt="Product"
                  className="w-56 max-h-56 object-cover rounded-lg border"
                />
              </div>
            )}

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <div>
              <h3 className="font-semibold text-foreground text-lg flex items-center gap-2">
                <Package className="w-4 h-4 text-muted-foreground" />
                Product ID: {order.product_id}
              </h3>
              <p className="text-sm text-muted-foreground">
                Order ID: #{order.id}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Quantity: {order.quantity}
              </p>
            </div>

            {/* 💰 Price + Status */}
            <div className="text-right mt-4 md:mt-0">
              <div className="text-2xl font-bold text-primary flex items-center gap-1 justify-end">
                <DollarSign className="w-4 h-4" />
                {order.total_price.toFixed(2)}
              </div>
              <Badge
                className={`mt-2 capitalize px-3 py-1 rounded-full font-semibold text-xs ${
                  order.status === "pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : order.status === "completed"
                    ? "bg-green-100 text-green-800"
                    : order.status === "cancelled"
                    ? "bg-red-100 text-red-800"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {order.status}
              </Badge>
            </div>
          </div>

          {/* 🧾 Billing Info */}
          {order.billing_details && (
            <div className="grid md:grid-cols-2 gap-4 mt-4 pt-4 border-t">
              <div>
                <div className="flex items-center gap-2 text-sm mb-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Customer:</span>
                  <span className="font-medium text-foreground">
                    {order.billing_details.name}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {order.billing_details.email}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm mt-1">
                  <span className="text-muted-foreground">
                    {order.billing_details.phone}
                  </span>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 text-sm mb-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {new Date(order.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-muted-foreground">Shipping Address</p>
                    <p className="text-foreground">
                      {order.billing_details.address}
                    </p>
                    {[
                      order.billing_details.city,
                      order.billing_details.zip_code,
                      order.billing_details.country,
                    ].filter(Boolean).length > 0 && (
                      <p className="text-muted-foreground text-xs mt-1">
                        {[
                          order.billing_details.city,
                          order.billing_details.zip_code,
                          order.billing_details.country,
                        ]
                          .filter(Boolean)
                          .join(", ")}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
};

export default AdminOrdersList;
