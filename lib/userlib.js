import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const create = async (data) => {
  return await prisma.users.create({
    data,
  });
};

export const getAll = async () => {
  return await prisma.users.findMany();
};

export const getById = async (id) => {
  return await prisma.users.findUnique({
    where: { id: parseInt(id) },
  });
};
export const getByUserId=async(userId)=>{
return await prisma.users.findMany({
where :{userId:userId}

})

};
export const updateData = async (id, data) => {
  return await prisma.users.update({
    where: { id: parseInt(id) },
    data,
  });
};

export const deleteData = async (id) => {
  return await prisma.users.delete({
    where: { id: parseInt(id) },
  });
};
