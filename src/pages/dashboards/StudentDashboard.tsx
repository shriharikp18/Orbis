import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Card, CardHeader, CardTitle, CardContent } from '../../app/components/ui/card';
import { Badge } from '../../app/components/ui/badge';
import { Button } from '../../app/components/ui/button';
import { Calendar, MapPin, Users, Clock, CheckCircle2 } from 'lucide-react';
import { mockEvents, mockEventRegistrations } from '../../utils/mockData';
import { toast } from 'sonner';

export const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  
  const upcomingEvents = mockEvents.filter(e => e.status === 'APPROVED');
  const myRegistrations = mockEventRegistrations.filter(r => r.studentId === user?.id);

  const handleRegister = (eventId: string, eventTitle: string) => {
    toast.success(`Successfully registered for ${eventTitle}`);
  };

  const isRegistered = (eventId: string) => {
    return myRegistrations.some(r => r.eventId === eventId);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1>Student Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back, {user?.name}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Upcoming Events</p>
                <p className="text-3xl font-semibold mt-1">{upcomingEvents.length}</p>
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
                <p className="text-sm text-gray-600">My Registrations</p>
                <p className="text-3xl font-semibold mt-1">{myRegistrations.length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Events Attended</p>
                <p className="text-3xl font-semibold mt-1">
                  {myRegistrations.filter(r => r.attended).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* My Registrations */}
      {myRegistrations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>My Registered Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {myRegistrations.map((registration) => {
                const event = mockEvents.find(e => e.id === registration.eventId);
                if (!event) return null;

                return (
                  <div key={registration.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{event.title}</h3>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(event.eventDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {event.eventTime}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {event.venue}
                        </div>
                      </div>
                    </div>
                    <Badge className={registration.attended ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}>
                      {registration.attended ? 'Attended' : 'Registered'}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upcoming Events */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Approved Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-gray-900">{event.title}</h3>
                      <Badge className="bg-blue-100 text-blue-700">{event.category}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{event.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span>{new Date(event.eventDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span>{event.eventTime}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span>{event.venue}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="w-4 h-4 text-gray-500" />
                        <span>{event.expectedAttendees} attendees</span>
                      </div>
                    </div>

                    <div className="mt-3 text-sm text-gray-600">
                      <strong>Organized by:</strong> {event.clubName}
                    </div>
                  </div>

                  <div className="ml-4">
                    {isRegistered(event.id) ? (
                      <Badge className="bg-green-100 text-green-700">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Registered
                      </Badge>
                    ) : (
                      <Button 
                        size="sm"
                        onClick={() => handleRegister(event.id, event.title)}
                      >
                        Register
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {upcomingEvents.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No upcoming events at the moment
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};