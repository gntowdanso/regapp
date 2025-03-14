// app/api/contacts/route.ts

import { NextResponse } from 'next/server';
import { Prisma, PrismaClient } from '@prisma/client';
//import { Contact } from '../../types/contact';
import { Contact, ContactType } from '@/types/contact';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const contacts = await prisma.contact.findMany();
    return NextResponse.json(contacts);
  } 
  catch (error) 
  
  {
    return NextResponse.json({ message: 'Something went wrong', error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
   // const userId = (await params).userId // 'a', 'b', or 'c'
    const body: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'> = await request.json();
    const newContact = await prisma.contact.create({
      data: {
        ...body,
        contactType: body.contactType as ContactType,
      },
    });
    return NextResponse.json(newContact, { status: 201 });
  } 
  catch (error:unknown) 
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

    return NextResponse.json({ message: 'Something went wrong', error }, { status: 500 });
  }
}