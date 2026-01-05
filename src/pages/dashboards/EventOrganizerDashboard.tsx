import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../app/components/ui/card';
import { Badge } from '../../app/components/ui/badge';
import { Button } from '../../app/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../app/components/ui/dialog';
import { Textarea } from '../../app/components/ui/textarea';
import { Label } from '../../app/components/ui/label';
import { ClipboardCheck, Calendar, CheckCircle2, AlertCircle } from 'lucide-react';
import { mockEvents, mockApprovalWorkflows } from '../../utils/mockData';
import { toast } from 'sonner';
import type { EventStatus } from '../../types';

export const EventOrganizerDashboard: React.FC = () => {
  const pendingVerification = mockEvents.filter(e => e.status === 'SUBMITTED');
  const verified = mockEvents.filter(e => e.status === 'VERIFIED');
  const allEvents = mockEvents.filter(e => e.status !== 'DRAFT');

  const stats = {
    pendingVerification: pendingVerification.length,
    verified: verified.length,
    totalProcessed: allEvents.length
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

  const handleVerify = (eventId: string, eventTitle: string, comment: string) => {
    toast.success(`${eventTitle} verified successfully`);
  };

  const handleReject = (eventId: string, eventTitle: string, reason: string) => {
    toast.error(`${eventTitle} sent back for revision`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1>Event Organizer Dashboard</h1>
        <p className="text-gray-600 mt-1">Verify event details and manage submissions</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Verification</p>
                <p className="text-3xl font-semibold mt-1">{stats.pendingVerification}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <ClipboardCheck className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Verified Events</p>
                <p className="text-3xl font-semibold mt-1">{stats.verified}</p>
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
                <p className="text-sm text-gray-600">Total Processed</p>
                <p className="text-3xl font-semibold mt-1">{stats.totalProcessed}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Verification */}
      <Card>
        <CardHeader>
          <CardTitle>Pending Verification ({pendingVerification.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingVerification.map((event) => {
              const workflow = mockApprovalWorkflows.find(w => w.eventId === event.id);
              
              return (
                <div key={event.id} className="border-2 border-blue-200 rounded-lg p-4 bg-blue-50">
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

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3 text-sm">
                        <div>
                          <span className="font-medium text-gray-700">Club:</span>{' '}
                          <span className="text-gray-600">{event.clubName}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Date:</span>{' '}
                          <span className="text-gray-600">{new Date(event.eventDate).toLocaleDateString()}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Time:</span>{' '}
                          <span className="text-gray-600">{event.eventTime}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Venue:</span>{' '}
                          <span className="text-gray-600">{event.venue}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Attendees:</span>{' '}
                          <span className="text-gray-600">{event.expectedAttendees}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Budget:</span>{' '}
                          <span className="text-gray-600">₹{event.budget.toLocaleString()}</span>
                        </div>
                      </div>

                      {event.requirements && (
                        <div className="mt-3 p-3 bg-white rounded border border-gray-200">
                          <p className="text-sm font-medium text-gray-700">Requirements:</p>
                          <p className="text-sm text-gray-600 mt-1">{event.requirements}</p>
                        </div>
                      )}

                      {workflow && workflow.submittedAt && (
                        <p className="text-xs text-gray-500 mt-3">
                          Submitted: {new Date(workflow.submittedAt).toLocaleString()}
                        </p>
                      )}
                    </div>

                    <div className="ml-4 flex flex-col gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            Verify
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Verify Event</DialogTitle>
                          </DialogHeader>
                          <form onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.currentTarget);
                            handleVerify(event.id, event.title, formData.get('comment') as string);
                          }}>
                            <div className="space-y-4">
                              <div>
                                <Label>Event: {event.title}</Label>
                              </div>
                              <div>
                                <Label htmlFor="comment">Verification Comment</Label>
                                <Textarea 
                                  id="comment" 
                                  name="comment" 
                                  placeholder="Add verification notes..."
                                  rows={3}
                                />
                              </div>
                              <div className="flex justify-end gap-2">
                                <Button type="submit">Confirm Verification</Button>
                              </div>
                            </div>
                          </form>
                        </DialogContent>
                      </Dialog>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline">
                            <AlertCircle className="w-4 h-4 mr-2" />
                            Send Back
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Send Back for Revision</DialogTitle>
                          </DialogHeader>
                          <form onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.currentTarget);
                            handleReject(event.id, event.title, formData.get('reason') as string);
                          }}>
                            <div className="space-y-4">
                              <div>
                                <Label>Event: {event.title}</Label>
                              </div>
                              <div>
                                <Label htmlFor="reason">Reason for Revision</Label>
                                <Textarea 
                                  id="reason" 
                                  name="reason" 
                                  placeholder="Specify what needs to be corrected..."
                                  rows={3}
                                  required
                                />
                              </div>
                              <div className="flex justify-end gap-2">
                                <Button type="submit" variant="destructive">Send Back</Button>
                              </div>
                            </div>
                          </form>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </div>
              );
            })}

            {pendingVerification.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No events pending verification
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Verified Events Awaiting Authority Approval */}
      <Card>
        <CardHeader>
          <CardTitle>Verified - Awaiting Authority Approval ({verified.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {verified.map((event) => (
              <div key={event.id} className="border border-gray-200 rounded-lg p-4 bg-yellow-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-gray-900">{event.title}</h3>
                      <Badge className={getStatusColor(event.status)}>
                        {event.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-3 mt-2 text-sm text-gray-600">
                      <div>{new Date(event.eventDate).toLocaleDateString()}</div>
                      <div>{event.venue}</div>
                      <div>₹{event.budget.toLocaleString()}</div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">View Details</Button>
                </div>
              </div>
            ))}

            {verified.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No verified events awaiting approval
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};