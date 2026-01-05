import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../app/components/ui/button';
import { Input } from '../app/components/ui/input';
import { Label } from '../app/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../app/components/ui/card';
import { Alert, AlertDescription } from '../app/components/ui/alert';
import { Calendar, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      toast.success('Login successful!');
      
      // Navigate based on role (will be handled by App routing)
      navigate('/');
    } catch (err) {
      setError('Invalid email or password');
      toast.error('Login failed');
    } finally {
      setLoading(false);
    }
  };

  const demoAccounts = [
    { email: 'admin@college.edu', role: 'Administrator' },
    { email: 'student@college.edu', role: 'Student' },
    { email: 'clubhead@college.edu', role: 'Club Head' },
    { email: 'organizer@college.edu', role: 'Event Organizer' },
    { email: 'hod@college.edu', role: 'Authority (HOD)' },
    { email: 'volunteer@college.edu', role: 'Volunteer' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8">
        {/* Login Form */}
        <Card className="w-full">
          <CardHeader className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <Calendar className="w-7 h-7 text-white" />
              </div>
              <div>
                <CardTitle>College Event Management</CardTitle>
                <CardDescription>Digital Permission Workflow System</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@college.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Demo Accounts */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Demo Accounts</CardTitle>
            <CardDescription>
              Use these credentials to test different roles
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm font-medium text-blue-900">
                Password for all accounts: <code className="bg-blue-100 px-2 py-1 rounded">password123</code>
              </p>
            </div>

            <div className="space-y-2">
              {demoAccounts.map((account) => (
                <button
                  key={account.email}
                  onClick={() => {
                    setEmail(account.email);
                    setPassword('password123');
                  }}
                  className="w-full text-left p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <p className="text-sm font-medium text-gray-900">{account.role}</p>
                  <p className="text-xs text-gray-500">{account.email}</p>
                </button>
              ))}
            </div>

            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-xs text-yellow-800">
                <strong>Note:</strong> This is a frontend demonstration with mock authentication. 
                In production, integrate with your Express.js backend API with JWT + bcrypt.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};