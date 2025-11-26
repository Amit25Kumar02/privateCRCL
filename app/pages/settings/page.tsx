"use client";

import React, { useMemo, useState } from "react";
import Sidebar from "../../component/sidebar/page";
import {
  Users,
  Building2,
  Shield,
  CreditCard,
  Edit,
  Plus,
  Trash,
  Check,
  Menu,
} from "lucide-react";

const designImage = "/mnt/data/7b7ec7cf-f7a1-43ec-b6cb-ae8f79fd4f34.png";

type TeamMember = {
  id: number;
  name: string;
  email: string;
  role: "Owner" | "Manager" | "Staff" | "Finance";
  status: "Active" | "Invited" | "Pending";
  lastLogin?: string;
};

export default function AccountSettings() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tab, setTab] = useState<
    "details" | "users" | "security" | "billing"
  >("details");

  const [business, setBusiness] = useState({
    legalName: "The Urban Kitchen LLC",
    tradeName: "Urban Kitchen",
    cr: "1010123456",
    vat: "300123456700003",
    street: "King Fahd Road, Building 123",
    city: "Riyadh",
    province: "Riyadh Province",
    postal: "12345",
    contactName: "John Smith",
    contactEmail: "john@urbanbkitchen.com",
    contactPhone: "+966 50 123 4567",
    position: "General Manager",
  });

  const [team, setTeam] = useState<TeamMember[]>([
    {
      id: 1,
      name: "John Smith",
      email: "john@business.com",
      role: "Owner",
      status: "Active",
      lastLogin: "2024-11-11",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@business.com",
      role: "Manager",
      status: "Active",
      lastLogin: "2024-11-10",
    },
    {
      id: 3,
      name: "Mike Chen",
      email: "mike@business.com",
      role: "Staff",
      status: "Active",
      lastLogin: "2024-11-11",
    },
    {
      id: 4,
      name: "Emma Wilson",
      email: "emma@business.com",
      role: "Finance",
      status: "Invited",
    },
  ]);

  const [twoFA_SMS, setTwoFA_SMS] = useState(true);
  const [twoFA_App, setTwoFA_App] = useState(false);

  const [devices, setDevices] = useState([
    {
      id: 1,
      name: "MacBook Pro",
      type: "Desktop",
      lastActive: "2024-11-11 14:30",
    },
    {
      id: 2,
      name: "iPhone 14",
      type: "Mobile",
      lastActive: "2024-11-11 09:15",
    },
    {
      id: 3,
      name: "iPad Pro",
      type: "Tablet",
      lastActive: "2024-11-08 18:45",
    },
  ]);

  const [cards, setCards] = useState([
    { id: 1, last4: "4242", expiry: "12/25", default: true },
  ]);

  const roleColors = {
    Owner: "bg-[#E8600F] text-white",
    Manager: "bg-[#334155] text-white",
    Staff: "bg-[#111827] text-white",
    Finance: "bg-[#064e3b] text-[#7BF1A8]",
  };

  const statusColors = {
    Active: "bg-[#064e3b] text-[#7BF1A8]",
    Invited: "bg-[#7c4a03] text-white",
    Pending: "bg-[#F59E0B] text-black",
  };

  const permissions = [
    { label: "Manage Offers", owner: true, manager: true, staff: false },
    { label: "View Analytics", owner: true, manager: true, staff: false },
    { label: "Scan Redemptions", owner: true, manager: true, staff: true },
    { label: "Manage Events", owner: true, manager: true, staff: false },
    { label: "Manage Users", owner: true, manager: false, staff: false },
    { label: "Edit Profile", owner: true, manager: true, staff: false },
  ];

  function inviteUser() {
    const nextId = team.length + 1;
    setTeam((t) => [
      ...t,
      {
        id: nextId,
        name: `New User ${nextId}`,
        email: `user${nextId}@example.com`,
        role: "Staff",
        status: "Invited",
      },
    ]);
  }

  function removeTeamMember(id: number) {
    setTeam((t) => t.filter((m) => m.id !== id));
  }

  function removeDevice(id: number) {
    setDevices((d) => d.filter((x) => x.id !== id));
  }

  function removeCard(id: number) {
    setCards((c) => c.filter((x) => x.id !== id));
  }

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
          <h1 className="text-xl font-semibold">PrivateCRCL</h1>
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg border border-border bg-background"
          >
            <Menu size={22} />
          </button>
        </div>

        <div className="md:hidden mb-6">
          <h1 className="text-xl font-semibold leading-tight">Account Settings</h1>
          <p className="text-sm text-all-sub-h mt-2">Manage your business</p>
        </div>

        <div className="hidden md:block mb-6">
          <h1 className="text-[30px] font-saga">Account Settings</h1>
          <p className="text-[16px] text-all-sub-h">
            Manage your business account and team
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-1 md:flex px-2 py-1 gap-3 mb-6 bg-offer-search-main  border border-border w-full md:w-fit rounded-[14px] overflow-x-auto">
          <Tab
            label="Business Details"
            active={tab === "details"}
            onClick={() => setTab("details")}
            icon={<Building2 size={14} />}
          />
          <Tab
            label="Users & Roles"
            active={tab === "users"}
            onClick={() => setTab("users")}
            icon={<Users size={14} />}
          />
          <Tab
            label="Security"
            active={tab === "security"}
            onClick={() => setTab("security")}
            icon={<Shield size={14} />}
          />
          <Tab
            label="Billing"
            active={tab === "billing"}
            onClick={() => setTab("billing")}
            icon={<CreditCard size={14} />}
          />
        </div>

        <div>
          {tab === "details" && (
            <section>
              <div className="rounded-[14px] p-6 border bg-offer-search-main border-border space-y-6">
                <h3 className="text-[16px] text-white-off font-medium mb-4">
                  Legal Information
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {Object.entries(business).map(([key, val]) => {
                    if (
                      [
                        "legalName",
                        "tradeName",
                        "cr",
                        "vat",
                      ].includes(key)
                    ) {
                      return (
                        <div key={key}>
                          <label className="text-xs text-table-text-h capitalize">
                            {key}
                          </label>
                          <input
                            className="w-full mt-2 p-2 rounded-md bg-offer-search border border-border text-sm"
                            value={val as string}
                            onChange={(e) =>
                              setBusiness({
                                ...business,
                                [key]: e.target.value,
                              })
                            }
                          />
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>

              <div className="rounded-[14px] p-6 border bg-offer-search-main border-border space-y-6 mt-6">
                <h4 className="text-sm font-medium mb-3">Business Address</h4>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div className="lg:col-span-3">
                    <label className="text-xs text-table-text-h">
                      Street Address
                    </label>
                    <input
                      className="w-full mt-2 p-2 rounded-md bg-offer-search border border-border text-sm"
                      value={business.street}
                      onChange={(e) =>
                        setBusiness({ ...business, street: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="text-xs text-table-text-h">
                      Postal Code
                    </label>
                    <input
                      className="w-full mt-2 p-2 rounded-md bg-offer-search border border-border text-sm"
                      value={business.postal}
                      onChange={(e) =>
                        setBusiness({ ...business, postal: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="text-xs text-table-text-h">City</label>
                    <input
                      className="w-full mt-2 p-2 rounded-md bg-offer-search border border-border text-sm"
                      value={business.city}
                      onChange={(e) =>
                        setBusiness({ ...business, city: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="text-xs text-table-text-h">
                      Province
                    </label>
                    <input
                      className="w-full mt-2 p-2 rounded-md bg-offer-search border border-border text-sm"
                      value={business.province}
                      onChange={(e) =>
                        setBusiness({
                          ...business,
                          province: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-[14px] p-6 border bg-offer-search-main border-border space-y-6 mt-6">
                <h4 className="text-sm font-medium mb-3">Primary Contact</h4>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-table-text-h">
                      Contact Name
                    </label>
                    <input
                      className="w-full mt-2 p-2 rounded-md bg-offer-search border border-border text-sm"
                      value={business.contactName}
                      onChange={(e) =>
                        setBusiness({
                          ...business,
                          contactName: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label className="text-xs text-table-text-h">
                      Position
                    </label>
                    <input
                      className="w-full mt-2 p-2 rounded-md bg-offer-search border border-border text-sm"
                      value={business.position}
                      onChange={(e) =>
                        setBusiness({
                          ...business,
                          position: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label className="text-xs text-table-text-h">Email</label>
                    <input
                      className="w-full mt-2 p-2 rounded-md bg-offer-search border border-border text-sm"
                      value={business.contactEmail}
                      onChange={(e) =>
                        setBusiness({
                          ...business,
                          contactEmail: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label className="text-xs text-table-text-h">Phone</label>
                    <input
                      className="w-full mt-2 p-2 rounded-md bg-offer-search border border-border text-sm"
                      value={business.contactPhone}
                      onChange={(e) =>
                        setBusiness({
                          ...business,
                          contactPhone: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button className="px-4 py-2 rounded-md cursor-pointer bg-[#E8600F] text-white flex items-center gap-2">
                  <Edit size={14} /> Save Changes
                </button>
              </div>
            </section>
          )}

          {tab === "users" && (
            <section>

              {/* TEAM MEMBERS TABLE */}
              <div className="rounded-[14px] md:w-full overflow-x-auto border bg-offer-search-main border-border px-6 py-4">

                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm text-white-off font-medium mb-1">
                      Team Members
                    </h3>
                    <p className="text-xs text-table-text-h">
                      Manage user access and permissions
                    </p>
                  </div>

                  <button
                    onClick={inviteUser}
                    className="px-3 py-2 rounded-md cursor-pointer text-xs md:text-lg bg-[#E8600F] text-white flex items-center gap-2"
                  >
                    <Plus size={14} /> Invite User
                  </button>
                </div>

                {/* Scroll wrapper */}
                <div className="w-full max-w-[100px] md:max-w-full">
                  <table className="w-full min-w-[700px] text-sm">
                    <thead>
                      <tr className="text-table-text-h border-b border-border">
                        <th className="p-4 text-left">Name</th>
                        <th className="p-4 text-left">Email</th>
                        <th className="p-4 text-left">Role</th>
                        <th className="p-4 text-left">Status</th>
                        <th className="p-4 text-left">Last Login</th>
                        <th className="p-4 text-right w-36">Actions</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-border">
                      {team.map((m) => (
                        <tr key={m.id}>
                          <td className="p-4 text-white-off">{m.name}</td>

                          <td className="p-4 text-xs text-all-sub-h">
                            {m.email}
                          </td>

                          <td className="p-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs ${roleColors[m.role]}`}
                            >
                              {m.role}
                            </span>
                          </td>

                          <td className="p-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs ${statusColors[m.status]}`}
                            >
                              {m.status}
                            </span>
                          </td>

                          <td className="p-4 text-all-sub-h">
                            {m.lastLogin ?? "—"}
                          </td>

                          <td className="py-4 px-4">
                            <div className="flex justify-end gap-2">
                              <button className="px-3 py-2 cursor-pointer text-white-off rounded-md bg-offer-search border border-border">
                                Edit
                              </button>

                              <button
                                onClick={() => removeTeamMember(m.id)}
                                className="px-3 py-1 rounded-md cursor-pointer border bg-offer-search border-border text-[#FF6467]"
                              >
                                <Trash size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* PERMISSION TABLE */}
              <div className="mt-6 rounded-[14px] border-[0.82px] bg-offer-search-main md:w-full overflow-x-auto border-border p-4">
                <h4 className="text-sm font-medium mb-3">Role Permissions</h4>

                {/* <div className="overflow-x-auto w-full"> */}
                <div className="w-full max-w-[100px] md:max-w-full">
                  <table className="w-full min-w-[700px] text-sm">
                    <thead>
                      <tr className="border-b border-border text-table-text-h">
                        <th className="p-4 text-left">Permission</th>
                        <th className="p-4 text-center">Owner</th>
                        <th className="p-4 text-center">Manager</th>
                        <th className="p-4 text-center">Staff</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-border">
                      {permissions.map((p, i) => (
                        <tr key={i} className="text-silver-text">
                          <td className="p-4">{p.label}</td>

                          <td className="p-4 text-center">
                            {p.owner ? <Check size={14} className="mx-auto text-white-off" /> : "—"}
                          </td>

                          <td className="p-4 text-center">
                            {p.manager ? <Check size={14} className="mx-auto text-white-off" /> : "—"}
                          </td>

                          <td className="p-4 text-center">
                            {p.staff ? <Check size={14} className="mx-auto text-white-off" /> : "—"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                </div>
              </div>
            </section>
          )}


          {tab === "security" && (
            <section className="space-y-6">
              <div className="rounded-[14px] border bg-offer-search-main border-border p-4 space-y-4">
                <h3 className="text-sm font-medium text-white-off">
                  Two-Factor Authentication
                </h3>

                <div className="rounded-md p-4 bg-offer-search border border-border flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-white-off">
                      2FA via SMS
                    </div>
                    <div className="text-xs text-table-text-id">
                      +966 50 *** *567
                    </div>
                  </div>

                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={twoFA_SMS}
                      onChange={(e) => setTwoFA_SMS(e.target.checked)}
                      className="hidden"
                    />
                    <div className="w-12 h-6 bg-silver-text rounded-full p-0.5">
                      <div
                        className={`bg-black w-5 h-5 rounded-full transition-transform ${twoFA_SMS ? "translate-x-6" : "translate-x-0"
                          }`}
                      />
                    </div>
                  </label>
                </div>

                <div className="rounded-md p-4 bg-offer-search border border-border flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-white-off">
                      2FA via Authenticator App
                    </div>
                    <div className="text-xs text-table-text-id">
                      Not configured
                    </div>
                  </div>

                  <button className="px-3 py-2 cursor-pointer rounded-md border border-border text-white-off">
                    Set Up
                  </button>
                </div>
              </div>

              <div className="rounded-[14px] border bg-offer-search-main border-border p-4 space-y-3">
                <h4 className="text-sm font-medium text-white-off mb-3">
                  Active Devices
                </h4>

                {devices.map((d) => (
                  <div
                    key={d.id}
                    className="rounded-md p-3 bg-offer-search border border-border flex items-center justify-between"
                  >
                    <div>
                      <div className="font-medium text-white-off">
                        {d.name}
                        <span className="text-xs text-white-off border border-border bg-offer-search rounded-lg px-2 py-1 ml-2">
                          {d.type}
                        </span>
                      </div>

                      <div className="text-xs text-table-text-id mt-2">
                        Last active: {d.lastActive}
                      </div>
                    </div>

                    <button
                      onClick={() => removeDevice(d.id)}
                      className="px-3 py-1 cursor-pointer rounded-md border border-border text-[#FF6467]"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              <div className="rounded-[14px] border bg-offer-search-main border-border p-4 space-y-2">
                <h4 className="text-sm font-medium text-white-off mb-3">
                  Change Password
                </h4>

                <label className="text-table-text-h text-xs">
                  Current Password
                </label>
                <input className="w-full p-2 rounded-md bg-offer-search border border-border" />

                <label className="text-table-text-h text-xs">
                  New Password
                </label>
                <input className="w-full p-2 rounded-md bg-offer-search border border-border" />

                <label className="text-table-text-h text-xs">
                  Confirm New Password
                </label>
                <input className="w-full p-2 rounded-md bg-offer-search border border-border" />

                <button className="px-3 py-2 cursor-pointer rounded-md bg-[#E8600F] text-white mt-2">
                  Update Password
                </button>
              </div>
            </section>
          )}

          {tab === "billing" && (
            <section className="border bg-offer-search-main rounded-[14px] border-border px-4 py-6">
              <h3 className="text-sm font-medium mb-4">Payment Methods</h3>

              <div className="space-y-3">
                {cards.map((c) => (
                  <div
                    key={c.id}
                    className="rounded-md p-3 bg-offer-search border border-border flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-10 h-8 text-gray-400" />
                      <div>
                        <div className="font-medium text-white-off">
                          **** **** **** {c.last4}
                        </div>
                        <div className="text-xs text-table-text-id">
                          Expires {c.expiry}
                        </div>
                      </div>

                      {c.default && (
                        <span className="px-2 py-1 rounded-md bg-green-600 text-white text-xs ml-4 mr-2">
                          Default
                        </span>
                      )}
                    </div>

                    <div>
                      <button className="px-3 py-1 cursor-pointer rounded-md border border-border text-white-off">
                        Edit
                      </button>
                    </div>
                  </div>
                ))}

                <button className="w-full px-3 py-2 cursor-pointer rounded-md border border-border bg-offer-search text-table-text-h">
                  + Add Payment Method
                </button>
              </div>
            </section>
          )}
        </div>

        <img src={designImage} alt="design" className="hidden" />
      </div>
    </div>
  );
}

function Tab({
  label,
  active,
  onClick,
  icon,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-[14px] cursor-pointer text-[14px] flex items-center gap-2 whitespace-nowrap ${active
        ? "bg-tab-bg border-[0.82px] text-tab-text-a border-border cursor-pointer"
        : "text-tab-text cursor-pointer"
        }`}
    >
      {icon} <span>{label}</span>
    </button>
  );
}
