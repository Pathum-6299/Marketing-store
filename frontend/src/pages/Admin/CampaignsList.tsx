import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Trash, Edit, Plus, Check, X } from "lucide-react";
import { Campaign } from "./types";

const sampleCampaigns: Campaign[] = [
  {
    id: "camp-1",
    title: "Share products on Social Media",
    description:
      "Share selected products to social platforms and earn visibility. Use this campaign to boost your store presence.",
    platforms: ["facebook", "twitter", "instagram"],
    images: [],
    active: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "camp-2",
    title: "Refer & Earn",
    description:
      "Encourage users to share referral codes. When 10 referrals are achieved, give a reward.",
    platforms: ["whatsapp", "telegram"],
    images: [],
    active: false,
    createdAt: new Date().toISOString(),
  },
];

const CampaignsList = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editing, setEditing] = useState<Campaign | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("adminCampaigns");
    if (stored) {
      setCampaigns(JSON.parse(stored));
    } else {
      setCampaigns(sampleCampaigns);
      localStorage.setItem("adminCampaigns", JSON.stringify(sampleCampaigns));
    }
  }, []);

  const openNew = () => {
    setEditing({
      id: `camp-${Date.now()}`,
      title: "",
      description: "",
      platforms: [],
      images: [],
      active: true,
      createdAt: new Date().toISOString(),
    });
    setIsOpen(true);
  };

  const handleSave = (camp: Campaign) => {
    setCampaigns((prev) => {
      const exists = prev.find((p) => p.id === camp.id);
      let updated;
      if (exists) {
        updated = prev.map((p) => (p.id === camp.id ? camp : p));
      } else {
        updated = [camp, ...prev];
      }
      localStorage.setItem("adminCampaigns", JSON.stringify(updated));
      return updated;
    });
    setIsOpen(false);
    setEditing(null);
  };

  const handleDelete = (id: string) => {
    if (!confirm("Delete this campaign?")) return;
    const updated = campaigns.filter((c) => c.id !== id);
    setCampaigns(updated);
    localStorage.setItem("adminCampaigns", JSON.stringify(updated));
  };

  const toggleActive = (id: string) => {
    const updated = campaigns.map((c) =>
      c.id === id ? { ...c, active: !c.active } : c
    );
    setCampaigns(updated);
    localStorage.setItem("adminCampaigns", JSON.stringify(updated));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Campaigns</h2>
        <Button onClick={openNew} className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" /> Create Campaign
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {campaigns.map((camp) => (
          <Card key={camp.id} className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold">{camp.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  {camp.description}
                </p>
                <div className="flex items-center gap-2 mt-4">
                  {camp.platforms?.map((p) => (
                    <Badge
                      key={p}
                      className="bg-muted/10 text-muted-foreground"
                    >
                      {p}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-end gap-3">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      setEditing(camp);
                      setIsOpen(true);
                    }}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDelete(camp.id)}
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    onClick={() => toggleActive(camp.id)}
                    className={camp.active ? "bg-green-600" : "bg-muted"}
                  >
                    {camp.active ? (
                      <span className="flex items-center gap-2">
                        <Check className="w-4 h-4" /> Active
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <X className="w-4 h-4" /> Inactive
                      </span>
                    )}
                  </Button>
                  <div className="text-xs text-muted-foreground">
                    {new Date(camp.createdAt).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Dialog
        open={isOpen}
        onOpenChange={() => {
          setIsOpen(false);
          setEditing(null);
        }}
      >
        <DialogContent className="max-w-2xl">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">
              {editing?.id
                ? campaigns.find((c) => c.id === editing.id)
                  ? "Edit Campaign"
                  : "Create Campaign"
                : "Create Campaign"}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={editing?.title || ""}
                  onChange={(e) =>
                    setEditing(
                      editing ? { ...editing, title: e.target.value } : null
                    )
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Platforms (comma separated)</Label>
                <Input
                  value={editing?.platforms?.join(",") || ""}
                  onChange={(e) =>
                    setEditing(
                      editing
                        ? {
                            ...editing,
                            platforms: e.target.value
                              .split(",")
                              .map((s) => s.trim())
                              .filter(Boolean),
                          }
                        : null
                    )
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Input
                value={editing?.description || ""}
                onChange={(e) =>
                  setEditing(
                    editing ? { ...editing, description: e.target.value } : null
                  )
                }
              />
            </div>

            <div className="flex items-center justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setIsOpen(false);
                  setEditing(null);
                }}
              >
                Cancel
              </Button>
              <Button onClick={() => editing && handleSave(editing)}>
                Save Campaign
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CampaignsList;
