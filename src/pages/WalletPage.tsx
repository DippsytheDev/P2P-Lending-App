import { useState } from "react"
import { ArrowDownCircle, ArrowUpCircle, SendHorizonal } from "lucide-react"

const WalletPage = () => {
  const [balance, setBalance] = useState(15000) // mock balance
  const [transactions] = useState([
    // { id: 1, type: "Deposit", amount: 5000, date: "2025-06-19" },
    // { id: 2, type: "Withdrawal", amount: 2000, date: "2025-06-15" },
    // { id: 3, type: "Contribution", amount: 3000, date: "2025-06-10" },
    // { id: 4, type: "Transfer", amount: 1500, date: "2025-06-05" },
  ])

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 to-white p-6">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Title */}
        <header className="text-center">
          <h1 className="text-4xl font-bold text-blue-800">Wallet Dashboard</h1>
          <p className="text-blue-600 mt-2 text-sm">
            Manage all your wallet activities in one place
          </p>
        </header>

        {/* Balance Card */}
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-blue-500">Available Balance</p>
            <p className="text-3xl font-bold text-blue-900">
              ₦{balance.toLocaleString()}
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition text-sm">
              <ArrowDownCircle className="w-4 h-4" /> Deposit
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition text-sm">
              <ArrowUpCircle className="w-4 h-4" /> Withdraw
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-sm">
              <SendHorizonal className="w-4 h-4" /> Transfer
            </button>
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-bold text-blue-800 mb-4">
            Transaction History
          </h2>
          {transactions.length > 0 ? (
            <ul className="divide-y divide-blue-100">
              {transactions.map((tx) => (
                <li
                  key={tx.id}
                  className="py-4 flex justify-between items-center text-blue-900"
                >
                  <div className="flex flex-col">
                    <span className="font-medium">{tx.type}</span>
                    <span className="text-xs text-blue-500">{tx.date}</span>
                  </div>
                  <span
                    className={`font-semibold ${
                      tx.type === "Withdrawal" || tx.type === "Transfer"
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {tx.type === "Withdrawal" || tx.type === "Transfer"
                      ? "-"
                      : "+"}
                    ₦{tx.amount.toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-blue-500 text-center">
              No transactions yet
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default WalletPage
