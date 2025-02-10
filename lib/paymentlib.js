import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const create = async (data) => {
  return await prisma.payment.create({
    data,
  });
};

export const getAll = async () => {
  return await prisma.payment.findMany();
};

export const getById = async (id) => {
  return await prisma.payment.findUnique({
    where: { id: parseInt(id) },
  });
};
export const getByUserId=async(userId)=>{
return await prisma.payment.findMany({
where :{userId:userId}

})

};
export const updateData = async (id, data) => {
  return await prisma.payment.update({
    where: { id: parseInt(id) },
    data,
  });
};

export const deleteData = async (id) => {
  return await prisma.payment.delete({
    where: { id: parseInt(id) },
  });
};
