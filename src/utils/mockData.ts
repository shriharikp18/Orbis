// Mock data for demonstration - Replace with real API calls
import type { 
  User, 
  Event, 
  Club, 
  ApprovalWorkflow, 
  VolunteerAssignment, 
  EventRegistration, 
  AuditLog 
} from '../types';

// Mock Users (password for all: "password123")
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@college.edu',
    name: 'Admin User',
    role: 'admin',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    email: 'student@college.edu',
    name: 'John Student',
    role: 'student',
    department: 'Computer Science',
    createdAt: '2024-01-15T00:00:00Z'
  },
  {
    id: '3',
    email: 'clubhead@college.edu',
    name: 'Sarah Club Head',
    role: 'club_head',
    department: 'Computer Science',
    clubName: 'Tech Club',
    createdAt: '2024-01-10T00:00:00Z'
  },
  {
    id: '4',
    email: 'organizer@college.edu',
    name: 'Mike Organizer',
    role: 'event_organizer',
    department: 'Events',
    createdAt: '2024-01-08T00:00:00Z'
  },
  {
    id: '5',
    email: 'hod@college.edu',
    name: 'Dr. Robert HOD',
    role: 'authority',
    department: 'Computer Science',
    authorityType: 'HOD',
    createdAt: '2024-01-05T00:00:00Z'
  },
  {
    id: '6',
    email: 'volunteer@college.edu',
    name: 'Emma Volunteer',
    role: 'volunteer',
    department: 'Computer Science',
    createdAt: '2024-01-20T00:00:00Z'
  }
];

export const mockClubs: Club[] = [
  {
    id: '1',
    name: 'Tech Club',
    description: 'Technology and Innovation Club',
    headId: '3',
    headName: 'Sarah Club Head',
    department: 'Computer Science',
    memberCount: 45,
    createdAt: '2024-01-10T00:00:00Z'
  },
  {
    id: '2',
    name: 'Cultural Club',
    description: 'Arts and Cultural Activities',
    headId: '7',
    headName: 'Priya Cultural',
    department: 'Arts',
    memberCount: 67,
    createdAt: '2024-01-12T00:00:00Z'
  },
  {
    id: '3',
    name: 'Sports Club',
    description: 'Sports and Athletics',
    headId: '8',
    headName: 'Raj Sports',
    department: 'Physical Education',
    memberCount: 89,
    createdAt: '2024-01-08T00:00:00Z'
  }
];

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Annual Tech Fest 2026',
    description: 'A 3-day technical festival featuring hackathons, workshops, and tech talks',
    clubId: '1',
    clubName: 'Tech Club',
    createdBy: '3',
    creatorName: 'Sarah Club Head',
    eventDate: '2026-02-15',
    eventTime: '09:00',
    venue: 'Main Auditorium',
    expectedAttendees: 500,
    budget: 150000,
    status: 'SUBMITTED',
    category: 'Technical',
    requirements: 'Projector, Sound System, WiFi, Chairs for 500',
    createdAt: '2026-01-03T10:00:00Z',
    updatedAt: '2026-01-04T14:30:00Z'
  },
  {
    id: '2',
    title: 'AI & ML Workshop',
    description: 'Hands-on workshop on Machine Learning fundamentals',
    clubId: '1',
    clubName: 'Tech Club',
    createdBy: '3',
    creatorName: 'Sarah Club Head',
    eventDate: '2026-01-25',
    eventTime: '14:00',
    venue: 'CS Lab 201',
    expectedAttendees: 50,
    budget: 15000,
    status: 'APPROVED',
    category: 'Workshop',
    requirements: 'Computer Lab, Projector',
    createdAt: '2025-12-20T09:00:00Z',
    updatedAt: '2026-01-02T11:00:00Z'
  },
  {
    id: '3',
    title: 'Cultural Night',
    description: 'Annual cultural event with music, dance, and drama performances',
    clubId: '2',
    clubName: 'Cultural Club',
    createdBy: '7',
    creatorName: 'Priya Cultural',
    eventDate: '2026-03-10',
    eventTime: '18:00',
    venue: 'Open Air Theatre',
    expectedAttendees: 800,
    budget: 200000,
    status: 'VERIFIED',
    category: 'Cultural',
    requirements: 'Stage, Lights, Sound System, Security',
    createdAt: '2026-01-01T08:00:00Z',
    updatedAt: '2026-01-05T16:00:00Z'
  },
  {
    id: '4',
    title: 'Blockchain Seminar',
    description: 'Introduction to Blockchain Technology and Cryptocurrency',
    clubId: '1',
    clubName: 'Tech Club',
    createdBy: '3',
    creatorName: 'Sarah Club Head',
    eventDate: '2026-02-05',
    eventTime: '10:00',
    venue: 'Seminar Hall B',
    expectedAttendees: 100,
    budget: 25000,
    status: 'DRAFT',
    category: 'Seminar',
    requirements: 'Projector, Microphone, Seating for 100',
    createdAt: '2026-01-04T12:00:00Z',
    updatedAt: '2026-01-04T12:00:00Z'
  },
  {
    id: '5',
    title: 'Inter-College Cricket Tournament',
    description: '5-day cricket tournament with 8 teams',
    clubId: '3',
    clubName: 'Sports Club',
    createdBy: '8',
    creatorName: 'Raj Sports',
    eventDate: '2026-02-20',
    eventTime: '08:00',
    venue: 'College Cricket Ground',
    expectedAttendees: 1000,
    budget: 180000,
    status: 'REJECTED',
    category: 'Sports',
    requirements: 'Ground maintenance, First aid, Refreshments',
    createdAt: '2025-12-28T10:00:00Z',
    updatedAt: '2026-01-03T15:00:00Z'
  }
];

export const mockApprovalWorkflows: ApprovalWorkflow[] = [
  {
    id: '1',
    eventId: '1',
    status: 'SUBMITTED',
    submittedAt: '2026-01-04T14:30:00Z',
    comments: [
      {
        id: 'c1',
        userId: '3',
        userName: 'Sarah Club Head',
        userRole: 'club_head',
        comment: 'Event submitted for approval. All arrangements are planned.',
        timestamp: '2026-01-04T14:30:00Z'
      }
    ]
  },
  {
    id: '2',
    eventId: '2',
    status: 'APPROVED',
    submittedAt: '2025-12-20T09:30:00Z',
    verifiedAt: '2025-12-22T11:00:00Z',
    verifiedBy: '4',
    approvedAt: '2026-01-02T11:00:00Z',
    approvedBy: '5',
    comments: [
      {
        id: 'c2',
        userId: '4',
        userName: 'Mike Organizer',
        userRole: 'event_organizer',
        comment: 'Event details verified. Venue and resources available.',
        timestamp: '2025-12-22T11:00:00Z'
      },
      {
        id: 'c3',
        userId: '5',
        userName: 'Dr. Robert HOD',
        userRole: 'authority',
        comment: 'Approved. Excellent initiative for students.',
        timestamp: '2026-01-02T11:00:00Z'
      }
    ]
  },
  {
    id: '3',
    eventId: '3',
    status: 'VERIFIED',
    submittedAt: '2026-01-02T10:00:00Z',
    verifiedAt: '2026-01-05T16:00:00Z',
    verifiedBy: '4',
    comments: [
      {
        id: 'c4',
        userId: '4',
        userName: 'Mike Organizer',
        userRole: 'event_organizer',
        comment: 'Verified. Waiting for authority approval.',
        timestamp: '2026-01-05T16:00:00Z'
      }
    ]
  },
  {
    id: '5',
    eventId: '5',
    status: 'REJECTED',
    submittedAt: '2025-12-28T11:00:00Z',
    verifiedAt: '2025-12-30T10:00:00Z',
    verifiedBy: '4',
    rejectedAt: '2026-01-03T15:00:00Z',
    rejectedBy: '5',
    rejectionReason: 'Budget exceeds allocated limit for sports events. Please revise.',
    comments: [
      {
        id: 'c5',
        userId: '5',
        userName: 'Dr. Robert HOD',
        userRole: 'authority',
        comment: 'Budget too high. Please reduce and resubmit.',
        timestamp: '2026-01-03T15:00:00Z'
      }
    ]
  }
];

export const mockVolunteerAssignments: VolunteerAssignment[] = [
  {
    id: '1',
    eventId: '2',
    eventTitle: 'AI & ML Workshop',
    volunteerId: '6',
    volunteerName: 'Emma Volunteer',
    task: 'Registration Desk Management',
    status: 'accepted',
    assignedAt: '2026-01-03T10:00:00Z'
  },
  {
    id: '2',
    eventId: '2',
    eventTitle: 'AI & ML Workshop',
    volunteerId: '6',
    volunteerName: 'Emma Volunteer',
    task: 'Technical Support',
    status: 'completed',
    assignedAt: '2026-01-03T10:30:00Z'
  },
  {
    id: '3',
    eventId: '3',
    eventTitle: 'Cultural Night',
    volunteerId: '6',
    volunteerName: 'Emma Volunteer',
    task: 'Stage Coordination',
    status: 'pending',
    assignedAt: '2026-01-05T12:00:00Z'
  }
];

export const mockEventRegistrations: EventRegistration[] = [
  {
    id: '1',
    eventId: '2',
    eventTitle: 'AI & ML Workshop',
    studentId: '2',
    studentName: 'John Student',
    registeredAt: '2026-01-02T14:00:00Z',
    attended: true
  },
  {
    id: '2',
    eventId: '3',
    eventTitle: 'Cultural Night',
    studentId: '2',
    studentName: 'John Student',
    registeredAt: '2026-01-05T10:00:00Z',
    attended: false
  }
];

export const mockAuditLogs: AuditLog[] = [
  {
    id: '1',
    userId: '3',
    userName: 'Sarah Club Head',
    userRole: 'club_head',
    action: 'CREATE_EVENT',
    entityType: 'event',
    entityId: '1',
    details: 'Created event: Annual Tech Fest 2026',
    timestamp: '2026-01-03T10:00:00Z',
    ipAddress: '192.168.1.10'
  },
  {
    id: '2',
    userId: '3',
    userName: 'Sarah Club Head',
    userRole: 'club_head',
    action: 'SUBMIT_EVENT',
    entityType: 'event',
    entityId: '1',
    details: 'Submitted event for approval: Annual Tech Fest 2026',
    timestamp: '2026-01-04T14:30:00Z',
    ipAddress: '192.168.1.10'
  },
  {
    id: '3',
    userId: '4',
    userName: 'Mike Organizer',
    userRole: 'event_organizer',
    action: 'VERIFY_EVENT',
    entityType: 'event',
    entityId: '2',
    details: 'Verified event: AI & ML Workshop',
    timestamp: '2025-12-22T11:00:00Z',
    ipAddress: '192.168.1.15'
  },
  {
    id: '4',
    userId: '5',
    userName: 'Dr. Robert HOD',
    userRole: 'authority',
    action: 'APPROVE_EVENT',
    entityType: 'event',
    entityId: '2',
    details: 'Approved event: AI & ML Workshop',
    timestamp: '2026-01-02T11:00:00Z',
    ipAddress: '192.168.1.20'
  },
  {
    id: '5',
    userId: '5',
    userName: 'Dr. Robert HOD',
    userRole: 'authority',
    action: 'REJECT_EVENT',
    entityType: 'event',
    entityId: '5',
    details: 'Rejected event: Inter-College Cricket Tournament',
    timestamp: '2026-01-03T15:00:00Z',
    ipAddress: '192.168.1.20'
  }
];

// Helper function to simulate API delay
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
