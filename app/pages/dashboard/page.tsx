"use client";

import { useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    CartesianGrid,
    Area,
    AreaChart,
} from "recharts";

import {
    TrendingUp,
    AlertCircle,
    CheckCircle,
    Clock,
    XCircle,
    Menu,
} from "lucide-react";

import Sidebar from "../../component/sidebar/page";

const performanceData = [
    { name: "Mon", value: 2000 },
    { name: "Tue", value: 1500 },
    { name: "Wed", value: 9800 },
    { name: "Thu", value: 3900 },
    { name: "Fri", value: 5200 },
    { name: "Sat", value: 7000 },
    { name: "Sun", value: 6000 },
];

const redemptionData = [
    { name: "Mon", value: 50 },
    { name: "Tue", value: 35 },
    { name: "Wed", value: 90 },
    { name: "Thu", value: 65 },
    { name: "Fri", value: 80 },
    { name: "Sat", value: 110 },
    { name: "Sun", value: 95 },
];

export default function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

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
                    <div className="text-xl font-semibold">PrivateCRCL</div>
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-2 rounded-lg border border-border bg-background"
                    >
                        <Menu size={22} />
                    </button>
                </div>

                <div className="md:hidden mb-4">
                    <h1 className="text-xl font-semibold">Dashboard</h1>
                    <p className="text-sm text-all-sub-h">Today at a glance</p>
                </div>

                <div className="hidden md:block mb-6">
                    <h1 className="text-[30px] font-saga">Dashboard</h1>
                    <p className="text-[16px] text-all-sub-h">Today at a glance</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 h-auto md:min-h-[157px]  gap-4 mb-6">
                    <div className="bg-offer-search-main p-5 rounded-[14px] border border-border">
                        <div className="flex justify-between">
                            <p className="text-table-text-h text-sm">Active Offers</p>
                            <CheckCircle className="text-[#00C950]" size={18} />
                        </div>
                        <h2 className="text-white-off text-[24px] mt-10">8</h2>
                        <p className="text-xs text-[#6A7282]">2 scheduled</p>
                    </div>

                    <div className="bg-offer-search-main p-5 rounded-[14px] border border-border">
                        <div className="flex justify-between">
                            <p className="text-table-text-h text-sm">Pending Approvals</p>
                            <Clock className="text-[#F0B100]" size={18} />
                        </div>
                        <h2 className="text-white-off text-[24px] mt-10">3</h2>
                        <p className="text-xs text-[#6A7282]">2 drafts saved</p>
                    </div>

                    <div className="bg-offer-search-main p-5 rounded-[14px] border border-border">
                        <div className="flex justify-between">
                            <p className="text-table-text-h text-sm">Paused / Expired</p>
                            <XCircle className="text-[#71717B]" size={18} />
                        </div>
                        <h2 className="text-white-off text-[24px] mt-10">5</h2>
                        <p className="text-xs text-[#6A7282]">2 paused, 3 expired</p>
                    </div>

                    <div className="bg-offer-search-main p-5 rounded-[14px] border border-border">
                        <div className="flex justify-between">
                            <p className="text-table-text-h text-sm">Conversion Rate</p>
                            <TrendingUp className="text-[#E8600F]" size={18} />
                        </div>
                        <h2 className="text-white-off text-[24px] mt-10">18.5%</h2>
                        <p className="text-xs text-[#00C950]">+2.4% from last week</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
                    <div className="bg-offer-search-main p-6 rounded-[14px] border border-border">
                        <p className="text-white-off text-[16px] mb-1">Performance Overview</p>
                        <p className="text-table-text-id text-sm mb-4">Last 7 days</p>

                        <div className="h-[250px] md:h-[300px] -ml-4 md:ml-0 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={performanceData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#27272A" opacity={1} />
                                    <XAxis dataKey="name" stroke="#6B7280" fontSize={12} />
                                    <YAxis stroke="#6B7280" fontSize={12} />
                                    <Tooltip
                                        cursor={{ stroke: "#6B7280", strokeDasharray: "3 3" }}
                                        contentStyle={{
                                            backgroundColor: "#1A1A1A",
                                            border: "1px solid #2D2D2D",
                                            borderRadius: "10px",
                                            color: "#FFFFFF",
                                            padding: "10px",
                                        }}
                                    />
                                    <defs>
                                        <linearGradient id="orangeShadow" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#E8600F" stopOpacity={0.5} />
                                            <stop offset="95%" stopColor="#E8600F" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <Area
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#E8600F"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#orangeShadow)"
                                        dot={false}
                                        activeDot={{ r: 6, stroke: "#E8600F", strokeWidth: 2, fill: "#fff" }}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="bg-offer-search-main p-6 rounded-[14px] border border-border">
                        <p className="text-white-off text-[16px] mb-1">Redemptions by Day</p>
                        <p className="text-table-text-id text-sm mb-4">Last 7 days</p>
                        <div className="h-[250px] md:h-[300px] -ml-4 md:ml-0 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={redemptionData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#27272A" opacity={1} />
                                    <XAxis dataKey="name" stroke="#6B7280" fontSize={12} />
                                    <YAxis stroke="#6B7280" fontSize={12} />
                                    <Tooltip
                                        cursor={{ fill: "rgba(255, 255, 255, 0)" }}
                                        contentStyle={{
                                            backgroundColor: "#1A1A1A",
                                            border: "1px solid #2D2D2D",
                                            borderRadius: "10px",
                                            color: "#FFFFFF",
                                            padding: "10px",
                                        }}
                                        labelStyle={{ fontSize: "12px", color: "#ffffff" }}
                                        itemStyle={{ color: "#FFA869", fontSize: "13px" }}
                                    />
                                    <Bar dataKey="value" fill="#E8600F" radius={[6, 6, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                <div className="bg-offer-search-main p-6 rounded-[14px] border border-border">
                    <h3 className="text-white-off text-[16px] mb-2">Action Center</h3>
                    <p className="text-table-text-id text-sm mb-4">Recent notifications and alerts</p>

                    <div className="space-y-3">
                        <div className="flex gap-3 bg-offer-search p-4 rounded-[10px] border border-border">
                            <AlertCircle className="text-[#F0B100]" size={20} />
                            <div>
                                <p className="text-white-off text-[14px]">Happy Hour offer expires in 2 days</p>
                                <p className="text-table-text-id text-xs">18 hrs ago</p>
                            </div>
                        </div>

                        <div className="flex gap-3 bg-offer-search p-4 rounded-[10px] border border-border">
                            <Clock className="text-[#2B7FFF]" size={20} />
                            <div>
                                <p className="text-white-off text-[14px]">New event booking request from Sarah M.</p>
                                <p className="text-table-text-id text-xs">35 mins ago</p>
                            </div>
                        </div>

                        <div className="flex gap-3 bg-offer-search p-4 rounded-[10px] border border-border">
                            <CheckCircle className="text-[#00C950]" size={20} />
                            <div>
                                <p className="text-white-off text-[14px]">Weekend Brunch offer approved</p>
                                <p className="text-table-text-id text-xs">5 hrs ago</p>
                            </div>
                        </div>

                        <div className="flex gap-3 bg-offer-search p-4 rounded-[10px] border border-border">
                            <AlertCircle className="text-[#F0B100]" size={20} />
                            <div>
                                <p className="text-white-off text-[14px]">Student Discount reached 80% cap</p>
                                <p className="text-table-text-id text-xs">1d ago</p>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}
