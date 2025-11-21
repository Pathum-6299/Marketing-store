import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import MyStore from "./User/MyStore";
import MyProducts from "./User/MyProducts";
import MyOrders from "./User/MyOrders";
import ReferralPoints from "./User/ReferralPoints";
import { Store, Package, ShoppingBag, Award } from "lucide-react";
import { Product, Store as StoreType } from "./User/types";
import OffersSection from "@/components/OffersSection";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [store, setStore] = useState<StoreType | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("store");
  console.log("user");
  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (role !== "user") {
      navigate("/auth");
      return;
    }

    // Load products from admin
    const savedProducts = localStorage.getItem("adminProducts");
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }

    // Load user store data
    const savedStore = localStorage.getItem("userStore");
    if (savedStore) {
      const storeData = JSON.parse(savedStore);
      setStore(storeData);
      setSelectedProducts(storeData.selectedProducts || []);
      setOrders(storeData.orders || []);
    }

    // Also check allUserStores for updates
    const allStores = localStorage.getItem("allUserStores");
    if (allStores && savedStore) {
      const stores = JSON.parse(allStores);
      const storeData = JSON.parse(savedStore);
      const updatedStore = stores[storeData.referralCode];
      if (updatedStore) {
        setStore(updatedStore);
        setSelectedProducts(updatedStore.selectedProducts || []);
        setOrders(updatedStore.orders || []);
      }
    }
  }, [navigate]);

  const handleStoreCreated = (newStore: StoreType) => {
    setStore(newStore);
    setSelectedProducts(newStore.selectedProducts || []);
    setOrders(newStore.orders || []);
  };

  const handleStoreUpdate = (updatedStore: StoreType) => {
    setStore(updatedStore);
    setSelectedProducts(updatedStore.selectedProducts || []);
    setOrders(updatedStore.orders || []);

    localStorage.setItem("userStore", JSON.stringify(updatedStore));

    const allStores = JSON.parse(localStorage.getItem("allUserStores") || "{}");
    allStores[updatedStore.referralCode] = updatedStore;
    localStorage.setItem("allUserStores", JSON.stringify(allStores));
  };

  const handleProductToggle = (productId: string) => {
    if (!store) return;

    const updated = selectedProducts.includes(productId)
      ? selectedProducts.filter((id) => id !== productId)
      : [...selectedProducts, productId];

    setSelectedProducts(updated);

    const updatedStore = {
      ...store,
      selectedProducts: updated,
    };

    handleStoreUpdate(updatedStore);
  };

  const renderContent = () => {
    if (activeTab === "store") {
      return (
        <MyStore
          store={store}
          onStoreCreated={handleStoreCreated}
          onStoreUpdate={handleStoreUpdate}
        />
      );
    }

    if (activeTab === "products") {
      return (
        <MyProducts
          products={products}
          store={store}
          selectedProducts={selectedProducts}
          onProductToggle={handleProductToggle}
          onStoreUpdate={handleStoreUpdate}
        />
      );
    }

    if (activeTab === "orders") {
      return <MyOrders orders={orders} />;
    }

    if (activeTab === "referral") {
      return (
        <ReferralPoints
          orders={orders}
          referralCode={store?.referralCode || ""}
          totalPoints={store?.totalPoints || 0}
        />
      );
    }

    return null;
  };

  if (!store) {
    return (
      <DashboardLayout
        title="My Dashboard"
        userRole="user"
        navItems={[]}
        activeTab="store"
        onTabChange={() => {}}
      >
        <MyStore
          store={store}
          onStoreCreated={handleStoreCreated}
          onStoreUpdate={handleStoreUpdate}
        />
      </DashboardLayout>
    );
  }

  const navItems = [
    {
      id: "store",
      label: "My Store",
      icon: Store,
    },
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
    {
      id: "referral",
      label: "Referral & Points",
      icon: Award,
    },
  ];

  return (
    <DashboardLayout
      title="My Dashboard"
      userRole="user"
      navItems={navItems}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      {/* Offers / Vouchers section (mock data + simple rules) */}
      <OffersSection store={store} />

      {renderContent()}
    </DashboardLayout>
  );
};

export default UserDashboard;
