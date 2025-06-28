import Input from "../components/Input"
import Button from "../components/Button"
import { login as apiLogin } from "../auth"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { jwtDecode } from "jwt-decode"
import { set } from "react-hook-form"

interface DecodedToken {
  firstName: string
  lastName: string
  email: string
  role: "Lender" | "Borrower" | "Admin"
  userId: string
}

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const data = await apiLogin(email, password)
      console.log("Login data:", data)
      const rawToken = data.token.data.token
      const decoded = jwtDecode<any>(rawToken)
      console.log("Raw decoded token:", decoded) // Debugging

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
        userId: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
      }

      console.log("Decoded User(mapped):", decodedUser)
      login(
        {
          firstName: decodedUser.firstName,
          lastName: decodedUser.lastName,
          email: decodedUser.email,
          role: decodedUser.role,
          userId: decodedUser.userId,
        },
        rawToken
      )
      navigate("/dashboard")
      setLoading(false)
    } catch (err: any) {
      console.error("Login error:", err.response?.data || err.message)
      alert(err.response?.data?.message || "Login failed. Check credentials.")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-[10px] bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <Input
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button
          type="submit"
          className={`w-full py-2 px-4 rounded font-bold text-white ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
        >
          Login
        </Button>
        <Button
          type="button"
          onClick={() => {
            const mockUser = {
              firstName: "Admin",
              lastName: "User",
              email: "admin@site.com",
              role: "Admin",
              userId: "admin-user-id",
            }
            const mockToken = "dev-admin-token"

            localStorage.setItem("user", JSON.stringify(mockUser))
            localStorage.setItem("token", mockToken)

            login(mockUser, mockToken)
            navigate("/dashboard")
          }}
          className={`w-full py-2 px-4 rounded font-bold text-white ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
        >
          Dev Login as Admin
        </Button>
        <p className="text-sm mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  )
}
