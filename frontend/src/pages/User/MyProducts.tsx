import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check, ExternalLink, Eye, Package, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ProductBasic {
  id: number;
  product_id: string;
  category: string;
  name: string;
  type: string;
}

interface ProductDetails {
  id: number;
  products_id: number;
  description: string;
  specifications: any;
  images: string[];
  price: number;
  actual_price: number;
  profit: number;
  margin: number;
  points: number;
}

interface Product {
  basic: ProductBasic;
  details: ProductDetails;
}

interface Store {
  id: string;
  name: string;
  referralCode: string;
}

interface MyProductsProps {
  store: Store | null;
}

const API_BASE_URL = "http://localhost:8000";

const MyProducts = ({ store }: MyProductsProps) => {
  const { toast } = useToast();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [myStoreProducts, setMyStoreProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Mock user_id - replace with actual user authentication
  const userId = "user_123";

  useEffect(() => {
    fetchAllProducts();
    if (store) {
      fetchMyStoreProducts();
    }
  }, [store]);

  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/admin/products`);
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      setAllProducts(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load products",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchMyStoreProducts = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/user-store/my-products/${userId}`
      );
      if (!response.ok) throw new Error("Failed to fetch store products");
      const data = await response.json();
      setMyStoreProducts(data);
    } catch (error) {
      console.error("Error fetching store products:", error);
    }
  };

  const addProductToStore = async (productId: string) => {
    try {
      setActionLoading(productId);
      const response = await fetch(`${API_BASE_URL}/user-store/add-product`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          product_id: productId,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Failed to add product");
      }

      await fetchMyStoreProducts();
      toast({
        title: "Success",
        description: "Product added to your store",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setActionLoading(null);
    }
  };

  const removeProductFromStore = async (productId: string) => {
    try {
      setActionLoading(productId);
      const response = await fetch(
        `${API_BASE_URL}/user-store/remove-product/${userId}/${productId}`,
        { method: "DELETE" }
      );

      if (!response.ok) throw new Error("Failed to remove product");

      await fetchMyStoreProducts();
      toast({
        title: "Success",
        description: "Product removed from your store",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove product",
        variant: "destructive",
      });
    } finally {
      setActionLoading(null);
    }
  };

  const copyProductLink = (productId: string, productName: string) => {
    const referralCode = localStorage.getItem("referral_code") || "";
    const link = `${window.location.origin}/product/${productId}?ref=${referralCode}`;

    navigator.clipboard.writeText(link);
    toast({
      title: "Product link copied!",
      description: `Share this link for "${productName}" to earn points`,
    });
  };

  const viewProduct = (productId: string) => {
    const referralCode = localStorage.getItem("referral_code") || "";
    window.open(`/product/${productId}?ref=${referralCode}`, "_blank");
  };

  const openProductDetails = (product: Product) => {
    setSelectedProduct(product);
    setViewDialogOpen(true);
  };

  if (!store) {
    return (
      <Card className="p-12 text-center">
        <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
        <p className="text-muted-foreground">
          Create a store first to manage products
        </p>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card className="p-12 text-center">
        <Loader2 className="w-16 h-16 mx-auto mb-4 text-muted-foreground animate-spin" />
        <p className="text-muted-foreground">Loading products...</p>
      </Card>
    );
  }

  const myStoreProductIds = myStoreProducts.map((p) => p.basic.product_id);
  const availableProducts = allProducts.filter(
    (p) => !myStoreProductIds.includes(p.basic.product_id)
  );

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Product Management
        </h2>
        <p className="text-muted-foreground">
          Select products to add to your store, then manage and share them
        </p>
      </div>

      {/* My Store Products */}
      {myStoreProducts.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Package className="w-5 h-5" />
            My Store Products ({myStoreProducts.length})
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {myStoreProducts.map((product) => (
              <Card
                key={product.basic.product_id}
                className="overflow-hidden transition-all duration-300 ring-2 ring-primary"
              >
                <div className="relative">
                  <img
                    src={product.details.images?.[0] || "/placeholder.jpg"}
                    alt={product.basic.name}
                    className="w-full h-48 object-cover cursor-pointer"
                    onClick={() => openProductDetails(product)}
                  />
                  <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <Check className="w-5 h-5 text-primary-foreground" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-foreground mb-2">
                    {product.basic.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {product.details.description}
                  </p>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-bold text-primary">
                      ${product.details.price}
                    </span>
                    <span className="text-sm text-accent font-medium">
                      Earn {product.details.points} pts
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button
                      onClick={() => openProductDetails(product)}
                      variant="outline"
                      className="w-full"
                      size="sm"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        onClick={() =>
                          copyProductLink(
                            product.basic.product_id,
                            product.basic.name
                          )
                        }
                        variant="outline"
                        size="sm"
                        className="text-xs"
                      >
                        <Copy className="w-3 h-3 mr-1" />
                        Copy Link
                      </Button>
                      <Button
                        onClick={() => viewProduct(product.basic.product_id)}
                        variant="outline"
                        size="sm"
                        className="text-xs"
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Open
                      </Button>
                    </div>
                    <Button
                      onClick={() =>
                        removeProductFromStore(product.basic.product_id)
                      }
                      variant="ghost"
                      size="sm"
                      className="w-full text-destructive hover:text-destructive"
                      disabled={actionLoading === product.basic.product_id}
                    >
                      {actionLoading === product.basic.product_id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        "Remove from Store"
                      )}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Available Products */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Available Products ({availableProducts.length})
        </h3>
        {availableProducts.length === 0 ? (
          <Card className="p-12 text-center">
            <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">
              All products are already in your store
            </p>
          </Card>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {availableProducts.map((product) => (
              <Card
                key={product.basic.product_id}
                className="overflow-hidden transition-all duration-300 hover:ring-2 hover:ring-primary/50 cursor-pointer"
                onClick={() => addProductToStore(product.basic.product_id)}
              >
                <div className="relative">
                  <img
                    src={product.details.images?.[0] || "/placeholder.jpg"}
                    alt={product.basic.name}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-foreground mb-2">
                    {product.basic.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {product.details.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">
                      ${product.details.price}
                    </span>
                    <span className="text-sm text-accent font-medium">
                      Earn {product.details.points} pts
                    </span>
                  </div>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      addProductToStore(product.basic.product_id);
                    }}
                    className="w-full mt-3 bg-primary hover:bg-primary/90"
                    size="sm"
                    disabled={actionLoading === product.basic.product_id}
                  >
                    {actionLoading === product.basic.product_id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      "Add to Store"
                    )}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Product Details Dialog */}
      {selectedProduct && (
        <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedProduct.basic.name}</DialogTitle>
              <DialogDescription>
                Product details and sharing options
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <img
                src={selectedProduct.details.images?.[0] || "/placeholder.jpg"}
                alt={selectedProduct.basic.name}
                className="w-full h-64 object-cover rounded-lg"
              />
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {selectedProduct.basic.name}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {selectedProduct.details.description}
                </p>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Price</p>
                    <p className="text-2xl font-bold text-primary">
                      ${selectedProduct.details.price}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">
                      Points Earned
                    </p>
                    <p className="text-2xl font-bold text-accent">
                      {selectedProduct.details.points} pts
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() =>
                      copyProductLink(
                        selectedProduct.basic.product_id,
                        selectedProduct.basic.name
                      )
                    }
                    className="flex-1"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Product Link
                  </Button>
                  <Button
                    onClick={() =>
                      viewProduct(selectedProduct.basic.product_id)
                    }
                    variant="outline"
                    className="flex-1"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Product Page
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default MyProducts;
