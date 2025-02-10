import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const create = async (data) => {
  return await prisma.invoice.create({
    data,
  });
};

export const getAll = async () => {
  return await prisma.invoice.findMany();
};

export const getById = async (id) => {
  return await prisma.invoice.findUnique({
    where: { id: parseInt(id) },
  });
};
export const getByUserId=async(userId)=>{
return await prisma.invoice.findMany({
where :{userId:userId}

})

};
export const updateData = async (id, data) => {
  return await prisma.invoice.update({
    where: { id: parseInt(id) },
    data,
  });
};

export const deleteData = async (id) => {
  return await prisma.invoice.delete({
    where: { id: parseInt(id) },
  });
};
