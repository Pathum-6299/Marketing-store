import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Store, ShoppingBag, TrendingUp, Copy, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Store as StoreType } from "./types";

interface MyStoreProps {
  store: StoreType | null;
  onStoreCreated: (store: StoreType) => void;
  onStoreUpdate: (store: StoreType) => void;
}

const MyStore = ({ store, onStoreCreated, onStoreUpdate }: MyStoreProps) => {
  const { toast } = useToast();
  const [storeName, setStoreName] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (store) {
      setStoreName(store.name);
    }
  }, [store]);

  const handleCreateStore = (e: React.FormEvent) => {
    e.preventDefault();
    const code = `REF-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const newStore: StoreType = {
      name: storeName,
      referralCode: code,
      selectedProducts: [],
      totalPoints: 0,
      totalOrders: 0,
      orders: []
    };
    
    localStorage.setItem("userStore", JSON.stringify(newStore));
    
    const allStores = JSON.parse(localStorage.getItem("allUserStores") || "{}");
    allStores[code] = newStore;
    localStorage.setItem("allUserStores", JSON.stringify(allStores));
    
    onStoreCreated(newStore);
    
    toast({
      title: "Store created!",
      description: `Your store "${storeName}" is now live`,
    });
  };

  const copyReferralCode = () => {
    if (store?.referralCode) {
      navigator.clipboard.writeText(store.referralCode);
      setCopied(true);
      toast({
        title: "Referral code copied!",
        description: "Share this code with your customers",
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const copyStoreLink = () => {
    if (store?.referralCode) {
      const link = `${window.location.origin}/store/${store.referralCode}`;
      navigator.clipboard.writeText(link);
      toast({
        title: "Store link copied!",
        description: "Share this link to your store",
      });
    }
  };

  const viewStore = () => {
    if (store?.referralCode) {
      window.open(`/store/${store.referralCode}`, "_blank");
    }
  };

  if (!store) {
    return (
      <Card className="max-w-md mx-auto p-8">
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary mx-auto flex items-center justify-center mb-4">
            <Store className="w-8 h-8 text-primary-foreground" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Create Your Store</h2>
          <p className="text-muted-foreground">Give your store a name to get started</p>
        </div>
        <form onSubmit={handleCreateStore} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="storeName">Store Name</Label>
            <Input
              id="storeName"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              placeholder="My Awesome Store"
              required
            />
          </div>
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
            Create Store
          </Button>
        </form>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Orders</p>
              <p className="text-2xl font-bold text-foreground">{store.totalOrders}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Points Earned</p>
              <p className="text-2xl font-bold text-foreground">{store.totalPoints}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
              <Store className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Products</p>
              <p className="text-2xl font-bold text-foreground">{store.selectedProducts.length}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Store Info Card */}
      <Card className="p-6 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-foreground">Store: {store.name}</h2>
          <Button variant="outline" size="sm" onClick={viewStore}>
            <ExternalLink className="w-4 h-4 mr-2" />
            View Store
          </Button>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label className="text-sm text-muted-foreground mb-2 block">Referral Code</Label>
            <div className="flex items-center gap-2">
              <div className="flex-1 text-3xl font-bold text-primary bg-background/50 p-3 rounded-lg">
                {store.referralCode}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={copyReferralCode}
                className="h-12 w-12"
              >
                {copied ? (
                  <span className="text-green-500">✓</span>
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
          
          <div>
            <Label className="text-sm text-muted-foreground mb-2 block">Store Link</Label>
            <div className="flex items-center gap-2">
              <Input
                value={`${window.location.origin}/store/${store.referralCode}`}
                readOnly
                className="bg-background/50"
              />
              <Button variant="outline" onClick={copyStoreLink}>
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MyStore;


