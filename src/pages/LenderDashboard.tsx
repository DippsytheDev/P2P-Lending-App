import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import LenderForm from "./CreatePool";
import MyPools from "./MyPools";
import JoinPools from "./JoinPools";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs"; 

const LenderDashboard = () => {
  const [role, setRole] = useState<"Lender" | "Admin">("Lender");
  const [openForm, setOpenForm] = useState(false);

  const poolOpenForm = () => {
    setOpenForm(!openForm);
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 to-white py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10 text-center">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-blue-800 leading-tight tracking-tight">
            Lender Dashboard
          </h2>
          <p className="text-blue-900 mt-2 text-sm sm:text-base">
            Logged in as:{" "}
            <span className="font-semibold capitalize">{role}</span>
          </p>
        </header>

        {role === "Lender" ? (
          <section className="space-y-8">
            {/* Overview */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-blue-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-blue-700 mb-4">
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

            {/* Create Pool Section */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-blue-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-blue-700 mb-4">
                  Pool Management
                </h3>
                <Button
                  onClick={poolOpenForm}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-semibold transition-transform transform hover:scale-105"
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

            {/* Tabbed Pools Section */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-blue-100">
              <Tabs defaultValue="my-pools" className="w-full">
                <TabsList className="bg-blue-50 border border-blue-200 rounded-lg p-1 w-fit mx-auto mb-4">
                  <TabsTrigger
                    value="my-pools"
                    className="data-[state=active]:bg-blue-600 data-[state=active]:text-white px-4 py-1 rounded-md transition"
                  >
                    My Pools
                  </TabsTrigger>
                  <TabsTrigger
                    value="join-pools"
                    className="data-[state=active]:bg-blue-600 data-[state=active]:text-white px-4 py-1 rounded-md transition"
                  >
                    Join Pools
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="my-pools">
                  <MyPools />
                </TabsContent>
                <TabsContent value="join-pools">
                  <JoinPools />
                </TabsContent>
              </Tabs>
            </div>
          </section>
        ) : (
          <section className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-blue-100">
            <h3 className="text-2xl font-bold text-blue-700 mb-4">
              Admin Dashboard
            </h3>
            <p className="text-blue-900">
              Manage users, pools, and platform settings here.
            </p>
          </section>
        )}
      </div>
    </div>
  );
};

export default LenderDashboard;