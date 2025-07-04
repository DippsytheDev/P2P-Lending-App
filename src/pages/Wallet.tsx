import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
const mockLedger = [
  {
    id: "c1",
    type: "credit",
    amount: 100000,
    date: "2024-06-01",
    desc: "Wallet Top-up",
  },
  {
    id: "d1",
    type: "debit",
    amount: 50000,
    date: "2024-06-10",
    desc: "Loan Repayment",
  },
];

const Wallet = () => {
  const [topupAmount, setTopupAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");

  const handleTopup = () => {
    alert(`Wallet topped up with ₦${Number(topupAmount).toLocaleString()}`);
    setTopupAmount("");
  };
  const handleWithdraw = () => {
    alert(`Withdrawal request for ₦${Number(withdrawAmount).toLocaleString()}`);
    setWithdrawAmount("");
  };

  return (
    <div className="p-6 bg-[#FAFAFA] min-h-screen font-sans max-w-3xl mx-auto">
      {/* Wallet Balance */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl">Wallet Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold text-[#111827] mb-2">
            ₦{mockBalance.toLocaleString()}
          </div>
        </CardContent>
      </Card>

      {/* Top-up & Withdrawal */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl">Top-up & Withdrawal</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <Label className="block mb-1">Top-up Amount</Label>
              <Input
                type="number"
                value={topupAmount}
                onChange={(e) => setTopupAmount(e.target.value)}
                placeholder="Enter amount"
                className="mb-2"
              />
              <Button
                className="bg-black text-white rounded-md px-4 py-2 w-full"
                onClick={handleTopup}
              >
                Top-up
              </Button>
            </div>
            <div className="flex-1">
              <Label className="block mb-1">Withdraw Amount</Label>
              <Input
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                placeholder="Enter amount"
                className="mb-2"
              />
              <Button
                className="bg-black text-white rounded-md px-4 py-2 w-full"
                onClick={handleWithdraw}
              >
                Withdraw
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transaction History */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl">Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="min-w-full text-sm mb-4">
            <thead>
              <tr className="bg-blue-50">
                <th className="p-2 text-left font-semibold">Title</th>
                <th className="p-2 text-left font-semibold">Type</th>
                <th className="p-2 text-left font-semibold">Amount</th>
                <th className="p-2 text-left font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              {mockTransactions.map((tx) => (
                <tr key={tx.id} className="border-b last:border-0">
                  <td className="p-2">{tx.title}</td>
                  <td className="p-2">{tx.type}</td>
                  <td
                    className={`p-2 font-semibold ${["Deposit", "Contribution"].includes(tx.type) ? "text-[#10B981]" : "text-[#EF4444]"}`}
                  >
                    {(["Withdrawal", "Transfer"].includes(tx.type)
                      ? "-"
                      : "+") +
                      "₦" +
                      tx.amount.toLocaleString()}
                  </td>
                  <td className="p-2">{tx.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Ledger */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl">Ledger</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="min-w-full text-sm mb-4">
            <thead>
              <tr className="bg-blue-50">
                <th className="p-2 text-left font-semibold">Type</th>
                <th className="p-2 text-left font-semibold">Amount</th>
                <th className="p-2 text-left font-semibold">Date</th>
                <th className="p-2 text-left font-semibold">Description</th>
              </tr>
            </thead>
            <tbody>
              {mockLedger.map((entry) => (
                <tr key={entry.id} className="border-b last:border-0">
                  <td className="p-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${entry.type === "credit" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                    >
                      {entry.type}
                    </span>
                  </td>
                  <td className="p-2">₦{entry.amount.toLocaleString()}</td>
                  <td className="p-2">{entry.date}</td>
                  <td className="p-2">{entry.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Wallet;
