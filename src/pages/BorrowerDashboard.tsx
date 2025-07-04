// pages/BorrowerDashboard.tsx
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import {
  BarChart2,
  Bell,
  User,
  FileText,
  CreditCard,
  Clock,
  HelpCircle,
  Settings,
  Headphones,
} from "lucide-react";

type Pool = {
  id: string;
  name: string;
  interestRate: number;
  minimumAmount: number;
  maximumAmount: number;
  description: string;
};

type LoanRequest = {
  id: string;
  requestedAmount: number;
  durationInMonths: number;
  purpose: string;
  status: string;
  createdAt: string;
};

const sidebarMenu = [
  { key: "overview", label: "Overview", icon: FileText },
  { key: "apply", label: "Apply", icon: CreditCard },
  { key: "credit", label: "Credit Score", icon: BarChart2 },
  { key: "profile", label: "Profile", icon: User },
];
const sidebarFooter = [
  { key: "support", label: "Support", icon: HelpCircle },
  { key: "settings", label: "Settings", icon: Settings },
  { key: "customer", label: "Customer Service", icon: Headphones },
];
const metricCards = [
  { title: "Total Borrowed", value: 72000.38, sub: "" },
  { title: "Current Loan", value: 10000.0, sub: "" },
  { title: "Outstanding Balance", value: 9156.28, sub: "" },
  { title: "Next Payment", value: "31/06/2025", sub: "" },
];
const loanByMonth = [20, 22, 25, 28, 10, 12];
const repayByMonth = [18, 20, 23, 25, 8, 10];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Other"];
const repaymentHistory = [
  { date: "31/01/2025", amount: 10000, status: "Completed" },
  { date: "31/01/2025", amount: 10000, status: "Completed" },
  { date: "31/01/2025", amount: 10000, status: "Completed" },
  { date: "31/01/2025", amount: 10000, status: "Completed" },
  { date: "31/01/2025", amount: 10000, status: "Pending" },
  { date: "31/01/2025", amount: 10000, status: "Pending" },
];
const notifications = [
  {
    user: "You",
    text: "paid for Month January",
    time: "20 weeks ago",
    avatar: "",
  },
  {
    user: "You",
    text: "paid for Month January",
    time: "16 weeks ago",
    avatar: "",
  },
  {
    user: "You",
    text: "paid for Month January",
    time: "16 weeks ago",
    avatar: "",
  },
  {
    user: "You",
    text: "paid for Month January",
    time: "16 weeks ago",
    avatar: "",
  },
];
const accountManagers = [
  { name: "Ahmed Kola", avatar: "" },
  { name: "Drew Cano", avatar: "" },
  { name: "Chima Julia", avatar: "" },
  { name: "Andi Lane", avatar: "" },
];

const statusBadge = (status: string) => {
  if (status === "Completed") return "bg-[#E9F9E1] text-[#4CAF50]";
  if (status === "Pending") return "bg-[#FFF4D9] text-[#F5A623]";
  return "bg-gray-200 text-gray-600";
};

export default function BorrowerDashboard() {
  const { user, token } = useAuth();
  const [pools, setPools] = useState<Pool[]>([]);
  const [selectedPool, setSelectedPool] = useState<Pool | null>(null);
  const [requestedAmount, setRequestedAmount] = useState("");
  const [duration, setDuration] = useState("");
  const [purpose, setPurpose] = useState("");

  // New state for loan requests
  const [loanRequests, setLoanRequests] = useState<LoanRequest[]>([]);
  const [loadingLoans, setLoadingLoans] = useState(false);
  const [loanError, setLoanError] = useState<string | null>(null);

  const [activeMenu, setActiveMenu] = useState("overview");
  const [applyTab, setApplyTab] = useState<"pools" | "requests">("pools");
  const [loanForm, setLoanForm] = useState({
    requestedAmount: "",
    purpose: "",
    durationInMonths: "",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchMyPools = async () => {
      try {
        const res = await axios.get(
          "https://lendpool-api-web.onrender.com/lendpool/api/v1/borrower/get-all-pools",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPools(res.data.data);
      } catch (err) {
        console.error("Failed to fetch pools:", err);
      }
    };

    fetchMyPools();
  }, [token]);

  // Fetch loan requests
  useEffect(() => {
    const fetchLoanRequests = async () => {
      setLoadingLoans(true);
      setLoanError(null);
      try {
        const res = await axios.get(
          "https://lendpool-api-web.onrender.com/lendpool/api/v1/loan/my-requests",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLoanRequests(res.data.data);
      } catch (err: any) {
        setLoanError("Failed to fetch loan requests.");
      } finally {
        setLoadingLoans(false);
      }
    };
    if (token) fetchLoanRequests();
  }, [token]);

  // Fetch loan requests when tab is 'requests'
  useEffect(() => {
    if (activeMenu === "apply" && applyTab === "requests" && token) {
      axios
        .get(
          "https://lendpool-api-web.onrender.com/lendpool/api/v1/loan/my-requests",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => setLoanRequests(res.data.data || []))
        .catch(() => setLoanRequests([]));
    }
  }, [activeMenu, applyTab, token]);

  const handleLoanFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoanForm({ ...loanForm, [e.target.name]: e.target.value });
  };

  const handleRequestLoan = async () => {
    if (!selectedPool) return;
    setSubmitting(true);
    try {
      await axios.post(
        "https://lendpool-api-web.onrender.com/api/loan/request-loan",
        {
          requestedAmount: Number(loanForm.requestedAmount),
          purpose: loanForm.purpose,
          durationInMonths: Number(loanForm.durationInMonths),
          matchedPoolId: selectedPool.id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      window.alert("Loan request submitted!");
      setSelectedPool(null);
      setLoanForm({ requestedAmount: "", purpose: "", durationInMonths: "" });
    } catch (err) {
      window.alert("Failed to submit loan request");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen h-screen bg-[#FAFAFA] font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white rounded-xl shadow-lg flex flex-col py-8 px-4 h-full min-h-screen justify-between">
        <div>
          <div className="mb-10 flex items-center gap-2 px-2">
            <span className="text-2xl font-extrabold text-[#7ED321] tracking-tight">
              LendPool
            </span>
          </div>
          <nav className="flex flex-col gap-2">
            {sidebarMenu.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveMenu(key)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all ${activeMenu === key ? "bg-[#E9F9E1] text-[#7ED321] font-bold" : "text-[#222] hover:bg-[#E9F9E1] hover:text-[#7ED321]"}`}
                aria-label={label}
                tabIndex={0}
              >
                <Icon className="w-5 h-5" />
                {label}
              </button>
            ))}
          </nav>
        </div>
        <div className="flex flex-col gap-2 mt-8 border-t border-[#F3F3F3] pt-6">
          {sidebarFooter.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-[#888] hover:bg-[#E9F9E1] hover:text-[#7ED321] transition-all"
              aria-label={label}
              tabIndex={0}
            >
              <Icon className="w-5 h-5" />
              {label}
            </button>
          ))}
          <div className="flex items-center gap-3 mt-6 px-4 py-3 rounded-lg bg-[#E9F9E1]">
            <div className="w-10 h-10 rounded-full bg-[#7ED321] flex items-center justify-center text-lg font-bold text-white">
              {user?.firstName?.[0] || "U"}
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-[#7ED321]">Welcome back,</span>
              <span className="text-base font-semibold text-[#222]">
                {user?.firstName && user.firstName.trim()
                  ? user.firstName.trim()
                  : "User"}
              </span>
            </div>
          </div>
        </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 py-10 px-8 h-full min-h-screen overflow-auto">
        <header className="mb-8">
          <h2 className="text-3xl font-extrabold text-[#222]">
            Welcome Borrower,{" "}
            {user?.firstName && user.firstName.trim()
              ? user.firstName.trim()
              : "User"}
          </h2>
        </header>
        {activeMenu === "overview" && (
          <>
            {/* Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {metricCards.map((card, i) => (
                <div
                  key={i}
                  className="bg-white rounded-[8px] shadow-sm p-4 flex flex-col items-center text-center"
                >
                  <div className="text-[14px] text-[#888] mb-2 font-medium">
                    {card.title}
                  </div>
                  <div className="text-[22px] font-bold text-[#1A1A1A] mb-1">
                    {typeof card.value === "number"
                      ? `₦${card.value.toLocaleString()}`
                      : card.value}
                  </div>
                  {card.sub && (
                    <div className="text-[13px] text-[#B0B0B0]">{card.sub}</div>
                  )}
                </div>
              ))}
            </div>
            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Loan by Month Chart */}
              <div className="bg-white rounded-[8px] p-4 shadow-sm flex flex-col">
                <div className="text-[14px] text-[#888] font-medium mb-2">
                  Loan by Month
                </div>
                <div className="flex items-end gap-3 h-40">
                  {loanByMonth.map((val, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center justify-end flex-1"
                    >
                      <div
                        className="w-7 rounded-[4px]"
                        style={{
                          height: `${val * 6}px`,
                          background: [
                            "#B8E986",
                            "#50E3C2",
                            "#4A90E2",
                            "#000000",
                            "#D3D3D3",
                          ][i % 5],
                        }}
                      ></div>
                      <div className="text-[12px] text-[#888] mt-2">
                        {months[i]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Repayments by Month Chart */}
              <div className="bg-white rounded-[8px] p-4 shadow-sm flex flex-col">
                <div className="text-[14px] text-[#888] font-medium mb-2">
                  Repayments by Month
                </div>
                <div className="flex items-end gap-3 h-40">
                  {repayByMonth.map((val, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center justify-end flex-1"
                    >
                      <div
                        className="w-7 rounded-[4px]"
                        style={{
                          height: `${val * 6}px`,
                          background: [
                            "#B8E986",
                            "#50E3C2",
                            "#4A90E2",
                            "#000000",
                            "#D3D3D3",
                          ][i % 5],
                        }}
                      ></div>
                      <div className="text-[12px] text-[#888] mt-2">
                        {months[i]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Repayment History Table */}
            <div className="bg-white rounded-[8px] shadow-sm p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-[15px] font-semibold text-[#1A1A1A]">
                  Repayment History
                </div>
                <button className="text-[13px] text-[#4A90E2] font-medium hover:underline">
                  See all
                </button>
              </div>
              <table className="w-full text-[14px]">
                <thead>
                  <tr className="text-[#888] border-b border-[#E0E0E0]">
                    <th className="py-2 text-left font-medium">Due Dates</th>
                    <th className="py-2 text-left font-medium">Amount Paid</th>
                    <th className="py-2 text-left font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {repaymentHistory.map((row, i) => (
                    <tr
                      key={i}
                      className="border-b border-[#F3F3F3] hover:bg-[#FAFAFA] transition"
                    >
                      <td className="py-3">{row.date}</td>
                      <td className="py-3 font-semibold">
                        ₦{row.amount.toLocaleString()}
                      </td>
                      <td className="py-3">
                        <span
                          className={`inline-block px-3 py-1 text-[13px] font-medium rounded-[20px] ${statusBadge(row.status)}`}
                        >
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
        {activeMenu === "apply" && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-md p-8">
              <div className="flex gap-4 mb-6">
                <button
                  onClick={() => setApplyTab("pools")}
                  className={`px-6 py-2 rounded-full font-semibold transition-all shadow-sm border ${applyTab === "pools" ? "bg-[#4A90E2] text-white border-[#4A90E2]" : "bg-[#F3F4F6] text-[#222] border-[#E0E0E0] hover:bg-[#E9F9E1] hover:text-[#4A90E2]"}`}
                >
                  Available Pools
                </button>
                <button
                  onClick={() => setApplyTab("requests")}
                  className={`px-6 py-2 rounded-full font-semibold transition-all shadow-sm border ${applyTab === "requests" ? "bg-[#4A90E2] text-white border-[#4A90E2]" : "bg-[#F3F4F6] text-[#222] border-[#E0E0E0] hover:bg-[#E9F9E1] hover:text-[#4A90E2]"}`}
                >
                  Loan Requests
                </button>
              </div>
              {applyTab === "pools" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {pools.map((pool) => (
                    <div
                      key={pool.id}
                      className="bg-[#F9FAFB] rounded-lg shadow p-6 flex flex-col gap-2 border border-[#E0E0E0]"
                    >
                      <div className="text-lg font-bold text-[#222] mb-1">
                        {pool.name}
                      </div>
                      <div className="text-sm text-[#888] mb-2">
                        {pool.description}
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm mb-2">
                        <span>
                          <strong>Interest Rate:</strong> {pool.interestRate}%
                        </span>
                        <span>
                          <strong>Range:</strong> ₦
                          {pool.minimumAmount.toLocaleString()} – ₦
                          {pool.maximumAmount.toLocaleString()}
                        </span>
                      </div>
                      <Dialog
                        open={selectedPool?.id === pool.id}
                        onOpenChange={(open) =>
                          setSelectedPool(open ? pool : null)
                        }
                      >
                        <DialogTrigger asChild>
                          <Button className="mt-2 bg-[#4A90E2] hover:bg-[#357ABD] text-white font-semibold px-4 py-2 rounded-lg transition">
                            Request Loan
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>
                              Request Loan from {pool.name}
                            </DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <Input
                              name="requestedAmount"
                              type="number"
                              placeholder="Amount (₦)"
                              value={loanForm.requestedAmount}
                              onChange={handleLoanFormChange}
                            />
                            <Input
                              name="purpose"
                              type="text"
                              placeholder="Purpose"
                              value={loanForm.purpose}
                              onChange={handleLoanFormChange}
                            />
                            <Input
                              name="durationInMonths"
                              type="number"
                              placeholder="Duration (months)"
                              value={loanForm.durationInMonths}
                              onChange={handleLoanFormChange}
                            />
                            <Button
                              onClick={handleRequestLoan}
                              disabled={submitting}
                              className="w-full bg-[#4A90E2] text-white"
                            >
                              {submitting ? "Submitting..." : "Submit Request"}
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  ))}
                </div>
              )}
              {applyTab === "requests" && (
                <div className="mt-6">
                  <h3 className="text-lg font-bold mb-4 text-[#4A90E2]">
                    My Loan Requests
                  </h3>
                  <table className="w-full text-[14px]">
                    <thead>
                      <tr className="text-[#888] border-b border-[#E0E0E0]">
                        <th className="py-2 text-left font-medium">Amount</th>
                        <th className="py-2 text-left font-medium">Purpose</th>
                        <th className="py-2 text-left font-medium">Duration</th>
                        <th className="py-2 text-left font-medium">Status</th>
                        <th className="py-2 text-left font-medium">
                          Requested
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {loanRequests.map((req) => (
                        <tr
                          key={req.id}
                          className="border-b border-[#F3F3F3] hover:bg-[#FAFAFA] transition"
                        >
                          <td className="py-3">
                            ₦{req.requestedAmount.toLocaleString()}
                          </td>
                          <td className="py-3">{req.purpose}</td>
                          <td className="py-3">{req.durationInMonths} mo</td>
                          <td className="py-3">
                            <span
                              className={`inline-block px-3 py-1 text-[13px] font-medium rounded-[20px] ${req.status === "pending" ? "bg-[#FFF4D9] text-[#F5A623]" : req.status === "approved" ? "bg-[#E9F9E1] text-[#4CAF50]" : "bg-gray-200 text-gray-600"}`}
                            >
                              {req.status.charAt(0).toUpperCase() +
                                req.status.slice(1)}
                            </span>
                          </td>
                          <td className="py-3">
                            {new Date(req.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
        {activeMenu === "credit" && (
          <div className="max-w-xl mx-auto">
            <div className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center">
              <h2 className="text-2xl font-bold mb-4 text-[#4A90E2]">
                Credit Score
              </h2>
              <div className="text-5xl font-extrabold text-[#7ED321] mb-2">
                720
              </div>
              <div className="text-[#888] mb-4">
                Your credit score is great!
              </div>
              <ul className="text-[#555] text-sm list-disc pl-6 mb-2">
                <li>Pay your loans on time</li>
                <li>Keep your outstanding balance low</li>
                <li>Build a long borrowing history</li>
              </ul>
            </div>
          </div>
        )}
        {activeMenu === "profile" && (
          <div className="max-w-xl mx-auto">
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold mb-4 text-[#4A90E2]">
                Profile
              </h2>
              {/* Editable profile form here */}
            </div>
          </div>
        )}
      </main>
      {/* Right Sidebar */}
      <aside className="w-[260px] bg-[#FAFAFA] border-l border-[#E0E0E0] flex flex-col py-8 px-4 min-h-screen h-full">
        {/* Notifications */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="w-5 h-5 text-[#555]" />
            <span className="text-[15px] font-semibold text-[#1A1A1A]">
              Repayments
            </span>
          </div>
          <ul className="space-y-3">
            {notifications.map((n, i) => (
              <li
                key={i}
                className="flex items-center gap-3 text-[13px] text-[#555]"
              >
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#F4F4F4]">
                  <User className="w-4 h-4 text-[#888]" />
                </span>
                <span className="flex-1">
                  {n.user} {n.text}
                </span>
                <span className="text-[#B0B0B0] text-xs">{n.time}</span>
              </li>
            ))}
          </ul>
        </div>
        {/* Account Managers */}
        <div>
          <div className="text-[15px] font-semibold text-[#1A1A1A] mb-4">
            Account Managers
          </div>
          <ul className="space-y-3">
            {accountManagers.map((m, i) => (
              <li key={i} className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#F4F4F4]">
                  <User className="w-5 h-5 text-[#888]" />
                </span>
                <span className="text-[14px] text-[#222]">{m.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}
