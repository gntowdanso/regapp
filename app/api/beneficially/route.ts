 

import { create, updateData,getAll,deleteData } from '@/lib/beneficialylib';
import { NextResponse } from "next/server";
 
 
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
 
 
 
const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');
 
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
    return new Response(JSON.stringify({ message: 'Error fetching users' }), { status: 500 });
  }
}

 

export async function POST(req: Request) {
  try {
    // Ensure upload directory exists
    await fs.mkdir(UPLOAD_DIR, { recursive: true });

    let documentUrl="";

   const formData = await req.formData();

   const file = formData.get("file");
   if (!file) {
     return NextResponse.json({ error: "No files received." }, { status: 400 });
   }
 
  const buffer = Buffer.from(await (file as File).arrayBuffer());
   const filename = (file instanceof File) ? file.name.replaceAll(" ", "_") : "";
   console.log(filename);
   
 
//const { fields, files } = formData;
const title = formData.get("title");
const description = formData.get("description");
const userId = formData.get("userId");
// Extract and validate form fields
 
if (!title  ) 
  {
  return NextResponse.json({ message: 'Title and description are required' }, { status: 400 });
}



   
   try {

    await fs.mkdir("public/uploads", { recursive: true })
    const imagePath = `/uploads/${crypto.randomUUID()}-${filename}`
    await fs.writeFile(
      `public${imagePath}`,
      buffer
    )
    documentUrl=imagePath;
   /*
     await writeFile(
       path.join(process.cwd(), UPLOAD_DIR + sanitizedFileName),
       buffer
     );
     */
    // return NextResponse.json({ Message: "Success", status: 201 });
   } catch (error) {
     console.log("Error occured ", error);
    // return NextResponse.json({ Message: "Failed", status: 500 });
   }

    
    
  
    // Construct document URL
   
    // Save will details (example: calling a database function `createWill`)
    const newWill = {
      title,
      description,
      documentUrl,
      userId,
      createdAt: new Date(),
    };
    // Replace `createWill` with actual database logic
    const will = await create(newWill); // Assuming `createWill` exists

    // Return success response
    return NextResponse.json(will, { status: 201 });
    
  } catch (error) {
    console.error('Error creating will:', error);
    return NextResponse.json(
      { message: 'Error creating will' },
      { status: 500 }
    );
  }
}


export async function PUT(req: Request) 
{
  try {
     
    const body = await req.json();

    if (!body.title) {
      return NextResponse.json({ message: 'Title is required' }, { status: 400 });
    }
 // Ensure upload directory exists
 await fs.mkdir(UPLOAD_DIR, { recursive: true });

 let documentUrl="";

const formData = await req.formData();

const file = formData.get("file");
if (file)
  {
   


//const buffer = Buffer.from(await file.arrayBuffer());
//const filename =  file.name.replaceAll(" ", "_");


const buffer = Buffer.from(await (file as File).arrayBuffer());
const filename = (file instanceof File) ? file.name.replaceAll(" ", "_") : "";
console.log(filename);

// Sanitize file name and move file to final location
//const sanitizedFileName = `${crypto.randomUUID()}-${path.basename(filename || '')}`;
//const finalFilePath = path.join(UPLOAD_DIR, sanitizedFileName);
//await fs.rename(file.filepath, finalFilePath);

//const { fields, files } = formData;
const title = formData.get("title");
const description = formData.get("description");
const userId = formData.get("userId");
// Extract and validate form fields





try {

 await fs.mkdir("public/uploads", { recursive: true })
 const imagePath = `/uploads/${crypto.randomUUID()}-${filename}`
 await fs.writeFile(
   `public${imagePath}`,
   buffer
 )

 if (!title  ) {
  return NextResponse.json({ message: 'Title and description are required' }, { status: 400 });
  }
  
 documentUrl=imagePath;
 
 // return NextResponse.json({ Message: "Success", status: 201 });
} catch (error) {
  console.log("Error occured ", error);
 // return NextResponse.json({ Message: "Failed", status: 500 });
}


if (!body.title) {
  return NextResponse.json({ message: 'Title is required' }, { status: 400 });
}
const id=  body.id ;
const newWill = {
  title,
  description,
  documentUrl,
  userId,
  createdAt: new Date(),
};
 const resp= await updateData(id, newWill);

// If the will is updated successfully, return the updated will
return  new Response(JSON.stringify(resp), { status: 201 });



}
else /// document was not changed
{

 

    
     const id=  body.id ;
     
     const resp= await updateData(id, body);

    // If the will is updated successfully, return the updated will
    return new Response(JSON.stringify(resp), { status: 201 });
}
  } catch (error) {
    // Log the error for debugging
    console.error('Error updating will:', error);
    return new Response( JSON.stringify({ error: 'Error updating will' }), { status: 500 });
     
  }
}


export async function DELETE(req: Request) 
{
  try {
    const body = await req.json();
    const id=body.id;
      const deletedWill = await deleteData(id);
      //return res.status(200).json({ message: 'Will deleted successfully', deletedWill });

      return new Response(JSON.stringify({ message: 'Will deleted successfully', deletedWill }), { status: 200 });
    
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error deleting user' }), { status: 500 });
  }
}

 