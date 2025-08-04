export interface Caregiver {
  id: string;
  name: string;
  specialization: string;
  rating: number;
  experience: string;
  photoUrl: string;
  isAvailable: boolean;
  hourlyRate: string;
  location: string;
  verified?: boolean;
}

export interface PendingAction {
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  icon: string;
  route: string;
  color: string;
}

export interface QuickAction {
  title: string;
  icon: string;
  route: string;
  color: string;
}

export interface PatientHomeData {
  displayName: string;
  pendingActions: PendingAction[];
  quickActions: QuickAction[];
  availableCaregivers: Caregiver[];
} 