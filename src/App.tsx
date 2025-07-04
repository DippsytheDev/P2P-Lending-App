import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./pages/Unauthorized";
import Profile from "./pages/Profile";
import LenderPools from "./components/LenderPools";
import WalletPage from "./pages/WalletPage";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={["Lender", "Borrower", "Admin"]}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/wallet"
        element={
          <ProtectedRoute allowedRoles={["Lender", "Borrower", "Admin"]}>
            <WalletPage />
          </ProtectedRoute>
        }
      />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/lender/pools" element={<LenderPools />} />
    </Routes>
  );
}

export default App;
