import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createWill = async (data) => {
  console.log("Final data:"+data);
  return await prisma.will.create({
    data,
  });
};

export const getWills = async () => {
  return await prisma.will.findMany();
};

export const getWillById = async (id) => {
  return await prisma.will.findUnique({
    where: { id: parseInt(id) },
  });
};

export const getWillByUserId = async (userId) => {
  return await prisma.will.findMany({
    where: { userId:userId  },
  });
};

export const getByUserId=async(userId)=>{
  return await prisma.will.findMany({
  where :{userId:userId}
  
  })
  
  };

export const updateWill = async (id, data) => {
  return await prisma.will.update({
    where: { id: parseInt(id) },
    data,
  });
};

export const deleteWill = async (id) => {
  return await prisma.will.delete({
    where: { id: parseInt(id) },
  });
};
