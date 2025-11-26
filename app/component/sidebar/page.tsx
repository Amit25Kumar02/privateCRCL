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
  X,
  LogOut,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function Sidebar({ isMobile = false, onClose }: any) {
  const pathname = usePathname();
  const router = useRouter();


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
    <aside
      className={`
    bg-offer-search-main text-text border-r border-border
- h-screen flex flex-col justify-between p-4 fixed top-0
+ h-screen overflow-y-auto flex flex-col justify-between p-4 fixed top-0
    ${isMobile ? "w-full left-0 z-50 animate-slideIn" : "w-[263px] left-0"}
  `}
    >

      {isMobile && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4  text-white-off p-2 rounded-lg"
        >
          <X size={22} />
        </button>
      )}

      <div>
        <div className="px-4 pb-4 mt-4 border-b-[0.82px] border-border md:text-center w-full ">
          <h1 className="text-2xl font-semibold">PrivateCRCL</h1>
        </div>

        <nav className="mt-4 space-y-1">
          {menu.map((item, idx) => {
            const active = pathname === item.href;
            return (
              <Link
                key={idx}
                href={item.href}
                onClick={onClose}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg transition
                  ${active ? "bg-[#E8600F] text-white" : "text-sidebar-text hover:bg-sidebar-hover hover:text-white-off"}
                `}
              >
                {item.icon}
                <span className="text-md">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-2 space-y-3 border-t-[0.82px] border-border">
        <ThemeToggle />
        <button
          onClick={() => {
            localStorage.removeItem("token");
            router.push("/");
          }}
          className="
      w-full flex items-center justify-start gap-2 
      px-2 py-2 rounded-lg cursor-pointer
      bg-offer-search-main 
      text-md transition
      text-sidebar-text hover:bg-sidebar-hover hover:text-white-off
    "
        >
          <LogOut size={18} />
          Logout
        </button>

        <div className="dark:bg-[#09090B] rounded-xl p-3 flex items-center gap-3">
          <div className="h-[32px] w-[32px] flex items-center justify-center rounded-full bg-[#E5E7EB] dark:bg-[#333] text-[#364153] dark:text-white">
            B
          </div>
          <div>
            <p className="text-sm text-white-off">Business Name</p>
            <p className="text-xs text-[#6A7282]">Manager</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
