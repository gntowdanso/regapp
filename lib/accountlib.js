import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const create = async (data) => {
  return await prisma.account.create({
    data,
  });
};

export const getAll = async () => {
  return await prisma.account.findMany();
};

export const getById = async (id) => {
  return await prisma.account.findUnique({
    where: { id: parseInt(id) },
  });
};
export const getByUserId=async(userId)=>{
return await prisma.account.findMany({
where :{userId:userId}

})

};
export const updateData = async (id, data) => {
  return await prisma.account.update({
    where: { id: parseInt(id) },
    data,
  });
};

export const deleteData = async (id) => {
  return await prisma.account.delete({
    where: { id: parseInt(id) },
  });
};
