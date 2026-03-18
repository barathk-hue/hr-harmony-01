import { useState } from 'react';
import { LEAVE_POLICIES, PERMISSION_POLICY } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Edit2, CalendarDays, HandMetal } from 'lucide-react';
import type { LeavePolicy, PermissionPolicy } from '@/data/mockData';

const Policies = () => {
  const [leavePolicies, setLeavePolicies] = useState(LEAVE_POLICIES);
  const [permissionPolicy, setPermissionPolicy] = useState(PERMISSION_POLICY);
  const [editingLeave, setEditingLeave] = useState<LeavePolicy | null>(null);
  const [editingPerm, setEditingPerm] = useState(false);
  const [permForm, setPermForm] = useState(permissionPolicy);

  const handleSaveLeave = () => {
    if (!editingLeave) return;
    setLeavePolicies(prev => prev.map(p => p.id === editingLeave.id ? editingLeave : p));
    setEditingLeave(null);
  };

  const handleSavePerm = () => {
    setPermissionPolicy(permForm);
    setEditingPerm(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-heading font-bold">Policies</h1>
        <p className="text-muted-foreground mt-1">Configure leave and permission policies</p>
      </div>

      {/* Leave Policies */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-primary" /> Leave Policies
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Leave Type</TableHead>
                <TableHead>Total Days/Year</TableHead>
                <TableHead>Carry Forward</TableHead>
                <TableHead>Max Carry Forward</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leavePolicies.map(policy => (
                <TableRow key={policy.id}>
                  <TableCell className="font-medium">{policy.type}</TableCell>
                  <TableCell>{policy.totalDays}</TableCell>
                  <TableCell>{policy.carryForward ? 'Yes' : 'No'}</TableCell>
                  <TableCell>{policy.carryForward ? policy.maxCarryForward : '—'}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={() => setEditingLeave({ ...policy })}>
                          <Edit2 className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader><DialogTitle>Edit {policy.type}</DialogTitle></DialogHeader>
                        {editingLeave && (
                          <div className="space-y-4 pt-2">
                            <div className="space-y-2">
                              <Label>Total Days per Year</Label>
                              <Input type="number" value={editingLeave.totalDays} onChange={e => setEditingLeave(p => p ? { ...p, totalDays: parseInt(e.target.value) || 0 } : p)} />
                            </div>
                            <div className="flex items-center justify-between">
                              <Label>Allow Carry Forward</Label>
                              <Switch checked={editingLeave.carryForward} onCheckedChange={v => setEditingLeave(p => p ? { ...p, carryForward: v } : p)} />
                            </div>
                            {editingLeave.carryForward && (
                              <div className="space-y-2">
                                <Label>Max Carry Forward Days</Label>
                                <Input type="number" value={editingLeave.maxCarryForward} onChange={e => setEditingLeave(p => p ? { ...p, maxCarryForward: parseInt(e.target.value) || 0 } : p)} />
                              </div>
                            )}
                            <Button onClick={handleSaveLeave} className="w-full">Save Changes</Button>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Permission Policy */}
      <Card className="glass-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <HandMetal className="w-4 h-4 text-accent" /> Permission Policy
          </CardTitle>
          <Dialog open={editingPerm} onOpenChange={setEditingPerm}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" onClick={() => setPermForm({ ...permissionPolicy })}>
                <Edit2 className="w-4 h-4 mr-2" /> Edit
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Edit Permission Policy</DialogTitle></DialogHeader>
              <div className="space-y-4 pt-2">
                <div className="space-y-2">
                  <Label>Max Permissions per Month</Label>
                  <Input type="number" value={permForm.maxPerMonth} onChange={e => setPermForm(p => ({ ...p, maxPerMonth: parseInt(e.target.value) || 0 }))} />
                </div>
                <div className="space-y-2">
                  <Label>Max Hours per Permission</Label>
                  <Input type="number" value={permForm.maxHoursPerPermission} onChange={e => setPermForm(p => ({ ...p, maxHoursPerPermission: parseInt(e.target.value) || 0 }))} />
                </div>
                <div className="space-y-2">
                  <Label>Min Gap Between Permissions (days)</Label>
                  <Input type="number" value={permForm.minGapBetweenPermissions} onChange={e => setPermForm(p => ({ ...p, minGapBetweenPermissions: parseInt(e.target.value) || 0 }))} />
                </div>
                <Button onClick={handleSavePerm} className="w-full">Save Changes</Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-secondary/50 text-center">
              <p className="text-2xl font-heading font-bold">{permissionPolicy.maxPerMonth}</p>
              <p className="text-xs text-muted-foreground mt-1">Per Month</p>
            </div>
            <div className="p-4 rounded-lg bg-secondary/50 text-center">
              <p className="text-2xl font-heading font-bold">{permissionPolicy.maxHoursPerPermission}h</p>
              <p className="text-xs text-muted-foreground mt-1">Max Hours</p>
            </div>
            <div className="p-4 rounded-lg bg-secondary/50 text-center">
              <p className="text-2xl font-heading font-bold">{permissionPolicy.minGapBetweenPermissions}d</p>
              <p className="text-xs text-muted-foreground mt-1">Min Gap</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Policies;
