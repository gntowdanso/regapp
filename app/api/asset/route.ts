
 
 
import { create,getAll,updateData,deleteData } from '@/lib/assetlib';
import { NextResponse } from "next/server";
//import { request } from "http";
 
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
 
//import formidable from 'formidable';
 
//import { Readable } from 'stream';
//import { Response } from 'next/server';
 
const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');
/*
const form = formidable({
  uploadDir: UPLOAD_DIR,
  keepExtensions: true,
  maxFileSize: 10 * 1024 * 1024, // 10MB
  multiples: false,
});
*/

export const config = {
  api: {
    bodyParser: false, // Disable default body parsing
  },
};


export async function GET() 
{
  try {
    const wills = await getAll();
   // return res.status(200).json(wills);
    return new Response(JSON.stringify(wills), { status: 200 });
  } 
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  catch (error) 
  {
    return new Response(JSON.stringify({ message: 'Error fetching data' }), { status: 500 });
  }
}


 

export async function POST(req: Request) {
  try {
    // Ensure upload directory exists
    await fs.mkdir(UPLOAD_DIR, { recursive: true });

    let imageUrl="";

   const formData = await req.formData();

   const file = formData.get("file");
   if (!file) {
     return NextResponse.json({ error: "No files received." }, { status: 400 });
   }
 
   const buffer = Buffer.from(await (file as Blob).arrayBuffer());
   const filename = (file as File).name.replaceAll(" ", "_");
   console.log(filename);
   
// Sanitize file name and move file to final location
//const sanitizedFileName = `${crypto.randomUUID()}-${path.basename(filename || '')}`;
 
 
//const title = formData.get("title");
const description = formData.get("description");
const assetType = formData.get("assetType");
const location = formData.get("location");
const userId =formData.get("userId");
const willId=formData.get("willId");
const name=formData.get("name");
const value=formData.get("value");
//const imageUrl=formData.get("imageUrl");
const beneficiaryId=formData.get("beneficiaryId")
 
 
if (!name  ) {
  return NextResponse.json({ message: 'Title and description are required' }, { status: 400 });
}



   
   try {

    await fs.mkdir("public/uploads/assets", { recursive: true })
    const imagePath = `/uploads/assets/${crypto.randomUUID()}-${filename}`
    await fs.writeFile(
      `public${imagePath}`,
      buffer
    )
    imageUrl=imagePath;
    

   } catch (error) {
     console.log("Error occured ", error);
    // return NextResponse.json({ Message: "Failed", status: 500 });
   }
    
   
    const newVar = {
      userId,
      willId,
      name,
      description,
      value,
      beneficiaryId,
      imageUrl,
      assetType,
      location,
      createdAt: new Date(),
    };
    // Replace `createWill` with actual database logic
    const dataVar = await create(newVar); // Assuming `createWill` exists

    // Return success response
    return NextResponse.json(dataVar, { status: 201 });
    
  } catch (error) {
    console.error('Error creating data:', error);
    return NextResponse.json(
      { message: 'Error creating data'},
      { status: 500 }
    );
  }
}


export async function PUT(req: Request) 
{
  try {
     
    const body = await req.json();
  
     if (!body.title) 
      {
       return NextResponse.json({ message: 'Title is required' }, { status: 400 });
     }
     const id=  body.id ;
     
    const updatedWill = await updateData(id, body);

    // If the will is updated successfully, return the updated will
    return new Response(JSON.stringify(updatedWill), { status: 201 });
  } catch (error) {
    // Log the error for debugging
    console.error('Error updating :', error);
    return new Response( JSON.stringify({ error: 'Error updating ' }), { status: 500 });
     
  }
}


export async function DELETE(req: Request) 
{
  try {
    const body = await req.json();
    const id=body.id;
      const deletedWill = await deleteData(id);
      //return res.status(200).json({ message: 'Will deleted successfully', deletedWill });

      return new Response(JSON.stringify({ message: ' deletion completed successfully', deletedWill }), { status: 200 });
    
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error deleting ..' }), { status: 500 });
  }
}

 
