import { UserRole } from "../constant/auth-enum";

export interface AuthResponse {
  userToken: string;       
  correlationId: string;  
}
export interface User {
  entityControllerId: number;
  email: string;
  niTOPLUSRole: number;
  userRole: UserRole;
  firstName: string;
  lastName: string;
  countryCode: string;
  phoneNumber: string;
  photo: string;
  userId: string;
}

