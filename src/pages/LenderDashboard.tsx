import { useState } from "react"
import { Link } from "react-router-dom"
import Button from "../components/Button"
import LenderForm from "../components/Create-pool"

const LenderDashboard = () => {
  const [role, setRole] = useState<"Lender" | "Admin">("Lender")
  const [openForm, setOpenForm] = useState(false)

  const poolOpenForm = () => {
    setOpenForm(!openForm)
  }

  return (
    <div className="min-h-screen bg-blue-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8 text-center">
          <h2 className="text-4xl font-bold text-blue-700">Lender Dashboard</h2>
          <p className="text-blue-900 mt-1">
            Logged in as:{" "}
            <span className="font-semibold capitalize">{role}</span>
          </p>
        </header>

        {role === "Lender" ? (
          <section className="space-y-8">
            {/* Overview Card */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-blue-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-blue-800">
                  Your Overview
                </h3>
                <Link
                  to="/profile"
                  className="text-blue-600 hover:underline font-medium text-sm"
                >
                  Go to Profile
                </Link>
              </div>
              <p className="text-blue-900">
                Overview of pools, contributions, and earnings will be displayed
                here.
              </p>
            </div>

            {/* Pool Management Card */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-blue-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-blue-800">
                  Pool Management
                </h3>
                <Button
                  onClick={poolOpenForm}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-semibold transition"
                >
                  {openForm ? "Close Pool Form" : "Create New Pool"}
                </Button>
              </div>

              {openForm && (
                <div className="mt-6 border-t border-blue-100 pt-6">
                  <LenderForm />
                </div>
              )}
            </div>
          </section>
        ) : (
          <section className="bg-white rounded-xl shadow-md p-6 border border-blue-100">
            <h3 className="text-xl font-semibold text-blue-800">
              Admin Dashboard
            </h3>
            <p className="text-blue-900">
              Manage users, pools, and platform settings here.
            </p>
          </section>
        )}
      </div>
    </div>
  )
}

export default LenderDashboard
