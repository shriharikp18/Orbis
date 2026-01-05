// Type definitions for the College Event Management System

export type UserRole = 
  | 'admin' 
  | 'student' 
  | 'club_head' 
  | 'event_organizer' 
  | 'authority' 
  | 'volunteer';

export type EventStatus = 
  | 'DRAFT' 
  | 'SUBMITTED' 
  | 'VERIFIED' 
  | 'APPROVED' 
  | 'REJECTED';

export type AuthorityType = 'HOD' | 'PRINCIPAL' | 'DEAN';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  department?: string;
  authorityType?: AuthorityType;
  clubName?: string;
  createdAt: string;
}

export interface Club {
  id: string;
  name: string;
  description: string;
  headId: string;
  headName: string;
  department: string;
  memberCount: number;
  createdAt: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  clubId: string;
  clubName: string;
  createdBy: string;
  creatorName: string;
  eventDate: string;
  eventTime: string;
  venue: string;
  expectedAttendees: number;
  budget: number;
  status: EventStatus;
  category: string;
  requirements: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApprovalWorkflow {
  id: string;
  eventId: string;
  status: EventStatus;
  submittedAt?: string;
  verifiedAt?: string;
  verifiedBy?: string;
  approvedAt?: string;
  approvedBy?: string;
  rejectedAt?: string;
  rejectedBy?: string;
  rejectionReason?: string;
  comments: WorkflowComment[];
}

export interface WorkflowComment {
  id: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  comment: string;
  timestamp: string;
}

export interface VolunteerAssignment {
  id: string;
  eventId: string;
  eventTitle: string;
  volunteerId: string;
  volunteerName: string;
  task: string;
  status: 'pending' | 'accepted' | 'completed';
  assignedAt: string;
}

export interface EventRegistration {
  id: string;
  eventId: string;
  eventTitle: string;
  studentId: string;
  studentName: string;
  registeredAt: string;
  attended: boolean;
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  action: string;
  entityType: 'event' | 'user' | 'club' | 'approval';
  entityId: string;
  details: string;
  timestamp: string;
  ipAddress?: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export interface DashboardStats {
  totalEvents?: number;
  pendingApprovals?: number;
  approvedEvents?: number;
  rejectedEvents?: number;
  totalStudents?: number;
  totalClubs?: number;
  myRegistrations?: number;
  assignedTasks?: number;
  completedTasks?: number;
}
