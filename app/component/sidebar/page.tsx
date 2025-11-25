"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "../ThemeToggle";

import {
  LayoutDashboard,
  Tag,
  ScanLine,
  DollarSign,
  Calendar,
  Store,
  QrCode,
  Settings,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const menu = [
    { label: "Dashboard", icon: <LayoutDashboard size={18} />, href: "/pages/dashboard" },
    { label: "Offers", icon: <Tag size={18} />, href: "/pages/offers" },
    { label: "Redemptions", icon: <ScanLine size={18} />, href: "/pages/redemptions" },
    { label: "Payouts & Analytics", icon: <DollarSign size={18} />, href: "/pages/payouts" },
    { label: "Events", icon: <Calendar size={18} />, href: "/pages/events" },
    { label: "Business Profile", icon: <Store size={18} />, href: "/pages/business-profile" },
    { label: "QR Scanner", icon: <QrCode size={18} />, href: "/pages/qr-scanner" },
    { label: "Account Settings", icon: <Settings size={18} />, href: "/pages/settings" },
  ];

  return (
    <div className="">
      <aside className="h-screen w-[263px] bg-offer-search-main text-[var(--text)] border-[0.82px] border-[var(--border)] flex flex-col justify-between p-4">

        {/* Logo */}
        <div>
          <div className="h-[89px] p-[24px]">
            <div className="h-[39px] px-4  border-b-[0.82px]">
          <h1 className="text-2xl font-semibold">
            PrivateCRCL
          </h1>
            </div>
          </div>

          {/* Menu Items */}
          <nav className="h-[422px] w-[230px] flex-1 space-y-1">
            {menu.map((item, idx) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={idx}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-2 rounded-[10px] cursor-pointer transition
                    ${isActive
                      ? "bg-[#E8600F] text-[#FFFFFF] text-[16px] h-[49px]"
                      : " text-sidebar-text text-[16px] hover:bg-[#E8600F] hover:text-[#FFFFFF] h-[49px]"
                    }
                  `}
                >
                  {item.icon}
                  <span className="text-sm">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex justify-between items-center mb-8">
          {/* <h1 className="text-2xl font-semibold tracking-wide">PrivateCRCL</h1> */}
          <ThemeToggle />
        </div>
        {/* User Section */}
        <div className="dark:bg-[#09090B] rounded-xl p-3 flex items-center gap-3">
          <div className="h-[32px] w-[32px] text-[16px] text-[#364153] flex items-center justify-center rounded-full bg-[#E5E7EB] dark:text-[#FFFFFF]">
            B
          </div>
          <div>
            <p className="text-[14px] text-[#101828]">Business Name</p>
            <p className="text-[12px] text-[#6A7282]">Manager</p>
          </div>
        </div>
      </aside>
    </div>
  );
}
