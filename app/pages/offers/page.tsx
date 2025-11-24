"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Search, Filter, MoreVertical, Menu } from "lucide-react";
import Sidebar from "@/app/component/sidebar/page";
type OfferStatus = "active" | "submitted" | "approved" | "paused" | "expired";
type Offer = {
  id: number;
  title: string;
  status: OfferStatus;
  impressions: string;
  clicks: string;
  redeemed: number;
  total: number;
  start: string;
  end: string;
};

const initialOffers: Offer[] = [
  { id: 1, title: "20% Off Lunch Menu", status: "active", impressions: "12,450", clicks: "892", redeemed: 156, total: 500, start: "2024-11-01", end: "2024-12-31" },
  { id: 2, title: "Happy Hour 2-for-1", status: "active", impressions: "18,200", clicks: "1,340", redeemed: 234, total: 300, start: "2024-11-01", end: "2024-11-15" },
  { id: 3, title: "Student Discount 15%", status: "approved", impressions: "0", clicks: "0", redeemed: 0, total: 200, start: "2024-11-20", end: "2024-12-20" },
  { id: 4, title: "Weekend Brunch Special", status: "submitted", impressions: "0", clicks: "0", redeemed: 0, total: 150, start: "2024-11-15", end: "2024-12-15" },
  { id: 5, title: "Buy 2 Get 1 Free", status: "paused", impressions: "8,900", clicks: "560", redeemed: 89, total: 200, start: "2024-10-01", end: "2024-11-30" },
  { id: 6, title: "Early Bird Coffee", status: "expired", impressions: "15,600", clicks: "1,200", redeemed: 145, total: 150, start: "2024-09-01", end: "2024-10-31" },
];

export default function OffersPage() {
  const [offers] = useState<Offer[]>(initialOffers);

  const [activeTab, setActiveTab] = useState<string>("All");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Search & Sort
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"az" | "za" | "newest" | "oldest">("newest");

  // Dropdown open & refs
  const [filterOpen, setFilterOpen] = useState(false);
  const filterBtnRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  // Filter states
  const [statusFilter, setStatusFilter] = useState<Record<string, boolean>>({});
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");

  // Slider states (we'll initialize min/max from data)
  const numericOffers = useMemo(() => {
    const parseNum = (v: string) => Number(String(v).replace(/,/g, ""));
    return offers.map((o) => ({
      ...o,
      impressionsNum: parseNum(o.impressions),
      clicksNum: parseNum(o.clicks),
    }));
  }, [offers]);

  const impressionsMin = useMemo(() => Math.min(...numericOffers.map((o) => o.impressionsNum)), [numericOffers]);
  const impressionsMax = useMemo(() => Math.max(...numericOffers.map((o) => o.impressionsNum)), [numericOffers]);

  const clicksMin = useMemo(() => Math.min(...numericOffers.map((o) => o.clicksNum)), [numericOffers]);
  const clicksMax = useMemo(() => Math.max(...numericOffers.map((o) => o.clicksNum)), [numericOffers]);

  const redemptionMin = useMemo(() => Math.min(...offers.map((o) => o.redeemed)), [offers]);
  const redemptionMax = useMemo(() => Math.max(...offers.map((o) => o.total)), [offers]);

  const [imprRange, setImprRange] = useState<[number, number]>([impressionsMin, impressionsMax]);
  const [clickRange, setClickRange] = useState<[number, number]>([clicksMin, clicksMax]);
  const [redeemRange, setRedeemRange] = useState<[number, number]>([redemptionMin, redemptionMax]);

  // populate available statuses on mount
  useEffect(() => {
    const statuses = Array.from(new Set(offers.map((o) => o.status)));
    const init: Record<string, boolean> = {};
    statuses.forEach((s) => (init[s] = false));
    setStatusFilter(init);
    // set slider initial ranges (in case offers change)
    setImprRange([impressionsMin, impressionsMax]);
    setClickRange([clicksMin, clicksMax]);
    setRedeemRange([redemptionMin, redemptionMax]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offers]);

  // close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as Node;
      if (filterOpen) {
        if (
          panelRef.current &&
          !panelRef.current.contains(target) &&
          filterBtnRef.current &&
          !filterBtnRef.current.contains(target)
        ) {
          setFilterOpen(false);
        }
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [filterOpen]);

  const tabs = ["All", "Active", "Submitted", "Approved", "Paused", "Expired"];

  // helpers
  const parseNumber = (v: string | number) => Number(String(v).toString().replace(/,/g, "") || 0);

  // Filter logic
  const filteredOffers = useMemo(() => {
    const activeStatusFilters = Object.entries(statusFilter).filter(([, v]) => v).map(([k]) => k);

    return numericOffers
      .filter((o) => {
        // tab filter (if not All)
        if (activeTab !== "All" && o.status.toLowerCase() !== activeTab.toLowerCase()) return false;

        // search filter (title or id)
        if (search.trim()) {
          const s = search.trim().toLowerCase();
          const matchesTitle = o.title.toLowerCase().includes(s);
          const matchesId = String(o.id).includes(s);
          if (!matchesTitle && !matchesId) return false;
        }

        // status multi-select (if any selected)
        if (activeStatusFilters.length > 0 && !activeStatusFilters.includes(o.status)) return false;

        // date range filter (check overlap)
        if (dateFrom || dateTo) {
          const itemStart = new Date(o.start);
          const itemEnd = new Date(o.end);
          const filterStart = dateFrom ? new Date(dateFrom) : null;
          const filterEnd = dateTo ? new Date(dateTo) : null;

          // if both set: require overlap
          if (filterStart && filterEnd) {
            if (itemEnd < filterStart || itemStart > filterEnd) return false;
          } else if (filterStart) {
            if (itemEnd < filterStart) return false;
          } else if (filterEnd) {
            if (itemStart > filterEnd) return false;
          }
        }

        // impressions range
        if (o.impressionsNum < imprRange[0] || o.impressionsNum > imprRange[1]) return false;

        // clicks range
        if (o.clicksNum < clickRange[0] || o.clicksNum > clickRange[1]) return false;

        // redemption range (redeemed value)
        if (o.redeemed < redeemRange[0] || o.redeemed > redeemRange[1]) return false;

        return true;
      })
      .sort((a, b) => {
        if (sort === "az") return a.title.localeCompare(b.title);
        if (sort === "za") return b.title.localeCompare(a.title);
        if (sort === "newest") return new Date(b.start).getTime() - new Date(a.start).getTime();
        if (sort === "oldest") return new Date(a.start).getTime() - new Date(b.start).getTime();
        return 0;
      });
  }, [numericOffers, activeTab, search, statusFilter, dateFrom, dateTo, imprRange, clickRange, redeemRange, sort]);

  // reset filters
  function resetFilters() {
    setSearch("");
    setActiveTab("All");
    // reset status
    const resetStatus: Record<string, boolean> = {};
    Object.keys(statusFilter).forEach((k) => (resetStatus[k] = false));
    setStatusFilter(resetStatus);
    setDateFrom("");
    setDateTo("");
    setImprRange([impressionsMin, impressionsMax]);
    setClickRange([clicksMin, clicksMax]);
    setRedeemRange([redemptionMin, redemptionMax]);
    setSort("newest");
  }

  // We'll absolutely position the panel relative to the button using getBoundingClientRect
  const [panelStyle, setPanelStyle] = useState<React.CSSProperties>({});
  useEffect(() => {
    if (filterOpen && filterBtnRef.current) {
      const rect = filterBtnRef.current.getBoundingClientRect();
      const top = rect.bottom + 8 + window.scrollY;
      const left = rect.left + window.scrollX;
      setPanelStyle({
        position: "absolute",
        top,
        left,
        width: 260,
        zIndex: 60,
      });
    }
  }, [filterOpen]);

  // small UI colors for status badge mapping (keeps previous colors)
  const statusColor: Record<OfferStatus, string>  = {
    active: "bg-[#E8600F] text-[#FFFFFF]",
    submitted: "bg-[#DBEAFE] dark:bg-[#1C398E] text-[#1447E6] dark:text-[#8EC5FF]",
    approved: "bg-[#DCFCE7] dark:bg-[#0D542B] text-[#008236] dark:text-[#7BF1A8]",
    paused: "bg-[#FEF9C2] dark:bg-[#733E0A] text-[#A65F00] dark:text-[#FFDF20]",
    expired: "bg-[#E5E7EB] dark:bg-[#27272A] text-[#6A7282] dark:text-[#9F9FA9]",
  };

  return (
    <div className="font-glacial flex">

      {/* DESKTOP SIDEBAR */}
      <div className="hidden md:block fixed left-0 top-0 h-screen">
        <Sidebar />
      </div>

      {/* MOBILE SIDEBAR */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 bg-black/60 z-50">
          <Sidebar />
          <div onClick={() => setSidebarOpen(false)} className="absolute inset-0" />
        </div>
      )}

      {/* MAIN CONTENT */}
      <div className="ml-64 min-h-screen p-6 md:p-8 dark:bg-black  dark:text-white transition-colors duration-300 flex-1 relative">

        {/* Mobile menu */}
        <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 mb-4 bg-gray-200 dark:bg-[#111] border border-gray-300 dark:border-[#333] rounded-lg">
          <Menu size={22} />
        </button>

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-[30px] text-[#101828]">Offers Management</h1>
            <p className="text-[16px] text-[#4A5565] dark:text-[#9F9FA9]">Create and manage perks and discounts</p>
          </div>

          <div className="flex h-[37px] items-center gap-3 w-full md:w-auto">
            <button className="bg-[#E8600F] px-4 py-2 rounded-[8px] text-[14px] text-[#FFFFFF]">
              +  Create Offer
            </button>
          </div>
        </div>

        {/* Search + Filters row */}
        <div className="rounded-[14px] p-[24px] flex flex-col md:flex-row gap-4 items-center bg-[#FFFFFF] dark:bg-[#09090B] border-[0.82px] border-[#E5E7EB] dark:border-[#27272A]">
          <div className="flex h-[40px] px-4 items-center gap-3 w-full rounded-[8px] border-[0.82px] bg-[#F9FAFB] dark:bg-[#2626264D] border-[#D1D5DC] dark:border-[#27272A]">
            <Search size={18} className="text-[#717182]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search offers"
              className="bg-transparent w-full text-[14px] focus:outline-none text-[#717182] dark:text-white"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              ref={filterBtnRef}
              onClick={() => setFilterOpen((s) => !s)}
              className="px-4 py-2 rounded-[8px] flex items-center gap-2 text-[14px] border border-[#D1D5DC] dark:border-[#2a2a2a] text-[#364153] dark:text-gray-300 bg-[#FFFFFF] dark:bg-transparent cursor-pointer relative"
            >
              <Filter size={16} />
              Filters
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto bg-[#FFFFFF] border-[0.82px] border-[#E5E7EB] rounded-[14px] w-fit mt-5 p-2 hide-scrollbar">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-[8px] py-[4px] cursor-pointer text-[14px] whitespace-nowrap rounded-[14px] ${activeTab === t
                  ? "bg-[#E8600F] text-[#FFFFFF] dark:bg-[#FFFFFF] dark:text-black border-black dark:border-white"
                  : "text-[#0A0A0A] dark:text-gray-400"
                }`}
            >
              {t}
            </button>
          ))}
        </div>

        {filterOpen && (
          <div ref={panelRef} style={panelStyle} className="hidden sm:block">
            <div className="w-[260px] rounded-lg shadow-lg bg-white dark:bg-[#0b0b0b] border border-gray-200 dark:border-[#2a2a2a] p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium">Filters</h4>
                <button
                  onClick={() => {
                    resetFilters();
                    setFilterOpen(false);
                  }}
                  className="text-xs text-gray-500 hover:underline"
                >
                  Reset
                </button>
              </div>

              {/* Status multi-select */}
              <div className="mb-3">
                <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">Status</p>
                <div className="flex flex-wrap gap-2">
                  {Object.keys(statusFilter).map((s) => (
                    <label key={s} className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={!!statusFilter[s]}
                        onChange={() => setStatusFilter((prev) => ({ ...prev, [s]: !prev[s] }))}
                        className="w-4 h-4"
                      />
                      <span className="capitalize">{s}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Date range */}
              <div className="mb-3">
                <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">Date range</p>
                <div className="flex gap-2">
                  <input
                    type="date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    className="text-sm px-2 py-1 border rounded-md w-1/2 bg-white dark:bg-[#0b0b0b] border-gray-300 dark:border-[#333]"
                  />
                  <input
                    type="date"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    className="text-sm px-2 py-1 border rounded-md w-1/2 bg-white dark:bg-[#0b0b0b] border-gray-300 dark:border-[#333]"
                  />
                </div>
              </div>

              {/* Impressions slider */}
              <div className="mb-3">
                <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">Impressions</p>
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                  {imprRange[0].toLocaleString()} — {imprRange[1].toLocaleString()}
                </div>
                <div className="flex gap-2 items-center">
                  <input
                    type="range"
                    min={impressionsMin}
                    max={impressionsMax}
                    value={imprRange[0]}
                    onChange={(e) => setImprRange([Number(e.target.value), Math.max(Number(e.target.value), imprRange[1])])}
                    className="w-full"
                  />
                </div>
                <div className="mt-2 flex gap-2 items-center">
                  <input
                    type="range"
                    min={impressionsMin}
                    max={impressionsMax}
                    value={imprRange[1]}
                    onChange={(e) => setImprRange([Math.min(imprRange[0], Number(e.target.value)), Number(e.target.value)])}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Clicks slider */}
              <div className="mb-3">
                <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">Clicks</p>
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                  {clickRange[0].toLocaleString()} — {clickRange[1].toLocaleString()}
                </div>
                <input
                  type="range"
                  min={clicksMin}
                  max={clicksMax}
                  value={clickRange[0]}
                  onChange={(e) => setClickRange([Number(e.target.value), Math.max(Number(e.target.value), clickRange[1])])}
                  className="w-full mb-2"
                />
                <input
                  type="range"
                  min={clicksMin}
                  max={clicksMax}
                  value={clickRange[1]}
                  onChange={(e) => setClickRange([Math.min(clickRange[0], Number(e.target.value)), Number(e.target.value)])}
                  className="w-full"
                />
              </div>

              {/* Redemption slider */}
              <div className="mb-3">
                <p className="text-xs text-gray-600 dark:text-gray-300 mb-1">Redemptions</p>
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                  {redeemRange[0]} — {redeemRange[1]}
                </div>
                <input
                  type="range"
                  min={redemptionMin}
                  max={redemptionMax}
                  value={redeemRange[0]}
                  onChange={(e) => setRedeemRange([Number(e.target.value), Math.max(Number(e.target.value), redeemRange[1])])}
                  className="w-full mb-2"
                />
                <input
                  type="range"
                  min={redemptionMin}
                  max={redemptionMax}
                  value={redeemRange[1]}
                  onChange={(e) => setRedeemRange([Math.min(redeemRange[0], Number(e.target.value)), Number(e.target.value)])}
                  className="w-full"
                />
              </div>

              {/* Sort inside panel */}
              <div className="mb-3">
                <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">Sort</p>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as any)}
                  className="w-full text-sm px-2 py-1 border rounded-md bg-white dark:bg-[#0b0b0b] border-gray-300 dark:border-[#333]"
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="az">A - Z</option>
                  <option value="za">Z - A</option>
                </select>
              </div>

              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => {
                    setFilterOpen(false);
                  }}
                  className="flex-1 px-3 py-2 rounded-md border border-gray-300 dark:border-[#333] text-sm"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    resetFilters();
                    setFilterOpen(false);
                  }}
                  className="flex-1 px-3 py-2 rounded-md bg-[#E8600F] text-white text-sm"
                >
                  Apply & Reset
                </button>
              </div>
            </div>
          </div>
        )}

        {/* DESKTOP TABLE */}
        <div className="mt-6 hidden md:block rounded-[14px] overflow-hidden bg-[#FFFFFF] border-[0.82px] border-[#E5E7EB] dark:border-[#2a2a2a]">
          <table className="w-full text-[14px] ">
            <thead>
              <tr className=" text-[#4A5565] text-[14px] border-[0.82px] border-[#E5E7EB] dark:text-[#9F9FA9]">
                <th className="p-4 text-left">Offer</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Performance</th>
                <th className="p-4 text-left">Redemptions</th>
                <th className="p-4 text-left">Period</th>
                <th className="p-4 text-left w-10">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 dark:divide-[#1f1f1f]">
              {filteredOffers.map((item) => (
                <tr key={item.id} className="hover:bg-gray-100 dark:hover:bg-[#141414] transition">
                  <td className="p-4">
                    <p className="text-[#101828] text-[14px]">{item.title}</p>
                    <p className="text-[14px] text-[#6A7282]">ID: {item.id}</p>
                  </td>

                  <td className="p-4">
                    <span className={`px-2 py-1 text-[12px] rounded-[8px] ${statusColor[item.status]}`}>
                      {item.status}
                    </span>
                  </td>

                  <td className="p-4">
                    <p className="text-[#101828] text-[14px]">{item.impressions} impressions</p>
                    <p className="text-[14px] text-[#6A7282]">{item.clicks} clicks</p>
                  </td>

                  <td className="p-4">
                    <p className="text-[14px] text-[#101828]">{item.redeemed} / {item.total}</p>
                    <div className="w-full bg-[#E5E7EB] dark:bg-[#2a2a2a] rounded-full h-[6px] mt-1">
                      <div className="bg-[#E8600F] h-[6px] rounded-full" style={{ width: `${(item.redeemed / item.total) * 100}%` }} />
                    </div>
                  </td>

                  <td className="p-4">
                    <p className="text-[14px] text-[#101828]">{item.start}</p>
                    <p className="text-[14px] text-[#6A7282]">{item.end}</p>
                  </td>

                  <td className="p-4">
                    <MoreVertical className="text-[#364153] dark:text-gray-400 cursor-pointer" />
                  </td>
                </tr>
              ))}

              {filteredOffers.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-6 text-center text-sm text-gray-500">
                    No offers match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* MOBILE CARDS */}
        <div className="md:hidden mt-6 space-y-4">
          {filteredOffers.map((item) => (
            <div key={item.id} className="p-4 space-y-3 rounded-xl border bg-gray-50 dark:bg-[#111] border-gray-300 dark:border-[#27272A]">
              <div className="flex justify-between">
                <h3 className="font-medium">{item.title}</h3>
                <MoreVertical className="text-gray-500 dark:text-gray-400" />
              </div>

              <p className="text-xs text-gray-500">ID: {item.id}</p>

              <span className={`px-2 py-1 text-xs rounded-md ${statusColor[item.status]}`}>
                {item.status}
              </span>

              <div>
                <p className="text-sm">{item.impressions} impressions</p>
                <p className="text-xs text-gray-500">{item.clicks} clicks</p>
              </div>

              <div>
                <p className="text-sm">{item.redeemed} / {item.total}</p>
                <div className="w-full bg-gray-300 dark:bg-[#2a2a2a] h-1.5 rounded-full mt-1">
                  <div className="bg-[#E8600F] h-1.5 rounded-full" style={{ width: `${(item.redeemed / item.total) * 100}%` }} />
                </div>
              </div>

              <div>
                <p className="text-sm">{item.start}</p>
                <p className="text-xs text-gray-500">{item.end}</p>
              </div>
            </div>
          ))}

          {filteredOffers.length === 0 && (
            <div className="p-4 text-center text-sm text-gray-500">No offers match your filters.</div>
          )}
        </div>
      </div>
    </div>
  );
}
