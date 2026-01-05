import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../app/components/ui/card';
import { Badge } from '../../app/components/ui/badge';
import { Users, Calendar, Shield, TrendingUp, Activity } from 'lucide-react';
import { mockEvents, mockUsers, mockClubs, mockAuditLogs } from '../../utils/mockData';

export const AdminDashboard: React.FC = () => {
  const stats = {
    totalUsers: mockUsers.length,
    totalEvents: mockEvents.length,
    totalClubs: mockClubs.length,
    pendingApprovals: mockEvents.filter(e => e.status === 'SUBMITTED' || e.status === 'VERIFIED').length,
    approvedEvents: mockEvents.filter(e => e.status === 'APPROVED').length,
    recentActivity: mockAuditLogs.slice(0, 5)
  };

  const roleDistribution = mockUsers.reduce((acc, user) => {
    acc[user.role] = (acc[user.role] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      <div>
        <h1>Administrator Dashboard</h1>
        <p className="text-gray-600 mt-1">System overview and management</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-3xl font-semibold mt-1">{stats.totalUsers}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Events</p>
                <p className="text-3xl font-semibold mt-1">{stats.totalEvents}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Clubs</p>
                <p className="text-3xl font-semibold mt-1">{stats.totalClubs}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Approvals</p>
                <p className="text-3xl font-semibold mt-1">{stats.pendingApprovals}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Role Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>User Role Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(roleDistribution).map(([role, count]) => (
                <div key={role} className="flex items-center justify-between">
                  <span className="text-sm capitalize">{role.replace('_', ' ')}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(count / stats.totalUsers) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium w-8 text-right">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent System Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentActivity.map((log) => (
                <div key={log.id} className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Activity className="w-4 h-4 text-gray-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{log.details}</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      by {log.userName} • {new Date(log.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Event Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Event Status Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {['DRAFT', 'SUBMITTED', 'VERIFIED', 'APPROVED', 'REJECTED'].map((status) => {
              const count = mockEvents.filter(e => e.status === status).length;
              const colors: Record<string, string> = {
                DRAFT: 'bg-gray-100 text-gray-700',
                SUBMITTED: 'bg-blue-100 text-blue-700',
                VERIFIED: 'bg-yellow-100 text-yellow-700',
                APPROVED: 'bg-green-100 text-green-700',
                REJECTED: 'bg-red-100 text-red-700'
              };
              
              return (
                <div key={status} className="text-center p-4 bg-gray-50 rounded-lg">
                  <Badge className={colors[status]}>{status}</Badge>
                  <p className="text-2xl font-semibold mt-2">{count}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};