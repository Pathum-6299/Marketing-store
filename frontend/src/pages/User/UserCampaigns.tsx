import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Trash, CheckCircle2, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Campaign {
  id: string;
  title: string;
  description?: string;
  platforms?: string[];
  images?: string[];
  active: boolean;
  createdAt: string;
}

interface UserCampaignState {
  id: string;
  status: "not_started" | "started" | "submitted" | "approved";
  startedAt?: string;
  submissions?: { text?: string; url?: string; createdAt: string }[];
}

const UserCampaigns = () => {
  const { toast } = useToast();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [userCampaigns, setUserCampaigns] = useState<
    Record<string, UserCampaignState>
  >({});
  const [selected, setSelected] = useState<Campaign | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [proofText, setProofText] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("adminCampaigns");
    if (stored) {
      const all = JSON.parse(stored) as Campaign[];
      setCampaigns(all);
    } else {
      setCampaigns([]);
    }

    const uc = localStorage.getItem("userCampaigns");
    if (uc) setUserCampaigns(JSON.parse(uc));
  }, []);

  const persistUserCampaigns = (updated: Record<string, UserCampaignState>) => {
    localStorage.setItem("userCampaigns", JSON.stringify(updated));
    setUserCampaigns(updated);
  };

  const startCampaign = (camp: Campaign) => {
    const existing = userCampaigns[camp.id];
    if (existing && existing.status !== "not_started") {
      toast({
        title: "Already started",
        description: "You already started this campaign",
      });
      return;
    }

    const updated = {
      ...userCampaigns,
      [camp.id]: {
        id: camp.id,
        status: "started",
        startedAt: new Date().toISOString(),
        submissions: [],
      },
    };
    persistUserCampaigns(updated);
    toast({
      title: "Campaign started",
      description: `You started: ${camp.title}`,
    });
  };

  const openSubmit = (camp: Campaign) => {
    setSelected(camp);
    setProofText("");
    setIsDialogOpen(true);
  };

  const submitProof = () => {
    if (!selected) return;
    const entry = {
      text: proofText,
      url: proofText,
      createdAt: new Date().toISOString(),
    };
    const base = userCampaigns[selected.id] || {
      id: selected.id,
      status: "started",
      submissions: [],
    };
    const submissions = [...(base.submissions || []), entry];
    const status = "submitted";
    const updated = {
      ...userCampaigns,
      [selected.id]: { ...base, submissions, status },
    };
    persistUserCampaigns(updated);
    setIsDialogOpen(false);
    setSelected(null);
    toast({
      title: "Proof submitted",
      description: "Your submission is recorded (mock review).",
    });
  };

  const withdrawSubmission = (campaignId: string) => {
    if (!confirm("Withdraw your submissions for this campaign?")) return;
    const base = userCampaigns[campaignId];
    if (!base) return;
    const updated = {
      ...userCampaigns,
      [campaignId]: { ...base, submissions: [], status: "started" },
    };
    persistUserCampaigns(updated);
    toast({
      title: "Submission withdrawn",
      description: "Your submissions have been removed.",
    });
  };

  const visible = campaigns.filter((c) => c.active);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">
        Available Campaigns
      </h2>

      {visible.length === 0 && (
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">
            No active campaigns at the moment. Check back later.
          </p>
        </Card>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {visible.map((camp) => {
          const state = userCampaigns[camp.id];
          return (
            <Card key={camp.id} className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{camp.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    {camp.description}
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    {camp.platforms?.map((p) => (
                      <Badge
                        key={p}
                        className="bg-muted/10 text-muted-foreground"
                      >
                        {p}
                      </Badge>
                    ))}
                  </div>

                  <div className="text-xs text-muted-foreground mt-3">
                    {state ? (
                      <>
                        Status: <strong>{state.status}</strong>
                        {state.startedAt && (
                          <>
                            {" "}
                            • Started at{" "}
                            {new Date(state.startedAt).toLocaleString()}
                          </>
                        )}
                      </>
                    ) : (
                      <span className="text-muted-foreground">
                        Not started yet
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-3">
                  {!state || state.status === "not_started" ? (
                    <Button onClick={() => startCampaign(camp)}>
                      Start Campaign
                    </Button>
                  ) : (
                    <>
                      <Button
                        onClick={() => openSubmit(camp)}
                        className="bg-primary"
                      >
                        Submit Proof
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => withdrawSubmission(camp.id)}
                      >
                        Withdraw
                      </Button>
                    </>
                  )}
                </div>
              </div>

              {/* show submissions */}
              {state?.submissions && state.submissions.length > 0 && (
                <div className="mt-4 border-t pt-3">
                  <h4 className="text-sm font-semibold">Your Submissions</h4>
                  <ul className="text-sm text-muted-foreground mt-2 space-y-2">
                    {state.submissions.map((s, idx) => (
                      <li
                        key={idx}
                        className="flex items-center justify-between"
                      >
                        <span>{s.text || s.url}</span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(s.createdAt).toLocaleString()}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={() => setIsDialogOpen(false)}>
        <DialogContent className="max-w-lg">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Submit Proof</h3>
            <p className="text-sm text-muted-foreground">
              Add a link (post URL) or short note about your completed task.
            </p>

            <div className="space-y-2">
              <Label>Proof (URL or text)</Label>
              <Input
                value={proofText}
                onChange={(e) => setProofText(e.target.value)}
                placeholder="https://facebook.com/yourpost or short note"
              />
            </div>

            <div className="flex items-center justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={submitProof} disabled={!proofText}>
                <Send className="w-4 h-4 mr-2" /> Submit
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserCampaigns;
