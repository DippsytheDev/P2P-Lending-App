// src/pages/Dashboard.tsx
import { useAuth } from "../context/AuthContext";
import LenderDashboard from "../pages/LenderDashboard";
import BorrowerDashboard from "../pages/BorrowerDashboard";
import AdminDashboard from "../pages/AdminDashboard";

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) return <div>Loading user info...</div>;

  if (user.role === "Lender") return <LenderDashboard />;
  if (user.role === "Borrower") return <BorrowerDashboard />;
  if (user.role === "Admin") return <AdminDashboard />;

  return <div>Invalid role: {user.role}</div>;
};

export default Dashboard;