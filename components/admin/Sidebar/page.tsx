"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const ADMIN_ROUTE = process.env.NEXT_PUBLIC_ADMIN_ROUTE || "admin";

const navItems = [
  { label: "Dashboard", href: `/${ADMIN_ROUTE}/dashboard`, icon: "🏠" },
  { label: "Darshan Upload", href: `/${ADMIN_ROUTE}/darshan`, icon: "🛕" },
  { label: "Events", href: `/${ADMIN_ROUTE}/events`, icon: "📅" },
  { label: "Resources", href: `/${ADMIN_ROUTE}/resources`, icon: "📚" },
];
export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/secretRoute/login");
  }

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-gray-900 text-white flex flex-col z-50">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🛕</span>
          <div>
            <p className="font-bold text-white text-sm">ISKCON Durgapur</p>
            <p className="text-xs text-gray-400">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-amber-500 text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-4 py-6 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all"
        >
          <span className="text-lg">🚪</span>
          Logout
        </button>
      </div>
    </aside>
  );
}