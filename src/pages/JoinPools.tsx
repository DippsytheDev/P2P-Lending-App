// pages/JoinPools.tsx
import { useEffect, useState } from "react";
import api from "../lib/axios";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { useAuth } from "../context/AuthContext";

type Pool = {
  id: string;
  name: string;
  interestRate: number;
  minimumAmount: number;
  maximumAmount: number;
  description: string;
};

export default function JoinPools() {
  const { user, token } = useAuth();
  const [pools, setPools] = useState<Pool[]>([]);
  const [selectedPool, setSelectedPool] = useState<Pool | null>(null);
  const [amount, setAmount] = useState("");

  const fetchPools = async () => {
    try {
      const res = await api.get("/lender/get-all-pools");
      setPools(res.data.data); // adjust if shape is different
    } catch (error) {
      console.error("Failed to fetch pools:", error);
    }
  };

  const handleContribute = async () => {
    if (!selectedPool || !amount) return;

    try {
      const payload = {
        poolId: selectedPool.id,
        userId: user?.userId, 
        amount: parseFloat(amount),
      };

      await api.post("/lender/contribute", payload);

      alert("Contribution successful!");
      setAmount("");
      setSelectedPool(null);
    } catch (error) {
      console.error("Contribution failed:", error);
      alert("Contribution failed.");
    }
  };

  useEffect(() => {
    fetchPools();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4 text-blue-700">Join a Lending Pool</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pools.map((pool) => (
          <Card key={pool.id}>
            <CardHeader>
              <CardTitle className="text-blue-800">{pool.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{pool.description}</p>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>
                <strong>Interest Rate:</strong> {pool.interestRate}%
              </p>
              <p>
                <strong>Range:</strong> ₦{pool.minimumAmount.toLocaleString()} – ₦{pool.maximumAmount.toLocaleString()}
              </p>
              <Badge variant="secondary">Pool ID: {pool.id}</Badge>

              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    className="mt-4"
                    onClick={() => setSelectedPool(pool)}
                  >
                    Join Pool
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Contribute to Pool</DialogTitle>
                    <DialogDescription>
                      Enter the amount you'd like to contribute to <strong>{pool.name}</strong>
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Label htmlFor="amount">Amount</Label>
                    <Input
                      type="number"
                      id="amount"
                      placeholder="e.g. 100000"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                    <Button onClick={handleContribute}>Confirm Contribution</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}