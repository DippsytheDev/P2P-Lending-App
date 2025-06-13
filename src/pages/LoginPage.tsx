
import Input from '../components/Input';
import Button from '../components/Button';
import { login as apiLogin } from '../auth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  fullName: string;
  email: string;
  role: 'lender' | 'borrower' | 'admin';
}

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await apiLogin(email, password);
      console.log("Login data:", data);
      const rawToken = data.token.data.token
      const decoded = jwtDecode<any>(rawToken);
      const decodedUser: DecodedToken = {
        fullName: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"], 
        email: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
        role: decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
      };
            console.log("Decoded User(mapped):", decodedUser);
      login(decodedUser, rawToken);
      navigate('/dashboard'); // 
    } catch (err: any ) {
      console.error("Login error:", err.response?.data || err.message);
      alert(err.response?.data?.message ||'Login failed. Check credentials.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="flex flex-col gap-[10px] bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <Input type="email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Input type="password" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <Button type="submit">Login</Button>
        <Button
          type="button"
          // className=''
          onClick={() => {
            const mockUser = {
              fullName: "Admin",
              email: "admin@site.com",
              role: "admin",
            };
            const mockToken = "dev-admin-token"; // optional placeholder

            localStorage.setItem("user", JSON.stringify(mockUser));
            localStorage.setItem("token", mockToken);

            login(mockUser, mockToken); // use context login to set state
            navigate("/dashboard");
          }}
        >
          Dev Login as Admin
        </Button>
        <p className="text-sm mt-4 text-center">
          Don’t have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
