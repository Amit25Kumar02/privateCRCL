"use client";

import React, { useState } from "react";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    PieChart,
    Pie,
    Cell,
} from "recharts";

import { TrendingUp, Eye, DollarSign, Users, Menu ,Download } from "lucide-react";
import Sidebar from "@/app/component/sidebar/page";


const statCards = [
    { title: "Total Redemptions", value: "890", sub: "+18.7% from last month", icon: TrendingUp },
    { title: "Total Reach", value: "66K", sub: "+13.8% impressions", icon: Users },
    { title: "Conversion Rate", value: "18.5%", sub: "+2.4% average", icon: Eye },
    { title: "Avg. Customer Value", value: "SAR 156", sub: "Avg redemption", icon: DollarSign },
];

const performanceData = [
    { month: "Jan", impressions: 20000, clicks: 1200, redemptions: 80 },
    { month: "Feb", impressions: 25000, clicks: 1500, redemptions: 90 },
    { month: "Mar", impressions: 22000, clicks: 1400, redemptions: 85 },
    { month: "Apr", impressions: 26000, clicks: 1700, redemptions: 95 },
    { month: "May", impressions: 24000, clicks: 1600, redemptions: 92 },
    { month: "Jun", impressions: 28000, clicks: 1800, redemptions: 99 },
    { month: "Jul", impressions: 30000, clicks: 2000, redemptions: 110 },
];

const ageData = [
    { name: "25-34", value: 35 },
    { name: "18-24", value: 15 },
    { name: "55+", value: 7 },
    { name: "45-54", value: 15 },
    { name: "35-44", value: 28 },
];

const genderData = [
    { name: "Female", value: 52 },
    { name: "Male", value: 45 },
    { name: "Other", value: 3 },
];

const topOffers = [
    { id: 1, title: "20% Off Lunch Menu", redemptions: 156 },
    { id: 2, title: "Happy Hour 2-for-1", redemptions: 234 },
    { id: 3, title: "Weekend Brunch Special", redemptions: 89 },
    { id: 4, title: "Student Discount", redemptions: 45 },
];

const topRedeemers = [
    { rank: 1, name: "Sarah Johnson", redemptions: 12, last: "2024-11-10" },
    { rank: 2, name: "Michael Chen", redemptions: 10, last: "2024-11-11" },
    { rank: 3, name: "Emma Wilson", redemptions: 9, last: "2024-11-09" },
    { rank: 4, name: "David Park", redemptions: 8, last: "2024-11-11" },
    { rank: 5, name: "Lisa Anderson", redemptions: 7, last: "2024-11-08" },
];

const benchmarkData = [
    { label: "Conversion Rate", value: 0.185, avgLabel: "Above Average" },
    { label: "Customer Retention", value: 0.42, avgLabel: "Average" },
    { label: "Redemption Volume", value: 0.62, avgLabel: "Above Average" },
];

const AGE_COLORS = ["#FF8C42", "#E8600F", "#FFE8CC", "#FFD699", "#FFB366"];
const GENDER_COLORS = ["#E8600F", "#FF8C42", "#FFB366"];


export default function PayoutsAnalyticsPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <div className="font-glacial flex">
            {sidebarOpen && (
                <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm">
                    <Sidebar isMobile={true} onClose={() => setSidebarOpen(false)} />
                </div>
            )}
            {/* Desktop Sidebar */}
            <div className="hidden md:block fixed left-0 top-0 h-screen">
                <Sidebar />
            </div>

            {/* Main */}
            <main className="md:ml-64 flex-1 min-h-screen p-6 md:p-8 bg-background text-text">
                {/* Mobile top bar */}
                <div className="md:hidden flex justify-between items-center mb-4">
                    <h1 className="text-xl font-semibold">PrivateCRCL</h1>
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-2 border-[0.82px] border-border rounded-lg bg-background">
                        <Menu size={22} />
                    </button>
                </div>

                {/* Mobile heading */}
                <div className="md:hidden mb-4">
                    <h1 className="text-xl font-semibold">Payouts & analytics</h1>
                    <p className="text-sm text-all-sub-h">Track performance and insights</p>
                </div>

                {/* Desktop heading */}
                <div className="hidden md:block mb-6">
                    <h1 className="text-[30px] font-saga">Payouts & analytics</h1>
                    <p className="text-[16px] text-all-sub-h">Track performance and customer insights</p>
                </div>

                {/* Export CSV button */}
                <div className="flex md:justify-end mb-6">
                    <button className="px-4 py-2 rounded-lg bg-[#E8600F] text-white flex items-center gap-2">
                        <Download className="w-5 h-5 text-white" />
                        Export CSV
                    </button>
                </div>

                {/* Stat cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    {statCards.map((c, i) => {
                        const Icon = c.icon;
                        return (
                            <div key={i} className="relative p-4 rounded-[14px] h-[157px] border bg-offer-search-main border-border">
                                <div className="absolute top-4 right-4">
                                    <Icon size={18} className="text-[#E8600F]" />
                                </div>

                                <div className="text-sm text-table-text-h">{c.title}</div>
                                <div className="mt-12 text-[24px] text-white-off">{c.value}</div>
                                <div className="text-xs text-[#00C950] mt-1">{c.sub}</div>
                            </div>
                        );
                    })}
                </div>

                {/* Performance chart */}
                <div className="rounded-[14px] border p-4 bg-offer-search-main border-border mb-6">
                    <h3 className="text-[16px] text-table-text-h mb-2">Performance Overview</h3>
                    <p className="text-[14px] text-[#4A5565] mb-2">Last 6 months</p>

                    <div className="w-full h-[260px]">
                        <ResponsiveContainer>
                            <LineChart data={performanceData}>
                                <CartesianGrid strokeDasharray="3 3" opacity={0.06} />
                                <XAxis dataKey="month" stroke="#6B7280" />
                                <YAxis stroke="#6B7280" />
                                <Tooltip />

                                <Line type="monotone" dataKey="impressions" stroke="#6B7280" strokeWidth={2} dot />
                                <Line type="monotone" dataKey="clicks" stroke="#E8600F" strokeWidth={2} dot />
                                <Line type="monotone" dataKey="redemptions" stroke="#22C55E" strokeWidth={2} dot />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Legend */}
                    <div className="flex items-center justify-center gap-6 mt-4 px-2">
                        <div className="flex items-center gap-1">
                            <span className="h-2 w-2 rounded-full bg-[#E8600F]" />
                            <span className="text-[13px] text-[#E8600F] font-medium">Clicks</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="h-2 w-2 rounded-full bg-[#6B7280]" />
                            <span className="text-[13px] text-[#6B7280] font-medium">Impressions</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="h-2 w-2 rounded-full bg-[#22C55E]" />
                            <span className="text-[13px] text-[#22C55E] font-medium">Redemptions</span>
                        </div>
                    </div>
                </div>

                {/* Age + Gender */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                    {/* Age */}
                    <div className="rounded-[14px] border p-4 bg-offer-search-main border-border">
                        <h4 className="text-[16px] text-white-off mb-1">Customer Demographics</h4>
                        <p className="text-[14px] text-table-text-h mb-3">Age distribution</p>

                        <div className="w-full h-[300px] flex justify-center">
                            <ResponsiveContainer>
                                <PieChart>
                                    <Pie data={ageData} dataKey="value" outerRadius={90} label={({ name, value }) => `${name}: ${value}%`}>
                                        {ageData.map((_, i) => (
                                            <Cell key={i} fill={AGE_COLORS[i % AGE_COLORS.length]} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Gender */}
                    <div className="rounded-[14px] border p-4 bg-offer-search-main border-border">
                        <h4 className="text-[16px] text-white-off mb-1">Gender Distribution</h4>
                        <p className="text-[14px] text-table-text-h mb-3">Customer breakdown</p>

                        <div className="w-full h-[260px] flex justify-center">
                            <ResponsiveContainer>
                                <PieChart>
                                    <Pie data={genderData} dataKey="value" outerRadius={90} label={({ name, value }) => `${name}: ${value}%`}>
                                        {genderData.map((_, i) => (
                                            <Cell key={i} fill={GENDER_COLORS[i % GENDER_COLORS.length]} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Top offers */}
                <div className="rounded-[14px]  mb-6 border p-5 bg-offer-search-main border-border">
                    <h4 className="text-[16px] text-white-off mb-1">Top Performing Offers</h4>
                    <p className="text-[14px] text-table-text-h mb-4">November 2024</p>

                    {topOffers.map((o) => (
                        <div key={o.id} className="grid grid-cols-3 p-3 border-b border-border">
                            <div className="text-white-off">{o.title}</div>
                            <div>
                                <span className="px-3 py-1 rounded-lg bg-[#E8600F] text-white text-[12px]">{o.redemptions}</span>
                            </div>
                            <div className="text-right">
                                <button className="px-3 py-1 rounded-md bg-offer-search border border-border text-white-off flex items-center gap-2">
                                    <Eye size={16} /> View
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Top redeemers */}
                <div className="rounded-[14px] border p-5 bg-offer-search-main border-border mb-6 
                w-[310px] overflow-auto md:w-full ">

                    <h4 className="text-[16px] text-white-off mb-1">Top Redeemers</h4>
                    <p className="text-[14px] text-table-text-h mb-4">
                        Most active customers this month
                    </p>

                    {/* SCROLL WRAPPER */}
                    <div className="overflow-x-auto ">

                        <table className=" w-[610px] overflow-auto md:w-full text-sm">
                            <thead>
                                <tr className="border-b border-border text-table-text-h">
                                    <th className="py-3 text-left">Rank</th>
                                    <th className="py-3 text-left">Customer</th>
                                    <th className="py-3 text-left">Redemptions</th>
                                    <th className="py-3 text-left">Last Visit</th>
                                    <th className="py-3 text-left">Tier</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-border">
                                {topRedeemers.map((r) => (
                                    <tr key={r.rank}>
                                        <td className="py-3">
                                            <div className="w-8 h-8 rounded-full bg-offer-search 
                                            flex items-center justify-center text-white-off">
                                                {r.rank}
                                            </div>
                                        </td>

                                        <td className="py-3 text-white-off">{r.name}</td>

                                        <td className="py-3">
                                            <span className="px-3 py-1 rounded-md bg-payout-bg 
                                             text-payout-bg-text text-xs">
                                                {r.redemptions}x
                                            </span>
                                        </td>

                                        <td className="py-3 text-white-off">{r.last}</td>

                                        <td className="py-3">
                                            {r.rank === 1 && (
                                                <span className="px-3 py-1 rounded-md bg-gold text-gold-text text-xs">
                                                    Gold
                                                </span>
                                            )}

                                            {r.rank === 2 && (
                                                <span className="px-3 py-1 rounded-md bg-silver text-silver-text text-xs">
                                                    Silver
                                                </span>
                                            )}

                                            {r.rank > 2 && (
                                                <span className="px-3 py-1 rounded-md bg-bronze text-bronze-text text-xs">
                                                    Bronze
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>
                </div>


                {/* Benchmarks */}
                <div className="rounded-[14px] border p-5 bg-offer-search-main border-border">
                    <h4 className="text-[16px] text-white-off mb-1">Neighborhood Benchmarks</h4>
                    <p className="text-[14px] text-table-text-h mb-6">Comparison with similar businesses</p>

                    <div className="space-y-8">
                        {benchmarkData.map((b, idx) => (
                            <div key={idx}>
                                <div className="flex justify-between mb-1">
                                    <div className="text-white-off">{b.label}</div>
                                    <span className={`text-sm ${b.avgLabel === "Above Average" ? "text-[#00C950]" :
                                        b.avgLabel === "Average" ? "text-[#F0B100]" :
                                            "text-[#EF4444]"
                                        }`}>{b.avgLabel}</span>
                                </div>

                                <div className="w-full bg-payout-line-bg h-2 rounded-full">
                                    <div className="h-2 rounded-full bg-[#E8600F]" style={{ width: `${Math.min(100, Math.round(b.value * 100))}%` }} />
                                </div>

                                <div className="flex justify-between mt-1">
                                    <div className="text-[12px] text-table-text-id">
                                        {b.label === "Redemption Volume" ? `Your volume: 890/mo` : `Your rate: ${(b.value * 100).toFixed(1)}%`}
                                    </div>
                                    <div className="text-[12px] text-table-text-id">
                                        {b.label === "Redemption Volume" ? `Avg: 620/mo` : `Avg: ${b.label === "Customer Retention" ? "45%" : "14.2%"}`}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
