import { useState } from "react";
import { mockUsers } from "../data/users";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Mock data for admin features
const mockLoanRequests = [
  {
    id: "1",
    borrower: "Jane Doe",
    amount: 500000,
    purpose: "Business Expansion",
    duration: 12,
    status: "pending",
    date: "2024-06-20",
    pool: "Pool A",
  },
  {
    id: "2",
    borrower: "John Smith",
    amount: 200000,
    purpose: "Medical Bills",
    duration: 6,
    status: "pending",
    date: "2024-06-18",
    pool: null,
  },
];
const mockPools = [
  { id: "a", name: "Pool A" },
  { id: "b", name: "Pool B" },
];
const mockWithdrawals = [
  {
    id: "w1",
    user: "Jane Doe",
    amount: 100000,
    status: "pending",
    date: "2024-06-21",
  },
];
const mockKYC = [
  { id: "k1", user: "John Smith", status: "pending", submitted: "2024-06-19" },
];

const getStatusColor = (status: string) => {
  if (status === "pending") return "bg-yellow-100 text-yellow-800";
  if (status === "approved" || status === "completed")
    return "bg-green-100 text-green-800";
  if (status === "rejected") return "bg-red-100 text-red-800";
  return "bg-gray-100 text-gray-800";
};

const AdminDashboard = () => {
  const [loanMatches, setLoanMatches] = useState<{
    [key: string]: string | null;
  }>({});

  // Loan matching handler (mock)
  const handleMatch = (loanId: string, poolId: string) => {
    setLoanMatches((prev) => ({ ...prev, [loanId]: poolId }));
    alert(`Loan ${loanId} matched to pool ${poolId}`);
  };

  // Withdrawal approval handler (mock)
  const handleApproveWithdrawal = (id: string) => {
    alert(`Withdrawal ${id} approved!`);
  };

  // KYC verification handler (mock)
  const handleVerifyKYC = (id: string) => {
    alert(`KYC ${id} verified!`);
  };

  // Loan agreement PDF handler (mock)
  const handleGeneratePDF = (id: string) => {
    alert(`PDF generated for loan ${id}`);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-10 px-4 font-sans">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10 text-center">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#000] leading-tight tracking-tight">
            Admin Dashboard
          </h2>
          <p className="text-[#4F4F4F] mt-2 text-sm sm:text-base">
            Logged in as:{" "}
            <span className="font-semibold capitalize">Admin</span>
          </p>
        </header>
        {/* Loan Matching Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">
              Match Loan Requests to Pools
            </CardTitle>
          </CardHeader>
          <CardContent>
            <table className="min-w-full text-sm mb-4">
              <thead>
                <tr className="bg-blue-50">
                  <th className="p-2 text-left font-semibold">Borrower</th>
                  <th className="p-2 text-left font-semibold">Amount</th>
                  <th className="p-2 text-left font-semibold">Purpose</th>
                  <th className="p-2 text-left font-semibold">Duration</th>
                  <th className="p-2 text-left font-semibold">Assign Pool</th>
                  <th className="p-2 text-left font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {mockLoanRequests.map((req) => (
                  <tr key={req.id} className="border-b last:border-0">
                    <td className="p-2 text-[#222]">{req.borrower}</td>
                    <td className="p-2">₦{req.amount.toLocaleString()}</td>
                    <td className="p-2 text-[#222]">{req.purpose}</td>
                    <td className="p-2 text-[#222]">{req.duration} mo</td>
                    <td className="p-2">
                      <select
                        className="border rounded px-2 py-1"
                        value={loanMatches[req.id] || ""}
                        onChange={(e) =>
                          setLoanMatches((prev) => ({
                            ...prev,
                            [req.id]: e.target.value,
                          }))
                        }
                      >
                        <option value="">Select Pool</option>
                        {mockPools.map((pool) => (
                          <option key={pool.id} value={pool.id}>
                            {pool.name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-2">
                      <Button
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-semibold transition-transform transform hover:scale-105"
                        onClick={() =>
                          handleMatch(req.id, loanMatches[req.id] || "")
                        }
                        disabled={!loanMatches[req.id]}
                      >
                        Match
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
        {/* Withdrawal Approvals */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">Withdrawal Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="min-w-full text-sm mb-4">
              <thead>
                <tr className="bg-blue-50">
                  <th className="p-2 text-left font-semibold">User</th>
                  <th className="p-2 text-left font-semibold">Amount</th>
                  <th className="p-2 text-left font-semibold">Status</th>
                  <th className="p-2 text-left font-semibold">Date</th>
                  <th className="p-2 text-left font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {mockWithdrawals.map((w) => (
                  <tr key={w.id} className="border-b last:border-0">
                    <td className="p-2 text-[#222]">{w.user}</td>
                    <td className="p-2">₦{w.amount.toLocaleString()}</td>
                    <td className="p-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(w.status)}`}
                      >
                        {w.status.charAt(0).toUpperCase() + w.status.slice(1)}
                      </span>
                    </td>
                    <td className="p-2 text-[#222]">
                      {new Date(w.date).toLocaleDateString()}
                    </td>
                    <td className="p-2">
                      <Button
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-semibold transition-transform transform hover:scale-105"
                        onClick={() => handleApproveWithdrawal(w.id)}
                      >
                        Approve
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
        {/* KYC Verification */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">KYC Verification</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="min-w-full text-sm mb-4">
              <thead>
                <tr className="bg-blue-50">
                  <th className="p-2 text-left font-semibold">User</th>
                  <th className="p-2 text-left font-semibold">Status</th>
                  <th className="p-2 text-left font-semibold">Submitted</th>
                  <th className="p-2 text-left font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {mockKYC.map((k) => (
                  <tr key={k.id} className="border-b last:border-0">
                    <td className="p-2 text-[#222]">{k.user}</td>
                    <td className="p-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(k.status)}`}
                      >
                        {k.status.charAt(0).toUpperCase() + k.status.slice(1)}
                      </span>
                    </td>
                    <td className="p-2 text-[#222]">
                      {new Date(k.submitted).toLocaleDateString()}
                    </td>
                    <td className="p-2">
                      <Button
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-semibold transition-transform transform hover:scale-105"
                        onClick={() => handleVerifyKYC(k.id)}
                      >
                        Verify
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
        {/* Loan Agreement PDF */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">
              Generate Loan Agreement PDF
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-semibold transition-transform transform hover:scale-105"
              onClick={() => handleGeneratePDF("1")}
            >
              Generate PDF for Loan #1
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
