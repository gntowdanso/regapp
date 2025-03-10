import { getServerSession } from "next-auth";
 
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export async function GET() {
  const session = await getServerSession();

  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!session.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = session.user.email?.toString();

  const willsCount = await prisma.will.count({ where: { userId:userId } });
  const assetsCount = await prisma.asset.count({ where: { userId:userId } });
  const totalAssetValue = await prisma.asset.aggregate({
    where: { userId },
    _sum: { value: true },
  });

  const contactsCount = await prisma.contact.count({ where: { userId:userId } });

  return Response.json({
    willsCount,
    assetsCount,
    totalAssetValue: totalAssetValue._sum.value || 0,
    contactsCount,
  });
}
