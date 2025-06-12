import { Link } from "react-router-dom";
const LenderDashboard = () => {
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold">Borrower Dashboard</h2>
        <Link to="/profile" className="text-blue-600 underline">
        Go to Profile
      </Link>
        <p>Overview of loans, contributions, and earnings will be here.</p>
      </div>
    );
  };
  
  export default LenderDashboard;