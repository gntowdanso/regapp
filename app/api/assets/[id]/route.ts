import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
// request: Request, { params }: { params: Promise<{ id: string }>}
// 📌 GET ASSET BY ID
export async function GET(req: Request, { params }: { params: Promise< { id: string }> }) {
  try {
    const asset = await prisma.asset.findUnique({
      where: { id: Number((await params).id) },
    });
    if (!asset) return NextResponse.json({ message: "Asset not found" }, { status: 404 });
    return NextResponse.json(asset, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching asset", error }, { status: 500 });
  }
}

// 📌 UPDATE ASSET
export async function PUT(req: Request, { params }: { params: Promise< { id: string }> }) {
  try {
    const body = await req.json();
    const updatedAsset = await prisma.asset.update({
      where: { id: Number((await params).id) },
      data: { ...body },
    });
    return NextResponse.json(updatedAsset, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error updating asset", error }, { status: 500 });
  }
}

// 📌 DELETE ASSET
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await prisma.asset.delete({ where: { id: Number((await params).id) } });
    return NextResponse.json({ message: "Asset deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting asset", error }, { status: 500 });
  }
}
