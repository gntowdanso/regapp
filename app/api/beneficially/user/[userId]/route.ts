import { getByUserId } from "@/lib/beneficialylib";

export async function GET({ params }: { params: { userId: string } })
{
  try {
   
    const { userId } = params;   
    
    const data = await getByUserId(userId);
   
    return new Response(JSON.stringify(data), { status: 200 });
  } 
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  catch (error) 
  {
    return new Response(JSON.stringify({ message: 'Error fetching data' }), { status: 500 });
  }
}