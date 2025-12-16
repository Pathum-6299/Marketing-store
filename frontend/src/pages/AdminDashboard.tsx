import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus, Package, ShoppingBag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ProductsList from "./Admin/ProductsList";
import ProductEdit from "./Admin/ProductEdit";
import AddProduct from "./Admin/AddProduct";
import OrdersList from "./Admin/OrdersList";
import CampaignsList from "./Admin/CampaignsList";
import { Product, Order } from "./Admin/types";
import config from "@/config";

type ViewState = "list" | "add" | "edit" | "view";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [viewState, setViewState] = useState<ViewState>("list");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState("products");

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/admin/products`);
      if (!response.ok) throw new Error("Failed to fetch products");

      const data = await response.json();

      // Transform API response to Product format
      const transformedProducts: Product[] = data.map((item: any) => ({
        id: item.basic.id.toString(),
        name: item.basic.name,
        category: item.basic.category,
        type: item.basic.type,
        description: item.details.description || "",
        price: item.details.price,
        actual_price: item.details.actual_price,
        image:
          item.details.images && item.details.images.length > 0
            ? item.details.images[0]
            : "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
        points: item.details.points,
        specifications: item.details.specifications || [],
      }));

      setProducts(transformedProducts);
      localStorage.setItem(
        "adminProducts",
        JSON.stringify(transformedProducts)
      );
    } catch (error) {
      console.error("Error fetching products:", error);
      toast({
        title: "Error",
        description: "Failed to load products",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (role !== "admin") {
      navigate("/auth");
      return;
    }

    // Fetch products from API
    fetchProducts();

    const savedOrders = localStorage.getItem("adminOrders");
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, [navigate]);

  const handleAddProduct = async (productData: Omit<Product, "id">) => {
    try {
      // Prepare API payload
      const apiPayload = {
        name: productData.name,
        category: productData.category || "General",
        type: productData.type || "Product",
        description: productData.description,
        specifications: productData.specifications || [],
        images: productData.image ? [productData.image] : [],
        price: productData.price,
        actual_price: productData.actual_price || productData.price,
        points: productData.points,
      };

      const response = await fetch(`${config.apiBaseUrl}/admin/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiPayload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to add product");
      }

      const result = await response.json();

      // Refresh products list from API
      await fetchProducts();

      toast({
        title: "Product added!",
        description: "New product has been added to the catalog",
      });

      setViewState("list");
    } catch (error) {
      console.error("Error adding product:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to add product",
        variant: "destructive",
      });
    }
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setViewState("edit");
  };

  const handleSaveProduct = (updatedProduct: Product) => {
    const updatedProducts = products.map((p) =>
      p.id === updatedProduct.id ? updatedProduct : p
    );
    setProducts(updatedProducts);
    localStorage.setItem("adminProducts", JSON.stringify(updatedProducts));

    toast({
      title: "Product updated!",
      description: "Product has been successfully updated",
    });

    setViewState("list");
    setSelectedProduct(null);
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      // If you have a delete endpoint, call it here
      // await fetch(`${config.apiBaseUrl}/admin/products/${productId}`, { method: 'DELETE' });

      // For now, just remove from local state and refetch
      await fetchProducts();

      toast({
        title: "Product deleted!",
        description: "Product has been removed from the catalog",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive",
      });
    }
  };

  const handleViewProduct = (product: Product) => {
    toast({
      title: "View Product",
      description: `Viewing ${product.name}`,
    });
  };

  const renderProductsView = () => {
    if (viewState === "add") {
      return (
        <AddProduct
          onAdd={handleAddProduct}
          onCancel={() => setViewState("list")}
        />
      );
    }

    if (viewState === "edit" && selectedProduct) {
      return (
        <ProductEdit
          product={selectedProduct}
          onSave={handleSaveProduct}
          onCancel={() => {
            setViewState("list");
            setSelectedProduct(null);
          }}
        />
      );
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">
            Product Catalog
          </h2>
          <Button
            onClick={() => setViewState("add")}
            className="bg-primary hover:bg-primary/90"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </div>
        <ProductsList
          products={products}
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
          onView={handleViewProduct}
        />
      </div>
    );
  };

  const renderContent = () => {
    if (activeTab === "products") {
      return renderProductsView();
    }

    if (activeTab === "orders") {
      return (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">All Orders</h2>
          <OrdersList orders={orders} />
        </div>
      );
    }

    if (activeTab === "campaigns") {
      return <CampaignsList />;
    }

    return null;
  };

  const navItems = [
    {
      id: "products",
      label: "Products",
      icon: Package,
      badge: products.length,
    },
    {
      id: "orders",
      label: "Orders",
      icon: ShoppingBag,
      badge: orders.length,
    },
    {
      id: "campaigns",
      label: "Campaigns",
      icon: ShoppingBag,
      badge: orders.length,
    },
  ];

  return (
    <DashboardLayout
      title="Admin Dashboard"
      userRole="admin"
      navItems={navItems}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      headerActions={
        viewState === "list" &&
        activeTab === "products" && (
          <Button
            onClick={() => setViewState("add")}
            className="bg-primary hover:bg-primary/90"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        )
      }
    >
      {renderContent()}
    </DashboardLayout>
  );
};

export default AdminDashboard;
