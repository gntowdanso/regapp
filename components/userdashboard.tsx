"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const UserDashboard = () => {
  const [stats, setStats] = useState({
    willsCount: 0,
    assetsCount: 0,
    totalAssetValue: 0,
    contactsCount: 0,
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/userdashboard/stats");
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching dashboard stats", error);
      }
    }
    fetchStats();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Link href="/will">
          <div className="p-5 bg-blue-500 text-white rounded-lg shadow-lg cursor-pointer hover:bg-blue-600 transition">
            <h2 className="text-xl font-semibold">Total Wills</h2>
            <p className="text-3xl font-bold">{stats.willsCount}</p>
          </div>
        </Link>

        <Link href="/asset">
          <div className="p-5 bg-green-500 text-white rounded-lg shadow-lg cursor-pointer hover:bg-green-600 transition">
            <h2 className="text-xl font-semibold">Total Assets</h2>
            <p className="text-3xl font-bold">{stats.assetsCount}</p>
          </div>
        </Link>

        <Link href="/asset">
          <div className="p-5 bg-yellow-500 text-white rounded-lg shadow-lg cursor-pointer hover:bg-yellow-600 transition">
            <h2 className="text-xl font-semibold">Total Asset Value</h2>
            <p className="text-3xl font-bold">GHS{stats.totalAssetValue.toLocaleString()}</p>
          </div>
        </Link>

        <Link href="/contact">
          <div className="p-5 bg-red-500 text-white rounded-lg shadow-lg cursor-pointer hover:bg-red-600 transition">
            <h2 className="text-xl font-semibold">Total Contacts</h2>
            <p className="text-3xl font-bold">{stats.contactsCount}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default UserDashboard;
