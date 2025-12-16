import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import UserCampaigns from "./UserCampaigns";
import OffersSection from "@/components/OffersSection";
import { Store, Package, ShoppingBag, Award } from "lucide-react";
import { Product, Store as StoreType } from "./types";

const UserCampaignsPage = () => {
  const navigate = useNavigate();
  const [store, setStore] = useState<StoreType | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("campaigns");

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (role !== "user") {
      navigate("/auth");
      return;
    }

    const savedProducts = localStorage.getItem("adminProducts");
    if (savedProducts) setProducts(JSON.parse(savedProducts));

    const savedStore = localStorage.getItem("userStore");
    if (savedStore) {
      const storeData = JSON.parse(savedStore);
      setStore(storeData);
      setSelectedProducts(storeData.selectedProducts || []);
      setOrders(storeData.orders || []);
    }
  }, [navigate]);

  const navItems = [
    { id: "store", label: "My Store", icon: Store },
    {
      id: "products",
      label: "My Products",
      icon: Package,
      badge: selectedProducts.length,
    },
    {
      id: "orders",
      label: "My Orders",
      icon: ShoppingBag,
      badge: orders.length,
    },
    { id: "campaigns", label: "Campaigns", icon: Award },
    { id: "referral", label: "Referral & Points", icon: Award },
  ];

  return (
    <DashboardLayout
      title="My Dashboard"
      userRole="user"
      navItems={navItems}
      activeTab={activeTab}
      onTabChange={(tab) => {
        if (tab === "campaigns") return;
        // navigate back to main dashboard for other tabs
        if (tab === "store") navigate("/user");
        else if (tab === "products") navigate("/user");
        else if (tab === "orders") navigate("/user");
        else if (tab === "referral") navigate("/user");
      }}
    >
      <OffersSection store={store} />
      <UserCampaigns />
    </DashboardLayout>
  );
};

export default UserCampaignsPage;
