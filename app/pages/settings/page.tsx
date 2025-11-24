"use client";

import React, { useMemo, useState } from "react";
import Sidebar from "../../component/sidebar/page";
import { Users,Building2, Shield, CreditCard, Edit, Plus, Trash, Check } from "lucide-react";

/**
 * Design reference (local). This will be transformed to a URL by the environment.
 * See developer note: use the uploaded file path as the image URL.
 */
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

  const [tab, setTab] = useState<"details" | "users" | "security" | "billing">(
    "details"
  );

  // Business details state
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

  // Team members (sample)
  const [team, setTeam] = useState<TeamMember[]>([
    { id: 1, name: "John Smith", email: "john@business.com", role: "Owner", status: "Active", lastLogin: "2024-11-11" },
    { id: 2, name: "Sarah Johnson", email: "sarah@business.com", role: "Manager", status: "Active", lastLogin: "2024-11-10" },
    { id: 3, name: "Mike Chen", email: "mike@business.com", role: "Staff", status: "Active", lastLogin: "2024-11-11" },
    { id: 4, name: "Emma Wilson", email: "emma@business.com", role: "Finance", status: "Invited", lastLogin: undefined },
  ]);

  // Security
  const [twoFA_SMS, setTwoFA_SMS] = useState(true);
  const [twoFA_App, setTwoFA_App] = useState(false);
  const [devices, setDevices] = useState([
    { id: 1, name: "MacBook Pro", type: "Desktop", lastActive: "2024-11-11 14:30" },
    { id: 2, name: "iPhone 14", type: "Mobile", lastActive: "2024-11-11 09:15" },
    { id: 3, name: "iPad Pro", type: "Tablet", lastActive: "2024-11-08 18:45" },
  ]);

  // Billing
  const [cards, setCards] = useState([
    { id: 1, last4: "4242", expiry: "12/25", default: true },
  ]);

  // Helpers
  const roleColors: Record<TeamMember["role"], string> = {
    Owner: "bg-[#E8600F] text-white",
    Manager: "bg-[#334155] text-white",
    Staff: "bg-[#111827] text-white",
    Finance: "bg-[#064e3b] text-[#7BF1A8]",
  };

  const statusColors: Record<TeamMember["status"], string> = {
    Active: "bg-[#064e3b] text-[#7BF1A8]",
    Invited: "bg-[#7c4a03] text-white",
    Pending: "bg-[#F59E0B] text-black",
  };

  // Simple handlers (local only)
  function inviteUser() {
    const nextId = team.length + 1;
    setTeam((t) => [...t, { id: nextId, name: `New User ${nextId}`, email: `user${nextId}@example.com`, role: "Staff", status: "Invited" }]);
  }

  function removeDevice(id: number) {
    setDevices((d) => d.filter((x) => x.id !== id));
  }

  function removeCard(id: number) {
    setCards((c) => c.filter((x) => x.id !== id));
  }

  function removeTeamMember(id: number) {
    setTeam((t) => t.filter((m) => m.id !== id));
  }

  // Permissions table (static mapping)
  const permissions = [
    { label: "Manage Offers", owner: true, manager: true, staff: false },
    { label: "View Analytics", owner: true, manager: true, staff: false },
    { label: "Scan Redemptions", owner: true, manager: true, staff: true },
    { label: "Manage Events", owner: true, manager: true, staff: false },
    { label: "Manage Users", owner: true, manager: false, staff: false },
    { label: "Edit Profile", owner: true, manager: true, staff: false },
  ];

  return (
    <div className="font-glacial flex">
      {/* Sidebar */}
      <div className="hidden md:block fixed left-0 top-0 h-screen">
        <Sidebar />
      </div>

      <main
        className="
          ml-64 min-h-screen p-8
          dark:bg-[#000000] dark:text-[#FAFAFA]
          transition-colors duration-300 flex-1
        "
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-[30px] text-[#101828] font-light">Account Settings</h1>
            <p className="text-[16px] text-[#4A5565] dark:text-[#9F9FA9]">
              Manage your business account and team
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button className="px-3 py-2 rounded-md bg-[#E8600F] text-white flex items-center gap-2">
              <Edit size={14} /> Save Changes
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex px-2 py-1 gap-3 mb-6 bg-[#F3F4F6] border-[0.82px] border-[#E5E7EB] w-fit rounded-[14px]">
          <Tab label="Business Details" active={tab === "details"} onClick={() => setTab("details")} icon={<Building2 size={14} />} />
          <Tab label="Users & Roles" active={tab === "users"} onClick={() => setTab("users")} icon={<Users size={14} />} />
          <Tab label="Security" active={tab === "security"} onClick={() => setTab("security")} icon={<Shield size={14} />} />
          <Tab label="Billing" active={tab === "billing"} onClick={() => setTab("billing")} icon={<CreditCard size={14} />} />
        </div>

        {/* Content Container */}
        <div className="rounded-[14px] p-6 border-[0.82px] bg-[#FFFFFF] border-[#E5E7EB] dark:bg-[#09090B] dark:border-[#27272A] space-y-6">
          {/* Business Details */}
          {tab === "details" && (
            <section>
              <h3 className="text-sm font-medium mb-4">Legal Information</h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-500 dark:text-[#9F9FA9]">Legal Business Name</label>
                  <input className="w-full mt-2 p-2 rounded-md bg-white dark:bg-[#0b0b0b] border text-sm" value={business.legalName} onChange={(e)=>setBusiness({...business, legalName: e.target.value})}/>
                </div>

                <div>
                  <label className="text-xs text-gray-500 dark:text-[#9F9FA9]">Trade Name</label>
                  <input className="w-full mt-2 p-2 rounded-md bg-white dark:bg-[#0b0b0b] border text-sm" value={business.tradeName} onChange={(e)=>setBusiness({...business, tradeName: e.target.value})}/>
                </div>

                <div>
                  <label className="text-xs text-gray-500 dark:text-[#9F9FA9]">Commercial Registration (CR)</label>
                  <input className="w-full mt-2 p-2 rounded-md bg-white dark:bg-[#0b0b0b] border text-sm" value={business.cr} onChange={(e)=>setBusiness({...business, cr: e.target.value})}/>
                </div>

                <div>
                  <label className="text-xs text-gray-500 dark:text-[#9F9FA9]">VAT Number</label>
                  <input className="w-full mt-2 p-2 rounded-md bg-white dark:bg-[#0b0b0b] border text-sm" value={business.vat} onChange={(e)=>setBusiness({...business, vat: e.target.value})}/>
                </div>
              </div>

              {/* Address */}
              <div className="mt-6">
                <h4 className="text-sm font-medium mb-3">Business Address</h4>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <label className="text-xs text-gray-500 dark:text-[#9F9FA9]">Street Address</label>
                    <input className="w-full mt-2 p-2 rounded-md bg-white dark:bg-[#0b0b0b] border text-sm" value={business.street} onChange={(e)=>setBusiness({...business, street: e.target.value})}/>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 dark:text-[#9F9FA9]">Postal Code</label>
                    <input className="w-full mt-2 p-2 rounded-md bg-white dark:bg-[#0b0b0b] border text-sm" value={business.postal} onChange={(e)=>setBusiness({...business, postal: e.target.value})}/>
                  </div>

                  <div>
                    <label className="text-xs text-gray-500 dark:text-[#9F9FA9]">City</label>
                    <input className="w-full mt-2 p-2 rounded-md bg-white dark:bg-[#0b0b0b] border text-sm" value={business.city} onChange={(e)=>setBusiness({...business, city: e.target.value})}/>
                  </div>

                  <div>
                    <label className="text-xs text-gray-500 dark:text-[#9F9FA9]">Province</label>
                    <input className="w-full mt-2 p-2 rounded-md bg-white dark:bg-[#0b0b0b] border text-sm" value={business.province} onChange={(e)=>setBusiness({...business, province: e.target.value})}/>
                  </div>
                </div>
              </div>

              {/* Primary contact */}
              <div className="mt-6">
                <h4 className="text-sm font-medium mb-3">Primary Contact</h4>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="text-xs text-gray-500 dark:text-[#9F9FA9]">Contact Name</label>
                    <input className="w-full mt-2 p-2 rounded-md bg-white dark:bg-[#0b0b0b] border text-sm" value={business.contactName} onChange={(e)=>setBusiness({...business, contactName: e.target.value})}/>
                  </div>

                  <div>
                    <label className="text-xs text-gray-500 dark:text-[#9F9FA9]">Position</label>
                    <input className="w-full mt-2 p-2 rounded-md bg-white dark:bg-[#0b0b0b] border text-sm" value={business.position} onChange={(e)=>setBusiness({...business, position: e.target.value})}/>
                  </div>

                  <div>
                    <label className="text-xs text-gray-500 dark:text-[#9F9FA9]">Email</label>
                    <input className="w-full mt-2 p-2 rounded-md bg-white dark:bg-[#0b0b0b] border text-sm" value={business.contactEmail} onChange={(e)=>setBusiness({...business, contactEmail: e.target.value})}/>
                  </div>

                  <div>
                    <label className="text-xs text-gray-500 dark:text-[#9F9FA9]">Phone</label>
                    <input className="w-full mt-2 p-2 rounded-md bg-white dark:bg-[#0b0b0b] border text-sm" value={business.contactPhone} onChange={(e)=>setBusiness({...business, contactPhone: e.target.value})}/>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Users & Roles */}
          {tab === "users" && (
            <section>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium">Team Members</h3>
                <button onClick={inviteUser} className="px-3 py-2 rounded-md bg-[#E8600F] text-white flex items-center gap-2"><Plus size={14} /> Invite User</button>
              </div>

              <div className="rounded-md border bg-white dark:bg-[#0b0b0b] dark:border-[#222] overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-gray-600 dark:text-[#9F9FA9]">
                      <th className="p-4 text-left">Name</th>
                      <th className="p-4 text-left">Email</th>
                      <th className="p-4 text-left">Role</th>
                      <th className="p-4 text-left">Status</th>
                      <th className="p-4 text-left">Last Login</th>
                      <th className="p-4 text-left w-36">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E7EB] dark:divide-[#1f1f1f]">
                    {team.map((m) => (
                      <tr key={m.id} className="hover:bg-[#F5F5F5] dark:hover:bg-[#141414] transition">
                        <td className="p-4">{m.name}</td>
                        <td className="p-4 text-xs text-gray-500">{m.email}</td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-xs ${roleColors[m.role]}`}>{m.role}</span>
                        </td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-xs ${statusColors[m.status]}`}>{m.status}</span>
                        </td>
                        <td className="p-4">{m.lastLogin ?? "—"}</td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <button onClick={() => {/* edit */}} className="px-3 py-1 rounded-md border">Edit</button>
                            <button onClick={() => removeTeamMember(m.id)} className="px-3 py-1 rounded-md border text-red-500"><Trash size={14}/></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Role permissions */}
              <div className="mt-6">
                <h4 className="text-sm font-medium mb-3">Role Permissions</h4>
                <div className="rounded-md border bg-white dark:bg-[#0b0b0b] dark:border-[#222] overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-gray-600 dark:text-[#9F9FA9]">
                        <th className="p-4 text-left">Permission</th>
                        <th className="p-4 text-left">Owner</th>
                        <th className="p-4 text-left">Manager</th>
                        <th className="p-4 text-left">Staff</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E5E7EB] dark:divide-[#1f1f1f]">
                      {permissions.map((p, i) => (
                        <tr key={i} className="hover:bg-[#F5F5F5] dark:hover:bg-[#141414] transition">
                          <td className="p-4">{p.label}</td>
                          <td className="p-4 text-center">{p.owner ? <Check size={14} className="mx-auto text-green-400" /> : "—"}</td>
                          <td className="p-4 text-center">{p.manager ? <Check size={14} className="mx-auto text-green-400" /> : "—"}</td>
                          <td className="p-4 text-center">{p.staff ? <Check size={14} className="mx-auto text-green-400" /> : "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}

          {/* Security */}
          {tab === "security" && (
            <section>
              <h3 className="text-sm font-medium mb-4">Two-Factor Authentication</h3>
              <div className="space-y-4">
                <div className="rounded-md p-4 bg-white dark:bg-[#0b0b0b] border dark:border-[#222] flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">2FA via SMS</div>
                    <div className="text-xs text-gray-500">+966 50 *** *567</div>
                  </div>
                  <label className="inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={twoFA_SMS} onChange={(e)=>setTwoFA_SMS(e.target.checked)} className="hidden" />
                    <div className={`w-12 h-6 rounded-full p-0.5 ${twoFA_SMS ? "bg-green-500" : "bg-gray-400"}`}>
                      <div className={`bg-white w-5 h-5 rounded-full transition-transform ${twoFA_SMS ? "translate-x-6" : "translate-x-0"}`} />
                    </div>
                  </label>
                </div>

                <div className="rounded-md p-4 bg-white dark:bg-[#0b0b0b] border dark:border-[#222] flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">2FA via Authenticator App</div>
                    <div className="text-xs text-gray-500">Not configured</div>
                  </div>
                  <button onClick={()=>setTwoFA_App(true)} className="px-3 py-2 rounded-md border">Set Up</button>
                </div>
              </div>

              {/* Active devices */}
              <div className="mt-6">
                <h4 className="text-sm font-medium mb-3">Active Devices</h4>
                <div className="space-y-3">
                  {devices.map((d) => (
                    <div key={d.id} className="rounded-md p-3 bg-white dark:bg-[#0b0b0b] border dark:border-[#222] flex items-center justify-between">
                      <div>
                        <div className="font-medium">{d.name} <span className="text-xs text-gray-400">· {d.type}</span></div>
                        <div className="text-xs text-gray-500">Last active: {d.lastActive}</div>
                      </div>
                      <button onClick={()=>removeDevice(d.id)} className="px-3 py-1 rounded-md border text-red-400">Remove</button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Change password */}
              <div className="mt-6">
                <h4 className="text-sm font-medium mb-3">Change Password</h4>
                <div className="space-y-3">
                  <input placeholder="Current Password" type="password" className="w-full p-2 rounded-md bg-white dark:bg-[#0b0b0b] border" />
                  <input placeholder="New Password" type="password" className="w-full p-2 rounded-md bg-white dark:bg-[#0b0b0b] border" />
                  <input placeholder="Confirm New Password" type="password" className="w-full p-2 rounded-md bg-white dark:bg-[#0b0b0b] border" />
                  <button className="px-3 py-2 rounded-md bg-[#E8600F] text-white">Update Password</button>
                </div>
              </div>
            </section>
          )}

          {/* Billing */}
          {tab === "billing" && (
            <section>
              <h3 className="text-sm font-medium mb-4">Payment Methods</h3>

              <div className="space-y-3">
                {cards.map((c) => (
                  <div key={c.id} className="rounded-md p-3 bg-white dark:bg-[#0b0b0b] border dark:border-[#222] flex items-center justify-between">
                    <div>
                      <div className="font-medium">**** **** **** {c.last4}</div>
                      <div className="text-xs text-gray-500">Expires {c.expiry}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      {c.default && <span className="px-2 py-1 rounded-md bg-green-600 text-white text-xs">Default</span>}
                      <button onClick={()=>removeCard(c.id)} className="px-3 py-1 rounded-md border">Edit</button>
                    </div>
                  </div>
                ))}

                <button className="w-full px-3 py-2 rounded-md border">+ Add Payment Method</button>
              </div>
            </section>
          )}
        </div>

        {/* hidden design reference for dev */}
        <img src={designImage} alt="design" className="hidden" />
      </main>
    </div>
  );
}

/* Small helper components */

function Tab({ label, active, onClick, icon }: { label: string; active: boolean; onClick: () => void; icon?: React.ReactNode }) {
  return (
    <button onClick={onClick} className={`px-4 py-2 rounded-[14px] text-[14px]  flex items-center gap-2 ${active ? "bg-[#E8600F] cursor-pointer text-[#FFFFFF] dark:bg-[#111827]" : " text-[#0A0A0A] dark:text-[#FAFAFA] cursor-pointer "}`}>
      {icon} <span>{label}</span>
    </button>
  );
}
