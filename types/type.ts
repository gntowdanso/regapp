export enum InvoiceStatus {
    PENDING = "PENDING",
    PAID = "PAID",
    CANCELLED = "CANCELLED",
  }
  
  export enum PaymentMethod {
    CREDIT_CARD = "CREDIT_CARD",
    BANK_TRANSFER = "BANK_TRANSFER",
    CASH = "CASH",
  }
  
  export enum PaymentStatus {
    COMPLETED = "COMPLETED",
    PENDING = "PENDING",
    FAILED = "FAILED",
  }
  
  export enum ContactType {
    USER = "USER",
    BENEFICIARY = "BENEFICIARY",
    EXECUTOR = "EXECUTOR",
    ADMIN = "ADMIN",
  }
  
  export interface Invoice {
    id: number;
    userId: string;
    willId: number;
    amount: number;
    status: InvoiceStatus;
    issuedAt: Date;
    dueDate: Date;
    description?: string | null;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface Payment {
    id: number;
    invoiceId: number;
    userId: string;
    amount: number;
    method: PaymentMethod;
    status: PaymentStatus;
    paidAt: Date;
    transactionId?: string | null;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface Contact {
    id: number;
    userId: string;
    contactType: ContactType;
    telephoneNumber: string;
    email?: string | null;
    address?: string | null;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface Session {
    id: number;
    sessionToken: string;
    userId: string;
    ipAddress?: string | null;
    userAgent?: string | null;
    expires?: Date | null;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface Account {
    id: number;
    userId: string;
    provider: string;
    providerAccountId: string;
    type: string;
    refresh_token?: string | null;
    access_token?: string | null;
    expires_at?: number | null;
    token_type?: string | null;
    scope?: string | null;
    id_token?: string | null;
    session_state?: string | null;
    createdAt: Date;
    updatedAt: Date;
  }
  