  

import { deleteData, getById } from "@/lib/assetlib";
import { NextResponse } from "next/server";

 

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id // 'a', 'b', or 'c'

  const will = await getById(id);

  // If no asset found, return 404
  if (!will) 
    {
    return NextResponse.json({ error: "Data not found" }, { status: 404 });
  }

  // Return the fetched will with a 200 status code
  return NextResponse.json(will, { status: 200 });

 // return NextResponse.json(null, { status: 200 });


}
// Define the route handler for GET requests
 
// Define the route handler for DELETE requests

export async function DELETE( 
  request: Request, { params }: { params: Promise<{ id: string }>}

) {
  try {
  //  const { id } = params;  // Destructure the id from the params object
  const id = (await params).id 

    if (typeof id !== 'string') {
      return NextResponse.json(
        { error: 'Invalid ID type. ID must be a string.' },
        { status: 400 }
      );
    }
    console.log("Deleting asset with ID:", id);  // Log ID for debugging

    // Attempt to delete the data
    const deletedWill = await deleteData(id);

    // Check if the delete operation was successful
    if (!deletedWill) {
      return NextResponse.json({ message: "Data not found or deletion failed" }, { status: 404 });
    }

    // Return a successful response with a message and the deleted data
    return NextResponse.json({ message: 'Deletion completed successfully', deletedWill }, { status: 200 });

  } catch (error) {
    // Log error and return a 500 status with a message
    console.error('Error deleting data:', error);
    return NextResponse.json({ message: 'Error deleting data' }, { status: 500 });
  }
}
  
