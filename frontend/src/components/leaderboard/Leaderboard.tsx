import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Trophy, Star } from "lucide-react";
import { leaderboardMock } from "./leaderboard.mock";
import { LeaderboardUser } from "./types";

interface Props {
  data?: LeaderboardUser[];
}

const LeaderboardTable = ({ data = leaderboardMock }: Props) => {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const toggleRow = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <section className="px-6 py-20 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-10">
          <Badge variant="outline" className="mb-4">
            <Trophy className="w-3 h-3 mr-2" />
            Leaderboard
          </Badge>
          <h2 className="text-4xl font-bold text-foreground">
            Top Sellers Performance
          </h2>
          <p className="text-muted-foreground">
            Detailed performance of highest earning stores
          </p>
        </div>

        <Card className="overflow-hidden">
          <table className="w-full border-collapse">
            <thead className="bg-muted/50 text-left">
              <tr>
                <th className="p-4">Rank</th>
                <th className="p-4">Seller</th>
                <th className="p-4">Sales</th>
                <th className="p-4">Earnings</th>
                <th className="p-4">Conversion</th>
                <th className="p-4">Rating</th>
                <th className="p-4 text-right"></th>
              </tr>
            </thead>

            <tbody>
              {data.map((user) => {
                const isOpen = expandedRow === user.id;

                return (
                  <>
                    {/* Main Row */}
                    <tr
                      key={user.id}
                      className="border-b hover:bg-muted/40 transition"
                    >
                      <td className="p-4 font-bold">#{user.rank}</td>

                      <td className="p-4">
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {user.storeName}
                        </p>
                      </td>

                      <td className="p-4">{user.sales}</td>

                      <td className="p-4 font-semibold text-accent">
                        ${user.earnings.toLocaleString()}
                      </td>

                      <td className="p-4">{user.conversionRate}%</td>

                      <td className="p-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-accent text-accent" />
                          {user.rating}
                        </div>
                      </td>

                      <td className="p-4 text-right">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => toggleRow(user.id)}
                        >
                          {isOpen ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </Button>
                      </td>
                    </tr>

                    {/* Expanded Row */}
                    {isOpen && (
                      <tr className="bg-muted/20">
                        <td colSpan={7} className="p-6">
                          <div className="grid md:grid-cols-3 gap-6 text-sm">
                            <div>
                              <p className="text-muted-foreground">Clicks</p>
                              <p className="font-semibold">
                                {user.clicks.toLocaleString()}
                              </p>
                            </div>

                            <div>
                              <p className="text-muted-foreground">Orders</p>
                              <p className="font-semibold">{user.orders}</p>
                            </div>

                            <div>
                              <p className="text-muted-foreground">
                                Commission Rate
                              </p>
                              <p className="font-semibold">
                                {user.commissionRate}%
                              </p>
                            </div>

                            <div>
                              <p className="text-muted-foreground">
                                Top Product
                              </p>
                              <p className="font-semibold">{user.topProduct}</p>
                            </div>

                            <div>
                              <p className="text-muted-foreground">Joined On</p>
                              <p className="font-semibold">
                                {new Date(user.joinedAt).toLocaleDateString()}
                              </p>
                            </div>

                            <div>
                              <Badge className="mt-4">High Performer</Badge>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
            </tbody>
          </table>
        </Card>
      </div>
    </section>
  );
};

export default LeaderboardTable;
