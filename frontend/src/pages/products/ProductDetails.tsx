import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ShoppingCart,
  Star,
  CheckCircle2,
  Package,
  Truck,
  Shield,
  TrendingUp,
  Heart,
  Share2,
} from "lucide-react";
import { Product } from "./types";
import AuthModal from "@/components/AuthModal";

interface ProductDetailsProps {
  product: Product;
  referralCode: string;
  onAddToCart: () => void;
}

const ProductDetails = ({
  product,
  referralCode,
  onAddToCart,
}: ProductDetailsProps) => {
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [imageError, setImageError] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const productImages =
    product.details.images && product.details.images.length > 0
      ? product.details.images
      : [
          product.basic.image ||
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
        ];

  const features =
    product.details.features && product.details.features.length > 0
      ? product.details.features
      : [
          "Premium Quality Materials",
          "Fast Shipping Available",
          "30-Day Money Back Guarantee",
          "Secure Payment Processing",
          "24/7 Customer Support",
          "Eco-Friendly Packaging",
        ];

  const specifications =
    product.details.specifications && product.details.specifications.length > 0
      ? product.details.specifications
      : [
          { label: "Material", value: "Premium Quality" },
          { label: "Dimensions", value: "Standard Size" },
          { label: "Weight", value: "Lightweight" },
          { label: "Warranty", value: "1 Year" },
          { label: "Shipping", value: "Worldwide" },
          { label: "Return Policy", value: "30 Days" },
        ];

  const productName = product.basic.name;
  const productDescription = product.details.description;
  const productPrice = product.details.price;
  const productPoints = product.details.points;

  const handlePlaceOrder = () => {
    const isAuth = localStorage.getItem("is_auth") === "true";
    if (!isAuth) {
      setAuthModalOpen(true);
      return;
    }
    onAddToCart();
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Main Product Section */}
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          <Card className="overflow-hidden p-4">
            <div className="aspect-square w-full rounded-lg overflow-hidden bg-muted">
              {!imageError ? (
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  <Package className="w-16 h-16" />
                </div>
              )}
            </div>
          </Card>

          {/* Thumbnail Gallery */}
          <div className="grid grid-cols-3 gap-3">
            {productImages.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(img)}
                className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                  selectedImage === img
                    ? "border-primary ring-2 ring-primary/20"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <img
                  src={img}
                  alt={`${product.name} view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Badge
                variant="outline"
                className="bg-accent/10 text-accent border-accent/20"
              >
                <TrendingUp className="w-3 h-3 mr-1" />
                Best Seller
              </Badge>
              <Badge variant="outline">
                <Star className="w-3 h-3 mr-1 fill-accent text-accent" />
                4.9 (120 reviews)
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {productName}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
              {product.description}
            </p>
          </div>

          <Separator />

          {/* Price Section */}
          <div className="space-y-4">
            <div className="flex items-baseline gap-3">
              <span className="text-5xl font-bold text-primary">
                ${productPrice}
              </span>
              <Badge className="bg-accent/10 text-accent border-accent/20">
                Earn {productPoints} points
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Referred by:{" "}
              <span className="font-semibold text-primary">{referralCode}</span>
            </p>
          </div>

          <Separator />

          {/* Features List */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Key Features</h3>
            <div className="grid grid-cols-2 gap-2">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handlePlaceOrder}
              className="w-full bg-primary hover:bg-primary/90 h-14 text-lg"
              size="lg"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Place Order Now
            </Button>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="w-full">
                <Heart className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" className="w-full">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t">
            <div className="text-center">
              <Truck className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-xs text-muted-foreground">Free Shipping</p>
            </div>
            <div className="text-center">
              <Shield className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-xs text-muted-foreground">Secure Payment</p>
            </div>
            <div className="text-center">
              <Package className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-xs text-muted-foreground">Easy Returns</p>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Description Section */}
      <Card className="p-8">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Product Description
        </h2>
        <div className="prose prose-sm max-w-none">
          <p className="text-muted-foreground leading-relaxed mb-4">
            {productDescription}
          </p>
        </div>
      </Card>

      {/* Specifications Section */}
      <Card className="p-8">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Specifications
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          {specifications.map((spec, index) => (
            <div
              key={index}
              className="flex justify-between items-center py-3 border-b last:border-0"
            >
              <span className="text-muted-foreground font-medium">
                {spec.label}
              </span>
              <span className="text-foreground font-semibold">
                {spec.value}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Auth Modal - shown when user clicks Place Order without being logged in */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onAuthSuccess={() => {
          setAuthModalOpen(false);
          onAddToCart();
        }}
      />
    </div>
  );
};

export default ProductDetails;
