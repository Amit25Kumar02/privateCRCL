"use client";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
} from "recharts";

import { TrendingUp, AlertCircle, CheckCircle, Clock, XCircle } from 'lucide-react';
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
    return (
        <div className="flex">
            {/* Sidebar */}
            <div className="fixed left-0 top-0 h-screen">
                <Sidebar />
            </div>

            {/* Main Content */}
            <div className="ml-64 min-h-screen bg-[var(--background)] text-text border-[0.82px] border-border p-6 flex-1">
                <h1 className="text-[30px] text-text font-saga mb-4">Dashboard</h1>
                <p className="text-[16px] text-all-sub-h mb-6">Today at a glance</p>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 h-[157px] gap-4 mb-6">
                    <div className="bg-offer-search-main p-5 rounded-[14px]  border-[0.82px] border-border">
                        <div className="flex justify-between">
                            <p className="text-[14px] text-table-text-h mb-10">Active Offers</p>
                            <CheckCircle className="text-[#00C950]" size={16} />
                        </div>
                        <h2 className="text-[24px] text-white-off mt-2">8</h2>
                        <p className="text-[12px] text-[#6A7282]  mt-1">2 scheduled</p>
                    </div>

                    <div className="bg-offer-search-main p-5 rounded-xl border-[0.82px] border-border">
                        <div className="flex justify-between">
                            <p className="text-[14px] text-table-text-h mb-10">Pending Approvals</p>
                            <Clock className="text-[#F0B100]" size={16} />
                        </div>
                        <h2 className="text-[24px] text-white-off mt-2">3</h2>
                        <p className="text-[12px] text-[#6A7282] mt-1">2 drafts saved</p>
                    </div>

                    <div className="bg-offer-search-main  p-5 rounded-xl border-[0.82px] border-border">
                        <div className="flex justify-between">
                            <p className="text-[14px] text-table-text-h mb-10">Paused / Expired</p>
                            <XCircle className="text-[#71717B]" size={16} />
                        </div>
                        <h2 className="text-[24px] text-white-off mt-2">5</h2>
                        <p className="text-[12px] text-[#6A7282] mt-1">2 paused, 3 expired</p>
                    </div>

                    <div className="bg-offer-search-main  p-5 rounded-xl border-[0.82px]  border-border">
                        <div className="flex justify-between">
                            <p className="text-[14px] text-table-text-h mb-10">Conversion Rate</p>
                            <TrendingUp className="text-[#E8600F]" size={16} />
                        </div>
                        <h2 className="text-[24px] text-white-off mt-2">18.5%</h2>
                        <p className="text-[12px] text-[#00C950] mt-1">+2.4% from last week</p>
                    </div>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 md:grid-cols-2 h-[426px] gap-6">
                    <div className="bg-offer-search-main p-6 rounded-[14px] border-[0.82px] border-border">
                        <p className="mb-3 text-white-off text-[16px]">Performance Overview</p>
                        <p className="mb-3 opacity-90 text-[#4A5565] text-[14px]">Last 7 days</p>
                        <ResponsiveContainer width="100%" height={250}>
                            <LineChart data={performanceData}>
                                <XAxis dataKey="name" stroke="#6B7280" />
                                <YAxis stroke="#6B7280" />
                                <Tooltip />
                                <Line
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#E8600F"
                                    strokeWidth={3}
                                    dot={false}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    <div className=" bg-offer-search-main p-6 rounded-[14px] border-[0.82px] border-border">
                        <p className="mb-3 dark:text-[#FAFAFA] text-[16px]">Redemptions by Day</p>
                        <p className="mb-3 opacity-90 text-[#4A5565] text-[14px]">Last 7 days</p>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={redemptionData}>
                                <XAxis dataKey="name" stroke="#6B7280" />
                                <YAxis stroke="#6B7280" />
                                <Tooltip />
                                <Bar dataKey="value" fill="#E8600F" radius={[6, 6, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Action Center */}
                <div className="mt-10 bg-offer-search-main border-[0.82px] border-border p-6 rounded-[14px] h-auto">
                    <h3 className="text-[16px] text-white-off mb-4">Action Center</h3>
                    <p className="text-[14px] text-table-text-h mb-4">Recent notifications and alerts</p>

                    <div className="space-y-3">
                        <div className="flex items-center gap-3 bg-table-row-bg p-4 rounded-[10px] border-[0.82px] border-border">
                            <AlertCircle className="text-[#F0B100]" />
                            <div>
                                <p className="text-[14px] text-white-off">Happy Hour offer expires in 2 days</p>
                                <span className="text-[12px] text-table-text-id ">18 hrs ago</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 bg-table-row-bg p-4 rounded-[10px] border-[0.82px] border-border">
                            <Clock className="text-[#2B7FFF]" />
                            <div>
                                <p className="text-[14px] text-white-off">New event booking request from Sarah M.</p>
                                <span className="text-[12px] text-table-text-id">35 mins ago</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 bg-table-row-bg p-4 rounded-[10px] border-[0.82px] border-border">
                            <CheckCircle className="text-[#00C950]" />
                            <div>
                                <p className="text-[14px] text-white-off">Weekend Brunch offer approved</p>
                                <span className="text-[12px] text-table-text-id">5 hrs ago</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 bg-table-row-bg p-4 rounded-[10px] border-[0.82px] border-border">
                            <AlertCircle className="text-[#F0B100]" />
                            <div>
                                <p className="text-[14px] text-white-off">Student Discount has reached 80% redemption cap</p>
                                <span className="text-[12px] text-table-text-id">1d ago</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
