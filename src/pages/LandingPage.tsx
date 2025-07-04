import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#181818] to-[#3a2c13] flex flex-col">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-10 py-6">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-extrabold text-[#FACC15] tracking-tight">
            LendPool
          </span>
        </div>
        <div className="flex items-center gap-6">
          <a
            href="#service"
            className="text-gray-200 hover:text-[#FACC15] transition"
          >
            Service
          </a>
          <a
            href="#how"
            className="text-gray-200 hover:text-[#FACC15] transition"
          >
            How It Works
          </a>
          <a
            href="#benefits"
            className="text-gray-200 hover:text-[#FACC15] transition"
          >
            Benefits
          </a>
          <a
            href="#pricing"
            className="text-gray-200 hover:text-[#FACC15] transition"
          >
            Pricing
          </a>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login">
            <Button
              variant="ghost"
              className="border border-[#FACC15] text-[#FACC15] bg-transparent hover:bg-[#FACC15]/10 rounded-[8px] px-6 py-2 font-medium"
            >
              Log In
            </Button>
          </Link>
          <Link to="/register">
            <Button
              variant="default"
              className="bg-[#FACC15] text-black rounded-[8px] px-6 py-2 font-bold hover:bg-[#FFD700] transition"
            >
              Sign Up
            </Button>
          </Link>
        </div>
      </nav>
      {/* Hero Section */}
      <main className="flex-1 flex flex-col md:flex-row items-center justify-between px-10 md:px-20 py-16 md:py-24 gap-12">
        {/* Left: Text */}
        <div className="flex-1 max-w-xl">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            Fast And Simple <br /> Digital Lending Solution
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            Experience seamless peer-to-peer lending with premium security,
            instant payouts, and a luxury digital experience. Join thousands of
            users building wealth together.
          </p>
          <div className="flex gap-4 mb-8">
            <Button className="bg-[#FACC15] text-black font-bold rounded-[8px] px-8 py-3 text-lg shadow-md hover:bg-[#FFD700] transition">
              Get Started
            </Button>
            <Button
              variant="outline"
              className="border border-[#FACC15] text-[#FACC15] bg-transparent rounded-[8px] px-8 py-3 text-lg font-bold hover:bg-[#FACC15]/10 transition"
            >
              Learn More
            </Button>
          </div>
          <div className="flex items-center gap-4 mt-6">
            <div className="bg-[#FDE68A] text-black font-semibold rounded-[20px] px-4 py-2 flex items-center gap-2 shadow">
              <span className="text-lg">1.24M</span>
              <span className="text-xs font-medium">World Active Users</span>
            </div>
            <span className="text-[#FACC15] text-sm font-medium">
              ★ Rated 4.9/5
            </span>
          </div>
        </div>
        {/* Right: Card Mockup & Gold Hand (SVG/placeholder) */}
        <div className="flex-1 flex flex-col items-center justify-center relative">
          {/* Card Mockup */}
          <div className="relative z-10">
            <svg
              width="320"
              height="200"
              viewBox="0 0 320 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="320" height="200" rx="24" fill="#232323" />
              <text
                x="32"
                y="60"
                fill="#FACC15"
                fontSize="24"
                fontWeight="bold"
              >
                LendPool
              </text>
              <text
                x="32"
                y="110"
                fill="#fff"
                fontSize="22"
                fontFamily="monospace"
              >
                1234 5678 9012 3456
              </text>
              <text x="32" y="150" fill="#fff" fontSize="16">
                06/29
              </text>
              <circle
                cx="270"
                cy="50"
                r="18"
                fill="#FACC15"
                fillOpacity="0.7"
              />
              <circle cx="300" cy="50" r="18" fill="#fff" fillOpacity="0.2" />
            </svg>
          </div>
          {/* Gold Hand Placeholder */}
          <div className="absolute left-1/2 -bottom-10 -translate-x-1/2 z-0">
            <svg
              width="320"
              height="80"
              viewBox="0 0 320 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <ellipse
                cx="160"
                cy="70"
                rx="120"
                ry="10"
                fill="#FACC15"
                fillOpacity="0.15"
              />
              <rect
                x="60"
                y="20"
                width="200"
                height="30"
                rx="15"
                fill="#FACC15"
                fillOpacity="0.7"
              />
              <rect
                x="80"
                y="40"
                width="160"
                height="20"
                rx="10"
                fill="#FACC15"
                fillOpacity="0.5"
              />
            </svg>
          </div>
        </div>
      </main>
    </div>
  );
}
