"use client";

import { useState } from "react";
import { ScanLine, Calendar } from "lucide-react";
import Sidebar from "../../component/sidebar/page";

export default function RedemptionsPage() {
  const redemptions = [
    {
      customer: "Sarah Johnson",
      id: "CRCL-4523",
      offer: "20% Off Lunch Menu",
      time: "2024-11-11 12:34 PM",
      status: "Success",
      remaining: "0 uses left",
    },
    {
      customer: "Michael Chen",
      id: "CRCL-8891",
      offer: "Happy Hour 2-for-1",
      time: "2024-11-11 11:22 AM",
      status: "Success",
      remaining: "2 uses left",
    },
    {
      customer: "Emma Wilson",
      id: "CRCL-2254",
      offer: "20% Off Lunch Menu",
      time: "2024-11-11 10:15 AM",
      status: "Failed",
      remaining: "Already redeemed today",
    },
    {
      customer: "David Park",
      id: "CRCL-7756",
      offer: "Weekend Brunch Special",
      time: "2024-11-10 09:45 AM",
      status: "Success",
      remaining: "1 uses left",
    },
  ];

  return (
    <div className="flex font-glacial">

      {/* SIDEBAR */}
      <div className="hidden md:block fixed left-0 top-0 h-screen">
        <Sidebar />
      </div>

      {/* MAIN PAGE */}
      <div className="
        ml-64 min-h-screen p-8 
        dark:bg-[#000000] dark:text-[#FAFAFA]
        transition-colors duration-300 flex-1
      ">

        {/* HEADING */}
        <h1 className="text-[30px] text-[#101828] dark:text-[#FFFFFF] mb-1">Redemptions</h1>
        <p className="text-[16px] text-[#4A5565] dark:text-[#9F9FA9]">
          Scan membership cards and track redemptions
        </p>

        {/* SCANNER BOX */}
        <div
          className="
            mt-8 p-6 w-[438px] rounded-[14px] border-[0.82px] border-[#E5E7EB]
            bg-[#FFFFFF] 
            dark:bg-[#09090B] dark:border-[#27272A]
          "
        >
          <div className="flex items-center gap-2 mb-4">
            <ScanLine className="text-[#E8600F]" size={18} />
            <h2 className="text-[16px] text-[#101828]">Membership Card Scanner</h2>
          </div>

          <div
            className="
              w-full p-10 rounded-[10px] border-[1.64px] border-[#D1D5DC] 
              bg-[#F9FAFB] 
              dark:bg-[#0F0F0F] dark:border-[#27272A]
              flex flex-col items-center justify-center
            "
          >
            <ScanLine size={48} className="text-[#99A1AF] mb-4" />

            <p className="text-[16px] text-[#4A5565] dark:text-gray-400 text-center mb-4">
              Scan QR code or enter membership ID manually
            </p>

            <input
              placeholder="Enter membership ID (e.g., CRCL-1234)"
              className="
                px-4 py-2 rounded-[8px] w-[302px] text-[14px] text-[#717182] mb-4
                border-[0.82px] border-[#D1D5DC]
                bg-[#FFFFFF]
                dark:bg-[#000000] dark:text-[#FAFAFA] dark:border-[#333]
                focus:outline-none
              "
            />

            <button
              className="
                bg-[#E8600F] text-[#FFFFFF] text-[14px] px-6 py-2
                rounded-[8px] w-72
              "
            >
              Verify & Redeem
            </button>
          </div>
        </div>

        {/* RECENT REDEMPTIONS */}
        <div
          className="
            mt-10 p-6 rounded-[14px] border-[0.82px] border-[#E5E7EB] 
            bg-[#FFFFFF] 
            dark:bg-[#09090B] dark:border-[#27272A]
          "
        >
          <h3 className="text-[16px] text-[#101828] mb-1">Recent Redemptions</h3>
          <p className="text-[14px] text-[#4A5565] dark:text-[#888] mb-6">Last 24 hours</p>

          <table className="w-full ">
            <thead>
              <tr className="
                text-[#4A5565] dark:text-[#9F9FA9]
                border-b-[#E5E7EB] border-b-[0.82px] text-[14px] dark:border-[#27272A]
              ">
                <th className="py-3 text-left">Customer</th>
                <th className="py-3 text-left">Offer</th>
                <th className="py-3 text-left">Time</th>
                <th className="py-3 text-left">Status</th>
                <th className="py-3 text-left">Remaining</th>
              </tr>
            </thead>

            <tbody>
              {redemptions.map((r, i) => (
                <tr
                  key={i}
                  className="
                    border-b-[#E5E7EB] border-b-[0.82px]  dark:border-[#1A1A1A]
                     dark:hover:bg-[#141414]
                    transition
                  "
                >
                  <td className="py-4">
                    <p className="text-[14px] text-[#101828]">{r.customer}</p>
                    <p className="text-[12px] text-[#6A7282]">{r.id}</p>
                  </td>

                  <td className="py-4 text-[14px] text-[#101828]">{r.offer}</td>

                  <td className="py-4 flex items-center text-[14px] gap-2">
                    <Calendar size={14} className="text-[#101828]" />
                    {r.time}
                  </td>

                  {/* Status pill */}
                  <td className="py-4">
                    {r.status === "Success" && (
                      <span className="px-2 py-1 rounded-md text-xs bg-[#0D542B] text-[#7BF1A8]">
                        Success
                      </span>
                    )}
                    {r.status === "Failed" && (
                      <span className="px-2 py-1 rounded-md text-xs bg-[#5B0A0A] text-[#FF8A8A]">
                        Failed
                      </span>
                    )}
                  </td>

                  <td className="py-4 text-[#101828] text-[14px] dark:text-gray-400">
                    {r.remaining}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
