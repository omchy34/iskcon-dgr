import Link from "next/link";

const quickLinks = [
  { label: "Upload Darshan", href: "/secretRoute/darshan", icon: "🛕", desc: "Add new deity darshan photos" },
  { label: "Manage Events", href: "/secretRoute/events", icon: "📅", desc: "Create and edit events" },
  { label: "Resources", href: "/secretRoute/resources", icon: "📚", desc: "Upload books and media" },
  { label: "Users", href: "/secretRoute/users", icon: "👥", desc: "View registered users" },
];

export default function DashboardPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Welcome back 🙏</h1>
        <p className="text-gray-500 mt-1">Manage your ISKCON Durgapur website content</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {quickLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 group"
          >
            <div className="text-3xl mb-3">{link.icon}</div>
            <h2 className="font-bold text-gray-800 group-hover:text-amber-600 transition-colors">
              {link.label}
            </h2>
            <p className="text-sm text-gray-500 mt-1">{link.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}