// src/pages/LenderPools.tsx
import { useEffect, useState } from 'react';
import api from "../lib/axios";
import { useAuth } from '../context/AuthContext';

interface Pool {
  id: string;
  name: string;
  description: string;
  interestRate: number;
  minimumAmount: number;
  maximumAmount: number;
}

export default function LenderPools() {
  const { token } = useAuth();
  const [pools, setPools] = useState<Pool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPools = async () => {
      try {
        const response = await api.get('/lender/get-all-pools');
        setPools(response.data.data); // Adjust based on actual response
      } catch (err: any) {
        setError('Failed to fetch pools');
      } finally {
        setLoading(false);
      }
    };

    fetchPools();
  }, [token]);

  if (loading) return <p>Loading pools...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Pools</h2>
      {pools.length === 0 ? (
        <p>You haven't created any pools yet.</p>
      ) : (
        <div className="space-y-4">
          {pools.map((pool) => (
            <div key={pool.id} className="border p-4 rounded shadow">
              <h3 className="text-lg font-semibold">{pool.name}</h3>
              <p className="text-sm text-gray-600">{pool.description}</p>
              <p className="mt-2">
                <strong>Interest Rate:</strong> {pool.interestRate}%
              </p>
              <p>
                <strong>Amount Range:</strong> ₦{pool.minimumAmount} - ₦{pool.maximumAmount}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}