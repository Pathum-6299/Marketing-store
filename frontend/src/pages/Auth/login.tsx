import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/LanguageContext";
import config from "@/config";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [mobileNo, setMobileNo] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Mock authentication - check for admin credentials
      if (mobileNo === "admin@store.com" && password === "admin") {
        localStorage.setItem("userRole", "admin");
        localStorage.setItem("userEmail", mobileNo);
        localStorage.setItem("is_auth", "true");
        toast({
          title: "Welcome back!",
          description: "Logged in as Admin",
        });
        navigate("/admin");
        setIsLoading(false);
        return;
      }

      const response = await fetch(`${config.apiBaseUrl}/auth/login`, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobile_no: mobileNo,
          password: password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || "Login failed");
      }

      const data = await response.json();

      // Store user data
      localStorage.setItem("userRole", "user");
      localStorage.setItem("userMobile", mobileNo);
      localStorage.setItem("is_auth", "true");
      if (data.username) {
        localStorage.setItem("userName", data.username);
      }
      if (data.referral_code) {
        localStorage.setItem("referral_code", data.referral_code);
      }
      toast({
        title: "Welcome back!",
        description: "Successfully logged in",
      });
      navigate("/user");
    } catch (error) {
      toast({
        title: "Login failed",
        description:
          error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="login-mobile">{t("auth.email")}</Label>
        <Input
          id="login-mobile"
          type="tel"
          placeholder="0711411308"
          value={mobileNo}
          onChange={(e) => setMobileNo(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="login-password">{t("auth.password")}</Label>
        <Input
          id="login-password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <Button
        type="submit"
        className="w-full bg-primary hover:bg-primary/90"
        disabled={isLoading}
      >
        {isLoading ? "Signing in..." : t("auth.login")}
      </Button>
      <p className="text-xs text-muted-foreground text-center mt-4">
        Demo: admin@store.com / admin for admin access
      </p>
    </form>
  );
};

export default Login;
