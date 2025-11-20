import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  TrendingUp, 
  Award, 
  ShoppingBag, 
  Calendar, 
  DollarSign,
  Copy,
  ExternalLink,
  BarChart3,
  Target,
  Gift
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Order } from "./types";

interface ReferralPointsProps {
  orders: Order[];
  referralCode: string;
  totalPoints: number;
}

const ReferralPoints = ({ orders, referralCode, totalPoints }: ReferralPointsProps) => {
  const { toast } = useToast();

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    toast({
      title: "Referral code copied!",
      description: "Share this code to earn more points",
    });
  };

  const copyReferralLink = () => {
    const link = `${window.location.origin}/store/${referralCode}`;
    navigator.clipboard.writeText(link);
    toast({
      title: "Referral link copied!",
      description: "Share this link to earn more points",
    });
  };

  // Calculate statistics
  const totalEarnings = orders.reduce((sum, order) => sum + order.price, 0);
  const totalOrdersCount = orders.length;
  const averagePointsPerOrder = totalOrdersCount > 0 ? Math.round(totalPoints / totalOrdersCount) : 0;
  const averageOrderValue = totalOrdersCount > 0 ? (totalEarnings / totalOrdersCount).toFixed(2) : "0.00";

  // Group orders by month for chart
  const ordersByMonth = orders.reduce((acc, order) => {
    const month = new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    if (!acc[month]) {
      acc[month] = { count: 0, points: 0, revenue: 0 };
    }
    acc[month].count += 1;
    acc[month].points += order.points;
    acc[month].revenue += order.price;
    return acc;
  }, {} as Record<string, { count: number; points: number; revenue: number }>);

  if (orders.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Referral & Points</h2>
          <p className="text-muted-foreground">
            Track your earned points from referral orders
          </p>
        </div>

        <Card className="p-12 text-center">
          <Award className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-xl font-semibold text-foreground mb-2">No Points Yet</h3>
          <p className="text-muted-foreground mb-6">
            Start sharing your referral code to earn points on every order!
          </p>
          <div className="space-y-4 max-w-md mx-auto">
            <Card className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">Your Referral Code</p>
                <div className="flex items-center justify-center gap-2 mb-3">
                  <span className="text-2xl font-bold text-primary">{referralCode}</span>
                  <Button variant="ghost" size="icon" onClick={copyReferralCode}>
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <Button variant="outline" size="sm" onClick={copyReferralLink} className="w-full">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Copy Store Link
                </Button>
              </div>
            </Card>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Referral & Points</h2>
        <p className="text-muted-foreground">
          Track your earned points from orders made through your referral code
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center">
              <Award className="w-6 h-6 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Points</p>
              <p className="text-2xl font-bold text-foreground">{totalPoints}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Orders</p>
              <p className="text-2xl font-bold text-foreground">{totalOrdersCount}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-secondary/20 to-secondary/10 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Revenue</p>
              <p className="text-2xl font-bold text-foreground">${totalEarnings.toFixed(2)}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center">
              <Target className="w-6 h-6 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg Points/Order</p>
              <p className="text-2xl font-bold text-foreground">{averagePointsPerOrder}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Referral Code Section */}
      <Card className="p-6 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Your Referral Code</h3>
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-primary">{referralCode}</span>
              <Button variant="ghost" size="icon" onClick={copyReferralCode}>
                <Copy className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Share this code or your store link to earn points on every purchase
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <Button variant="outline" onClick={copyReferralLink}>
              <ExternalLink className="w-4 h-4 mr-2" />
              Copy Store Link
            </Button>
            <Button variant="outline" onClick={() => window.open(`/store/${referralCode}`, '_blank')}>
              View Store
            </Button>
          </div>
        </div>
      </Card>

      {/* Performance Overview */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <BarChart3 className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Performance Metrics</h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Average Order Value</span>
              <span className="font-semibold text-foreground">${averageOrderValue}</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Points per Order</span>
              <span className="font-semibold text-foreground">{averagePointsPerOrder} pts</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Conversion Rate</span>
              <span className="font-semibold text-foreground">
                {totalOrdersCount > 0 ? "Active" : "Pending"}
              </span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-5 h-5 text-accent" />
            <h3 className="text-lg font-semibold text-foreground">Monthly Breakdown</h3>
          </div>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {Object.entries(ordersByMonth)
              .sort(([a], [b]) => {
                const dateA = new Date(a);
                const dateB = new Date(b);
                return dateB.getTime() - dateA.getTime();
              })
              .map(([month, data]) => (
                <div key={month} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-foreground">{month}</span>
                    <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                      {data.points} pts
                    </Badge>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{data.count} orders</span>
                    <span>${data.revenue.toFixed(2)}</span>
                  </div>
                  <Separator />
                </div>
              ))}
          </div>
        </Card>
      </div>

      {/* Points Breakdown by Order */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Gift className="w-5 h-5 text-accent" />
          <h3 className="text-lg font-semibold text-foreground">Points Earned by Order</h3>
        </div>
        <div className="space-y-4">
          {orders.map((order, index) => (
            <div key={order.id}>
              <div className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <img 
                    src={order.productImage} 
                    alt={order.productName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-foreground mb-1 truncate">{order.productName}</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(order.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                        <span>Order: {order.id}</span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className="bg-accent/10 text-accent border-accent/20 text-base px-3 py-1">
                          +{order.points} points
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">${order.price}</p>
                    </div>
                  </div>
                </div>
              </div>
              {index < orders.length - 1 && <Separator className="mt-4" />}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ReferralPoints;

