import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/LanguageContext";
import config from "@/config";
import {
  Zap,
  ShoppingBag,
  Gift,
  CheckCircle2,
  Rocket,
  Lock,
} from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess?: () => void;
}

const AuthModal = ({ isOpen, onClose, onAuthSuccess }: AuthModalProps) => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [tab, setTab] = useState<"login" | "register">("login");
  const [mobileNo, setMobileNo] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // If the current page has a referral code in the URL (?ref=CODE), forward it to the backend
      const params = new URLSearchParams(window.location.search);
      const ref = params.get("ref");
      const registerUrl = `${config.apiBaseUrl}/auth/register${
        ref ? `?ref=${encodeURIComponent(ref)}` : ""
      }`;

      const response = await fetch(registerUrl, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobile_no: mobileNo,
          username: username,
          password: password,
          // also include as payload for redundancy (backend prefers query param)
          referral_code_used: ref || undefined,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || "Registration failed");
      }

      const data = await response.json();

      // Store user data
      localStorage.setItem("userRole", "user");
      localStorage.setItem("userName", username);
      localStorage.setItem("userMobile", mobileNo);
      localStorage.setItem("is_auth", "true");

      toast({
        title: "Account created!",
        description: "Welcome to our platform",
      });
      onClose();
      onAuthSuccess?.();
    } catch (error) {
      toast({
        title: "Registration failed",
        description:
          error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setMobileNo("");
    setUsername("");
    setPassword("");
    setTab("login");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Left Side - Branding & Benefits */}
          <div className="hidden md:flex flex-col justify-between bg-gradient-to-br from-primary/10 to-secondary/10 p-8 rounded-l-lg">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Rocket className="w-6 h-6 text-primary-foreground" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">
                  StoreBuilder
                </h2>
              </div>
              <p className="text-sm font-semibold text-muted-foreground mb-6">
                Join Thousands of Happy Shoppers
              </p>

              {/* Benefits List */}
              <div className="space-y-4">
                <div className="flex gap-3">
                  <Zap className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-sm text-foreground">
                      Exclusive Deals
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Access premium products with special pricing
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Gift className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-sm text-foreground">
                      Earn Rewards
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Get points on every purchase and redeem them
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <ShoppingBag className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-sm text-foreground">
                      Fast Checkout
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Quick and secure payment process every time
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Lock className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-sm text-foreground">
                      100% Secure
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Your data is encrypted and protected
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-2 p-3 bg-accent/10 rounded-lg">
              <p className="text-xs font-semibold text-accent">
                ✨ Instant Benefits After Sign Up:
              </p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Get 100 bonus points</li>
                <li>• Access exclusive member-only products</li>
                <li>• Free shipping on your first order</li>
              </ul>
            </div>

            {/* Footer */}
            <div className="space-y-2">
              <div className="flex gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                <p className="text-xs text-muted-foreground">
                  30-Day Money Back Guarantee
                </p>
              </div>
              <div className="flex gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                <p className="text-xs text-muted-foreground">
                  Free Shipping on All Orders
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Auth Forms */}
          <div className="p-8">
            <Tabs
              value={tab}
              onValueChange={(value) => setTab(value as "login" | "register")}
            >
              <TabsList className="grid w-full mb-6">
                <TabsTrigger value="register" className="w-full">
                  {t("auth.register")}
                </TabsTrigger>
              </TabsList>

              {/* Register Tab */}
              <TabsContent value="register" className="mt-4">
                <div className="space-y-4 mb-6">
                  <h3 className="font-bold text-lg text-foreground">
                    Haven't Registered Yet? 🚀
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Join us today and unlock exclusive access to premium
                    products, special discounts, and earn rewards on every
                    purchase!
                  </p>
                </div>

                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="modal-register-mobile"
                      className="text-sm font-semibold"
                    >
                      {t("auth.email")}
                    </Label>
                    <Input
                      id="modal-register-mobile"
                      type="tel"
                      placeholder="0719158514"
                      value={mobileNo}
                      onChange={(e) => setMobileNo(e.target.value)}
                      className="h-10"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="modal-register-username"
                      className="text-sm font-semibold"
                    >
                      {t("auth.username")}
                    </Label>
                    <Input
                      id="modal-register-username"
                      type="text"
                      placeholder="max"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="h-10"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="modal-register-password"
                      className="text-sm font-semibold"
                    >
                      {t("auth.password")}
                    </Label>
                    <Input
                      id="modal-register-password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-10"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 h-11 font-semibold"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating Account..." : t("auth.register")}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
