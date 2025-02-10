import { getByUserId } from "@/lib/will";

export async function GET({ params }: { params: { userId: string } })
{
  try {
   
    const { userId } = params;   
   // console.log("getting data",userId);
    const data = await getByUserId(userId);
  // console.log("data returned", data);
    return new Response(JSON.stringify(data), { status: 200 });
  } 
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  catch (error) 
  {
    return new Response(JSON.stringify({ message: 'Error fetching users' }), { status: 500 });
  }
}