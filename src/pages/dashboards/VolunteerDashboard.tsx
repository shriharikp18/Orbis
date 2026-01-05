import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Card, CardHeader, CardTitle, CardContent } from '../../app/components/ui/card';
import { Badge } from '../../app/components/ui/badge';
import { Button } from '../../app/components/ui/button';
import { ClipboardList, CheckCircle2, Clock, Calendar } from 'lucide-react';
import { mockVolunteerAssignments, mockEvents } from '../../utils/mockData';
import { toast } from 'sonner';

export const VolunteerDashboard: React.FC = () => {
  const { user } = useAuth();
  
  const myAssignments = mockVolunteerAssignments.filter(a => a.volunteerId === user?.id);
  
  const stats = {
    total: myAssignments.length,
    pending: myAssignments.filter(a => a.status === 'pending').length,
    accepted: myAssignments.filter(a => a.status === 'accepted').length,
    completed: myAssignments.filter(a => a.status === 'completed').length
  };

  const handleAccept = (assignmentId: string, task: string) => {
    toast.success(`Accepted assignment: ${task}`);
  };

  const handleComplete = (assignmentId: string, task: string) => {
    toast.success(`Marked ${task} as completed`);
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-700',
      accepted: 'bg-blue-100 text-blue-700',
      completed: 'bg-green-100 text-green-700'
    };
    return colors[status];
  };

  return (
    <div className="space-y-6">
      <div>
        <h1>Volunteer Dashboard</h1>
        <p className="text-gray-600 mt-1">Manage your event assignments</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Assignments</p>
                <p className="text-3xl font-semibold mt-1">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <ClipboardList className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-3xl font-semibold mt-1">{stats.pending}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Accepted</p>
                <p className="text-3xl font-semibold mt-1">{stats.accepted}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-3xl font-semibold mt-1">{stats.completed}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Assignments */}
      {myAssignments.filter(a => a.status === 'pending').length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Pending Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {myAssignments
                .filter(a => a.status === 'pending')
                .map((assignment) => {
                  const event = mockEvents.find(e => e.id === assignment.eventId);
                  
                  return (
                    <div key={assignment.id} className="border-2 border-yellow-300 rounded-lg p-4 bg-yellow-50">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium text-gray-900">{assignment.eventTitle}</h3>
                            <Badge className={getStatusColor(assignment.status)}>
                              {assignment.status.toUpperCase()}
                            </Badge>
                          </div>
                          
                          <div className="mt-2 p-3 bg-white rounded border border-gray-200">
                            <p className="text-sm font-medium text-gray-700">Task Assigned:</p>
                            <p className="text-sm text-gray-900 mt-1">{assignment.task}</p>
                          </div>

                          {event && (
                            <div className="grid grid-cols-2 gap-3 mt-3 text-sm text-gray-600">
                              <div>
                                <span className="font-medium">Date:</span> {new Date(event.eventDate).toLocaleDateString()}
                              </div>
                              <div>
                                <span className="font-medium">Time:</span> {event.eventTime}
                              </div>
                              <div>
                                <span className="font-medium">Venue:</span> {event.venue}
                              </div>
                              <div>
                                <span className="font-medium">Assigned:</span> {new Date(assignment.assignedAt).toLocaleDateString()}
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="ml-4">
                          <Button 
                            size="sm"
                            onClick={() => handleAccept(assignment.id, assignment.task)}
                          >
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            Accept
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Accepted Assignments */}
      {myAssignments.filter(a => a.status === 'accepted').length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Accepted Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {myAssignments
                .filter(a => a.status === 'accepted')
                .map((assignment) => {
                  const event = mockEvents.find(e => e.id === assignment.eventId);
                  
                  return (
                    <div key={assignment.id} className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium text-gray-900">{assignment.eventTitle}</h3>
                            <Badge className={getStatusColor(assignment.status)}>
                              {assignment.status.toUpperCase()}
                            </Badge>
                          </div>
                          
                          <p className="text-sm text-gray-700 mt-2">
                            <strong>Task:</strong> {assignment.task}
                          </p>

                          {event && (
                            <div className="grid grid-cols-2 gap-3 mt-3 text-sm text-gray-600">
                              <div>
                                <span className="font-medium">Date:</span> {new Date(event.eventDate).toLocaleDateString()}
                              </div>
                              <div>
                                <span className="font-medium">Venue:</span> {event.venue}
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="ml-4">
                          <Button 
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleComplete(assignment.id, assignment.task)}
                          >
                            Mark Complete
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Completed Assignments */}
      {myAssignments.filter(a => a.status === 'completed').length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Completed Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {myAssignments
                .filter(a => a.status === 'completed')
                .map((assignment) => (
                  <div key={assignment.id} className="border border-green-200 rounded-lg p-4 bg-green-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-gray-900">{assignment.eventTitle}</h3>
                          <Badge className={getStatusColor(assignment.status)}>
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            COMPLETED
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-700 mt-1">
                          <strong>Task:</strong> {assignment.task}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}

      {myAssignments.length === 0 && (
        <Card>
          <CardContent className="py-12">
            <div className="text-center text-gray-500">
              <ClipboardList className="w-12 h-12 mx-auto mb-3 text-gray-400" />
              <p>No assignments yet</p>
              <p className="text-sm mt-1">You'll receive assignments when events are scheduled</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};