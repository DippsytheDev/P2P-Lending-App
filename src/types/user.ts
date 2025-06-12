export interface User {
    fullName: string;
    email: string;
    role: "lender" | "borrower" | "admin";
    idNumber?: string;
    isActive: boolean;
  }