import { options } from "../api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth/next"
import Link from 'next/link'
//import UserCard from "./Usercard"
 
//import UserCard from "../components/UserCard"
import { redirect } from "next/navigation"
import React, { Component } from "react"

export default async function ServerPage() {

    const session = await getServerSession(options)

    if (!session) 
        {
        redirect('/api/auth/signin?callbackUrl=/server')
    }

    return (
        <section className="flex flex-col gap-6">

            
<p>
        Don't have an account? <Link href="./api/auth/register">Register here</Link>.
      </p>
            
        </section>
    )

}