"use client";

import React from "react";
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
    BarChart,
    Bar,
    Legend,
} from "recharts";
import csv from "../../../public/Icon.png";
import { TrendingUp, Eye, DollarSign, Users } from "lucide-react";
import Sidebar from "@/app/component/sidebar/page";

const statCards = [
    { title: "Total Redemptions", value: "890", sub: "+18.7% from last month", icon: TrendingUp, },
    { title: "Total Reach", value: "66K", sub: "+13.8% impressions", icon: Users, },
    { title: "Conversion Rate", value: "18.5%", sub: "+2.4% average", icon: Eye, },
    { title: "Avg. Customer Value", value: "SAR 156", sub: "Avg redemption", icon: DollarSign, },
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

// Colors for age distribution pie chart
const AGE_COLORS = ["#FF8C42", "#E8600F", "#FFE8CC", "#FFD699", "#FFB366"];
// Colors for gender distribution pie chart
const GENDER_COLORS = ["#E8600F", "#FF8C42", "#FFB366"];

export default function PayoutsAnalyticsPage() {
    return (
        <div className="font-glacial flex">
            {/* sidebar */}
            <div className="hidden md:block fixed left-0 top-0 h-screen">
                <Sidebar />
            </div>

            {/* main */}
            <main
                className="
          ml-64 min-h-screen p-6 md:p-8
        bg-[var(--background)] border-border
          transition-colors duration-300 flex-1
        "
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-[30px] text-text">Payouts & analytics</h1>
                        <p className="text-[16px] text-all-sub-h">
                            Track performance and customer insights
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="
        px-4 py-2 rounded-[8px] 
        text-[14px] font-medium 
        bg-[#E8600F] text-text 
        flex items-center gap-2
    ">
                            <img src={csv.src} alt="CSV Icon" className="w-5 h-5" />
                            Export CSV
                        </button>
                    </div>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    {statCards.map((c, i) => {
                        const Icon = c.icon;

                        return (
                            <div
                                key={i}
                                className="
            relative p-4 rounded-[14px] h-[157px] border
            bg-offer-search-main border-border
        "
                            >
                                {/* ICON TOP-RIGHT */}
                                <div className="absolute right-4 top-4">
                                    <Icon size={18} className="text-[#E8600F]" />
                                </div>

                                {/* TITLE */}
                                <div className="text-[14px] text-table-text-h">
                                    {c.title}
                                </div>

                                {/* VALUE */}
                                <div className="mt-12 text-[24px] text-white-off">
                                    {c.value}
                                </div>

                                {/* SUB TEXT */}
                                <div className="text-[12px] text-[#00C950] mt-1">{c.sub}</div>
                            </div>
                        );
                    })}
                </div>


                {/* Performance chart */}
                <div className="rounded-[14px] border-[0.82px] p-4 mb-6 bg-offer-search-main border-border">
                    <h3 className="text-[16px] text-table-text-h mb-2">Performance Overview</h3>
                    <p className="text-[14px] text-[#4A5565] mb-2">Last 6 months</p>

                    <div style={{ width: "100%", height: 260 }}>
                        <ResponsiveContainer>
                            <LineChart data={performanceData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" opacity={0.06} />
                                <XAxis dataKey="month" stroke="#6B7280" />
                                <YAxis stroke="#6B7280" />
                                <Tooltip
                                    contentStyle={{
                                        background: "",
                                        border: "none",
                                        color: "#fff",
                                    }}
                                />

                                <Line type="monotone" dataKey="impressions" stroke="#6B7280" strokeWidth={2} dot />
                                <Line type="monotone" dataKey="clicks" stroke="#E8600F" strokeWidth={2} dot />
                                <Line type="monotone" dataKey="redemptions" stroke="#22C55E" strokeWidth={2} dot />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Custom Legend */}
                    <div className="flex items-center justify-center gap-6 mt-4 px-2">

                        <div className="flex items-center gap-1">
                            <span className="h-2 w-2 rounded-full bg-[#E8600F]"></span>
                            <span className="text-[13px] text-[#E8600F] font-medium">Clicks</span>
                        </div>

                        <div className="flex items-center gap-1">
                            <span className="h-2 w-2 rounded-full bg-[#6B7280]"></span>
                            <span className="text-[13px] text-[#6B7280] font-medium">Impressions</span>
                        </div>

                        <div className="flex items-center gap-1">
                            <span className="h-2 w-2 rounded-full bg-[#22C55E]"></span>
                            <span className="text-[13px] text-[#22C55E] font-medium">Redemptions</span>
                        </div>

                    </div>
                </div>


                {/* two columns: pies + top offers */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                    {/* Age Distribution */}
                    <div className="rounded-[14px] border-[0.82px] p-4 bg-offer-search-main border-border text-white-off">
                        <h4 className="text-[16px] text-white-off mb-1">Customer Demographics</h4>
                        <p className="text-[14px] text-table-text-h mb-3">Age distribution</p>

                        <div className="w-full h-[308px] flex items-center justify-center outline-none">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={ageData}
                                        dataKey="value"
                                        outerRadius={90}
                                        innerRadius={0}
                                        paddingAngle={0}
                                        labelLine={false}
                                        label={({ name, value }) => `${name}: ${value}%`}
                                    >
                                        {ageData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={AGE_COLORS[index % AGE_COLORS.length]} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Gender Distribution */}
                    <div className="rounded-[14px] border-[0.82px] p-4 bg-offer-search-main border-border">
                        <h4 className="text-[16px] text-white-off mb-1">Gender Distribution</h4>
                        <p className="text-[14px] text-table-text-h mb-3">Customer breakdown</p>

                        <div className="w-full h-[260px] flex items-center justify-center">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart >
                                    <Pie
                                        data={genderData}
                                        dataKey="value"
                                        innerRadius={0}
                                        outerRadius={90}
                                        paddingAngle={2}
                                        label={({ name, value }) => `${name}: ${value}%`}
                                    >
                                        {genderData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={GENDER_COLORS[index % GENDER_COLORS.length]} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Top performing offers */}
                <div className="rounded-[14px] mb-6 border-[0.82px] p-5 bg-offer-search-main border-border">

                    <h4 className="text-[16px] text-white-off mb-1 ">
                        Top Performing Offers
                    </h4>
                    <p className="text-[14px] text-table-text-h mb-4">
                        November 2024
                    </p>

                    <div className="grid grid-cols-3 px-2 py-2 text-[14px] font-medium text-table-text-h">
                        <div>Offer Name</div>
                        <div>Redemptions</div>
                        <div className="text-right">Actions</div>
                    </div>

                    {/* Divider */}
                    <div className="border-b border-border mb-2"></div>

                    {/* Rows */}
                    {topOffers.map((o) => (
                        <div
                            key={o.id}
                            className="grid grid-cols-3 px-2 py-3 items-center border-b border-border"
                        >
                            {/* Offer Name */}
                            <div className="text-[14px] text-white-off">
                                {o.title}
                            </div>

                            {/* Redemptions Rounded Badge */}
                            <div>
                                <span className="px-3 py-1 rounded-[8px] bg-[#E8600F] text-[#FFFFFF] text-[12px]">
                                    {o.redemptions}
                                </span>
                            </div>

                            {/* Action Button */}
                            <div className="flex justify-end">
                                <button className="flex items-center gap-3 text-[13px] px-3 py-1 rounded-lg bg-offer-search border-[0.82px] border-border text-white-off">
                                    <Eye size={16} />
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>


                {/* Top redeemers table */}
                <div className="rounded-[14px] border-[0.82px] p-5 bg-offer-search-main border-border ">
                    <h4 className="text-[16px] text-white-off mb-1">Top Redeemers</h4>
                    <p className="text-[14px] text-table-text-h mb-4">
                        Most active customers this month
                    </p>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            {/* HEADER */}
                            <thead>
                                <tr className="text-[14px] border-b-[0.82px] border-border text-table-text-h">
                                    <th className="py-3 text-left w-30">Rank</th>
                                    <th className="py-3 text-left">Customer</th>
                                    <th className="py-3 text-left">Redemptions</th>
                                    <th className="py-3 text-left">Last Visit</th>
                                    <th className="py-3 text-left">Tier</th>
                                </tr>
                            </thead>

                            {/* BODY */}
                            <tbody className="divide-y divide-[#E5E7EB] dark:divide-[#1f1f1f]">
                                {topRedeemers.map((r) => (
                                    <tr key={r.rank} >

                                        {/* RANK CIRCLE */}
                                        <td className="py-3 text-left w-30">
                                            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-offer-search text-white-off ">
                                                {r.rank}
                                            </div>
                                        </td>

                                        {/* CUSTOMER NAME */}
                                        <td className="py-3 text-[14px] text-white-off">
                                            {r.name}
                                        </td>

                                        {/* REDEMPTION BADGE */}
                                        <td className="py-3">
                                            <span className="px-3 py-1 rounded-lg bg-payout-bg text-payout-bg-text text-[12px]">
                                                {r.redemptions} times
                                            </span>
                                        </td>

                                        {/* LAST VISIT */}
                                        <td className="py-3 text-[14px] text-white-off">
                                            {r.last}
                                        </td>

                                        {/* TIER BADGE */}
                                        <td className="py-3">
                                            {r.rank === 1 && (
                                                <span className="px-3 py-1 rounded-lg bg-gold text-gold-text text-[12px]">
                                                    Gold
                                                </span>
                                            )}
                                            {r.rank === 2 && (
                                                <span className="px-3 py-1 rounded-lg bg-silver text-silver-text text-[12px]">
                                                    Silver
                                                </span>
                                            )}
                                            {r.rank > 2 && (
                                                <span className="px-3 py-1 rounded-lg bg-bronze text-bronze-text text-[12px]">
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
                <div className="rounded-[14px] border-[0.82px] mt-6 p-5 border-border bg-offer-search-main ">
                    <h4 className="text-[16px] text-white-off mb-1">
                        Neighborhood Benchmarks
                    </h4>
                    <p className="text-[14px] text-table-text-h mb-6">
                        How you compare to similar businesses
                    </p>

                    <div className="space-y-8">
                        {benchmarkData.map((b, idx) => (
                            <div key={idx}>

                                {/* Title + Status */}
                                <div className="flex items-center justify-between mb-2">
                                    <div className="text-[15px] text-white-off">
                                        {b.label}
                                    </div>

                                    {/* Status Colors Like Screenshot */}
                                    {b.avgLabel === "Above Average" && (
                                        <span className="text-[14px] text-[#00C950] font-medium">
                                            Above Average
                                        </span>
                                    )}

                                    {b.avgLabel === "Average" && (
                                        <span className="text-[14px] text-[#F0B100] font-medium">
                                            Average
                                        </span>
                                    )}

                                    {b.avgLabel === "Below Average" && (
                                        <span className="text-[14px] text-[#EF4444] font-medium">
                                            Below Average
                                        </span>
                                    )}
                                </div>

                                {/* Bar Background */}
                                <div className="w-full bg-payout-line-bg h-2 rounded-full">
                                    {/* Fill bar */}
                                    <div
                                        className="h-2 rounded-full bg-[#E8600F]"
                                        style={{ width: `${Math.min(100, Math.round(b.value * 100))}%` }}
                                    />
                                </div>

                                {/* Bottom Labels */}
                                <div className="flex justify-between mt-1">
                                    <div className="text-[12px] text-table-text-id">
                                        {b.label === "Redemption Volume"
                                            ? `Your volume: 890/mo`
                                            : `Your rate: ${(b.value * 100).toFixed(1)}%`}
                                    </div>

                                    <div className="text-[12px] text-table-text-id">
                                        {b.label === "Redemption Volume"
                                            ? `Avg: 620/mo`
                                            : `Avg: ${b.label === "Customer Retention" ? "45%" : "14.2%"}`}
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