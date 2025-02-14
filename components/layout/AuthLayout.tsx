'use client';

import {  useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import LeftSideBar from '@/components/layout/LeftSideBar';
import { Toaster } from '@/components/ui/sonner';
import UserButton from '@/components/user-button';
import Image from "next/image";
import Link from 'next/link';
export default function AuthLayout({ children }: { children: React.ReactNode }) 
{
   
  const { data: session, status } = useSession();
  const pathname = usePathname();

  
  // Define public routes that don't require authentication
  const publicRoutes = ['/sign-in', '/sign-up'];
  const isPublicRoute = publicRoutes.includes(pathname);

   
  // If on a public route, render the page without authentication
  if (isPublicRoute) 
    {
    return <div className="public-layout">{children}</div>;
  }

  // If authenticated, render the full layout
  if(!session)
  {
    return;
  }
  if(status=="authenticated") 
    {
    return (
      <div className="app-container">
        {/* Top Menu */}
        <header className="top-menu">
        <div className="w-16 h-16 rounded-full overflow-hidden">
        <Image src="/logo.png" alt="logo" width={64} height={64} />
        </div>
           
          <nav className="top-nav">
             
            <Link href="/">Home</Link>
            <Link href="/profile">Profile</Link>
          </nav>
          <div className="user-actions">
            <span>Notifications</span>
            <Toaster />
          </div>
          <div className="user-actions">
            <UserButton />
          </div>
        </header>

        {/* Left Menu */}
        <LeftSideBar />

        {/* Main Content */}
        <main className="content-area">{children}</main>
      </div>
    );
  }

  else
  {
  return (
    <div className="login-container">
      
      <UserButton />
    </div>
  );
}
}
