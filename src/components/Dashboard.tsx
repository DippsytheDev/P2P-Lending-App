
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  console.log("User in Dashboard:", user);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Welcome to your Dashboard </h1>
      {user && (
        <div>
          <p>Name: {user.firstName}</p>
          <p>lastName: {user.lastName}</p>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
        </div>
      )}
      <button
        onClick={handleLogout}
        className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  )
}
 