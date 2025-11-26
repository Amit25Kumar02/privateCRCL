"use client";

import { useMemo, useState } from "react";
import { Calendar, Users, Clock, Check, X, Menu, } from "lucide-react";
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
      pending: "bg-panding-bg text-panding-bg-text",
      tentative: "bg-tentative-bg text-tentative-bg-text",
      confirmed: "bg-con-bg text-confirmed-bg-text",
      completed: "bg-completed-bg text-table-text-h",
      canceled: "bg-canceled-bg text-canceled-bg-text",
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
          <h1 className="text-xl font-semibold">Events & Bookings</h1>
          <p className="text-sm text-all-sub-h">Manage venue bookings and event requests</p>
        </div>

        {/* Desktop heading */}
        <div className="hidden md:block mb-6">
          <h1 className="text-[30px] font-saga">Events & Bookings</h1>
          <p className="text-[16px] text-all-sub-h">Manage venue bookings and event requests</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:h-[157px] gap-4 my-6">
          {/* Max Capacity */}
          <div className="rounded-[14px]  bg-offer-search-main p-6  border-[0.82px] border-border ">
            <div className=" flex justify-between">
              <p className="text-[14px] text-table-text-h">Max Capacity</p>
              <Users className="text-[#E8600F]" size={16} />
            </div>
            <h2 className="text-[24px] text-white-off font-normal mt-10">150 guests</h2>
            <p className="text-[12px] text-[#6A7282] mt-1">
              Indoor: 100 | Outdoor: 50
            </p>
          </div>

          {/* Pending */}
          <div className="rounded-[14px]  bg-offer-search-main p-6  border-[0.82px] border-border ">
            <div className="flex justify-between">
              <p className="text-[14px] text-table-text-h">Pending Requests</p>
              <Clock className="text-[#F0B100]" size={16} />
            </div>
            <h2 className="text-[24px] text-white-off font-normal mt-10">{stats.pending}</h2>
            <p className="text-[12px] text-[#6A7282] mt-1">Awaiting response</p>
          </div>

          {/* Upcoming */}
          <div className="rounded-[14px]  bg-offer-search-main p-6  border-[0.82px] border-border ">
            <div className="flex justify-between">
              <p className="text-[14px] text-table-text-h">Upcoming Events</p>
              <Calendar className="text-[#00C950]" size={16} />
            </div>
            <h2 className="text-[24px] text-white-off font-normal mt-10">{stats.upcoming}</h2>
            <p className="text-[12px] text-[#6A7282] mt-1">Next 30 days</p>
          </div>
        </div>

        {/* Tabs + Search */}
        <div className="grid grid-cols-1 md:grid-cols-1 w-full md:w-fit  justify-between items-center gap-4 mb-4 mt-4">
          {/* Tabs */}
          <div className="flex gap-2 flex-wrap border-[0.82px] border-border rounded-[14px] bg-offer-search-main px-2 py-1">
            {(["All Requests", "Pending", "Confirmed", "Completed"] as const).map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1 rounded-full cursor-pointer text-[14px] ${activeTab === tab
                    ? "bg-tab-bg border-[0.82px] text-white-off border-border"
                    : " text-tab-text "
                    }`}
                >
                  {tab}
                </button>
              )
            )}
          </div>

        </div>

        {/* Table */}
        <div className="rounded-lg md:w-full overflow-auto border-[0.82px] border-border bg-offer-search-main ">
          <div className="w-full max-w-[100px] md:max-w-full">
            <table className="w-full  min-w-[700px] text-[14px]">
              <thead>
                <tr className="font-medium text-[14px] text-table-text-h border-b-[0.82px] border-b-border">
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
                    className=" transition border-b-[0.82px] border-b-border"
                  >
                    <td className="p-4">
                      <p className="font-medium text-[14px] text-white-off">{b.requester}</p>
                      <p className="text-[14px] text-table-text-id">{b.email}</p>
                    </td>

                    <td className="p-4 text-[14px] text-white-off">{b.eventType}</td>

                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-table-text-id" />
                        <div>
                          <p className="text-[14px] text-white-off">{b.date}</p>
                          <p className="text-[14px] text-table-text-id">{b.time}</p>
                        </div>
                      </div>
                    </td>

                    <td className="p-4 flex items-center text-[14px] text-white-off gap-2">
                      <Users size={16} className="text-table-text-id" />
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
                          className="px-3 py-1 rounded-lg cursor-pointer text-white-off border-[0.82px] bg-offer-search border-border"
                        >
                          Details
                        </button>

                        {/* Only for pending */}
                        {showActionsFor === b.id && b.status === "pending" && (
                          <>
                            <button
                              onClick={() => updateStatus(b.id, "confirmed")}
                              className="w-8 h-8 bg-[#00A63E] cursor-pointer text-[#FFFFFF] rounded-lg flex items-center justify-center"
                            >
                              <Check size={16} />
                            </button>

                            <button
                              onClick={() => updateStatus(b.id, "canceled")}
                              className="w-8 h-8 bg-offer-search-main cursor-pointer text-[#E7000B] border-[0.82px] border-[#FFA2A2] rounded-lg flex items-center justify-center"
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
        </div>
      </main>
    </div>
  );
}
