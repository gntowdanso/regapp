 'use client';
 

 
import "./globals.css";

 
 
import { SessionProvider, signIn } from "next-auth/react";

 
import AuthLayout from "@/components/layout/AuthLayout";
/*
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
*/
/*
export const metadata: Metadata = {
  title: "Will Registry App",
  description: "This is a Will Registry App",
};
*/
// eslint-disable-next-line @next/next/no-async-client-component
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
   
  //const session = await getServerSession();
   
  
  return (
    <html lang="en">
      <body >
    
      <SessionProvider>
      <AuthLayout>{children}</AuthLayout>
      </SessionProvider>

      </body>
    </html>
  );
}
  
