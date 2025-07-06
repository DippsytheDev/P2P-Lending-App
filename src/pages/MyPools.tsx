// pages/MyPools.tsx
import { useEffect, useState } from "react"
import axios from "axios"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/context/AuthContext"

type Pool = {
  id: string
  name: string
  interestRate: number
  minimumAmount: number
  maximumAmount: number
  description: string
}

export default function MyPools() {
  const [pools, setPools] = useState<Pool[]>([])
  const [userIdToAdd, setUserIdToAdd] = useState("")
  const [contributionAmount, setContributionAmount] = useState("")
  const [selectedPoolId, setSelectedPoolId] = useState<string | null>(null)
  const { token, user } = useAuth()

  useEffect(() => {
    const fetchMyPools = async () => {
      try {
        const res = await axios.get(
          "https://lendpool-api-web.onrender.com/lendpool/api/v1/lender/get-all-pools",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        const sorted = res.data.data.sort(
          (a: any, b: any) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        setPools(sorted)
      } catch (err) {
        console.error("Failed to fetch pools:", err)
      }
    }

    fetchMyPools()
  }, [token])

  const handleAddUser = async () => {
    if (!selectedPoolId || !userIdToAdd) return

    try {
      const res = await axios.post(
        "https://lendpool-api-web.onrender.com/lendpool/api/v1/lender/add-user",
        {
          userId: userIdToAdd,
          poolId: selectedPoolId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      alert(`✅ User added successfully to pool`)
      setUserIdToAdd("")
    } catch (err: any) {
      console.error("Add user error:", err)
      alert("❌ Failed to add user to pool")
    }
  }

  const handleContribute = async () => {
    if (!selectedPoolId || !contributionAmount || !user?.id) return

    try {
      const payload = {
        poolId: selectedPoolId,
        userId: user.role,
        amount: Number(contributionAmount) * 100, // Convert to kobo if needed
      }

      const res = await axios.post(
        "https://lendpool-api-web.onrender.com/lendpool/api/v1/lender/contribute", // Replace with your actual endpoint
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      alert("✅ Contribution successful!")
      setContributionAmount("")
    } catch (err: any) {
      console.error("Contribution error:", err)
      alert(
        `❌ Failed to contribute: ${err.response?.data?.message || err.message}`
      )
    }
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-extrabold text-blue-800 mb-6 tracking-tight">
        My Pools
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {pools.map((pool) => (
          <Card
            key={pool.id}
            className="hover:shadow-lg transition-shadow border border-blue-100"
          >
            <CardHeader>
              <CardTitle className="text-blue-800">{pool.name}</CardTitle>
              <p className="text-sm text-gray-600 break-words line-clamp-2">
                {pool.description}
              </p>
            </CardHeader>
            <CardContent className="space-y-2 text-blue-900 text-sm">
              <p>
                <strong>Interest:</strong> {pool.interestRate}%
              </p>
              <p>
                <strong>Min:</strong> ₦{pool.minimumAmount.toLocaleString()}
              </p>
              <p>
                <strong>Max:</strong> ₦{pool.maximumAmount.toLocaleString()}
              </p>
              <div className="flex gap-2 mt-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      onClick={() => setSelectedPoolId(pool.id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
                    >
                      Add Users
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Lender</DialogTitle>
                      <DialogDescription>
                        Add a lender to <strong>{pool.name}</strong>
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Label htmlFor="userId">Lender User ID</Label>
                      <Input
                        id="userId"
                        placeholder="Enter user ID"
                        value={userIdToAdd}
                        onChange={(e) => setUserIdToAdd(e.target.value)}
                      />
                      <Button
                        className="bg-blue-600 hover:bg-blue-700 text-white transition"
                        onClick={handleAddUser}
                      >
                        Confirm
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="transition hover:border-blue-400"
                      onClick={() => setSelectedPoolId(pool.id)}
                    >
                      Contribute
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Contribute to Pool</DialogTitle>
                      <DialogDescription>
                        Enter amount to contribute to{" "}
                        <strong>{pool.name}</strong>
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="amount">Amount (₦)</Label>
                        <Input
                          id="amount"
                          type="number"
                          placeholder="Enter amount"
                          value={contributionAmount}
                          onChange={(e) =>
                            setContributionAmount(e.target.value)
                          }
                          min={pool.minimumAmount}
                          max={pool.maximumAmount}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Min: ₦{pool.minimumAmount.toLocaleString()} | Max: ₦
                          {pool.maximumAmount.toLocaleString()}
                        </p>
                      </div>
                      <Button
                        className="bg-blue-600 hover:bg-blue-700 text-white transition"
                        onClick={handleContribute}
                      >
                        Confirm Contribution
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
