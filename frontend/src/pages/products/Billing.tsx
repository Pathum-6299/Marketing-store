import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, CreditCard, MapPin, Mail, Phone, User } from "lucide-react";
import { Product, BillingDetails } from "./types";
import config from "@/config";

interface BillingProps {
  product: Product;
  billingDetails: BillingDetails;
  onBillingChange: (details: BillingDetails) => void;
  onBack: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

const Billing = ({
  product,
  billingDetails,
  onBillingChange,
  onBack,
  onSubmit,
}: BillingProps) => {
  const handleChange = (field: keyof BillingDetails, value: string) => {
    onBillingChange({
      ...billingDetails,
      [field]: value,
    });
  };

  // Map nested product data to top-level variables
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
    <div className="max-w-4xl mx-auto">
      <div className="grid md:grid-cols-3 gap-8">
        {/* Billing Form */}
        <div className="md:col-span-2">
          <Card className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <Button variant="ghost" size="icon" onClick={onBack}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  Billing Details
                </h2>
                <p className="text-sm text-muted-foreground">
                  Please fill in your information to complete the order
                </p>
              </div>
            </div>

            <form onSubmit={onSubmit} className="space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Personal Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={billingDetails.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        value={billingDetails.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="john@example.com"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      value={billingDetails.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      placeholder="+1 (555) 123-4567"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Shipping Address */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Shipping Address
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Street Address *</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Textarea
                        id="address"
                        value={billingDetails.address}
                        onChange={(e) =>
                          handleChange("address", e.target.value)
                        }
                        placeholder="123 Main Street, Apt 4B"
                        className="pl-10 min-h-[80px]"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={billingDetails.city || ""}
                        onChange={(e) => handleChange("city", e.target.value)}
                        placeholder="New York"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">Zip Code</Label>
                      <Input
                        id="zipCode"
                        value={billingDetails.zipCode || ""}
                        onChange={(e) =>
                          handleChange("zipCode", e.target.value)
                        }
                        placeholder="10001"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        value={billingDetails.country || ""}
                        onChange={(e) =>
                          handleChange("country", e.target.value)
                        }
                        placeholder="United States"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Payment Method */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-primary" />
                  Payment Method
                </h3>
                <Card className="p-4 bg-muted/50 border-dashed">
                  <p className="text-sm text-muted-foreground">
                    Payment will be processed securely after order confirmation.
                    You'll receive an email with payment instructions.
                  </p>
                </Card>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 h-12 text-lg"
                size="lg"
              >
                Continue to Confirmation
              </Button>
            </form>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="md:col-span-1">
          <Card className="p-6 sticky top-4">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Order Summary
            </h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <img
                  src={productImage}
                  alt={productName}
                  className="w-20 h-20 object-cover rounded-lg"
                />

                <div className="flex-1">
                  <h4 className="font-semibold text-foreground text-sm mb-1">
                    {productName}
                  </h4>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {productDescription}
                  </p>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">${productPrice}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-foreground">Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span className="text-foreground">$0.00</span>
                </div>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="font-semibold text-foreground">Total</span>
                <span className="text-2xl font-bold text-primary">
                  ${productPrice}
                </span>
              </div>
              <div className="pt-2 border-t">
                <p className="text-xs text-muted-foreground text-center">
                  You'll earn{" "}
                  <span className="font-semibold text-accent">
                    {productPoints} points
                  </span>{" "}
                  from this purchase
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Billing;
