 
 
import { deleteWill, getWillById } from "@/lib/will";
import { NextRequest, NextResponse } from "next/server";
 
 

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;  // Destructure the id from the params object
    
    const will = await getWillById(id); // Function to get the will by id
    
    if (!will) {
      return NextResponse.json({ error: "Will not found" }, { status: 404 });
    }

    return NextResponse.json(will, { status: 200 });
    
  } catch (error) {
    console.error('Error fetching the will:', error);  // Logging error for debugging
    return NextResponse.json({ message: 'Error fetching will' }, { status: 500 });
  }
}



export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
       
       
        const { id } = params;  // Destructure the id from the params object
        console.log("api delete:",id)
        const deletedWill = await deleteWill(id);
           
    
          return new Response(JSON.stringify({ message: 'Will deleted successfully', deletedWill }), { status: 200 });
  
     
      
    } catch (error) {
      console.error('Error fetching the will:', error);  // Logging error for debugging
      return NextResponse.json({ message: 'Error fetching will' }, { status: 500 });
    }
  }
  