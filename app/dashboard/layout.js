"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function DashboardLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    router.push("/api/auth/signin");
    return null;
  }

  return (
    <section>
      <div className="dashboard-sidebar">Dashboard Sidebar</div>
      <div>{children}</div>
    </section>
  );
}
