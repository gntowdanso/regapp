// types/contact.ts

export enum ContactType {
    USER = 'USER',
    BENEFICIARY = 'BENEFICIARY',
    EXECUTOR = 'EXECUTOR',
    ADMIN = 'ADMIN',
  }
  
  export interface Contact {
    id: number; // Auto-incrementing primary key
    userId: string;
    contactType: ContactType; // Enum: USER, BENEFICIARY, EXECUTOR, ADMIN
    telephoneNumber: string; // Unique telephone number
    email?: string; // Optional unique email address
    address?: string; // Optional address
    createdAt: Date; // Timestamp of record creation
    updatedAt: Date; // Automatically updates on record modification
  }

  export interface Asset {
    id: number;
    userId?: string;
    willId?: number;
    assetType?: string;
    location?: string;
    name?: string;
    description?: string;
    value?: number;
    beneficiaryId?: number;
    imageUrl?: string;
  }