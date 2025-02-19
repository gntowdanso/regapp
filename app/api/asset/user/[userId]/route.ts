import { getByUserId } from "@/lib/assetlib";
//import { NextResponse } from 'next/server';
export async function GET(request: Request, { params }: { params: Promise<{ userId: string }> })
{
  try {
   
   // const { userId } = params;   
    const userId = (await params).userId // 'a', 'b', or 'c'
   // const { userId } = await params;
    const data = await getByUserId(userId);
   
    return new Response(JSON.stringify(data), { status: 200 });
  } 
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  catch (error) 
  {
    return new Response(JSON.stringify({ message: 'Error fetching data' }), { status: 500 });
  }
}

//import { NextRequest, NextResponse } from "next/server";



 