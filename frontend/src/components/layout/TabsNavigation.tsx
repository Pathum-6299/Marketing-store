import { ReactNode } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
  content: ReactNode;
}

interface TabsNavigationProps {
  items: TabItem[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  variant?: "default" | "pills" | "underline";
}

const TabsNavigation = ({ 
  items, 
  defaultValue,
  value,
  onValueChange,
  className,
  variant = "default"
}: TabsNavigationProps) => {
  const defaultTab = value || defaultValue || items[0]?.id;

  return (
    <Tabs 
      value={value || defaultTab} 
      onValueChange={onValueChange}
      defaultValue={defaultValue}
      className={cn("w-full", className)}
    >
      <TabsList 
        className={cn(
          "grid w-full mb-8",
          variant === "pills" && "bg-muted p-1",
          variant === "underline" && "bg-transparent border-b rounded-none h-auto p-0",
          items.length <= 2 && "max-w-md mx-auto",
          items.length === 3 && "max-w-2xl mx-auto",
          items.length >= 4 && "max-w-3xl mx-auto"
        )}
        style={{
          gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))`
        }}
      >
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <TabsTrigger
              key={item.id}
              value={item.id}
              className={cn(
                variant === "pills" && "data-[state=active]:bg-background data-[state=active]:shadow-sm",
                variant === "underline" && "border-b-2 border-transparent data-[state=active]:border-primary rounded-none data-[state=active]:bg-transparent"
              )}
            >
              <Icon className="w-4 h-4 mr-2" />
              <span>{item.label}</span>
              {item.badge && (
                <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary font-semibold">
                  {item.badge}
                </span>
              )}
            </TabsTrigger>
          );
        })}
      </TabsList>

      {items.map((item) => (
        <TabsContent key={item.id} value={item.id} className="mt-0">
          {item.content}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default TabsNavigation;

