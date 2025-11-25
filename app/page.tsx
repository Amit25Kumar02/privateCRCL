"use client";

import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

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
    <div className="min-h-screen flex flex-col items-center justify-center px-5 bg-background transition-colors duration-300">
      
      {/* Logo */}
      <h1 className="text-3xl font-light mb-10 text-text">
        PrivateCRCL
      </h1>

      {/* Login Card */}
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm sm:max-w-md rounded-2xl border border-border p-8 bg-offer-search-main shadow-md"
      >
        <h2 className="text-[26px] font-light text-text mb-1">
          Welcome Back
        </h2>
        <p className="text-[14px] text-table-text-h mb-6">
          Sign in to your business account
        </p>

        {/* Email */}
        <label className="text-sm text-table-text-h">Email Address</label>
        <div className="mt-2 flex items-center gap-2  rounded-lg px-3 bg-offer-search border-[0.82px] border-border">
          <Mail size={18} className="text-table-text-id" />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@business.com"
            className="w-full py-2 bg-offer-search text-sm outline-none text-table-text-h "
          />
        </div>

        {/* Password */}
        <label className="text-sm mt-4 text-table-text-h block">Password</label>
        <div className="mt-2 flex items-center gap-2 border rounded-lg px-3 border-border ">
          <Lock size={18} className="text-table-text-id" />
          <input
            type={showPass ? "text" : "password"}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            className="w-full py-2 bg-offer-search text-sm outline-none "
          />
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="text-table-text-h"
          >
            {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Helper Text (Dummy credentials) */}
        <p className="text-xs mt-1 text-[#E8600F]">
          Demo Login → {DUMMY_EMAIL} <br/>
          Password → {DUMMY_PASS}
        </p>

        {/* Error Msg */}
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        {/* Options */}
        <div className="flex justify-between items-center mt-3 text-sm">
          <label className="flex items-center gap-2 text-table-text-h">
            <input type="checkbox" />
            Remember me
          </label>
          <button type="button" className="text-[#E8600F]">Forgot?</button>
        </div>

        {/* Sign in button */}
        <button
          type="submit"
          className="w-full bg-[#E8600F] text-white rounded-lg py-3 mt-6 text-sm cursor-pointer"
        >
          Sign In
        </button>

        {/* Signup */}
        <p className="text-center text-sm mt-6 text-gray-600 dark:text-gray-300">
          Don’t have an account?{" "}
          <a href="#" className="text-[#E8600F]">Sign up</a>
        </p>
      </form>

      {/* Footer */}
      <p className="mt-6 text-xs text-gray-500 dark:text-gray-400">
        © 2025 CRCL Business. All rights reserved.
      </p>
    </div>
  );
}
