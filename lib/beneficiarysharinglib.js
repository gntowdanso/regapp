import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const create = async (data) => {
  return await prisma.assetBeneficiarySharing.create({
    data,
  });
};

export const getAll = async () => {
  return await prisma.assetBeneficiarySharing.findMany();
};

export const getById = async (id) => {
  return await prisma.assetBeneficiarySharing.findUnique({
    where: { id: parseInt(id) },
  });
};
export const getByUserId=async(userId)=>{
return await prisma.assetBeneficiarySharing.findMany({
where :{userId:userId}

})

};
export const updateData = async (id, data) => {
  return await prisma.assetBeneficiarySharing.update({
    where: { id: parseInt(id) },
    data,
  });
};

export const deleteData = async (id) => {
  return await prisma.assetBeneficiarySharing.delete({
    where: { id: parseInt(id) },
  });
};
