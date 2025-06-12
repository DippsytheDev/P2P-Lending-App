import type { User } from "../types/user";

export const mockUsers: User[] = [
  {
    fullName: "Alice Johnson",
    email: "alice@example.com",
    role: "lender",
    idNumber: "NIN123456",
    isActive: true,
  },
  {
    fullName: "Bob Smith",
    email: "bob@example.com",
    role: "borrower",
    idNumber: "NIN654321",
    isActive: false,
  },
  {
    fullName: "Admin Guy",
    email: "admin@example.com",
    role: "admin",
    idNumber: "NIN000000",
    isActive: true,
  },
];