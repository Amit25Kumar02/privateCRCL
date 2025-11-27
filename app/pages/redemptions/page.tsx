"use client";

import { useState } from "react";
import { ScanLine, Calendar, CheckCircle, XCircle, Menu } from "lucide-react";
import Sidebar from "../../component/sidebar/page";

export default function RedemptionsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scanInput, setScanInput] = useState("");
  const [scanResult, setScanResult] = useState<any>(null);

  const redemptions = [
    { customer: "Sarah Johnson", id: "CRCL-4523", offer: "20% Off Lunch Menu", time: "2024-11-11 12:34 PM", status: "Success", remaining: "0 uses left" },
    { customer: "Michael Chen", id: "CRCL-8891", offer: "Happy Hour 2-for-1", time: "2024-11-11 11:22 AM", status: "Success", remaining: "2 uses left" },
    { customer: "Emma Wilson", id: "CRCL-2254", offer: "20% Off Lunch Menu", time: "2024-11-11 10:15 AM", status: "Failed", remaining: "Already redeemed today" },
    { customer: "David Park", id: "CRCL-7756", offer: "Weekend Brunch Special", time: "2024-11-10 09:45 AM", status: "Success", remaining: "1 uses left" },
  ];

  const handleScan = () => {
    if (scanInput.includes("CRCL")) {
      setScanResult({
        success: true,
        customerName: "John Doe",
        memberId: scanInput,
        offer: "20% Off Lunch Menu",
        remainingUses: 2,
        eligibility: "Valid",
      });
    } else {
      setScanResult({
        success: false,
        reason: "Invalid membership code",
      });
    }
  };

  return (
    <div className="flex font-glacial">
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm">
          <Sidebar isMobile={true} onClose={() => setSidebarOpen(false)} />
        </div>
      )}

      <div className="hidden md:block fixed left-0 top-0 h-screen">
        <Sidebar />
      </div>

      <div className="flex-1 md:ml-64 bg-background min-h-screen p-4 md:p-6 lg:p-8">

        <div className="md:hidden flex items-center justify-between mb-4 pt-1">
          
        <div>
          <h1 className="text-xl font-semibold">Redemptions</h1>
          <p className="text-sm text-all-sub-h">Scan membership cards and track redemptions</p>
        </div>
          <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-lg border border-border bg-background">
            <Menu size={22} />
          </button>
        </div>


        <div className="hidden md:block mb-6">
          <h1 className="text-[30px] font-saga">Redemptions</h1>
          <p className="text-[16px] text-all-sub-h">Scan membership cards and track redemptions</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">

          <div className="bg-offer-search-main p-6 rounded-[14px] border border-border">
            <div className="flex items-center gap-2 mb-4">
              <ScanLine className="text-[#E8600F]" size={22} />
              <p className="text-white-off text-[16px] font-medium">Membership Card Scanner</p>
            </div>

            <div className="w-full p-6 rounded-[10px] border border-dashed border-border bg-offer-search flex flex-col items-center">
              <ScanLine size={50} className="text-table-text-id mb-4" />
              <p className="text-[15px] text-table-text-id text-center mb-4">Scan QR code or enter membership ID manually</p>

              <input
                placeholder="Enter membership ID (e.g., CRCL-1234)"
                value={scanInput}
                onChange={(e) => setScanInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleScan()}
                className="w-full max-w-xs px-4 py-3 rounded-lg text-[14px] border border-border bg-offer-search-main text-white-off placeholder-table-text-id outline-none mb-4"
              />

              <button onClick={handleScan} className="bg-[#E8600F] cursor-pointer text-white text-[14px] px-6 py-3 rounded-lg w-full max-w-xs hover:bg-[#d15509]">
                Verify & Redeem
              </button>
            </div>
          </div>

          {scanResult && (
            <div className={`bg-offer-search-main p-6 rounded-[14px] border ${scanResult.success ? "border-green-500" : "border-red-500"}`}>
              <div className="flex items-center gap-2 mb-4">
                {scanResult.success ? (
                  <>
                    <CheckCircle className="text-green-500" size={20} />
                    <p className="text-white-off text-[16px] font-medium">Redemption Successful</p>
                  </>
                ) : (
                  <>
                    <XCircle className="text-red-500" size={20} />
                    <p className="text-white-off text-[16px] font-medium">Redemption Failed</p>
                  </>
                )}
              </div>

              {scanResult.success ? (
                <div className="space-y-4">
                  <div className="p-3 bg-offer-search rounded-[10px] border border-border">
                    <p className="text-white-off font-medium">{scanResult.customerName}</p>
                    <p className="text-[12px] text-table-text-id">{scanResult.memberId}</p>
                  </div>

                  <div className="space-y-3">
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

                  <button onClick={() => { setScanResult(null); setScanInput(""); }} className="w-full py-3 border border-border rounded-[10px] text-white-off hover:bg-offer-search text-[14px]">
                    Scan Another
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 bg-red-600/20 border border-red-500 rounded-[10px]">
                    <p className="text-red-500 text-[14px]">{scanResult.reason}</p>
                  </div>

                  <button onClick={() => { setScanResult(null); setScanInput(""); }} className="w-full py-3 border border-border rounded-[10px] text-white-off hover:bg-offer-search cursor-pointer text-[14px]">
                    Try Again
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="md:w-full overflow-x-auto rounded-lg bg-offer-search-main p-6  border-[0.82px] border-border">
          <h3 className="text-white-off text-[16px] mb-1">Recent Redemptions</h3>
          <p className="text-table-text-id text-sm mb-4">Last 24 hours</p>

          <div className="w-full max-w-[100px] md:max-w-full">
            <table className="w-full min-w-[700px] text-[14px]">
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
                      <p className="text-white-off">{r.customer}</p>
                      <p className="text-[12px] text-table-text-id">{r.id}</p>
                    </td>
                    <td className="p-4 text-white-off">{r.offer}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-table-text-id">
                        <Calendar size={14} />
                        {r.time}
                      </div>
                    </td>
                    <td className="p-4">
                      {r.status === "Success" && (
                        <span className="flex items-center gap-2 px-3 py-1 rounded-[14px] text-[12px] bg-[#0D542B] text-[#7BF1A8] w-fit">
                          <CheckCircle size={14} />
                          Success
                        </span>
                      )}
                      {r.status === "Failed" && (
                        <span className="flex items-center gap-2 px-3 py-1 rounded-[14px] text-[12px] bg-[#5B0A0A] text-[#FF8A8A] w-fit">
                          <XCircle size={14} />
                          Failed
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-white-off">{r.remaining}</td>
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
