import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Bell,
  ArrowDownCircle,
  ArrowUpCircle,
  SendHorizonal,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

const mockUser = {
  firstName: "Dipo",
  avatar: "",
};

const mockBalance = 1500000;
const mockTransactions = [
  {
    id: 1,
    type: "Deposit",
    title: "Wallet Top-up",
    amount: 500000,
    date: "2025-06-19",
  },
  {
    id: 2,
    type: "Withdrawal",
    title: "Withdrawal to Bank",
    amount: 200000,
    date: "2025-06-15",
  },
  {
    id: 3,
    type: "Contribution",
    title: "Pool Contribution",
    amount: 300000,
    date: "2025-06-10",
  },
  {
    id: 4,
    type: "Transfer",
    title: "Sent to User",
    amount: 150000,
    date: "2025-06-05",
  },
];
const analytics = {
  daily: { income: 20000, outcome: 5000 },
  monthly: { income: 600000, outcome: 200000 },
  yearly: { income: 7200000, outcome: 2400000 },
};

const WalletPage = () => {
  const [tab, setTab] = useState("daily");
  const { income, outcome } = analytics[tab as keyof typeof analytics];

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-0 sm:p-6 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-[#F9FAFB] flex items-center justify-between px-4 py-4 md:px-8 shadow-sm">
        <div className="text-lg font-semibold text-[#111827]">
          Hello, {mockUser.firstName}
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Notifications"
            className="rounded-full hover:bg-[#E5E7EB]"
          >
            <Bell className="w-6 h-6 text-[#2563EB]" />
          </Button>
          <Avatar>
            <AvatarImage src={mockUser.avatar} alt="User avatar" />
            <AvatarFallback>D</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <main className="max-w-3xl mx-auto flex flex-col gap-6 mt-6">
        {/* Wallet Card */}
        <Card className="rounded-xl shadow-md p-6 flex flex-col gap-6 bg-white">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="text-sm text-[#6B7280] font-medium">
                Wallet Balance
              </div>
              <div className="text-4xl font-bold text-[#111827] mt-1 mb-2">
                ₦{mockBalance.toLocaleString()}
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                className="bg-[#2563EB] text-white rounded-lg px-5 py-2 font-medium text-sm shadow-sm hover:bg-[#1d4ed8] transition"
                aria-label="View Wallet"
              >
                View
              </Button>
              <Button
                className="bg-[#F3F4F6] text-[#111827] rounded-lg px-5 py-2 font-medium text-sm shadow-sm hover:bg-[#E5E7EB] transition"
                aria-label="Transfer"
              >
                Transfer
              </Button>
              <Button
                className="bg-[#F3F4F6] text-[#111827] rounded-lg px-5 py-2 font-medium text-sm shadow-sm hover:bg-[#E5E7EB] transition"
                aria-label="Request"
              >
                Request
              </Button>
            </div>
          </div>
        </Card>

        {/* Analytics Section */}
        <Card className="rounded-xl shadow-md p-6 bg-white">
          <Tabs value={tab} onValueChange={setTab} className="w-full">
            <TabsList className="bg-[#F3F4F6] rounded-lg p-1 flex gap-2 w-fit mx-auto mb-4">
              <TabsTrigger
                value="daily"
                className="data-[state=active]:bg-[#2563EB] data-[state=active]:text-white px-4 py-1 rounded-md transition"
              >
                Daily
              </TabsTrigger>
              <TabsTrigger
                value="monthly"
                className="data-[state=active]:bg-[#2563EB] data-[state=active]:text-white px-4 py-1 rounded-md transition"
              >
                Monthly
              </TabsTrigger>
              <TabsTrigger
                value="yearly"
                className="data-[state=active]:bg-[#2563EB] data-[state=active]:text-white px-4 py-1 rounded-md transition"
              >
                Yearly
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value={tab}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <div className="flex-1 flex items-center gap-3 bg-[#F9FAFB] rounded-lg p-4">
                <TrendingUp className="w-8 h-8 text-[#10B981] bg-white rounded-full p-1 shadow" />
                <div>
                  <div className="text-xs text-[#6B7280]">Income</div>
                  <div className="text-lg font-semibold text-[#10B981]">
                    ₦{income.toLocaleString()}
                  </div>
                </div>
              </div>
              <div className="flex-1 flex items-center gap-3 bg-[#F9FAFB] rounded-lg p-4">
                <TrendingDown className="w-8 h-8 text-[#F59E0B] bg-white rounded-full p-1 shadow" />
                <div>
                  <div className="text-xs text-[#6B7280]">Outcome</div>
                  <div className="text-lg font-semibold text-[#F59E0B]">
                    ₦{outcome.toLocaleString()}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Transaction List */}
        <Card className="rounded-xl shadow-md p-6 bg-white">
          <div className="text-lg font-semibold text-[#111827] mb-4">
            Recent Transactions
          </div>
          {mockTransactions.length > 0 ? (
            <ul className="divide-y divide-[#E5E7EB]">
              {mockTransactions.map((tx) => (
                <li
                  key={tx.id}
                  className="py-4 flex justify-between items-center"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#F3F4F6]">
                      {tx.type === "Deposit" && (
                        <ArrowDownCircle className="w-6 h-6 text-[#10B981]" />
                      )}
                      {tx.type === "Withdrawal" && (
                        <ArrowUpCircle className="w-6 h-6 text-[#EF4444]" />
                      )}
                      {tx.type === "Contribution" && (
                        <TrendingUp className="w-6 h-6 text-[#2563EB]" />
                      )}
                      {tx.type === "Transfer" && (
                        <SendHorizonal className="w-6 h-6 text-[#F59E0B]" />
                      )}
                    </span>
                    <div>
                      <div className="font-medium text-[#111827]">
                        {tx.title}
                      </div>
                      <div className="text-xs text-[#6B7280]">{tx.date}</div>
                    </div>
                  </div>
                  <span
                    className={`font-semibold text-lg ${["Deposit", "Contribution"].includes(tx.type) ? "text-[#10B981]" : "text-[#EF4444]"}`}
                  >
                    {(["Withdrawal", "Transfer"].includes(tx.type)
                      ? "-"
                      : "+") +
                      "₦" +
                      tx.amount.toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-[#6B7280] text-center">
              No transactions yet
            </p>
          )}
        </Card>
      </main>
    </div>
  );
};

export default WalletPage;
