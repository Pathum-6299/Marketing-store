import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  Package,
  MapPin,
  Mail,
  Phone,
  Calendar,
  ArrowRight,
  Home,
  Copy,
  Download,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Product, BillingDetails, Order } from "./types";

interface ConfirmationProps {
  order: Order;
  product: Product;
  billingDetails: BillingDetails;
  onBackToHome: () => void;
}

const Confirmation = ({
  order,
  product,
  billingDetails,
  onBackToHome,
}: ConfirmationProps) => {
  const { toast } = useToast();

  const copyOrderId = () => {
    navigator.clipboard.writeText(order.id);
    toast({
      title: "Order ID copied!",
      description: "Order ID has been copied to clipboard",
    });
  };
  const productName = product.basic.name;
  const productType = product.basic.type;
  const productCategory = product.basic.category;

  const productDescription = product.details.description;
  const productPrice = product.details.price;
  const productPoints = product.details.points;
  const productImage =
    product.details.images && product.details.images.length > 0
      ? product.details.images[0]
      : "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400";

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Success Header */}
      <Card className="p-8 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-12 h-12 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Order Confirmed!
            </h1>
            <p className="text-muted-foreground">
              Thank you for your purchase. Your order has been received and is
              being processed.
            </p>
          </div>
          <div className="flex items-center justify-center gap-2 pt-4">
            <Badge variant="outline" className="bg-background">
              Order ID: {order.id}
            </Badge>
            <Button variant="ghost" size="icon" onClick={copyOrderId}>
              <Copy className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Order Details */}
        <div className="md:col-span-2 space-y-6">
          {/* Product Details */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Package className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">
                Order Details
              </h2>
            </div>
            <div className="flex gap-4">
              <img
                src={productImage}
                alt={productName}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">
                  {productName}
                </h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {productDescription}
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Quantity</p>
                    <p className="font-semibold text-foreground">1</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Price</p>
                    <p className="text-xl font-bold text-primary">
                      ${productPrice}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Points Earned</span>
              <Badge className="bg-accent/10 text-accent border-accent/20">
                +{product.points} points
              </Badge>
            </div>
          </Card>

          {/* Billing Information */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">
                Billing Information
              </h2>
            </div>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Full Name
                  </p>
                  <p className="font-medium text-foreground">
                    {billingDetails.name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                    <Mail className="w-3 h-3" />
                    Email
                  </p>
                  <p className="font-medium text-foreground">
                    {billingDetails.email}
                  </p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    Phone
                  </p>
                  <p className="font-medium text-foreground">
                    {billingDetails.phone}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Order Date
                  </p>
                  <p className="font-medium text-foreground">
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Shipping Address
                </p>
                <p className="font-medium text-foreground">
                  {billingDetails.address}
                </p>
                {(billingDetails.city ||
                  billingDetails.zipCode ||
                  billingDetails.country) && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {[
                      billingDetails.city,
                      billingDetails.zipCode,
                      billingDetails.country,
                    ]
                      .filter(Boolean)
                      .join(", ")}
                  </p>
                )}
              </div>
            </div>
          </Card>

          {/* Order Status */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-foreground">
                Order Status
              </h2>
              <Badge className="bg-primary/10 text-primary border-primary/20">
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </Badge>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Order Placed</p>
                  <p className="text-sm text-muted-foreground">
                    Your order has been received
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 opacity-50">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                  <Package className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Processing</p>
                  <p className="text-sm text-muted-foreground">
                    Your order is being prepared
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 opacity-50">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                  <ArrowRight className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Shipped</p>
                  <p className="text-sm text-muted-foreground">
                    Your order is on the way
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Summary Sidebar */}
        <div className="space-y-6">
          <Card className="p-6 sticky top-4">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Order Summary
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground">$ ${productPrice}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-foreground">Free</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax</span>
                <span className="text-foreground">$0.00</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="font-semibold text-foreground">Total</span>
                <span className="text-2xl font-bold text-primary">
                  ${productPrice}
                </span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              What's Next?
            </h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>• You'll receive an email confirmation shortly</p>
              <p>• We'll send tracking information once your order ships</p>
              <p>• Expected delivery: 3-5 business days</p>
            </div>
          </Card>

          <div className="flex flex-col gap-3">
            <Button
              onClick={onBackToHome}
              className="w-full bg-primary hover:bg-primary/90"
              size="lg"
            >
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <Button variant="outline" className="w-full" size="lg">
              <Download className="w-4 h-4 mr-2" />
              Download Receipt
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
