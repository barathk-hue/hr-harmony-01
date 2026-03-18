import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, CalendarDays, Clock, HandMetal, AlertCircle, CheckCircle } from 'lucide-react';
import { EMPLOYEES, LEAVE_REQUESTS, PERMISSION_REQUESTS, TIME_LOGS } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';

const StatCard = ({ title, value, icon: Icon, accent }: { title: string; value: string | number; icon: React.ComponentType<{ className?: string }>; accent?: string }) => (
  <Card className="glass-card">
    <CardContent className="p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-heading font-bold mt-1">{value}</p>
        </div>
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${accent || 'bg-primary/10'}`}>
          <Icon className={`w-5 h-5 ${accent ? 'text-primary-foreground' : 'text-primary'}`} />
        </div>
      </div>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const { user } = useAuth();
  const pendingLeaves = LEAVE_REQUESTS.filter(l => l.status === 'pending');
  const pendingPermissions = PERMISSION_REQUESTS.filter(p => p.status === 'pending');
  const todayLogs = TIME_LOGS.filter(t => t.date === '2026-03-02');

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-heading font-bold">Welcome back, {user?.name?.split(' ')[0]}</h1>
        <p className="text-muted-foreground mt-1">Here's what's happening today</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Employees" value={EMPLOYEES.filter(e => e.status === 'active').length} icon={Users} />
        <StatCard title="Today's Attendance" value={todayLogs.length} icon={Clock} />
        <StatCard title="Pending Leaves" value={pendingLeaves.length} icon={CalendarDays} accent="bg-warning" />
        <StatCard title="Pending Permissions" value={pendingPermissions.length} icon={HandMetal} accent="bg-accent" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-warning" /> Pending Leave Requests
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingLeaves.length === 0 ? (
              <p className="text-sm text-muted-foreground">No pending requests</p>
            ) : pendingLeaves.map(leave => (
              <div key={leave.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                <div>
                  <p className="text-sm font-medium">{leave.employeeName}</p>
                  <p className="text-xs text-muted-foreground">{leave.fromDate} → {leave.toDate} · {leave.days} day(s)</p>
                </div>
                <Badge variant="outline" className="status-pending border">{leave.type}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-success" /> Today's Time Logs
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {todayLogs.length === 0 ? (
              <p className="text-sm text-muted-foreground">No logs for today</p>
            ) : todayLogs.map(log => (
              <div key={log.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                <div>
                  <p className="text-sm font-medium">{log.employeeName}</p>
                  <p className="text-xs text-muted-foreground">{log.checkIn} - {log.checkOut}</p>
                </div>
                <Badge variant="outline">{log.totalHours}h</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
