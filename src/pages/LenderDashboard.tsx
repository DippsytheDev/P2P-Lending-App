import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";
import LenderForm from "./CreatePool";
import MyPools from "./MyPools";
import JoinPools from "./JoinPools";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  BarChart2,
  PieChart,
  User,
  Wallet,
  Layers,
  HelpCircle,
  Settings,
  Headphones,
  Home,
  Loader2,
} from "lucide-react";
import Profile from "./Profile";
import WalletPage from "./WalletPage";
import api from "../lib/axios";

// Types for API data
interface FundedLoan {
  id: string;
  borrower: string;
  amount: number;
  pool: string;
  status: string;
  date: string;
}

interface Repayment {
  id: string;
  loan: string;
  amount: number;
  date: string;
}

interface PoolPerformance {
  pool: string;
  earnings: number;
}

interface LenderSummary {
  totalEarnings: number;
  totalFundedLoans: number;
  activeLoans: number;
  completedLoans: number;
}

const LenderDashboard = () => {
  const { user, token } = useAuth();
  const [selectedMenu, setSelectedMenu] = useState("overview");
  const [openForm, setOpenForm] = useState(false);
  const poolOpenForm = () => setOpenForm(!openForm);
  const [tab, setTab] = useState("my-pools");

  // State for real data
  const [fundedLoans, setFundedLoans] = useState<FundedLoan[]>([]);
  const [repayments, setRepayments] = useState<Repayment[]>([]);
  const [poolPerformance, setPoolPerformance] = useState<PoolPerformance[]>([]);
  const [lenderSummary, setLenderSummary] = useState<LenderSummary | null>(null);
  
  // Loading and error states
  const [loadingLoans, setLoadingLoans] = useState(false);
  const [loadingRepayments, setLoadingRepayments] = useState(false);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [error, setError] = useState<string | null>(null);

  console.log("User in LenderDashboard:", user);

  const displayName =
    user?.firstName && user.firstName.trim() ? user.firstName.trim() : "User";

  // Fetch lender summary data
  useEffect(() => {
    const fetchLenderSummary = async () => {
      if (!token) return;
      
      setLoadingSummary(true);
      setError(null);
      try {
        const response = await api.get("/lender/summary/");
        setLenderSummary(response.data.data);
      } catch (err: any) {
        console.error("Failed to fetch lender summary:", err);
        setError("Failed to load dashboard summary");
      } finally {
        setLoadingSummary(false);
      }
    };

    fetchLenderSummary();
  }, [token]);

  // Fetch funded loans
  useEffect(() => {
    const fetchFundedLoans = async () => {
      if (!token) return;
      
      setLoadingLoans(true);
      setError(null);
      try {
        const response = await api.get("/lender/loans/");
        setFundedLoans(response.data.data || []);
      } catch (err: any) {
        console.error("Failed to fetch funded loans:", err);
        setError("Failed to load funded loans");
      } finally {
        setLoadingLoans(false);
      }
    };

    fetchFundedLoans();
  }, [token]);

  // Fetch repayments
  useEffect(() => {
    const fetchRepayments = async () => {
      if (!token) return;
      
      setLoadingRepayments(true);
      setError(null);
      try {
        const response = await api.get("/api/repayments");
        setRepayments(response.data.data || []);
      } catch (err: any) {
        console.error("Failed to fetch repayments:", err);
        setError("Failed to load repayment data");
      } finally {
        setLoadingRepayments(false);
      }
    };

    fetchRepayments();
  }, [token]);

  // Calculate pool performance from funded loans
  useEffect(() => {
    if (fundedLoans.length > 0) {
      const poolMap = new Map<string, number>();
      
      fundedLoans.forEach(loan => {
        const currentEarnings = poolMap.get(loan.pool) || 0;
        // Calculate earnings based on loan status and amount
        const earnings = loan.status === 'repaid' ? loan.amount * 0.1 : 0; // 10% interest as example
        poolMap.set(loan.pool, currentEarnings + earnings);
      });
      
      const performance = Array.from(poolMap.entries()).map(([pool, earnings]) => ({
        pool,
        earnings
      }));
      
      setPoolPerformance(performance);
    }
  }, [fundedLoans]);

  const getStatusColor = (status: string) => {
    if (status === "active") return "bg-yellow-100 text-yellow-800";
    if (status === "repaid" || status === "completed")
      return "bg-green-100 text-green-800";
    if (status === "defaulted") return "bg-red-100 text-red-800";
    return "bg-gray-100 text-gray-800";
  };

  const menuItems = [
    { key: "overview", label: "Overview", icon: Home },
    { key: "profile", label: "Profile", icon: User },
    { key: "wallet", label: "Wallet", icon: Wallet },
    { key: "pools", label: "Pools", icon: Layers },
  ];
  const bottomMenu = [
    { key: "support", label: "Support", icon: HelpCircle },
    { key: "settings", label: "Settings", icon: Settings },
    { key: "customer", label: "Customer Service", icon: Headphones },
  ];

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
            {menuItems.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setSelectedMenu(key)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all ${selectedMenu === key ? "bg-[#E9F9E1] text-[#7ED321] font-bold" : "text-[#222] hover:bg-[#E9F9E1] hover:text-[#7ED321]"}`}
                aria-label={label}
              >
                <Icon className="w-5 h-5" />
                {label}
              </button>
            ))}
          </nav>
        </div>
        <div className="flex flex-col gap-2 mt-8 border-t border-[#F3F3F3] pt-6">
          {bottomMenu.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-[#888] hover:bg-[#E9F9E1] hover:text-[#7ED321] transition-all"
              aria-label={label}
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
                {displayName}
              </span>
            </div>
          </div>
        </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 py-10 px-8 h-full min-h-screen overflow-auto">
        <header className="mb-8">
          <h2 className="text-3xl font-extrabold text-[#222]">
            Welcome back Lender {displayName}
          </h2>
        </header>
        {selectedMenu === "overview" && (
          <section className="space-y-8">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-xl shadow-md p-8 flex flex-col gap-8">
                {/* Funded Loans */}
                <div>
                  <div className="text-xl font-bold mb-4 text-[#222] flex items-center gap-2">
                    Funded Loans
                    {loadingLoans && <Loader2 className="w-5 h-5 animate-spin" />}
                  </div>
                  {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
                      {error}
                    </div>
                  )}
                  <table className="min-w-full text-sm mb-4">
                    <thead>
                      <tr className="bg-blue-50">
                        <th className="p-2 text-left font-semibold">
                          Borrower
                        </th>
                        <th className="p-2 text-left font-semibold">Amount</th>
                        <th className="p-2 text-left font-semibold">Pool</th>
                        <th className="p-2 text-left font-semibold">Status</th>
                        <th className="p-2 text-left font-semibold">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fundedLoans.length === 0 && !loadingLoans ? (
                        <tr>
                          <td colSpan={5} className="p-4 text-center text-gray-500">
                            No funded loans found
                          </td>
                        </tr>
                      ) : (
                        fundedLoans.map((loan) => (
                          <tr key={loan.id} className="border-b last:border-0">
                            <td className="p-2">{loan.borrower}</td>
                            <td className="p-2">
                              ₦{loan.amount.toLocaleString()}
                            </td>
                            <td className="p-2">{loan.pool}</td>
                            <td className="p-2">
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(loan.status)}`}
                              >
                                {loan.status}
                              </span>
                            </td>
                            <td className="p-2">
                              {new Date(loan.date).toLocaleDateString()}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
                {/* Repayments & Earnings */}
                <div>
                  <div className="text-xl font-bold mb-4 text-[#222] flex items-center gap-2">
                    Repayments & Earnings
                    {loadingRepayments && <Loader2 className="w-5 h-5 animate-spin" />}
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-4">
                    <div className="bg-[#FFFFFF] rounded-lg shadow p-4 flex items-center gap-4">
                      <span className="text-2xl font-bold text-[#7ED321]">
                        ₦{lenderSummary?.totalEarnings?.toLocaleString() || "0"}
                      </span>
                      <span className="text-[#4F4F4F]">Total Earnings</span>
                    </div>
                    <div className="flex-1">
                      <table className="min-w-full text-sm">
                        <thead>
                          <tr className="bg-blue-50">
                            <th className="p-2 text-left font-semibold">
                              Loan
                            </th>
                            <th className="p-2 text-left font-semibold">
                              Amount
                            </th>
                            <th className="p-2 text-left font-semibold">
                              Date
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {repayments.length === 0 ? (
                            <tr>
                              <td colSpan={3} className="p-4 text-center text-gray-500">
                                No repayment data available
                              </td>
                            </tr>
                          ) : (
                            repayments.map((r) => (
                              <tr key={r.id} className="border-b last:border-0">
                                <td className="p-2">{r.loan}</td>
                                <td className="p-2">
                                  ₦{r.amount.toLocaleString()}
                                </td>
                                <td className="p-2">
                                  {new Date(r.date).toLocaleDateString()}
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                {/* Pool Performance */}
                <div>
                  <div className="text-xl font-bold mb-4 text-[#222] flex items-center gap-2">
                    <BarChart2 className="w-5 h-5 text-[#4A90E2]" /> Pool
                    Performance
                  </div>
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    {/* Placeholder for Bar Chart */}
                    <div className="flex-1 flex flex-col items-center">
                      <div className="w-40 h-40 bg-[#F7F7F7] rounded-lg flex items-center justify-center mb-2">
                        <BarChart2 className="w-16 h-16 text-[#B8E986]" />
                      </div>
                      <span className="text-[#4F4F4F] text-sm">
                        Bar Chart Placeholder
                      </span>
                    </div>
                    {/* Pool Earnings Table */}
                    <div className="flex-1">
                      <table className="min-w-full text-sm">
                        <thead>
                          <tr className="bg-blue-50">
                            <th className="p-2 text-left font-semibold">
                              Pool
                            </th>
                            <th className="p-2 text-left font-semibold">
                              Earnings
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {poolPerformance.length === 0 ? (
                            <tr>
                              <td colSpan={2} className="p-4 text-center text-gray-500">
                                No pool performance data available
                              </td>
                            </tr>
                          ) : (
                            poolPerformance.map((p) => (
                              <tr key={p.pool} className="border-b last:border-0">
                                <td className="p-2">{p.pool}</td>
                                <td className="p-2">
                                  ₦{p.earnings.toLocaleString()}
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
        {selectedMenu === "profile" && (
          <section>
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-xl shadow-md p-8">
                <Profile />
              </div>
            </div>
          </section>
        )}
        {selectedMenu === "wallet" && (
          <section>
            <div className="bg-white rounded-xl shadow-md p-8 max-w-3xl mx-auto">
              <WalletPage />
            </div>
          </section>
        )}
        {selectedMenu === "pools" && (
          <section>
            <div className="max-w-6xl mx-auto">
              <div className="bg-white rounded-xl shadow-md p-8">
                <h2 className="text-2xl font-bold mb-6 text-[#7ED321]">
                  Pool Management
                </h2>
                <div className="mb-8">
                  <button
                    onClick={poolOpenForm}
                    className="bg-[#7ED321] hover:bg-[#6BC017] text-white font-bold px-6 py-2 rounded-lg transition mb-4"
                  >
                    {openForm ? "Close Pool Form" : "Create Pool"}
                  </button>
                  {openForm && <LenderForm />}
                </div>
                <div className="mt-8">
                  <div className="flex gap-4 mb-4">
                    <button
                      onClick={() => setTab("my-pools")}
                      className={`px-6 py-2 rounded-lg font-semibold transition-all ${tab === "my-pools" ? "bg-[#7ED321] text-white" : "bg-[#F3F4F6] text-[#222] hover:bg-[#E9F9E1] hover:text-[#7ED321]"}`}
                    >
                      My Pools
                    </button>
                    <button
                      onClick={() => setTab("join-pools")}
                      className={`px-6 py-2 rounded-lg font-semibold transition-all ${tab === "join-pools" ? "bg-[#7ED321] text-white" : "bg-[#F3F4F6] text-[#222] hover:bg-[#E9F9E1] hover:text-[#7ED321]"}`}
                    >
                      Join Pools
                    </button>
                  </div>
                  {tab === "my-pools" && <MyPools />}
                  {tab === "join-pools" && <JoinPools />}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default LenderDashboard;
