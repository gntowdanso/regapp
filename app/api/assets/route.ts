import { NextResponse } from "next/server";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 📌 GET ALL ASSETS
export async function GET() {
  try {
    const assets = await prisma.asset.findMany();
    return NextResponse.json(assets, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching assets", error }, { status: 500 });
  }
}

// 📌 CREATE A NEW ASSET
export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("body:",body);
    const newAsset = await prisma.asset.create({
      data: { ...body },
    });
    return NextResponse.json(newAsset, { status: 201 });
  } catch (error) 
  {
    
  
  
  
      let errorMessage = 'Something went wrong';
  
      // Handle Prisma-specific errors
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Known database errors (e.g., unique constraint failure, foreign key violation)
        if (error.code === 'P2002') {
          errorMessage = 'Duplicate entry: A record with this value already exists.';
        } else if (error.code === 'P2025') {
          errorMessage = 'Record not found: The requested item does not exist.';
        } else {
          errorMessage = `Database error: ${error.message}`;
        }
      } else if (error instanceof Prisma.PrismaClientValidationError) {
        errorMessage = 'Validation error: Invalid data format.';
      } else if (error instanceof SyntaxError) {
        // Handle JSON parsing errors
        errorMessage = 'Invalid JSON format in request body.';
      } else if ((error as Error).name === 'TypeError') {
        // Handle TypeErrors (e.g., accessing properties of undefined)
        errorMessage = `Type Error: ${(error as Error).message}`;
      } else {
        // Generic error fallback
        errorMessage = (error as Error).message || 'An unexpected error occurred.';
      }
    
      return NextResponse.json({ message: errorMessage }, { status: 500 });
  
      //return NextResponse.json({ message: 'Something went wrong', error }, { status: 500 });
    }

}