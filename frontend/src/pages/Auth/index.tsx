import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Store } from "lucide-react";
import Login from "./login";
import Register from "./register";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLanguage } from "@/context/LanguageContext";

const Auth = () => {
  const { t } = useLanguage();

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{ background: "var(--gradient-hero)" }}
    >
      <Card className="w-full max-w-md p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Store className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">StoreBuilder</h1>
          </div>
          <LanguageSwitcher />
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">{t("auth.login")}</TabsTrigger>
            <TabsTrigger value="signup">{t("auth.register")}</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="mt-4">
            <Login />
          </TabsContent>

          <TabsContent value="signup" className="mt-4">
            <Register />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default Auth;
