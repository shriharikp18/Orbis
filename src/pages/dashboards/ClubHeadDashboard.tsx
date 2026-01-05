import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Card, CardHeader, CardTitle, CardContent } from '../../app/components/ui/card';
import { Badge } from '../../app/components/ui/badge';
import { Button } from '../../app/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../app/components/ui/dialog';
import { Input } from '../../app/components/ui/input';
import { Label } from '../../app/components/ui/label';
import { Textarea } from '../../app/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../app/components/ui/select';
import { Calendar, Plus, FileText, TrendingUp, Clock } from 'lucide-react';
import { mockEvents } from '../../utils/mockData';
import { toast } from 'sonner';
import type { EventStatus } from '../../types';

export const ClubHeadDashboard: React.FC = () => {
  const { user } = useAuth();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  
  const myEvents = mockEvents.filter(e => e.createdBy === user?.id);
  
  const stats = {
    totalEvents: myEvents.length,
    draft: myEvents.filter(e => e.status === 'DRAFT').length,
    pending: myEvents.filter(e => e.status === 'SUBMITTED' || e.status === 'VERIFIED').length,
    approved: myEvents.filter(e => e.status === 'APPROVED').length
  };

  const getStatusColor = (status: EventStatus) => {
    const colors: Record<EventStatus, string> = {
      DRAFT: 'bg-gray-100 text-gray-700',
      SUBMITTED: 'bg-blue-100 text-blue-700',
      VERIFIED: 'bg-yellow-100 text-yellow-700',
      APPROVED: 'bg-green-100 text-green-700',
      REJECTED: 'bg-red-100 text-red-700'
    };
    return colors[status];
  };

  const handleCreateEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const eventData = {
      title: formData.get('title'),
      description: formData.get('description'),
      eventDate: formData.get('eventDate'),
      eventTime: formData.get('eventTime'),
      venue: formData.get('venue'),
      category: formData.get('category'),
      expectedAttendees: formData.get('expectedAttendees'),
      budget: formData.get('budget')
    };
    
    toast.success('Event created successfully!');
    setCreateDialogOpen(false);
    e.currentTarget.reset();
  };

  const handleSubmitForApproval = (eventId: string, eventTitle: string) => {
    toast.success(`${eventTitle} submitted for approval`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Club Head Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage your club events</p>
        </div>
        
        <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Event
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Event</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateEvent} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="title">Event Title *</Label>
                  <Input id="title" name="title" required placeholder="Annual Tech Fest" />
                </div>

                <div className="col-span-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea 
                    id="description" 
                    name="description" 
                    required 
                    placeholder="Detailed event description"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="eventDate">Event Date *</Label>
                  <Input id="eventDate" name="eventDate" type="date" required />
                </div>

                <div>
                  <Label htmlFor="eventTime">Event Time *</Label>
                  <Input id="eventTime" name="eventTime" type="time" required />
                </div>

                <div>
                  <Label htmlFor="venue">Venue *</Label>
                  <Input id="venue" name="venue" required placeholder="Main Auditorium" />
                </div>

                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select name="category" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Technical">Technical</SelectItem>
                      <SelectItem value="Cultural">Cultural</SelectItem>
                      <SelectItem value="Sports">Sports</SelectItem>
                      <SelectItem value="Workshop">Workshop</SelectItem>
                      <SelectItem value="Seminar">Seminar</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="expectedAttendees">Expected Attendees *</Label>
                  <Input 
                    id="expectedAttendees" 
                    name="expectedAttendees" 
                    type="number" 
                    required 
                    placeholder="100"
                  />
                </div>

                <div>
                  <Label htmlFor="budget">Budget (₹) *</Label>
                  <Input 
                    id="budget" 
                    name="budget" 
                    type="number" 
                    required 
                    placeholder="50000"
                  />
                </div>

                <div className="col-span-2">
                  <Label htmlFor="requirements">Requirements</Label>
                  <Textarea 
                    id="requirements" 
                    name="requirements" 
                    placeholder="List all technical and logistical requirements"
                    rows={2}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Create Event</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Events</p>
                <p className="text-3xl font-semibold mt-1">{stats.totalEvents}</p>
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
                <p className="text-sm text-gray-600">Drafts</p>
                <p className="text-3xl font-semibold mt-1">{stats.draft}</p>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-gray-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Approval</p>
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
                <p className="text-sm text-gray-600">Approved</p>
                <p className="text-3xl font-semibold mt-1">{stats.approved}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* My Events */}
      <Card>
        <CardHeader>
          <CardTitle>My Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {myEvents.map((event) => (
              <div key={event.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-gray-900">{event.title}</h3>
                      <Badge className={getStatusColor(event.status)}>
                        {event.status}
                      </Badge>
                      <Badge variant="outline">{event.category}</Badge>
                    </div>
                    
                    <p className="text-sm text-gray-600 mt-2">{event.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3 text-sm text-gray-600">
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
                        <span className="font-medium">Budget:</span> ₹{event.budget.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="ml-4 flex flex-col gap-2">
                    {event.status === 'DRAFT' && (
                      <Button 
                        size="sm"
                        onClick={() => handleSubmitForApproval(event.id, event.title)}
                      >
                        Submit for Approval
                      </Button>
                    )}
                    {event.status === 'REJECTED' && (
                      <Button size="sm" variant="outline">
                        Edit & Resubmit
                      </Button>
                    )}
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            {myEvents.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No events created yet. Click "Create Event" to get started.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};