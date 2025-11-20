import { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ProductDetails from "./products/ProductDetails";
import Billing from "./products/Billing";
import Confirmation from "./products/Confirmation";
import { Product, BillingDetails, Order } from "./products/types";

type ViewState = "details" | "billing" | "confirmation";
const API_BASE_URL = "http://localhost:8000";
const ProductView = () => {
  const { productId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const referralCode = searchParams.get("ref");

  const [product, setProduct] = useState<Product | null>(null);
  const [viewState, setViewState] = useState<ViewState>("details");
  const [billingDetails, setBillingDetails] = useState<BillingDetails>({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    country: "",
  });
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}/user-store/products/${productId}`
        );
        if (!res.ok) throw new Error("Failed to fetch product");

        const data = await res.json();
        setProduct(data);
      } catch (error) {
        setProduct(null);
        console.error("Error loading product:", error);
        toast({
          title: "Error loading product",
          description: "Product not found or server error.",
          variant: "destructive",
        });
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    setViewState("billing");
  };

  const handleBillingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!product || !referralCode) return;

    try {
      // Create order payload for API
      const payload = {
        order_data: {
          product_id: product.basic.product_id,
          quantity: 1,
          total_price: product.details.price,
        },
        billing_data: billingDetails,
      };

      // Call API to create order
      const response = await fetch(`${API_BASE_URL}/orders/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to create order");
      }

      const apiOrderData = await response.json();
      console.log("Order created:", apiOrderData);

      // Create order object for local state
      const newOrder: Order = {
        id: apiOrderData.id || `ORD-${Date.now()}`,
        productId: product.basic.product_id,
        productName: product.basic.name,
        productImage: product.details.images?.[0] || product.image,
        price: product.details.price,
        points: product.details.points,
        referralCode,
        billingDetails,
        status: "pending",
        createdAt: new Date().toISOString(),
      };

      setOrder(newOrder);

      // Save order to admin orders (local storage backup)
      const adminOrders = JSON.parse(
        localStorage.getItem("adminOrders") || "[]"
      );
      adminOrders.push(newOrder);
      localStorage.setItem("adminOrders", JSON.stringify(adminOrders));

      // Update user store with order and points
      const allStores = JSON.parse(
        localStorage.getItem("allUserStores") || "{}"
      );
      const userStore = Object.values(allStores).find(
        (store: any) => store.referralCode === referralCode
      );

      if (userStore) {
        const storeData = userStore as any;
        storeData.totalOrders = (storeData.totalOrders || 0) + 1;
        storeData.totalPoints =
          (storeData.totalPoints || 0) + product.details.points;
        storeData.orders = storeData.orders || [];
        storeData.orders.push(newOrder);

        allStores[referralCode] = storeData;
        localStorage.setItem("allUserStores", JSON.stringify(allStores));

        // Update current user store if it matches
        const currentStore = localStorage.getItem("userStore");
        if (currentStore) {
          const current = JSON.parse(currentStore);
          if (current.referralCode === referralCode) {
            localStorage.setItem("userStore", JSON.stringify(storeData));
          }
        }
      }

      toast({
        title: "Order placed successfully!",
        description: "Your order has been received and is being processed.",
      });

      // Navigate to confirmation view
      setViewState("confirmation");
    } catch (error) {
      console.error("Error creating order:", error);
      toast({
        title: "Error",
        description: "Failed to place order. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Product not found
          </h2>
          <Button onClick={() => navigate("/")} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  if (!referralCode) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Invalid referral link
          </h2>
          <p className="text-muted-foreground mb-4">
            This product requires a valid referral code.
          </p>
          <Button onClick={() => navigate("/")} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => navigate("/")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            {viewState !== "details" && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span
                  className={
                    viewState === "billing" ? "text-primary font-semibold" : ""
                  }
                >
                  Billing
                </span>
                <span>/</span>
                <span
                  className={
                    viewState === "confirmation"
                      ? "text-primary font-semibold"
                      : ""
                  }
                >
                  Confirmation
                </span>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {viewState === "details" && (
          <ProductDetails
            product={product}
            referralCode={referralCode}
            onAddToCart={handleAddToCart}
          />
        )}

        {viewState === "billing" && (
          <Billing
            product={product}
            billingDetails={billingDetails}
            onBillingChange={setBillingDetails}
            onBack={() => setViewState("details")}
            onSubmit={handleBillingSubmit}
          />
        )}

        {viewState === "confirmation" && order && (
          <Confirmation
            order={order}
            product={product}
            billingDetails={billingDetails}
            onBackToHome={handleBackToHome}
          />
        )}
      </div>
    </div>
  );
};

export default ProductView;
