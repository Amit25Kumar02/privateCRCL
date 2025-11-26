"use client";

import React, { useState, useRef } from "react";
import Sidebar from "../../component/sidebar/page";
import { MapPin, Clock, Edit, Globe, Menu } from "lucide-react";

const designImage = "/mnt/data/88ec2f84-50a6-4262-bfbb-e349b96f80b4.png";

type Hours = { open?: string; close?: string; closed?: boolean };

export default function BusinessProfilePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tab, setTab] = useState<"basic" | "hours" | "location" | "media">(
    "basic"
  );

  // Basic info state (sample)
  const [basicInfo, setBasicInfo] = useState({
    nameEn: "The Urban Kitchen",
    nameAr: "المطبخ الحضري",
    categories: ["Restaurant", "Cafe"],
    bioEn:
      "Modern fusion restaurant offering a unique blend of international and local cuisines. Perfect for casual dining and special occasions.",
    bioAr:
      "مطعم فيوجن عصري يقدم مزيجًا فريدًا من المأكولات العالمية والمحلية. مناسب لتناول الطعام غير الرسمي والمناسبات الخاصة.",
    phone: "+966 50 123 4567",
    whatsapp: "+966 50 123 4567",
  });

  // Opening hours
  const [hours, setHours] = useState<Record<string, Hours>>({
    Monday: { open: "", close: "", closed: false },
    Tuesday: { open: "", close: "", closed: false },
    Wednesday: { open: "", close: "", closed: false },
    Thursday: { open: "", close: "", closed: false },
    Friday: { open: "", close: "", closed: false },
    Saturday: { open: "", close: "", closed: false },
    Sunday: { open: "", close: "", closed: false },
  });

  // Location
  const [location, setLocation] = useState({
    address: "King Fahd Road, Riyadh 12345",
    latitude: "24.7136",
    longitude: "46.6753",
  });

  // Media (logo + hero)
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [heroFile, setHeroFile] = useState<File | null>(null);
  const logoPreview = useRef<string | null>(null);
  const heroPreview = useRef<string | null>(designImage); // show design image by default

  function handleLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    setLogoFile(f);
    logoPreview.current = f ? URL.createObjectURL(f) : null;
  }
  function handleHeroChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    setHeroFile(f);
    heroPreview.current = f ? URL.createObjectURL(f) : designImage;
  }

  // Helper to update opening hours
  function updateHour(day: string, key: "open" | "close" | "closed", val: any) {
    setHours((prev) => ({
      ...prev,
      [day]: { ...prev[day], [key]: val },
    }));
  }

  // categories list (display only)
  const allCategories = [
    "Restaurant",
    "Cafe",
    "Retail",
    "Fitness",
    "Beauty & Wellness",
    "Entertainment",
  ];

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
          <h1 className="text-xl font-semibold">Business Profile</h1>
          <p className="text-sm text-all-sub-h">  Manage your public business information</p>
        </div>

        {/* Header + Edit button */}
        <div className="flex items-start justify-between mb-6">
          <div className="hidden md:block">
            <h1 className="text-[30px] text-text">Business Profile</h1>
            <p className="text-[16px] text-all-sub-h">
              Manage your public business information
            </p>
          </div>

          <button
            className="flex items-center gap-2 cursor-pointer bg-[#E8600F] text-[#FFFFFF] px-4 py-2 rounded-md"
            aria-label="Edit profile"
          >
            <Edit size={16} />
            Edit Profile
          </button>
        </div>

        {/* Tabs */}
        <div className="grid grid-cols-2 md:flex gap-3 bg-offer-search-main border-[0.82px] border-border rounded-[14px] text-center w-full md:w-fit px-2 py-1 mb-6">
          <Tab label="Basic Info" active={tab === "basic"} onClick={() => setTab("basic")} />
          <Tab label="Opening Hours" active={tab === "hours"} onClick={() => setTab("hours")} />
          <Tab label="Location" active={tab === "location"} onClick={() => setTab("location")} />
          <Tab label="Media" active={tab === "media"} onClick={() => setTab("media")} />
        </div>

        {/* Content container */}
        <div >
          {/* BASIC INFO */}
          {tab === "basic" && (
            <section className="rounded-xl p-6 borde bg-offer-search-main border-[0.82px] border-border">
              <h2 className="text-[16px] text-white-off font-medium mb-4">Basic Information</h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <label className="text-[14px] text-table-text-h">Business Name (English)</label>
                  <input
                    value={basicInfo.nameEn}
                    onChange={(e) => setBasicInfo({ ...basicInfo, nameEn: e.target.value })}
                    className="w-full mt-2 px-3 py-2 rounded-lg border-[0.82px] border-border bg-offer-search text-[14px] text-table-text-id outline-none"
                  />
                </div>

                <div>
                  <label className="text-[14px] text-table-text-h">Business Name (Arabic)</label>
                  <input
                    value={basicInfo.nameAr}
                    onChange={(e) => setBasicInfo({ ...basicInfo, nameAr: e.target.value })}
                    className="w-full mt-2 px-3 py-2 rounded-lg border-[0.82px] border-border bg-offer-search   text-[14px] text-table-text-id  outline-none"
                  />
                </div>
              </div>

              {/* categories */}
              <div className="mt-4">
                <label className="text-[14px] text-table-text-h">Categories</label>
                <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-2">
                  {allCategories.map((c) => {
                    const active = basicInfo.categories.includes(c);
                    return (
                      <button
                        key={c}
                        onClick={() =>
                          setBasicInfo((prev) => ({
                            ...prev,
                            categories: active
                              ? prev.categories.filter((x) => x !== c)
                              : [...prev.categories, c],
                          }))
                        }
                        className={`px-4 py-2 rounded-lg cursor-pointer text-sm border-[0.82px] border-border ${active
                          ? "bg-[#E8600F] text-white-off border-border"
                          : "bg-offer-search text-table-text-id border-border opacity-70 "
                          }`}
                      >
                        {c}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* bios */}
              <div className="mt-4 grid grid-cols-1 gap-4">
                <div>
                  <label className="text-[14px] text-table-text-h">Short Bio (English)</label>
                  <textarea
                    value={basicInfo.bioEn}
                    onChange={(e) => setBasicInfo({ ...basicInfo, bioEn: e.target.value })}
                    className="w-full mt-2 px-3 py-3 rounded-lg border-[0.82px] border-border text-[14px] text-table-text-id opacity-70 min-h-20"
                  />
                </div>
                <div>
                  <label className="text-[14px] text-table-text-h">Short Bio (Arabic)</label>
                  <textarea
                    value={basicInfo.bioAr}
                    onChange={(e) => setBasicInfo({ ...basicInfo, bioAr: e.target.value })}
                    className="w-full mt-2 px-3 py-3 rounded-lg border-[0.82px] border-border bg-offer-search   text-[14px] text-table-text-id opacity-70 min-h-[80px]"
                  />
                </div>
              </div>

              {/* contact */}
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[14px] text-table-text-h">Phone Number</label>
                  <input
                    value={basicInfo.phone}
                    onChange={(e) => setBasicInfo({ ...basicInfo, phone: e.target.value })}
                    className="w-full mt-2 px-3 py-2 rounded-lg border-[0.82px] bg-offer-search   opacity-70 border-border text-[14px] text-table-text-id"
                  />
                </div>
                <div>
                  <label className="text-[14px] text-table-text-h">WhatsApp Number</label>
                  <input
                    value={basicInfo.whatsapp}
                    onChange={(e) => setBasicInfo({ ...basicInfo, whatsapp: e.target.value })}
                    className="w-full mt-2 px-3 py-2 rounded-lg border-[0.82px] bg-offer-search   opacity-70 border-border text-[14px] text-table-text-id"
                  />
                </div>
              </div>
            </section>
          )}

          {/* OPENING HOURS */}
          {tab === "hours" && (
            <section className="rounded-xl p-6 md:w-full overflow-x-auto borde bg-offer-search-main border-[0.82px] border-border">
              <h2 className="text-[16px] text-white-off font-medium mb-4">Opening Hours</h2>

              <div className="space-y-3 w-full max-w-[100px] md:max-w-full">
                {Object.keys(hours).map((day) => {
                  const h = hours[day];
                  return (
                    <div key={day} className="rounded-md p-3 bg-offer-search  border border-border  flex items-center gap-4">
                      <div className="w-36 text-[14px] text-white-off">{day}</div>

                      <div className="flex items-center gap-2">
                        <ClockIcon />
                        <input
                          type="time"
                          value={h.open ?? ""}
                          onChange={(e) => updateHour(day, "open", e.target.value)}
                          className="px-3 py-2 rounded-lg border-[0.82px] border-border bg-offer-search  text-sm"
                        />
                      </div>

                      <div className="px-2 text-[14px] text-table-text-id">to</div>

                      <div className="flex items-center gap-2">
                        <input
                          type="time"
                          value={h.close ?? ""}
                          onChange={(e) => updateHour(day, "close", e.target.value)}
                          className="px-3 py-2 rounded-lg border-[0.82px] border-border bg-offer-search text-table-text-id  text-[14px]"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* LOCATION */}
          {tab === "location" && (
            <section className="rounded-xl p-6 borde bg-offer-search-main border-[0.82px] border-border">
              <h2 className="text-[16px] text-white-off font-medium mb-4">Location Information</h2>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="text-[14px] text-table-text-h">Address</label>
                  <input
                    value={location.address}
                    onChange={(e) => setLocation({ ...location, address: e.target.value })}
                    className="w-full mt-2 px-3 py-2 rounded-lg border-[0.82px] border-border bg-offer-search  text-[14px] opacity-70 outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[14px] text-table-text-h">Latitude</label>
                    <input
                      value={location.latitude}
                      onChange={(e) => setLocation({ ...location, latitude: e.target.value })}
                      className="w-full mt-2 px-3 py-2 rounded-lg border-[0.82px] border-border bg-offer-search  text-[14px] opacity-70 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[14px] text-table-text-h">Longitude</label>
                    <input
                      value={location.longitude}
                      onChange={(e) => setLocation({ ...location, longitude: e.target.value })}
                      className="w-full mt-2 px-3 py-2 rounded-lg border-[0.82px] border-border bg-offer-search  text-[14px] opacity-70 outline-none"
                    />
                  </div>
                </div>

                <div className="mt-3 rounded-lg border-[0.82px] border-border bg-offer-search dark:bg-[#111317] h-48 flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <MapPin size={32} className="mx-auto mb-2 text-table-text-id opacity-70" />
                    <p className="text-[14px] text-table-text-id opacity-70">Map View</p>
                    <p className="text-[14px] text-table-text-id opacity-70">Interactive map would be displayed here</p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* MEDIA */}
          {tab === "media" && (
            <section>
              <div className="grid grid-cols-1 lg:grid-cols-2 md:h-[218px] gap-6">
                {/* Logo */}
                <div className="rounded-[14px] p-4 border-[0.82px] border-border bg-offer-search-main  ">
                  <div className="text-[14px] text-table-text-h mb-3">Logo</div>
                  <div className="rounded-lg border-[0.82px] border-border bg-offer-search h-36 flex items-center justify-center">
                    {logoPreview.current ? (
                      <img src={logoPreview.current} alt="logo preview" className="h-20 object-contain" />
                    ) : (
                      <label className="flex flex-col items-center gap-2 cursor-pointer text-table-text-h">
                        <Globe size={24} className="text-table-text-id opacity-70" />
                        <div className="text-[14px] text-table-text-id opacity-70">Upload your business logo</div>
                        <input type="file" accept="image/*" onChange={handleLogoChange} className="hidden" />
                      </label>
                    )}
                  </div>
                </div>

                {/* Hero */}
                <div className="rounded-xl p-4 border-[0.82px] border-border bg-offer-search  ">
                  <div className="text-[14px] text-table-text-h mb-3">Hero Image</div>
                  <div className="rounded-lg border-[0.82px] border-border bg-offer-search h-36 overflow-hidden">
                    {heroPreview.current ? (
                      <img src={heroPreview.current} alt="hero preview" className="w-full h-full object-cover rounded-md text-[14px] text-[#364153]" />
                    ) : (
                      <label className="flex flex-col items-center gap-2 justify-center h-full text-gray-500 cursor-pointer">
                        <div className="text-xs">Upload hero image</div>
                        <input type="file" accept="image/*" onChange={handleHeroChange} className="hidden" />
                      </label>
                    )}
                  </div>

                </div>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}

/* Helper components */

function Tab({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-center rounded-[14px] text-[14px] ${active
        ? "bg-tab-bg border-[0.82px] text-tab-text-a border-border cursor-pointer"
        : "text-tab-text cursor-pointer"
        }`}
    >
      {label}
    </button>
  );
}

function ClockIcon() {
  return (
    <div className="w-6 h-6 rounded-full bg-transparent flex items-center justify-center text-gray-400">
      <Clock size={14} className="text-table-text-id" />
    </div>
  );
}
