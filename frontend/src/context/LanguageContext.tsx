import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "si";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    "nav.home": "Home",
    "nav.dashboard": "Dashboard",
    "nav.admin": "Admin",
    "nav.products": "Products",
    "nav.orders": "Orders",
    "nav.users": "Users",
    "nav.settings": "Settings",
    "nav.logout": "Logout",
    "auth.login": "Login",
    "auth.register": "Register",
    "auth.email": "Email",
    "auth.username": "Username",
    "auth.password": "Password",
    "auth.forgotPassword": "Forgot Password?",
    "product.viewDetails": "View Details",
    "product.addToCart": "Add to Cart",
    "common.loading": "Loading...",
    "common.error": "Error",
    "common.success": "Success",
  },
  si: {
    "nav.home": "ගෙය",
    "nav.dashboard": "ඩැෂ්බෝර්ඩ්",
    "nav.admin": "පරිපාලක",
    "nav.products": "නිෂ්පාදන",
    "nav.orders": "ඇණවුම්",
    "nav.users": "පරිශීලකයින්",
    "nav.settings": "සැකසුම්",
    "nav.logout": "ඉවත් වන්න",
    "auth.login": "ඉතුරු කරන්න",
    "auth.register": "ලියාපදනම් කරන්න",
    "auth.email": "ඊ-ඉතා",
    "auth.username": "පරිශීලක නාමය",
    "auth.password": "මුරපදය",
    "auth.forgotPassword": "මුරපදය අමතා ගිය ද?",
    "product.viewDetails": "විස්තර බලන්න",
    "product.addToCart": "කාර්තුවට එකතු කරන්න",
    "common.loading": "පූරණය වෙමින්...",
    "common.error": "දෝෂය",
    "common.success": "සාර්ථකයි",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("language") as Language | null;
    return saved || "en";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string): string => {
    return (
      translations[language][
        key as keyof (typeof translations)[typeof language]
      ] || key
    );
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
