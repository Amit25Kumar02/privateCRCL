"use client";

import { useMemo, useState } from "react";
import { Calendar, Users, Clock, Check, X, MoreHorizontal } from "lucide-react";
import Sidebar from "@/app/component/sidebar/page";

type BookingStatus =
  | "pending"
  | "tentative"
  | "confirmed"
  | "completed"
  | "canceled";

interface Booking {
  id: number;
  requester: string;
  email: string;
  eventType: string;
  date: string;
  time: string;
  guests: number;
  status: BookingStatus;
}

const initialBookings: Booking[] = [
  {
    id: 1,
    requester: "Sarah Martinez",
    email: "sarah.m@email.com",
    eventType: "Birthday Party",
    date: "2024-11-25",
    time: "18:00",
    guests: 25,
    status: "pending",
  },
  {
    id: 2,
    requester: "Tech Startup Inc",
    email: "events@techstartup.com",
    eventType: "Corporate Event",
    date: "2024-11-20",
    time: "14:00",
    guests: 50,
    status: "tentative",
  },
  {
    id: 3,
    requester: "Ahmed Al-Rashid",
    email: "ahmed.r@email.com",
    eventType: "Wedding Reception",
    date: "2024-12-15",
    time: "19:00",
    guests: 100,
    status: "confirmed",
  },
  {
    id: 4,
    requester: "Emma Johnson",
    email: "emma.j@email.com",
    eventType: "Workshop",
    date: "2024-11-18",
    time: "10:00",
    guests: 15,
    status: "completed",
  },
  {
    id: 5,
    requester: "Local Community Center",
    email: "info@communitycenter.org",
    eventType: "Charity Gala",
    date: "2024-11-22",
    time: "17:00",
    guests: 75,
    status: "canceled",
  },
];

export default function EventsBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [activeTab, setActiveTab] = useState<
    "All Requests" | "Pending" | "Confirmed" | "Completed"
  >("All Requests");
  const [search, setSearch] = useState("");
  const [showActionsFor, setShowActionsFor] = useState<number | null>(null);

  const stats = useMemo(() => {
    const pending = bookings.filter((b) => b.status === "pending").length;
    const upcoming = bookings.filter(
      (b) => new Date(b.date) >= new Date()
    ).length;
    return { pending, upcoming };
  }, [bookings]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();

    return bookings.filter((b) => {
      if (activeTab === "Pending" && b.status !== "pending") return false;
      if (activeTab === "Confirmed" && b.status !== "confirmed") return false;
      if (activeTab === "Completed" && b.status !== "completed") return false;

      if (!q) return true;

      return (
        b.requester.toLowerCase().includes(q) ||
        b.email.toLowerCase().includes(q) ||
        b.eventType.toLowerCase().includes(q)
      );
    });
  }, [activeTab, bookings, search]);

  const updateStatus = (id: number, status: BookingStatus) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    );
    setShowActionsFor(null);
  };

  const StatusPill = ({ status }: { status: BookingStatus }) => {
    const styles: Record<BookingStatus, string> = {
      pending: "bg-[#FEF9C2] text-[#A65F00]",
      tentative: "bg-[#DBEAFE] text-[#1447E6]",
      confirmed: "bg-[#DCFCE7] text-[#008236]",
      completed: "bg-[#E5E7EB] text-[#4A5565]",
      canceled: "bg-[#FFE2E2] text-[#C10007]",
    };

    return (
      <span
        className={`px-3 py-1 text-xs rounded-full font-medium ${styles[status]}`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="font-glacial flex">
      {/* Sidebar */}
      <div className="hidden md:block fixed left-0 top-0 h-screen">
        <Sidebar />
      </div>

      {/* Main Area */}
      <main
        className="
          ml-64 min-h-screen p-8 
          dark:bg-[#000000] dark:text-[#FAFAFA]
          transition-colors duration-300 flex-1
        "
      >
        {/* Header */}
        <h1 className="text-[30px] text-[#101828]">Events & Bookings</h1>
        <p className="text-[16px] text-[#4A5565] dark:text-[#9F9FA9]">
          Manage venue bookings and event requests
        </p>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 h-[157px] gap-4 my-6">
          {/* Max Capacity */}
          <div className="rounded-[14px]  bg-[#FFFFFF] p-6 dark:bg-[#09090B] border-[0.82px] border-[#E5E7EB] dark:border-[#27272A]">
            <div className=" flex justify-between">
              <p className="text-[14px] text-[#4A5565]">Max Capacity</p>
              <Users className="text-[#E8600F]" size={16} />
            </div>
            <h2 className="text-[24px] text-[#101828] font-normal mt-10">150 guests</h2>
            <p className="text-[12px] text-[#6A7282] mt-1">
              Indoor: 100 | Outdoor: 50
            </p>
          </div>

          {/* Pending */}
          <div className="rounded-[14px]  bg-[#FFFFFF] p-6 dark:bg-[#09090B] border-[0.82px] border-[#E5E7EB] dark:border-[#27272A]">
            <div className="flex justify-between">
              <p className="text-[14px] text-[#4A5565]">Pending Requests</p>
              <Clock className="text-[#F0B100]" size={16} />
            </div>
            <h2 className="text-[24px] text-[#101828] font-normal mt-10">{stats.pending}</h2>
            <p className="text-[12px] text-[#6A7282] mt-1">Awaiting response</p>
          </div>

          {/* Upcoming */}
          <div className="rounded-[14px]  bg-[#FFFFFF] p-6 dark:bg-[#09090B] border-[0.82px] border-[#E5E7EB] dark:border-[#27272A]">
            <div className="flex justify-between">
              <p className="text-[14px] text-[#4A5565]">Upcoming Events</p>
              <Calendar className="text-[#00C950]" size={16} />
            </div>
            <h2 className="text-[24px] text-[#101828] font-normal mt-10">{stats.upcoming}</h2>
            <p className="text-[12px] text-[#6A7282] mt-1">Next 30 days</p>
          </div>
        </div>

        {/* Tabs + Search */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4 mt-[32px]">
          {/* Tabs */}
          <div className="flex gap-2 flex-wrap border-[0.82px] border-[#E5E7EB] rounded-[14px] bg-[#F3F4F6] px-[8px] py-[4px]">
            {(["All Requests", "Pending", "Confirmed", "Completed"] as const).map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1 rounded-full cursor-pointer text-[14px] ${activeTab === tab
                    ? "bg-[#E8600F] text-[#FFFFFF] border-[#E8600F]"
                    : " text-[#0A0A0A] dark:text-[#FAFAFA] "
                    }`}
                >
                  {tab}
                </button>
              )
            )}
          </div>

        </div>

        {/* Table */}
        <div className="rounded-[14px] overflow-hidden border-[0.82px] border-[#E5E7EB] dark:bg-[#09090B] dark:border-[#27272A]">
          <table className="w-full text-[14px]">
            <thead>
              <tr className="text-[#4A5565] font-medium text-[14px] dark:text-[#9F9FA9]">
                <th className="p-4 text-left">Requester</th>
                <th className="p-4 text-left">Event Type</th>
                <th className="p-4 text-left">Date & Time</th>
                <th className="p-4 text-left">Guests</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#E5E7EB] dark:divide-[#1f1f1f]">
              {filtered.map((b) => (
                <tr
                  key={b.id}
                  className="dark:hover:bg-[#141414] transition"
                >
                  <td className="p-4">
                    <p className="font-medium text-[14px] text-[#101828]">{b.requester}</p>
                    <p className="text-[14px] text-[#6A7282]">{b.email}</p>
                  </td>

                  <td className="p-4 text-[14px] text-[#101828]">{b.eventType}</td>

                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-gray-400" />
                      <div>
                        <p className="text-[14px] text-[#101828]">{b.date}</p>
                        <p className="text-[14px] text-[#6A7282]">{b.time}</p>
                      </div>
                    </div>
                  </td>

                  <td className="p-4 flex items-center text-[14px] text-[#101828] gap-2">
                    <Users size={16} className="text-[#6A7282]" />
                    {b.guests}
                  </td>

                  <td className="p-4">
                    <StatusPill status={b.status} />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {/* Details */}
                      <button
                        onClick={() =>
                          setShowActionsFor(showActionsFor === b.id ? null : b.id)
                        }
                        className="px-3 py-1 rounded-[8px] cursor-pointer text-[#364153] border-[0.82px] bg-[#FFFFFF] border-[#D1D5DC] dark:border-[#2a2a2a]"
                      >
                        Details
                      </button>

                      {/* Only for pending */}
                      {showActionsFor === b.id && b.status === "pending" && (
                        <>
                          <button
                            onClick={() => updateStatus(b.id, "confirmed")}
                            className="w-8 h-8 bg-[#00A63E] cursor-pointer text-[#FFFFFF] rounded-[8px] flex items-center justify-center"
                          >
                            <Check size={16} />
                          </button>

                          <button
                            onClick={() => updateStatus(b.id, "canceled")}
                            className="w-8 h-8 bg-[#FFFFFF] cursor-pointer text-[#E7000B] border-[0.82px] border-[#FFA2A2] rounded-[8px] flex items-center justify-center"
                          >
                            <X size={16} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>

                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="p-6 text-center text-gray-500 dark:text-[#9F9FA9]"
                  >
                    No requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
