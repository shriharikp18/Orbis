import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../app/components/ui/button';
import { 
  LogOut, 
  Home, 
  Calendar, 
  Users, 
  Settings, 
  BarChart3,
  UserCog,
  ClipboardList,
  CheckCircle2,
  FileText
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getNavItems = () => {
    const basePath = user?.role ? `/${user.role.replace('_', '-')}` : '/';
    
    const commonItems = [
      { path: basePath, icon: Home, label: 'Dashboard' }
    ];

    const roleSpecificItems: Record<string, any[]> = {
      admin: [
        { path: `${basePath}/users`, icon: Users, label: 'Manage Users' },
        { path: `${basePath}/events`, icon: Calendar, label: 'All Events' },
        { path: `${basePath}/clubs`, icon: UserCog, label: 'Manage Clubs' },
        { path: `${basePath}/audit-logs`, icon: FileText, label: 'Audit Logs' },
        { path: `${basePath}/analytics`, icon: BarChart3, label: 'Analytics' }
      ],
      student: [
        { path: `${basePath}/events`, icon: Calendar, label: 'Browse Events' },
        { path: `${basePath}/my-registrations`, icon: ClipboardList, label: 'My Registrations' }
      ],
      club_head: [
        { path: `${basePath}/my-events`, icon: Calendar, label: 'My Events' },
        { path: `${basePath}/create-event`, icon: FileText, label: 'Create Event' },
        { path: `${basePath}/club`, icon: Users, label: 'Club Management' }
      ],
      event_organizer: [
        { path: `${basePath}/pending-verification`, icon: ClipboardList, label: 'Pending Verification' },
        { path: `${basePath}/all-events`, icon: Calendar, label: 'All Events' }
      ],
      authority: [
        { path: `${basePath}/pending-approvals`, icon: CheckCircle2, label: 'Pending Approvals' },
        { path: `${basePath}/approved-events`, icon: Calendar, label: 'Approved Events' },
        { path: `${basePath}/history`, icon: FileText, label: 'Decision History' }
      ],
      volunteer: [
        { path: `${basePath}/my-assignments`, icon: ClipboardList, label: 'My Assignments' },
        { path: `${basePath}/available-events`, icon: Calendar, label: 'Available Events' }
      ]
    };

    return [
      ...commonItems,
      ...(user?.role ? roleSpecificItems[user.role] || [] : [])
    ];
  };

  const getRoleDisplay = (role: string) => {
    const roleMap: Record<string, string> = {
      admin: 'Administrator',
      student: 'Student',
      club_head: 'Club Head',
      event_organizer: 'Event Organizer',
      authority: 'Authority',
      volunteer: 'Volunteer'
    };
    return roleMap[role] || role;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-semibold text-gray-900">College Event Management</h1>
                {user && (
                  <p className="text-xs text-gray-500">{getRoleDisplay(user.role)}</p>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {user && (
                <>
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="flex max-w-7xl mx-auto">
        {/* Sidebar Navigation */}
        {user && (
          <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-4rem)] p-4">
            <nav className="space-y-1">
              {getNavItems().map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </aside>
        )}

        {/* Main Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};