 
 
import { deleteData, getById } from "@/lib/assetlib";
import { NextRequest, NextResponse } from "next/server";
 
 

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;  // Destructure the id from the params object
    
    const will = await getById(id); // Function to get the will by id
    
    if (!will) {
      return NextResponse.json({ error: "data not found" }, { status: 404 });
    }

    return NextResponse.json(will, { status: 200 });
    
  } catch (error) {
    console.error('Error fetching the data:', error);  // Logging error for debugging
    return NextResponse.json({ message: 'Error fetching data' }, { status: 500 });
  }
}



export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
       
       
        const { id } = params;  // Destructure the id from the params object
        console.log("api delete:",id)
        const deletedWill = await deleteData(id);
           
    
          return new Response(JSON.stringify({ message: ' deletion completed successfully', deletedWill }), { status: 200 });
  
     
      
    } catch (error) {
      console.error('Error fetching data :', error);  // Logging error for debugging
      return NextResponse.json({ message: 'Error fetching data' }, { status: 500 });
    }
  }
  