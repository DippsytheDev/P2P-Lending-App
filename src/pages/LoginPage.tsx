import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { login as apiLogin } from "../auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import { set } from "react-hook-form";

interface DecodedToken {
  firstName: string;
  lastName: string;
  email: string;
  role: "Lender" | "Borrower" | "Admin";
  userId: string;
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await apiLogin(email, password);
      console.log("Login data:", data);
      const rawToken = data.token.data.token;
      const decoded = jwtDecode<any>(rawToken);
      console.log("Raw decoded token:", decoded); // Debugging

      const decodedUser: DecodedToken = {
        firstName:
          decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
        lastName:
          decoded[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname"
          ],
        email:
          decoded[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
          ],
        role: decoded[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ],
        userId:
          decoded[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
          ],
      };

      console.log("Decoded User(mapped):", decodedUser);
      login(
        {
          firstName: decodedUser.firstName,
          lastName: decodedUser.lastName,
          email: decodedUser.email,
          role: decodedUser.role,
          userId: decodedUser.userId,
        },
        rawToken
      );
      navigate("/dashboard");
      setLoading(false);
    } catch (err: any) {
      console.error("Login error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Login failed. Check credentials.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white to-[#FDF9F2]">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 bg-white p-8 rounded-[12px] shadow-lg w-full max-w-sm transition-all duration-300 ease-in-out"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        <h2 className="text-3xl font-bold mb-2 text-center text-[#1A1A1A]">
          Login
        </h2>
        <p className="text-[#4B4B4B] text-base text-center mb-4">
          Welcome back! Please sign in to your account.
        </p>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="h-12 text-base"
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="h-12 text-base"
        />
        <Button
          type="submit"
          variant="default"
          className="w-full py-3 rounded-[8px] font-bold text-white text-base bg-[#1A1A1A] hover:bg-[#333] transition-all duration-300 ease-in-out disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={loading}
        >
          Login
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            const mockUser = {
              firstName: "Admin",
              lastName: "User",
              email: "admin@site.com",
              role: "Admin",
              userId: "admin-user-id",
            };
            const mockToken = "dev-admin-token";

            localStorage.setItem("user", JSON.stringify(mockUser));
            localStorage.setItem("token", mockToken);

            login(mockUser, mockToken);
            navigate("/dashboard");
          }}
          className="w-full py-3 rounded-[8px] font-bold text-[#333] bg-[#F4F4F4] border border-[#DDDDDD] hover:bg-[#EDEDED] transition-all duration-300 ease-in-out"
          disabled={loading}
        >
          Dev Login as Admin
        </Button>
        <p className="text-sm mt-2 text-center text-[#4B4B4B]">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-[#1A1A1A] underline hover:text-[#333] transition-all duration-300 ease-in-out"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
