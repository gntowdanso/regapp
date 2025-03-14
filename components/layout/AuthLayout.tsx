'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import LeftSideBar from '@/components/layout/LeftSideBar';
import { Toaster } from '@/components/ui/sonner';
import UserButton from '@/components/user-button';
import Image from "next/image";
import Link from 'next/link';
import { Menu } from 'lucide-react'; // Icon for mobile menu

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [isSidebarOpen, setSidebarOpen] = useState(false); // Sidebar state

  if (!session) {
    return (
      <div className="flex flex-col min-h-screen">
        {/* Mobile Header */}
        <header className="flex justify-between items-center p-4 bg-gray-900 text-white">
          <Image src="/logo.png" alt="logo" width={40} height={40} className="w-10 h-10" />
          <UserButton />
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4">{children}</main>
      </div>
    );
  }

  if (status === "authenticated") {
    return (
      <div className="flex min-h-screen">
        {/* Sidebar (Hidden on mobile unless toggled) */}
        <aside className={`fixed inset-y-0 left-0 w-52 bg-[#0a0f1f] text-white p-4 transition-transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0 sm:block`}>
          <div className="flex justify-between items-center mb-4">
            <Image src="/logo.png" alt="logo" width={40} height={40} className="w-10 h-10" />
            <button className="sm:hidden text-white" onClick={() => setSidebarOpen(false)}>✖</button>
          </div>
          <LeftSideBar />
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col sm:ml-52">
          {/* Top Navigation (Visible on larger screens) */}
          <nav className="hidden sm:flex justify-between items-center bg-gray-900 text-white p-4">
            <div className="flex space-x-4">
              <Link href="/">Home</Link>
              <Link href="/profile">Profile</Link>
            </div>
            <div className="flex items-center space-x-4">
              <span>Notifications</span>
              <Toaster />
              <UserButton />
            </div>
          </nav>

          {/* Mobile Header */}
          <header className="sm:hidden flex justify-between items-center p-4 bg-gray-900 text-white">
            <button onClick={() => setSidebarOpen(!isSidebarOpen)}>
              <Menu size={24} />
            </button>
            <UserButton />
          </header>

          {/* Main Content */}
          <main className="flex-1 p-4">{children}</main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <UserButton />
    </div>
  );
}
