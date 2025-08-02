export type ReactChildren = {
	children?: React.ReactNode;
}

export namespace $Enums {
  export enum Role {
    ADMIN = 'admin',
    CAREGIVER = 'caregiver',
    PATIENT = 'patient',
  }
}

export type User = {
  id: number;
  email: string;
  fullname: string;
  role: $Enums.Role;
  photoUrl?: string | null;
  contact?: string | null;
  dateOfBirth?: Date | null;
  location?: string | null;
  isAvailable?: boolean;
  createdAt: Date;
  updatedAt: Date;
  admin?: Admin | null;
  caregiver?: Caregiver | null;
  patient?: Patient | null;
};

export type Admin = {
  id: number;
  user: User;
  userId: number;
  // Add admin-specific fields here
};

export type Caregiver = {
  id: number;
  user: User;
  userId: number;
  // Add caregiver-specific fields here
};

export type Patient = {
  id: number;
  user: User;
  userId: number;
  // Add patient-specific fields here
};
