import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { LEAVE_REQUESTS } from '@/data/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Check, X } from 'lucide-react';
import type { LeaveRequest } from '@/data/mockData';

const Leaves = () => {
  const { user } = useAuth();
  const [leaves, setLeaves] = useState(LEAVE_REQUESTS);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ type: '' as LeaveRequest['type'], fromDate: '', toDate: '', reason: '' });

  const isEmployee = user?.role === 'employee';
  const isManager = user?.role === 'manager';
  const displayLeaves = isEmployee ? leaves.filter(l => l.employeeId === user?.id) : leaves;

  const statusClass: Record<string, string> = {
    pending: 'status-pending border',
    approved: 'status-approved border',
    rejected: 'status-rejected border',
  };

  const handleApply = () => {
    if (!form.type || !form.fromDate || !form.toDate || !form.reason) return;
    const from = new Date(form.fromDate);
    const to = new Date(form.toDate);
    const days = Math.ceil((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    const req: LeaveRequest = {
      id: String(leaves.length + 1),
      employeeId: user!.id,
      employeeName: user!.name,
      type: form.type,
      fromDate: form.fromDate,
      toDate: form.toDate,
      days,
      reason: form.reason,
      status: 'pending',
      appliedOn: '2026-03-02',
    };
    setLeaves(prev => [req, ...prev]);
    setForm({ type: '' as LeaveRequest['type'], fromDate: '', toDate: '', reason: '' });
    setOpen(false);
  };

  const handleAction = (id: string, status: 'approved' | 'rejected') => {
    setLeaves(prev => prev.map(l => l.id === id ? { ...l, status } : l));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold">Leave Requests</h1>
          <p className="text-muted-foreground mt-1">{isEmployee ? 'Apply and track your leaves' : 'Manage leave requests'}</p>
        </div>
        {isEmployee && (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button><Plus className="w-4 h-4 mr-2" /> Apply Leave</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Apply for Leave</DialogTitle></DialogHeader>
              <div className="space-y-4 pt-2">
                <div className="space-y-2">
                  <Label>Leave Type</Label>
                  <Select value={form.type} onValueChange={(v) => setForm(p => ({ ...p, type: v as LeaveRequest['type'] }))}>
                    <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="casual">Casual Leave</SelectItem>
                      <SelectItem value="sick">Sick Leave</SelectItem>
                      <SelectItem value="earned">Earned Leave</SelectItem>
                      <SelectItem value="maternity">Maternity Leave</SelectItem>
                      <SelectItem value="paternity">Paternity Leave</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>From</Label>
                    <Input type="date" value={form.fromDate} onChange={e => setForm(p => ({ ...p, fromDate: e.target.value }))} />
                  </div>
                  <div className="space-y-2">
                    <Label>To</Label>
                    <Input type="date" value={form.toDate} onChange={e => setForm(p => ({ ...p, toDate: e.target.value }))} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Reason</Label>
                  <Textarea value={form.reason} onChange={e => setForm(p => ({ ...p, reason: e.target.value }))} placeholder="Describe your reason..." />
                </div>
                <Button onClick={handleApply} className="w-full">Submit</Button>
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
                <TableHead>Type</TableHead>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Days</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Status</TableHead>
                {(isManager || user?.role === 'admin') && <TableHead className="w-24">Action</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayLeaves.map(leave => (
                <TableRow key={leave.id}>
                  {!isEmployee && <TableCell className="font-medium">{leave.employeeName}</TableCell>}
                  <TableCell className="capitalize">{leave.type}</TableCell>
                  <TableCell>{leave.fromDate}</TableCell>
                  <TableCell>{leave.toDate}</TableCell>
                  <TableCell>{leave.days}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{leave.reason}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusClass[leave.status]}>{leave.status}</Badge>
                  </TableCell>
                  {(isManager || user?.role === 'admin') && (
                    <TableCell>
                      {leave.status === 'pending' && (
                        <div className="flex gap-1">
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-success hover:text-success" onClick={() => handleAction(leave.id, 'approved')}>
                            <Check className="w-4 h-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => handleAction(leave.id, 'rejected')}>
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Leaves;
