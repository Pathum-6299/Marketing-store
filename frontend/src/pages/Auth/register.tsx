import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/LanguageContext";
import config from "@/config";

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [mobileNo, setMobileNo] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${config.apiBaseUrl}/auth/register`, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobile_no: mobileNo,
          username: username,
          password: password,
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
      navigate("/user");
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

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="register-mobile">{t("auth.mobileno")}</Label>
        <Input
          id="register-mobile"
          type="tel"
          placeholder="0719158514"
          value={mobileNo}
          onChange={(e) => setMobileNo(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="register-username">{t("auth.username")}</Label>
        <Input
          id="register-username"
          type="text"
          placeholder="max"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="register-password">{t("auth.password")}</Label>
        <Input
          id="register-password"
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
        {isLoading ? "Creating Account..." : t("auth.register")}
      </Button>
    </form>
  );
};

export default Register;
