"use client";

import { useState } from "react";
import { ScanLine, Calendar, CheckCircle, XCircle, Menu } from "lucide-react";
import Sidebar from "../../component/sidebar/page";

export default function RedemptionsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scanInput, setScanInput] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [scanResult, setScanResult] = useState<any>(null);

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

  const handleScan = () => {
    if (scanInput.includes('CRCL')) {
      setScanResult({
        success: true,
        customerName: 'John Doe',
        memberId: scanInput,
        offer: '20% Off Lunch Menu',
        remainingUses: 2,
        eligibility: 'Valid'
      });
    } else {
      setScanResult({
        success: false,
        reason: 'Invalid membership code'
      });
    }
  };

  return (
    <div className="flex font-glacial">
      {/* DESKTOP SIDEBAR */}
      <div className="hidden md:block fixed left-0 top-0 h-screen">
        <Sidebar />
      </div>

      {/* MOBILE SIDEBAR */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          <div className="fixed left-0 top-0 h-full w-80 bg-background border-r border-border z-60">
            <Sidebar />
          </div>
          <div 
            onClick={() => setSidebarOpen(false)} 
            className="fixed inset-0 bg-black/60 z-50"
          />
        </div>
      )}

      {/* MAIN PAGE */}
      <div className="md:ml-64 min-h-screen p-4 md:p-8 bg-background text-text transition-colors duration-300 flex-1">
        
        {/* MOBILE HEADER */}
        <div className="md:hidden flex justify-between items-center mb-6 py-3">
          <div>
            <h1 className="text-xl font-semibold text-text">Redemptions</h1>
            <p className="text-[14px] text-all-sub-h mt-1">
              Scan membership cards and track redemptions
            </p>
          </div>
          <button 
            onClick={() => setSidebarOpen(true)} 
            className="p-2 dark:bg-[#111] border border-border rounded-lg"
          >
            <Menu size={22} />
          </button>
        </div>

        {/* HEADING */}
        <div className="hidden md:block mb-6">
          <h1 className="text-[30px] text-text mb-1">Redemptions</h1>
          <p className="text-[16px] text-all-sub-h">
            Scan membership cards and track redemptions
          </p>
        </div>

        {/* SCANNER SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Scanner Box */}
          <div className="rounded-[14px] p-4 md:p-6 border-[0.82px] border-border bg-offer-search-main">
            <div className="flex items-center gap-2 mb-4">
              <ScanLine className="text-[#E8600F]" size={20} />
              <h2 className="text-[16px] text-white-off font-medium">Membership Card Scanner</h2>
            </div>

            <div className="w-full p-4 md:p-6 rounded-[10px] border-[1.64px] border-dashed border-border bg-offer-search flex flex-col items-center justify-center">
              <ScanLine size={48} className="text-table-text-id mb-4" />

              <p className="text-[14px] md:text-[16px] text-table-text-id text-center mb-4">
                Scan QR code or enter membership ID manually
              </p>

              <input
                placeholder="Enter membership ID (e.g., CRCL-1234)"
                value={scanInput}
                onChange={(e) => setScanInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleScan()}
                className="w-full max-w-xs px-4 py-3 rounded-lg text-[14px] border-[0.82px] border-border bg-offer-search-main text-white-off placeholder-table-text-id outline-none mb-4"
              />

              <button
                onClick={handleScan}
                className="bg-[#E8600F] text-white text-[14px] px-6 py-3 rounded-lg w-full max-w-xs cursor-pointer hover:bg-[#d15509] transition-colors"
              >
                Verify & Redeem
              </button>
            </div>
          </div>

          {/* Scan Result */}
          {scanResult && (
            <div className={`rounded-[14px] p-4 md:p-6 border-[0.82px] ${
              scanResult.success ? 'border-green-500' : 'border-red-500'
            } bg-offer-search-main`}>
              <div className="flex items-center gap-2 mb-4">
                {scanResult.success ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-white-off text-[16px] font-medium">Redemption Successful</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-red-500" />
                    <span className="text-white-off text-[16px] font-medium">Redemption Failed</span>
                  </>
                )}
              </div>

              {scanResult.success ? (
                <div className="space-y-4">
                  <div className="p-3 bg-offer-search rounded-[10px] border border-border">
                    <div className="text-white-off font-medium">{scanResult.customerName}</div>
                    <div className="text-[12px] text-table-text-id">{scanResult.memberId}</div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-[14px]">
                      <span className="text-table-text-id">Offer:</span>
                      <span className="text-white-off">{scanResult.offer}</span>
                    </div>
                    <div className="flex justify-between text-[14px]">
                      <span className="text-table-text-id">Remaining Uses:</span>
                      <span className="bg-green-600 text-white px-2 py-1 rounded text-[12px]">
                        {scanResult.remainingUses}
                      </span>
                    </div>
                    <div className="flex justify-between text-[14px]">
                      <span className="text-table-text-id">Status:</span>
                      <span className="bg-green-600 text-white px-2 py-1 rounded text-[12px]">
                        {scanResult.eligibility}
                      </span>
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      setScanResult(null);
                      setScanInput("");
                    }}
                    className="w-full py-3 border border-border rounded-[10px] text-white-off hover:bg-offer-search text-[14px] cursor-pointer"
                  >
                    Scan Another
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 bg-red-600/20 border border-red-500 rounded-[10px]">
                    <p className="text-red-500 text-[14px]">{scanResult.reason}</p>
                  </div>
                  <button 
                    onClick={() => {
                      setScanResult(null);
                      setScanInput("");
                    }}
                    className="w-full py-3 border border-border rounded-[10px] text-white-off hover:bg-offer-search text-[14px] cursor-pointer"
                  >
                    Try Again
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* RECENT REDEMPTIONS */}
        <div className="mt-6 md:mt-10 rounded-[14px] border-[0.82px] border-border bg-offer-search-main overflow-hidden">
          <div className="p-4 md:p-6 border-b border-border">
            <h3 className="text-[16px] text-white-off font-medium">Recent Redemptions</h3>
            <p className="text-[14px] text-table-text-id mt-1">Last 24 hours</p>
          </div>

          {/* DESKTOP TABLE */}
          <div className="hidden md:block">
            <table className="w-full text-[14px]">
              <thead>
                <tr className="border-b border-border text-table-text-h">
                  <th className="p-4 text-left">Customer</th>
                  <th className="p-4 text-left">Offer</th>
                  <th className="p-4 text-left">Time</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-left">Remaining</th>
                </tr>
              </thead>

              <tbody>
                {redemptions.map((r, i) => (
                  <tr key={i} className="border-b border-border">
                    <td className="p-4">
                      <p className="text-[14px] text-white-off">{r.customer}</p>
                      <p className="text-[12px] text-table-text-id">{r.id}</p>
                    </td>

                    <td className="p-4 text-[14px] text-white-off">{r.offer}</td>

                    <td className="p-4">
                      <div className="flex items-center text-[14px] text-table-text-id gap-2">
                        <Calendar size={14} className="text-table-text-id" />
                        {r.time}
                      </div>
                    </td>

                    {/* Status pill */}
                    <td className="p-4">
                      {r.status === "Success" && (
                        <span className="flex gap-2 items-center w-fit px-3 py-1 rounded-[14px] text-[12px] bg-[#0D542B] text-[#7BF1A8]">
                          <CheckCircle size={14} className="text-[#7BF1A8]" />
                          Success
                        </span>
                      )}
                      {r.status === "Failed" && (
                        <span className="flex gap-2 items-center w-fit px-3 py-1 rounded-[14px] text-[12px] bg-[#5B0A0A] text-[#FF8A8A]">
                          <XCircle size={14} className="text-[#FF8A8A]" />
                          Failed
                        </span>
                      )}
                    </td>

                    <td className="p-4 text-[14px] text-white-off">
                      {r.remaining}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* MOBILE TABLE WITH HORIZONTAL SCROLL */}
          <div className="md:hidden overflow-x-auto">
            <table className="w-full text-[12px] min-w-[600px]">
              <thead>
                <tr className="border-b border-border text-table-text-h">
                  <th className="p-3 text-left">Customer</th>
                  <th className="p-3 text-left">Offer</th>
                  <th className="p-3 text-left">Time</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Remaining</th>
                </tr>
              </thead>

              <tbody>
                {redemptions.map((r, i) => (
                  <tr key={i} className="border-b border-border">
                    <td className="p-3">
                      <p className="text-white-off font-medium">{r.customer}</p>
                      <p className="text-[10px] text-table-text-id mt-1">{r.id}</p>
                    </td>

                    <td className="p-3 text-white-off">{r.offer}</td>

                    <td className="p-3">
                      <div className="flex items-center text-table-text-id gap-1">
                        <Calendar size={12} className="text-table-text-id shrink-0" />
                        <span className="text-[11px]">{r.time}</span>
                      </div>
                    </td>

                    {/* Status pill */}
                    <td className="p-3">
                      {r.status === "Success" && (
                        <span className="flex gap-1 items-center w-fit px-2 py-1 rounded-[10px] text-[10px] bg-[#0D542B] text-[#7BF1A8]">
                          <CheckCircle size={10} className="text-[#7BF1A8]" />
                          Success
                        </span>
                      )}
                      {r.status === "Failed" && (
                        <span className="flex gap-1 items-center w-fit px-2 py-1 rounded-[10px] text-[10px] bg-[#5B0A0A] text-[#FF8A8A]">
                          <XCircle size={10} className="text-[#FF8A8A]" />
                          Failed
                        </span>
                      )}
                    </td>

                    <td className="p-3 text-white-off text-[11px]">
                      {r.remaining}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}