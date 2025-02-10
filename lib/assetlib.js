import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const create = async (data) => {
  return await prisma.asset.create({
    data,
  });
};

export const getAll = async () => {
  return await prisma.asset.findMany();
};

export const getById = async (id) => {
  return await prisma.asset.findUnique({
    where: { id: parseInt(id) },
  });
};
export const getByUserId=async(userId)=>{
return await prisma.asset.findMany({
where :{userId:userId}

})

};
export const updateData = async (id, data) => {
  return await prisma.asset.update({
    where: { id: parseInt(id) },
    data,
  });
};

export const deleteData = async (id) => {
  return await prisma.asset.delete({
    where: { id: parseInt(id) },
  });
};
