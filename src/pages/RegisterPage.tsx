import React, { useState } from "react";
import { register } from "../auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"Lender" | "Borrower">("Borrower");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const trimmedFirstName = firstName.trim();
      const trimmedLastName = lastName.trim();
      if (!trimmedFirstName) {
        alert("First name is required.");
        return;
      }
      const data = await register(
        trimmedFirstName,
        trimmedLastName,
        email,
        password,
        role
      );
      console.log("Registration data:", data);
      // Extract refresh token from response (adjust based on your API response structure)
      const refreshToken = data.refreshToken || "default-refresh-token";
      login(data.user, data.token, refreshToken);
      navigate("/dashboard");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white to-[#FDF9F2]">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-[12px] shadow-lg w-full max-w-sm transition-all duration-300 ease-in-out flex flex-col gap-6"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        <h2 className="text-3xl font-bold mb-2 text-center text-[#1A1A1A]">
          Register
        </h2>
        <p className="text-[#4B4B4B] text-base text-center mb-4">
          Create your account to get started.
        </p>
        <Input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          className="h-12 text-base"
        />
        <Input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          className="h-12 text-base"
        />
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
        <div>
          <label className="block text-sm font-semibold mb-1 text-[#333]">
            Register As
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as "Lender" | "Borrower")}
            className="w-full h-12 px-3 py-2 border border-[#E0E0E0] rounded-[8px] bg-[#FAFAFA] text-base focus:outline-none focus:ring-2 focus:ring-[#FACC15] transition-all duration-300 ease-in-out"
          >
            <option value="Lender">Lender</option>
            <option value="Borrower">Borrower</option>
          </select>
        </div>
        <Button
          type="submit"
          variant="default"
          className="w-full py-3 rounded-[8px] font-bold text-white text-base bg-[#1A1A1A] hover:bg-[#333] transition-all duration-300 ease-in-out"
        >
          Register
        </Button>
        <p className="text-sm mt-2 text-center text-[#4B4B4B]">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-[#1A1A1A] underline hover:text-[#333] transition-all duration-300 ease-in-out"
          >
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
