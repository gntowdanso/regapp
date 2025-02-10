import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const create = async (data) => {
  return await prisma.session.create({
    data,
  });
};

export const getAll = async () => {
  return await prisma.session.findMany();
};

export const getById = async (id) => {
  return await prisma.session.findUnique({
    where: { id: parseInt(id) },
  });
};
export const getByUserId=async(userId)=>{
return await prisma.session.findMany({
where :{userId:userId}

})

};
export const updateData = async (id, data) => {
  return await prisma.session.update({
    where: { id: parseInt(id) },
    data,
  });
};

export const deleteData = async (id) => {
  return await prisma.session.delete({
    where: { id: parseInt(id) },
  });
};
