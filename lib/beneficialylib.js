import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const create = async (data) => {
  return await prisma.beneficiary.create({
    data,
  });
};

export const getAll = async () => {
  return await prisma.beneficiary.findMany();
};

export const getById = async (id) => {
  return await prisma.beneficiary.findUnique({
    where: { id: parseInt(id) },
  });
};
export const getByUserId=async(userId)=>{
return await prisma.beneficiary.findMany({
where :{userId:userId}

})

};
export const updateData = async (id, data) => {
  return await prisma.beneficiary.update({
    where: { id: parseInt(id) },
    data,
  });
};

export const deleteData = async (id) => {
  return await prisma.beneficiary.delete({
    where: { id: parseInt(id) },
  });
};
