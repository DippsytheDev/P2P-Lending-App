import { useState } from "react"
import { Link } from "react-router-dom"
import Button from "../components/Button"
import LenderForm from "../components/create-pool"

const LenderDashboard = () => {
  const [role, setRole] = useState<"lender" | "admin">("lender")
  const [openForm, setOpenForm] = useState(false)

  const poolOpenForm = () => {
    setOpenForm(!openForm)
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Dashboard</h2>
      <p className="mb-4">
        You are logged in as: <span className="font-semibold">{role}</span>
      </p>

      {role === "lender" ? (
        <div>
          <Link to="/profile" className="text-blue-600 underline">
            Go to Profile
          </Link>
          <p>Overview of pools, contributions, and earnings will be here.</p>

          <Button
            onClick={poolOpenForm}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white p-4 rounded font-bold cursor-pointer"
          >
            {openForm ? "Close Pool Form" : "Create New Pool"}
          </Button>

          {openForm && <LenderForm />}
        </div>
      ) : (
        <div>
          <h3 className="text-lg font-semibold">Admin Dashboard</h3>
          <p>Manage users, pools, and platform settings here.</p>
        </div>
      )}
    </div>
  )
}

export default LenderDashboard
