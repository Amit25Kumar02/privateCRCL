"use client";

import { useState } from "react";
import {
  ScanLine,
  CheckCircle,
  XCircle,
  User,
  Camera,
  Keyboard,
  Menu,
} from "lucide-react";
import Sidebar from "@/app/component/sidebar/page";

interface Offer {
  id: number;
  name: string;
  remainingUses: number;
  validUntil: string;
}

interface ScanSuccess {
  success: true;
  customerName: string;
  memberId: string;
  memberSince: string;
  tier: string;
  availableOffers: Offer[];
  totalRedemptions: number;
  lastVisit: string;
}

interface ScanFailure {
  success: false;
  reason: string;
}

type ScanResult = ScanSuccess | ScanFailure | null;

export default function QRScanner() {
  const [scanInput, setScanInput] = useState("");
  const [scanResult, setScanResult] = useState<ScanResult>(null);
  const [scanMode, setScanMode] = useState<"camera" | "manual">("camera");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function handleScan() {
    // simple simulated validation
    if (scanInput.trim() && scanInput.includes("CRCL")) {
      const successPayload: ScanSuccess = {
        success: true,
        customerName: "John Doe",
        memberId: scanInput.trim(),
        memberSince: "2023-05-15",
        tier: "Gold",
        availableOffers: [
          { id: 1, name: "20% Off Lunch Menu", remainingUses: 1, validUntil: "2024-12-31" },
          { id: 2, name: "Happy Hour 2-for-1", remainingUses: 3, validUntil: "2024-11-30" },
          { id: 3, name: "Free Dessert", remainingUses: 0, validUntil: "2024-11-15" },
        ],
        totalRedemptions: 42,
        lastVisit: "2024-11-08",
      };
      setScanResult(successPayload);
    } else {
      const failPayload: ScanFailure = {
        success: false,
        reason: "Invalid membership code. Please try again.",
      };
      setScanResult(failPayload);
    }
  }

  function handleRedeem(offerId: number) {
    // Narrow to ScanSuccess before updating
    if (scanResult && scanResult.success) {
      const prev = scanResult as ScanSuccess;
      const updatedOffers = prev.availableOffers.map((offer) =>
        offer.id === offerId && offer.remainingUses > 0
          ? { ...offer, remainingUses: offer.remainingUses - 1 }
          : offer
      );

      const updated: ScanSuccess = {
        ...prev,
        availableOffers: updatedOffers,
        totalRedemptions: prev.totalRedemptions + 1,
      };

      setScanResult(updated);
    }
  }

  return (
    <div className="flex font-glacial">

      {/* Mobile overlay Sidebar when open */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <div className="fixed left-0 top-0 h-full w-80 bg-[var(--background)] border-r border-border z-50">
            {/* If your Sidebar accepts props use them; else plain render */}
            {/* @ts-ignore allow unknown props if Sidebar doesn't accept them */}
            <Sidebar isMobile onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden md:block fixed left-0 top-0 h-screen">
        <Sidebar />
      </div>

      {/* Main */}
      <main className="flex-1 md:ml-64 min-h-screen bg-[var(--background)] p-4 md:p-8 transition-colors duration-300">

        {/* Mobile header */}
        <div className="md:hidden flex items-center justify-between mb-6">
          <h1 className="text-lg font-semibold text-text">PrivateCRCL</h1>
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg border border-border bg-background"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </div>
        <div className="md:hidden mb-4">
          <h1 className="text-xl font-semibold">QR Scanner</h1>
          <p className="text-sm text-all-sub-h">Scan customer membership cards for redemptions</p>
        </div>

        {/* Desktop header */}
        <div className="hidden md:block mb-6">
          <h1 className="text-[30px] text-text font-light">QR Scanner</h1>
          <p className="text-[16px] text-all-sub-h">Scan customer membership cards for redemptions</p>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Scanner Card */}
          <section className="rounded-[14px] p-4 md:p-6 bg-offer-search-main border-[0.82px] border-border">
            <div className="flex items-center gap-2 mb-4">
              <ScanLine className="w-5 h-5 text-[#E8600F]" />
              <h2 className="text-[16px] text-white-off font-medium">Scan Membership Card</h2>
            </div>

            <div>
              <div className="flex p-1 gap-1 mb-4 bg-offer-search border-[0.82px] border-border rounded-[10px]">
                <button
                  onClick={() => setScanMode("camera")}
                  className={`flex-1 py-2 flex items-center justify-center gap-2 text-[14px] rounded-[8px] ${scanMode === "camera" ? "bg-[#E8600F] text-white" : "text-table-text-id"
                    }`}
                >
                  <Camera className="w-4 h-4" />
                  Camera Scan
                </button>

                <button
                  onClick={() => setScanMode("manual")}
                  className={`flex-1 py-2 flex items-center justify-center gap-2 text-[14px] rounded-[8px] ${scanMode === "manual" ? "bg-[#E8600F] text-white" : "text-table-text-id"
                    }`}
                >
                  <Keyboard className="w-4 h-4" />
                  Manual Entry
                </button>
              </div>

              {/* Camera Mode (placeholder UI) */}
              {scanMode === "camera" && (
                <div className="mt-4">
                  <div className="bg-offer-search border-2 border-dashed border-border rounded-[14px] aspect-square flex flex-col items-center justify-center p-4">
                    <div className="relative w-48 h-48 md:w-64 md:h-64 border-4 border-silver-text rounded-lg flex items-center justify-center">
                      <ScanLine className="w-16 h-16 md:w-24 md:h-24 text-table-text-id animate-pulse" />
                    </div>

                    <p className="text-table-text-id mt-4 text-center text-[14px]">Position QR code within the frame</p>
                    <p className="text-[12px] text-table-text-id mt-1">Camera will scan automatically</p>
                  </div>
                </div>
              )}

              {/* Manual Mode */}
              {scanMode === "manual" && (
                <div className="mt-4">
                  <div className="bg-offer-search border-2 border-dashed border-border rounded-[14px] p-6 flex flex-col items-center justify-center space-y-4">
                    <Keyboard className="w-12 h-12 md:w-16 md:h-16 text-table-text-id" />

                    <p className="text-table-text-id text-center text-[14px]">Enter membership ID manually</p>

                    <input
                      placeholder="Enter ID (e.g., CRCL-1234)"
                      value={scanInput}
                      onChange={(e) => setScanInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleScan()}
                      className="w-full max-w-xs px-4 py-3 text-center text-[14px] bg-offer-search-main border border-border rounded-[10px] text-white-off placeholder-table-text-id"
                    />

                    <button
                      onClick={handleScan}
                      className="w-full max-w-xs bg-[#E8600F] hover:bg-[#d15509] text-white py-3 rounded-[10px] text-[14px] cursor-pointer"
                    >
                      Verify Member
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Result Card */}
          <aside
            className={`rounded-[14px] p-4 md:p-6 bg-offer-search-main border-[0.82px] ${scanResult
                ? scanResult.success
                  ? "border-green-500"
                  : "border-red-500"
                : "border-border"
              }`}
          >
            <div className="flex items-center gap-2 mb-4">
              {!scanResult ? (
                <span className="text-table-text-id text-[14px]">Scan Result</span>
              ) : scanResult.success ? (
                <>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-white-off text-[14px] font-medium">Member Verified</span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-red-500" />
                  <span className="text-white-off text-[14px] font-medium">Verification Failed</span>
                </>
              )}
            </div>

            {/* Empty state */}
            {!scanResult && (
              <div className="text-center text-table-text-id py-8 md:py-12">
                <ScanLine className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 opacity-30" />
                <p className="text-[14px]">Scan a membership card to view details</p>
              </div>
            )}

            {/* Success state */}
            {scanResult && scanResult.success && (
              <div className="space-y-4 md:space-y-6">

                {/* Member Info */}
                <div className="flex items-center gap-4 p-4 bg-offer-search rounded-[10px] border border-border">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-[#E8600F] to-orange-600 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>

                  <div className="flex-1">
                    <div className="text-[14px] md:text-[16px] text-white-off font-medium">{scanResult.customerName}</div>
                    <div className="text-[12px] text-table-text-id mt-1">{scanResult.memberId}</div>

                    <div className="flex items-center gap-2 mt-2">
                      <span className="bg-[#E8600F] text-white px-2 py-1 rounded text-[10px] md:text-[12px]">
                        {scanResult.tier}
                      </span>
                      <span className="text-[10px] md:text-[12px] text-table-text-id">Member since {scanResult.memberSince}</span>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-offer-search rounded-[10px] border border-border">
                    <div className="text-[12px] text-table-text-id">Total Redemptions</div>
                    <div className="text-[16px] md:text-[18px] text-white-off font-medium mt-1">{scanResult.totalRedemptions}</div>
                  </div>

                  <div className="p-3 bg-offer-search rounded-[10px] border border-border">
                    <div className="text-[12px] text-table-text-id">Last Visit</div>
                    <div className="text-[16px] md:text-[18px] text-white-off font-medium mt-1">{scanResult.lastVisit}</div>
                  </div>
                </div>

                {/* Offers */}
                <div>
                  <h3 className="text-[14px] text-white-off font-medium mb-3">Available Offers</h3>

                  <div className="space-y-2">
                    {scanResult.availableOffers.map((offer) => (
                      <div
                        key={offer.id}
                        className={`p-3 rounded-[10px] border ${offer.remainingUses > 0 ? "bg-offer-search border-border" : "bg-offer-search border-border opacity-50"
                          }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-[14px] text-white-off">{offer.name}</span>

                              {offer.remainingUses > 0 ? (
                                <span className="bg-green-600 text-white px-2 py-1 rounded text-[10px]">{offer.remainingUses} left</span>
                              ) : (
                                <span className="bg-red-600 text-white px-2 py-1 rounded text-[10px]">Used</span>
                              )}
                            </div>

                            <div className="text-[12px] text-table-text-id mt-1">Valid until {offer.validUntil}</div>
                          </div>

                          <button
                            disabled={offer.remainingUses === 0}
                            onClick={() => handleRedeem(offer.id)}
                            className={`px-3 py-2 rounded-[8px] text-white text-[12px] cursor-pointer ${offer.remainingUses > 0 ? "bg-[#E8600F] hover:bg-[#d15509]" : "bg-table-text-id cursor-not-allowed"
                              }`}
                          >
                            Redeem
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reset */}
                <button
                  onClick={() => {
                    setScanResult(null);
                    setScanInput("");
                  }}
                  className="w-full py-3 border border-border rounded-[10px] text-white-off hover:bg-offer-search text-[14px] cursor-pointer"
                >
                  Scan Another Card
                </button>
              </div>
            )}

            {/* Failure state */}
            {scanResult && !scanResult.success && (
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
          </aside>
        </div>

        {/* Quick Guide */}
        <section className="mt-6 rounded-[14px] p-4 md:p-6 bg-offer-search-main border-[0.82px] border-border">
          <h3 className="text-white-off text-[16px] font-medium mb-4">Quick Guide</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: "Scan or Enter ID", desc: "Use camera or manually enter membership ID" },
              { title: "Verify Member", desc: "System will show member details and offers" },
              { title: "Redeem Offer", desc: "Click redeem to apply offer" },
            ].map((item, i) => (
              <div key={i} className="p-4 bg-offer-search rounded-[10px] border border-border">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-offer-search border-[0.82px] border-border text-white-off rounded-full flex items-center justify-center mb-3 text-[14px] md:text-[16px]">
                  {i + 1}
                </div>

                <h4 className="text-white-off text-[14px] font-medium mb-2">{item.title}</h4>
                <p className="text-[12px] text-table-text-id">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
