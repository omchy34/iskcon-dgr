import { ReactNode } from "react";
import { cookies } from "next/headers";
import Sidebar from "@/components/admin/Sidebar/page";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  const isLoggedIn = token === process.env.ADMIN_SECRET;

  if (!isLoggedIn) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">{children}</main>
    </div>
  );
}