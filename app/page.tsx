"use client";

import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  // Dummy credentials
  const DUMMY_EMAIL = "demo@business.com";
  const DUMMY_PASS = "12345678";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    if (email === DUMMY_EMAIL && password === DUMMY_PASS) {
      localStorage.setItem("token", "dummy-token-123");
      router.push("/pages/dashboard"); 
    } else {
      setError("Invalid email or password");
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-black px-4">
      {/* Logo */}
      <h1 className="text-3xl font-light mb-10">PrivateCRCL</h1>

      {/* Login Card */}
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-2xl border border-gray-200 dark:border-gray-700 p-8 bg-white dark:bg-[#0B0B0B]"
      >
        <h2 className="text-[26px] font-light text-[#101828] mb-1">
          Welcome Back
        </h2>
        <p className="text-[14px] text-gray-500 mb-6">
          Sign in to your business account
        </p>

        {/* Email */}
        <label className="text-sm text-gray-700 dark:text-gray-300">
          Email Address
        </label>
        <div className="mt-2 flex items-center gap-2 border border-gray-300 dark:border-gray-600 rounded-lg px-3 bg-gray-50 dark:bg-[#111]">
          <Mail size={18} className="text-gray-400" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@business.com"
            className="w-full bg-transparent py-2 text-sm outline-none text-gray-700 dark:text-gray-200"
            required
          />
        </div>

        {/* Password */}
        <label className="text-sm text-gray-700 dark:text-gray-300 mt-4 block">
          Password
        </label>
        <div className="mt-2 flex items-center gap-2 border border-gray-300 dark:border-gray-600 rounded-lg px-3 bg-gray-50 dark:bg-[#111]">
          <Lock size={18} className="text-gray-400" />
          <input
            type={showPass ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            className="w-full bg-transparent py-2 text-sm outline-none text-gray-700 dark:text-gray-200"
            required
          />
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="text-gray-400"
          >
            {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm mt-2">{error}</p>
        )}

        {/* Remember + forgot */}
        <div className="flex justify-between items-center mt-3 text-sm">
          <label className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <input type="checkbox" />
            Remember me
          </label>

          <button type="button" className="text-[#E8600F]">
            Forgot password?
          </button>
        </div>

        {/* Sign In Button */}
        <button
          type="submit"
          className="w-full bg-[#E8600F] cursor-pointer text-white py-3 rounded-lg mt-6 text-sm"
        >
          Sign In
        </button>

        {/* Signup link */}
        <p className="text-center text-sm mt-6 text-gray-600 dark:text-gray-300">
          Don’t have an account?{" "}
          <a href="/signup" className="text-[#E8600F]">
            Sign up
          </a>
        </p>
      </form>

      {/* Footer */}
      <p className="mt-6 text-xs text-gray-400 dark:text-gray-600">
        © 2025 CRCL Business. All rights reserved.
      </p>
    </div>
  );
}
