"use client";

import { useSession } from "next-auth/react";
import UserDashboard from "../components/userdashboard";

export default function Home() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div>
        <UserDashboard />
      </div>
    );
  } else {
    return (
      <div className="min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 flex flex-col justify-center items-center p-8 text-white">
        <h1 className="text-4xl font-bold mb-6">Secure Your Legacy with Ease</h1>
        <p className="text-lg mb-10">Discover why keeping your Will in this app is essential.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
          <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-semibold mb-4">🔒 Secure & Confidential</h2>
            <p>Your Will is encrypted and stored securely, accessible only to authorized persons.</p>
          </div>

          <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-semibold mb-4">🌍 Accessible Anytime</h2>
            <p>Manage and update your Will from anywhere, ensuring your wishes are always up to date.</p>
          </div>

          <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-semibold mb-4">📜 Legal Compliance</h2>
            <p>Designed to meet legal requirements, making the process of inheritance smooth for your loved ones.</p>
          </div>
        </div>

        <p className="mt-10 text-lg">Join us today and ensure your legacy is preserved.</p>
      </div>
    );
  }
}
