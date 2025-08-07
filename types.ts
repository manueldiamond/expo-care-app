export type ReactChildren = {
  children?: React.ReactNode;
};

export namespace $Enums {
  export enum Role {
    ADMIN = 'admin',
    CAREGIVER = 'caregiver',
    PATIENT = 'patient',
  }
  export enum AuditAction {
    CREATE_USER = 'CREATE_USER',
    UPDATE_USER = 'UPDATE_USER',
    DELETE_USER = 'DELETE_USER',
    APPROVE_CAREGIVER = 'APPROVE_CAREGIVER',
    REJECT_CAREGIVER = 'REJECT_CAREGIVER',
    APPROVE_VERIFICATION = 'APPROVE_VERIFICATION',
    REJECT_VERIFICATION = 'REJECT_VERIFICATION',
    CREATE_ADMIN = 'CREATE_ADMIN',
    ASSIGN_CAREGIVER = 'ASSIGN_CAREGIVER',
    UNASSIGN_CAREGIVER = 'UNASSIGN_CAREGIVER',
    VIEW_USER_INFO = 'VIEW_USER_INFO',
    VIEW_ALL_PATIENTS = 'VIEW_ALL_PATIENTS',
    VIEW_ALL_CAREGIVERS = 'VIEW_ALL_CAREGIVERS',
  }
  export enum VerificationStatus {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
  }
}

export type User = {
  id: number;
  email: string;
  passwordHash?: string | null;
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
  notifications: Notification[];
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
  photo: string;
  status: $Enums.VerificationStatus;
  approvedBy?: number | null;
  approvedAt?: Date | null;
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

export type Notification = {
  id: number;
  user: User;
  userId: number;
  type: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
};
