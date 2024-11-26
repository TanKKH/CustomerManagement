export interface CustomerProfile {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: Date;
    address?: string;
  }