import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: Promise< { id: string }> }) {
  const { id } = await params;

  try {
    const contact = await prisma.contact.findUnique({
      where: { id:  parseInt(id) },
    });
    if (contact) {
      return Response.json(contact);
    } else {
      return Response.json({ message: 'Contact not found' }, { status: 404 });
    }
  } catch (error) {
    return Response.json({ message: 'Something went wrong', error }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();

  try {
    const updatedContact = await prisma.contact.update({
      where: { id: parseInt(id) },
      data: body,
    });
    return Response.json(updatedContact);
  } catch (error) {
    return Response.json({ message: 'Something went wrong', error }, { status: 500 });
  }
}

export async function DELETE( req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    await prisma.contact.delete({
      where: { id: parseInt(id) },
    });
    return new Response(null, { status: 204 });
  } catch (error) {
    return Response.json({ message: 'Something went wrong', error }, { status: 500 });
  }
}