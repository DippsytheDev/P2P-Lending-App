import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const gold = "#FFD700";

const LandingPage = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-zinc-900 to-[#2d2416] flex flex-col">
      {/* Navbar */}
      <nav className="w-full flex items-center justify-end px-12 py-8 gap-4">
        <Link to="/login">
          <Button
            variant="ghost"
            className="text-white border border-zinc-700 hover:bg-zinc-800 px-6 py-2 rounded-md"
            aria-label="Login"
          >
            Login
          </Button>
        </Link>
        <Link to="/register">
          <Button
            style={{ backgroundColor: gold, color: "#222" }}
            className="font-semibold px-6 py-2 rounded-md shadow-md hover:brightness-110"
            aria-label="Sign Up"
          >
            Sign Up
          </Button>
        </Link>
      </nav>
      {/* Hero Section */}
      <main className="flex-1 flex flex-col md:flex-row items-center justify-center px-6 md:px-24 gap-0 md:gap-8 relative">
        {/* Left: Text & Buttons */}
        <section className="flex-1 flex flex-col justify-center items-start max-w-2xl z-10">
          <h1
            className="text-white text-4xl md:text-6xl font-extrabold leading-tight mb-6"
            style={{ letterSpacing: "-1px" }}
          >
            Fast and Simple <br /> Loan Solution
          </h1>
          <p className="text-zinc-200 text-lg md:text-2xl mb-10 max-w-lg">
            Secure loans and financial services with smart card-backed identity
            verification.
          </p>
          <div className="flex flex-row gap-6 mt-2">
            <a href="#" aria-label="Get Started">
              <Button
                style={{ backgroundColor: gold, color: "#222" }}
                className="font-semibold px-8 py-4 text-lg rounded-md shadow-md hover:brightness-110 min-w-[150px]"
              >
                Get Started
              </Button>
            </a>
            <a href="#learn-more" aria-label="Learn More">
              <Button
                variant="outline"
                className="border border-zinc-600 text-white bg-transparent px-8 py-4 text-lg rounded-md hover:bg-zinc-800 min-w-[150px]"
              >
                Learn More
              </Button>
            </a>
          </div>
        </section>
        {/* Right: Gold Hand & Cards Image */}
        <section className="flex-1 flex items-center justify-center w-full md:w-auto mt-12 md:mt-0">
          <img
            src="/image.png"
            alt="Luxury fintech hero"
            className="w-[480px] max-w-full md:ml-8 rounded-none md:rounded-xl shadow-2xl"
            draggable={false}
            style={{ objectFit: "contain" }}
          />
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
