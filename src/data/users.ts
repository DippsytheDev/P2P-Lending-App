import type { User } from "../types/user";

export const mockUsers: User[] = [
  {
    firstName: "Alice",
    lastName: "Johnson",
    email: "alice@example.com",
    role: "Lender",
    idNumber: "NIN123456",
    isActive: true,
  },
  {
    firstName: "Bob",
    lastName: "Smith",
    email: "bob@example.com",
    role: "Borrower",
    idNumber: "NIN654321",
    isActive: false,
  },
  {
    firstName: "Admin",
    lastName: "Guy",
    email: "admin@example.com",
    role: "Admin",
    idNumber: "NIN000000",
    isActive: true,
  },
]