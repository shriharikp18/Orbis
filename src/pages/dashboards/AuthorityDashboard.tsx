import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Card, CardHeader, CardTitle, CardContent } from '../../app/components/ui/card';
import { Badge } from '../../app/components/ui/badge';
import { Button } from '../../app/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../app/components/ui/dialog';
import { Textarea } from '../../app/components/ui/textarea';
import { Label } from '../../app/components/ui/label';
import { CheckCircle2, XCircle, Clock, FileCheck } from 'lucide-react';
import { mockEvents, mockApprovalWorkflows } from '../../utils/mockData';
import { toast } from 'sonner';
import type { EventStatus } from '../../types';

export const AuthorityDashboard: React.FC = () => {
  const { user } = useAuth();
  
  const pendingApprovals = mockEvents.filter(e => e.status === 'VERIFIED');
  const approvedEvents = mockEvents.filter(e => e.status === 'APPROVED');
  const rejectedEvents = mockEvents.filter(e => e.status === 'REJECTED');

  const stats = {
    pendingApprovals: pendingApprovals.length,
    approved: approvedEvents.length,
    rejected: rejectedEvents.length,
    total: approvedEvents.length + rejectedEvents.length
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

  const handleApprove = (eventId: string, eventTitle: string, comment: string) => {
    toast.success(`${eventTitle} approved successfully`);
  };

  const handleReject = (eventId: string, eventTitle: string, reason: string) => {
    toast.error(`${eventTitle} rejected`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1>Authority Dashboard</h1>
        <p className="text-gray-600 mt-1">
          {user?.authorityType} - {user?.department} Department
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Approvals</p>
                <p className="text-3xl font-semibold mt-1">{stats.pendingApprovals}</p>
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
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Rejected</p>
                <p className="text-3xl font-semibold mt-1">{stats.rejected}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Decisions</p>
                <p className="text-3xl font-semibold mt-1">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileCheck className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Approvals */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Pending Approvals ({pendingApprovals.length})</CardTitle>
            <Badge className="bg-yellow-100 text-yellow-700">Action Required</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingApprovals.map((event) => {
              const workflow = mockApprovalWorkflows.find(w => w.eventId === event.id);
              
              return (
                <div key={event.id} className="border-2 border-yellow-300 rounded-lg p-4 bg-yellow-50">
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

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3 text-sm">
                        <div>
                          <span className="font-medium text-gray-700">Club:</span>{' '}
                          <span className="text-gray-600">{event.clubName}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Date:</span>{' '}
                          <span className="text-gray-600">{new Date(event.eventDate).toLocaleDateString()}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Venue:</span>{' '}
                          <span className="text-gray-600">{event.venue}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Budget:</span>{' '}
                          <span className="text-gray-600">₹{event.budget.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Attendees:</span>{' '}
                          <span className="text-gray-600">{event.expectedAttendees}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Organizer:</span>{' '}
                          <span className="text-gray-600">{event.creatorName}</span>
                        </div>
                      </div>

                      {/* Workflow Timeline */}
                      {workflow && (
                        <div className="mt-4 p-3 bg-white rounded border border-gray-200">
                          <p className="text-sm font-medium text-gray-700 mb-2">Approval Timeline:</p>
                          <div className="space-y-2 text-sm">
                            {workflow.submittedAt && (
                              <div className="flex items-center gap-2 text-gray-600">
                                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                                <span>Submitted: {new Date(workflow.submittedAt).toLocaleString()}</span>
                              </div>
                            )}
                            {workflow.verifiedAt && (
                              <div className="flex items-center gap-2 text-gray-600">
                                <div className="w-2 h-2 bg-green-500 rounded-full" />
                                <span>Verified by {workflow.verifiedBy}: {new Date(workflow.verifiedAt).toLocaleString()}</span>
                              </div>
                            )}
                          </div>
                          {workflow.comments.length > 0 && (
                            <div className="mt-3 pt-3 border-t border-gray-200">
                              <p className="text-sm font-medium text-gray-700 mb-2">Comments:</p>
                              {workflow.comments.map(comment => (
                                <div key={comment.id} className="text-sm text-gray-600 mb-1">
                                  <strong>{comment.userName}:</strong> {comment.comment}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="ml-4 flex flex-col gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            Approve
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Approve Event</DialogTitle>
                          </DialogHeader>
                          <form onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.currentTarget);
                            handleApprove(event.id, event.title, formData.get('comment') as string);
                          }}>
                            <div className="space-y-4">
                              <div className="p-3 bg-green-50 border border-green-200 rounded">
                                <p className="font-medium text-green-900">{event.title}</p>
                                <p className="text-sm text-green-700 mt-1">
                                  {new Date(event.eventDate).toLocaleDateString()} at {event.venue}
                                </p>
                              </div>
                              <div>
                                <Label htmlFor="approve-comment">Approval Comment (Optional)</Label>
                                <Textarea 
                                  id="approve-comment" 
                                  name="comment" 
                                  placeholder="Add approval notes..."
                                  rows={3}
                                />
                              </div>
                              <div className="flex justify-end gap-2">
                                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                                  Confirm Approval
                                </Button>
                              </div>
                            </div>
                          </form>
                        </DialogContent>
                      </Dialog>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="destructive">
                            <XCircle className="w-4 h-4 mr-2" />
                            Reject
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Reject Event</DialogTitle>
                          </DialogHeader>
                          <form onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.currentTarget);
                            handleReject(event.id, event.title, formData.get('reason') as string);
                          }}>
                            <div className="space-y-4">
                              <div className="p-3 bg-red-50 border border-red-200 rounded">
                                <p className="font-medium text-red-900">{event.title}</p>
                              </div>
                              <div>
                                <Label htmlFor="reject-reason">Rejection Reason *</Label>
                                <Textarea 
                                  id="reject-reason" 
                                  name="reason" 
                                  placeholder="Please provide a clear reason for rejection..."
                                  rows={4}
                                  required
                                />
                              </div>
                              <div className="flex justify-end gap-2">
                                <Button type="submit" variant="destructive">
                                  Confirm Rejection
                                </Button>
                              </div>
                            </div>
                          </form>
                        </DialogContent>
                      </Dialog>

                      <Button size="sm" variant="outline">
                        View Full Details
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}

            {pendingApprovals.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No events pending approval
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recent Decisions */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recently Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {approvedEvents.slice(0, 3).map((event) => (
                <div key={event.id} className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-medium text-gray-900">{event.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {new Date(event.eventDate).toLocaleDateString()} • {event.clubName}
                  </p>
                </div>
              ))}
              {approvedEvents.length === 0 && (
                <p className="text-center py-4 text-gray-500">No approved events</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recently Rejected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {rejectedEvents.slice(0, 3).map((event) => (
                <div key={event.id} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <h4 className="font-medium text-gray-900">{event.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {new Date(event.eventDate).toLocaleDateString()} • {event.clubName}
                  </p>
                </div>
              ))}
              {rejectedEvents.length === 0 && (
                <p className="text-center py-4 text-gray-500">No rejected events</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};