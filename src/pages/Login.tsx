import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Users, User } from 'lucide-react';

const LOGIN_HINTS = [
  { email: 'priya@company.com', role: 'HR Admin', icon: Shield, description: 'Full system access, manage policies & employees' },
  { email: 'rajesh@company.com', role: 'Reporting Manager', icon: Users, description: 'Approve leaves & permissions for your team' },
  { email: 'anita@company.com', role: 'Employee', icon: User, description: 'Apply for leaves, permissions & log time' },
];

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!login(email, password)) {
      setError('Invalid credentials. Use one of the demo accounts below.');
    }
  };

  const quickLogin = (demoEmail: string) => {
    login(demoEmail, 'demo');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6 animate-fade-in">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 mb-2">
            <Shield className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-3xl font-heading font-bold text-foreground">HR Portal</h1>
          <p className="text-muted-foreground">Employee Management System</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Sign In</CardTitle>
            <CardDescription>Enter your credentials or use a demo account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Username</Label>
                <Input id="email" type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@company.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Any password" />
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button type="submit" className="w-full">Sign In</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Quick Demo Access</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {LOGIN_HINTS.map(hint => (
              <button
                key={hint.email}
                onClick={() => quickLogin(hint.email)}
                className="w-full flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-secondary/50 transition-colors text-left"
              >
                <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10">
                  <hint.icon className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{hint.role}</p>
                  <p className="text-xs text-muted-foreground truncate">{hint.description}</p>
                </div>
              </button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
