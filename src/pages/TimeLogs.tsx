import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { TIME_LOGS } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';
import type { TimeLog } from '@/data/mockData';

const TimeLogs = () => {
  const { user } = useAuth();
  const [logs, setLogs] = useState(TIME_LOGS);
  const [open, setOpen] = useState(false);
  const [newLog, setNewLog] = useState({ date: '', checkIn: '', checkOut: '' });

  const isEmployee = user?.role === 'employee';
  const displayLogs = isEmployee ? logs.filter(l => l.employeeId === user?.id) : logs;

  const statusColor: Record<string, string> = {
    present: 'status-approved',
    'half-day': 'status-pending',
    absent: 'status-rejected',
  };

  const handleAddLog = () => {
    if (!newLog.date || !newLog.checkIn || !newLog.checkOut) return;
    const checkInH = parseInt(newLog.checkIn.split(':')[0]) + parseInt(newLog.checkIn.split(':')[1]) / 60;
    const checkOutH = parseInt(newLog.checkOut.split(':')[0]) + parseInt(newLog.checkOut.split(':')[1]) / 60;
    const totalHours = Math.round((checkOutH - checkInH) * 100) / 100;
    const status = totalHours >= 7 ? 'present' : totalHours >= 4 ? 'half-day' : 'absent';

    const log: TimeLog = {
      id: String(logs.length + 1),
      employeeId: user!.id,
      employeeName: user!.name,
      date: newLog.date,
      checkIn: newLog.checkIn,
      checkOut: newLog.checkOut,
      totalHours,
      status: status as TimeLog['status'],
    };
    setLogs(prev => [log, ...prev]);
    setNewLog({ date: '', checkIn: '', checkOut: '' });
    setOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold">Time Logs</h1>
          <p className="text-muted-foreground mt-1">Track attendance and working hours</p>
        </div>
        {isEmployee && (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button><Plus className="w-4 h-4 mr-2" /> Log Time</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Add Time Log</DialogTitle></DialogHeader>
              <div className="space-y-4 pt-2">
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input type="date" value={newLog.date} onChange={e => setNewLog(p => ({ ...p, date: e.target.value }))} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>Check In</Label>
                    <Input type="time" value={newLog.checkIn} onChange={e => setNewLog(p => ({ ...p, checkIn: e.target.value }))} />
                  </div>
                  <div className="space-y-2">
                    <Label>Check Out</Label>
                    <Input type="time" value={newLog.checkOut} onChange={e => setNewLog(p => ({ ...p, checkOut: e.target.value }))} />
                  </div>
                </div>
                <Button onClick={handleAddLog} className="w-full">Submit</Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <Card className="glass-card">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                {!isEmployee && <TableHead>Employee</TableHead>}
                <TableHead>Date</TableHead>
                <TableHead>Check In</TableHead>
                <TableHead>Check Out</TableHead>
                <TableHead>Hours</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayLogs.map(log => (
                <TableRow key={log.id}>
                  {!isEmployee && <TableCell className="font-medium">{log.employeeName}</TableCell>}
                  <TableCell>{log.date}</TableCell>
                  <TableCell>{log.checkIn}</TableCell>
                  <TableCell>{log.checkOut}</TableCell>
                  <TableCell>{log.totalHours}h</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`border ${statusColor[log.status]}`}>{log.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default TimeLogs;
