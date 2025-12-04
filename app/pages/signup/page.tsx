"use client";

import { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      // Demo logic: Direct redirect to dashboard
      console.log("Sign up:", formData);
      await new Promise((r) => setTimeout(r, 800)); // Short artificial delay
      router.push("/pages/dashboard");
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-linear-to-b from-[#fff7ed] to-white">

      <div className="w-full max-w-md bg-white/80 backdrop-blur-lg rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] p-10 border border-white/40 transition-all">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Create Account
          </h1>
          <p className="text-gray-600 mt-2">Join our community in seconds</p>
        </div>

        {error && (
          <p className="text-red-600 bg-red-50 border border-red-200 p-2 rounded-lg text-sm mb-4 text-center">
            {error}
          </p>
        )}

        {/* OAuth Buttons */}
        <div className="space-y-3 mb-6">
          <Button
            type="button"
            className="w-full py-3 rounded-xl bg-white border border-gray-300 text-gray-900 flex items-center justify-center gap-2 hover:bg-gray-50 transition"
            onClick={() => console.log("Google signup")}
          >
            <img src="/icons/google.svg" alt="Google" className="w-5 h-5" />
            Continue with Google
          </Button>

          <Button
            type="button"
            className="w-full py-3 rounded-xl bg-black text-white flex items-center justify-center gap-2 hover:bg-gray-800 transition"
            onClick={() => console.log("Apple signup")}
          >
            <img src="/icons/apple.svg" alt="Apple" className="w-5 h-5 invert" />
            Continue with Apple
          </Button>

          <Button
            type="button"
            className="w-full py-3 rounded-xl bg-[#2F2F2F] text-white flex items-center justify-center gap-2 hover:bg-[#1f1f1f] transition"
            onClick={() => console.log("Microsoft signup")}
          >
            <img src="/icons/microsoft.svg" alt="Microsoft" className="w-5 h-5" />
            Continue with Microsoft
          </Button>
        </div>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="px-3 text-sm text-gray-500">or</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            required
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            required
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
          />

          <Button
            type="submit"
            loading={loading}
            disabled={loading}
            className="w-full py-3 rounded-xl text-white bg-[#ff5720] hover:bg-[#e64a19] shadow-md hover:shadow-lg transition-all"
          >
            Sign Up
          </Button>
        </form>

        {/* Footer */}
        <p className="text-center mt-6 text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/pages/login"
            className="font-medium text-[#ff5720] hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}