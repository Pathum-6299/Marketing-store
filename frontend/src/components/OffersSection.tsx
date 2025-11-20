import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Gift, UserCheck, Share2 } from "lucide-react";
import React from "react";

interface OffersSectionProps {
  store: any;
}

const OffersSection = ({ store }: OffersSectionProps) => {
  const toast = useToast();
  const userName = localStorage.getItem("userName");
  const userMobile = localStorage.getItem("userMobile");

  // Mock referrals count: try stored value, else use totalOrders as proxy
  const referralsCount =
    Number(localStorage.getItem("referralsCount")) || store?.totalOrders || 0;
  const referralTarget = 10;

  const claimedWelcome =
    localStorage.getItem("voucher_welcome_claimed") === "true";
  const claimedReferral =
    localStorage.getItem("voucher_referral_claimed") === "true";

  const handleClaimWelcome = () => {
    if (!userName || !userMobile) {
      toast.toast({
        title: "Complete your profile",
        description: "Please complete your personal info to claim this voucher",
        variant: "destructive",
      });
      return;
    }
    localStorage.setItem("voucher_welcome_claimed", "true");
    toast.toast({
      title: "Voucher Claimed",
      description: "You received a welcome voucher (10% off)",
    });
    window.location.reload();
  };

  const handleShareReferral = () => {
    if (!store?.referralCode) {
      toast.toast({
        title: "No store",
        description: "Create your store to get a referral code",
      });
      return;
    }
    const link = `${window.location.origin}/store/${store.referralCode}`;
    navigator.clipboard.writeText(link);
    toast.toast({
      title: "Referral Link Copied",
      description: "Share this link to earn referrals",
    });
  };

  const handleClaimReferral = () => {
    if (referralsCount < referralTarget) {
      toast.toast({
        title: "Keep sharing!",
        description: `You need ${
          referralTarget - referralsCount
        } more referrals`,
      });
      return;
    }
    localStorage.setItem("voucher_referral_claimed", "true");
    toast.toast({
      title: "Referral Voucher Claimed",
      description: "You received a special referral voucher",
    });
    window.location.reload();
  };

  return (
    <div className="space-y-6 mb-6">
      <h2 className="text-xl font-bold text-foreground">Offers & Vouchers</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 flex flex-col justify-between">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Gift className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Welcome Voucher</h3>
              <p className="text-sm text-muted-foreground">
                Complete your profile and get a 10% off voucher for your first
                order.
              </p>
              <div className="mt-3 flex items-center gap-2">
                <Badge className="bg-accent/10 text-accent">One-time</Badge>
                {claimedWelcome ? (
                  <Badge className="bg-green-100 text-green-600">Claimed</Badge>
                ) : (
                  <Badge className="bg-primary/10 text-primary">
                    Available
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {userName && userMobile ? (
                <span>
                  Profile complete as <strong>{userName}</strong>
                </span>
              ) : (
                <span>Profile incomplete — add your name & phone</span>
              )}
            </div>
            <div>
              <Button onClick={handleClaimWelcome} disabled={claimedWelcome}>
                {claimedWelcome
                  ? "Claimed"
                  : userName && userMobile
                  ? "Claim Voucher"
                  : "Complete Profile"}
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-6 flex flex-col justify-between">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Referral Milestone</h3>
              <p className="text-sm text-muted-foreground">
                Refer 10 people using your referral link to unlock a special
                voucher.
              </p>

              <div className="mt-3">
                <div className="text-sm text-muted-foreground">Progress</div>
                <div className="w-full mt-2">
                  <Progress
                    value={Math.min(
                      (referralsCount / referralTarget) * 100,
                      100
                    )}
                  />
                </div>
                <div className="text-xs text-muted-foreground mt-2">
                  {referralsCount} / {referralTarget} referrals
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Share your referral code to earn rewards
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={handleShareReferral}>
                <Share2 className="w-4 h-4 mr-2" /> Share
              </Button>
              <Button onClick={handleClaimReferral} disabled={claimedReferral}>
                {claimedReferral ? "Claimed" : "Claim after 10"}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default OffersSection;
