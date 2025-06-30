// pages/BorrowerDashboard.tsx
import { useEffect, useState } from "react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import axios from "axios"
import { useAuth } from "@/context/AuthContext"

type Pool = {
  id: string
  name: string
  interestRate: number
  minimumAmount: number
  maximumAmount: number
  description: string
}

export default function BorrowerDashboard() {
  const { user, token } = useAuth()
  const [pools, setPools] = useState<Pool[]>([])
  const [selectedPool, setSelectedPool] = useState<Pool | null>(null)
  const [requestedAmount, setRequestedAmount] = useState("")
  const [duration, setDuration] = useState("")
  const [purpose, setPurpose] = useState("")

  useEffect(() => {
    const fetchMyPools = async () => {
      try {
        const res = await axios.get(
          "https://lendpool-api-web.onrender.com/lendpool/api/v1/borrower/get-all-pools",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        setPools(res.data.data)
      } catch (err) {
        console.error("Failed to fetch pools:", err)
      }
    }

    fetchMyPools()
  }, [token])

  const handleRequestLoan = async () => {
    try {
      await axios.post(
        "https://lendpool-api-web.onrender.com/lendpool/api/v1/loan/my-requests",
        {
          requestedAmount: Number(requestedAmount),
          durationInMonths: Number(duration),
          purpose,
          poolId: selectedPool?.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      alert("Loan request submitted!")
      setSelectedPool(null)
      setRequestedAmount("")
      setDuration("")
      setPurpose("")
    } catch (err) {
      console.error("Loan request failed", err)
      alert("Failed to submit loan request.")
    }
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6 text-blue-700">
        Available Lending Pools
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pools.map((pool) => (
          <Card key={pool.id}>
            <CardHeader>
              <CardTitle className="text-lg text-blue-700">
                {pool.name}
              </CardTitle>
              <p className="text-sm text-blue-700">{pool.description}</p>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-blue-700">
                <strong className="text-blue-700">Interest Rate:</strong>{" "}
                {pool.interestRate}%
              </p>
              <p className="text-blue-700">
                <strong>Range:</strong> ₦{pool.minimumAmount.toLocaleString()} –
                ₦{pool.maximumAmount.toLocaleString()}
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    className="mt-4 text-blue-700 bg-blue-100 hover:bg-blue-200"
                    onClick={() => setSelectedPool(pool)}
                  >
                    Request Loan
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-blue-700">
                      Request Loan from {pool.name}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2 ">
                      <Label className="text-blue-700">Requested Amount</Label>
                      <Input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={requestedAmount}
                        onChange={(e) => {
                          const onlyNum = e.target.value.replace(/[^0-9]/g, "")
                          setRequestedAmount(onlyNum)
                        }}
                        placeholder="Enter Requested Amount"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-blue-700">
                        Duration (in months)
                      </Label>
                      <Input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={duration}
                        onChange={(e) => {
                          const onlyNums = e.target.value.replace(/[^0-9]/g, "")
                          setDuration(onlyNums)
                        }}
                        placeholder="Enter duration"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-blue-700">Purpose</Label>
                      <Input
                        value={purpose}
                        onChange={(e) => setPurpose(e.target.value)}
                      />
                    </div>
                    <Button className="text-blue-700 bg-blue-100 hover:bg-blue-200 " onClick={handleRequestLoan}>Submit</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
