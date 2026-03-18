import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { PERMISSION_REQUESTS } from '@/data/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Check, X } from 'lucide-react';
import type { PermissionRequest } from '@/data/mockData';

const Permissions = () => {
  const { user } = useAuth();
  const [permissions, setPermissions] = useState(PERMISSION_REQUESTS);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ date: '', fromTime: '', toTime: '', reason: '' });

  const isEmployee = user?.role === 'employee';
  const isManager = user?.role === 'manager';
  const displayPerms = isEmployee ? permissions.filter(p => p.employeeId === user?.id) : permissions;

  const statusClass: Record<string, string> = {
    pending: 'status-pending border',
    approved: 'status-approved border',
    rejected: 'status-rejected border',
  };

  const handleApply = () => {
    if (!form.date || !form.fromTime || !form.toTime || !form.reason) return;
    const fromH = parseInt(form.fromTime.split(':')[0]) + parseInt(form.fromTime.split(':')[1]) / 60;
    const toH = parseInt(form.toTime.split(':')[0]) + parseInt(form.toTime.split(':')[1]) / 60;
    const hours = Math.round((toH - fromH) * 100) / 100;

    const req: PermissionRequest = {
      id: String(permissions.length + 1),
      employeeId: user!.id,
      employeeName: user!.name,
      date: form.date,
      fromTime: form.fromTime,
      toTime: form.toTime,
      hours,
      reason: form.reason,
      status: 'pending',
      appliedOn: '2026-03-02',
    };
    setPermissions(prev => [req, ...prev]);
    setForm({ date: '', fromTime: '', toTime: '', reason: '' });
    setOpen(false);
  };

  const handleAction = (id: string, status: 'approved' | 'rejected') => {
    setPermissions(prev => prev.map(p => p.id === id ? { ...p, status } : p));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold">Permission Requests</h1>
          <p className="text-muted-foreground mt-1">{isEmployee ? 'Request and track permissions' : 'Manage permission requests'}</p>
        </div>
        {isEmployee && (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button><Plus className="w-4 h-4 mr-2" /> Request Permission</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Request Permission</DialogTitle></DialogHeader>
              <div className="space-y-4 pt-2">
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input type="date" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>From</Label>
                    <Input type="time" value={form.fromTime} onChange={e => setForm(p => ({ ...p, fromTime: e.target.value }))} />
                  </div>
                  <div className="space-y-2">
                    <Label>To</Label>
                    <Input type="time" value={form.toTime} onChange={e => setForm(p => ({ ...p, toTime: e.target.value }))} />
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
                <TableHead>Date</TableHead>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Hours</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Status</TableHead>
                {(isManager || user?.role === 'admin') && <TableHead className="w-24">Action</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayPerms.map(perm => (
                <TableRow key={perm.id}>
                  {!isEmployee && <TableCell className="font-medium">{perm.employeeName}</TableCell>}
                  <TableCell>{perm.date}</TableCell>
                  <TableCell>{perm.fromTime}</TableCell>
                  <TableCell>{perm.toTime}</TableCell>
                  <TableCell>{perm.hours}h</TableCell>
                  <TableCell className="max-w-[200px] truncate">{perm.reason}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusClass[perm.status]}>{perm.status}</Badge>
                  </TableCell>
                  {(isManager || user?.role === 'admin') && (
                    <TableCell>
                      {perm.status === 'pending' && (
                        <div className="flex gap-1">
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-success hover:text-success" onClick={() => handleAction(perm.id, 'approved')}>
                            <Check className="w-4 h-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => handleAction(perm.id, 'rejected')}>
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

export default Permissions;
