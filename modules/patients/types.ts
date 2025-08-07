import { CaregiverProfile } from "@/types";


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
  onPress?: () => void;
}

export interface PatientHomeData {
  displayName: string;
  pendingActions: PendingAction[];
  quickActions: QuickAction[];
  availableCaregivers: CaregiverProfile[];
} 

type Caregiver = CaregiverProfile;
export { Caregiver };
