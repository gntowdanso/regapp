// pages/index.js
'use client';
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import prisma from "../lib/prisma";

const Home = () => {
  const [tasks, setTasks] = useState([]);

  const { data: session, status } = useSession();

  const userId = session?.user?.email;

 console.log("userid :", userId);

  useEffect(() => {
    const fetchTasks = async () => {
/*
     const res= await  prisma.will.findMany({
            where :{userId:userId},
            data:{
              id,
              title,
              description  
            }
            
            })
            
            
       //const data = await res.json();
        const rs= new Response(JSON.stringify(res), { status: 200 });
        
        const data = await rs.json();
        console.log("data:",data);
        */
            
     const res = await fetch(`/api/wills?user=${userId}`, { method: "GET" });
      const data = await res.json();
      console.log("data:",data);
    /*
      const response = await fetch("/api/wills");
            
      const data = await response.json();
      */
      setTasks(data);
    };

    fetchTasks();
  }, []);

  return (
    <>
      <div className="container mx-auto mt-8 max-w-[560px]">
        <div className="flex justify-between items-center pb-4 border-b border-dashed border-gray-900 mb-4">
          <h1 className="text-3xl font-semibold">Tasks</h1>
          <Link
            className="bg-green-600 hover:bg-opacity-80 text-white rounded-lg px-4 py-2 duration-200"
            href="/create"
          >
            Create New
          </Link>
        </div>
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className="py-2 flex justify-between w-full">
              <span>
                <strong>{task.title}</strong> - {task.description}
              </span>
              <span className="flex gap-2">
                <Link className="text-blue-700 underline hover:no-underline" href={`/${task.id}/edit`}>Edit</Link>
                <Link className="text-red-500 underline hover:no-underline" href={`/${task.id}/delete`}>Delete</Link>
              </span>
            </li>
          ))}
          {tasks?.length < 1 && <div className="py-2">No data</div>}
        </ul>
      </div>
      <Head>
        <title>Task</title>
      </Head>
    </>
  );
};

export default Home;