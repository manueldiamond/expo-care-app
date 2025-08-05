export type ReactChildren = {
	children?: React.ReactNode;
}

export namespace $Enums {
  export enum Role {
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
  createdAt: Date;
  updatedAt: Date;
  caregiver?: CaregiverProfile | null;
  patient?: Patient | null;
};

export type CaregiverProfile = {
  id: number;
  user: User;
  userId: number;
  type?: string | null;
  isVerified: boolean;
  isActive: boolean;
  isAvailable: boolean;
  schedule?: string | null;
  bio?: string | null;
  educationLevel?: string | null;
  verification?: Verification | null;
  qualifications: Qualification[];
  assignments: Assignment[];
};

export type Qualification = {
  id: number;
  caregiverProfile: CaregiverProfile;
  caregiverProfileId: number;
  title: string;
  fileURL: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Verification = {
  id: number;
  caregiverProfile: CaregiverProfile;
  caregiverProfileId: number;
  documentType: string;
  document: string;
  photo:string;
  isRejected: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type Patient = {
  id: number;
  user: User;
  userId: number;
  medicalHistory?: string | null;
  condition: string;
  years: string;
  schedule: string;
  description?: string | null;
  special?: string | null;
  assignments: Assignment[];
};

export type Assignment = {
  id: number;
  patient: Patient;
  patientId: number;
  caregiver: CaregiverProfile;
  caregiverId: number;
  assignedBy: number;
  assignedAt: Date;
  status: string;
  notes?: string | null;
  createdAt: Date;
  updatedAt: Date;
};
