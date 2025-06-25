export interface User {
  id: string; 
  firstName: string;
  lastName: string;
  email: string;
  role: "Lender" | "Borrower" | "Admin";
  idNumber?: string;
  isActive: boolean;
}