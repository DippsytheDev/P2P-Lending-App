import type { User } from "../types/user";

export const mockUsers: User[] = [
  {
    id: "1",
    firstName: "Alice",
    lastName: "Johnson",
    email: "alice@example.com",
    role: "Lender",
    idNumber: "NIN123456",
    isActive: true,
  },
  {
    id: "2",
    firstName: "Bob",
    lastName: "Smith",
    email: "bob@example.com",
    role: "Borrower",
    idNumber: "NIN654321",
    isActive: false,
  },
  {
    id: "3",
    firstName: "Admin",
    lastName: "Guy",
    email: "admin@example.com",
    role: "Admin",
    idNumber: "NIN000000",
    isActive: true,
  },
];
