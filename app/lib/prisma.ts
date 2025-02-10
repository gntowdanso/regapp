import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;
/*
const prismaClientSingleton = () => {
    return new PrismaClient()
  }
  */
 /*
  const prismaClientSingleton = () => {
    return new PrismaClient()
  }
  
  declare global {
    var prisma: undefined | ReturnType<typeof prismaClientSingleton>
  }
  
  const db = globalThis.prisma ?? prismaClientSingleton()
  
  export default db
  */
