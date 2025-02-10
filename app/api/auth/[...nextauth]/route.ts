import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { PrismaClient,Prisma } from "@prisma/client";
// additional
 
//import CredentialsProvider from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import { useState } from "react";
import Email from "next-auth/providers/email";
import Google from "next-auth/providers/google";
const prisma = new PrismaClient();
const handler = NextAuth({
  
  
    providers: [

        Github({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        Google({
          clientId: process.env.GOOGLE_CLIENT_ID?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET?? "",
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {},
                password:{},
            },
            async authorize(credentials:any) 
            {
               
                try {
                     
                    const user = await prisma.users.findUnique({
                      where:{
                       userName: credentials?.email 
                      },
                      
                      });

                    if (!user) {
                        throw new Error("")
                    }
                    const isValidPassword = await bcrypt.compare(
                        credentials?.password ?? "", user.password as string
                    ); 
                    if (!isValidPassword) 
                      {
                        throw new Error ("")
                    }
                    return credentials;
                }
                catch {
                    return null
                }
            }
        })

    ],
    
    session: {
      strategy: "jwt",
      }, 
    callbacks: {
        async signIn({  user, account, profile, email, credentials}) {
            if (account?.provider === "github"||account?.provider === "google") 
              {
                
              // console.log("first Log:",user.email);
                const existingUser = await prisma.users.findUnique({ 
                  where:{
                    userName:user.email as string||""
                  },
                    });
                 //   console.log("first1 Log:",user.email);
                if (!existingUser) {
                  const newUser = {
                    name: user?.name || "",
                    email: user?.email || "",
                    password: account.access_token || "", // Consider hashing or not storing raw tokens
                    phone:"",
                    createdAt: new Date(),
                    updatedAt:new Date(),

                    //provider: account.provider,
                  };
                  
                 // console.log("first2 Log:",user.email);
                  await prisma.users.create({ 
                    data: {
                      
                      userName:user.email||"" ,
                      name:user.name ||"",
                      
                      password:account.access_token as string ||"",
                       
                      createdAt: new Date(),
                    updatedAt:new Date(),
                    UserStatus:"ACTIVE",
                   
                       
                     

                     }
                });
              }
                
                //console.log("first3 Log:",user.email);    
               
            }
            return true;
              },

        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
            }
            return token;
        },
        
        async session({ session, token }) {
            if (token) {
                session.user = {
                    email: token.email,
                    name: token.name,
                    image: token.picture,
                };
            };
            return session;
        }
        
    },
    
    pages: {
       signIn: "/sign-in",
    },
    
    secret: process.env.NEXTAUTH_SECRET
    

  
});
export { handler as GET, handler as POST };
   

   

