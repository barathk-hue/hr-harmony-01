import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { EMPLOYEES, DEPARTMENTS } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Search, Edit2, FileWarning, Users, Plus } from 'lucide-react';
import type { Employee } from '@/data/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { getDepartments } from '@/api/employee.api';

const Employees = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [deptOpen, setDeptOpen] = useState(false);
  const [desigOpen, setDesigOpen] = useState(false);
  const [employees, setEmployees] = useState(EMPLOYEES);
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('all');
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [newManagerId, setNewManagerId] = useState('');
  const [deptForm, setDeptForm] = useState({name: "",description: ""});

  const isAdmin = user?.role === 'admin';

  const filtered = employees.filter(e => {
    const matchesSearch = e.name.toLowerCase().includes(search.toLowerCase()) || e.email.toLowerCase().includes(search.toLowerCase());
    const matchesDept = deptFilter === 'all' || e.department === deptFilter;
    return matchesSearch && matchesDept;
  });

  const fetchDepartments = async () => {
    // fetch departments from API and update state
    const res = await getDepartments();
    console.log(res);
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleChangeManager = () => {
    if (!editingEmployee || !newManagerId) return;
    const manager = employees.find(e => e.id === newManagerId);
    setEmployees(prev => prev.map(e =>
      e.id === editingEmployee.id
        ? { ...e, reportingManagerId: newManagerId, reportingManagerName: manager?.name || null }
        : e
    ));
    setEditingEmployee(null);
    setNewManagerId('');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-heading font-bold">Employees</h1>
        <p className="text-muted-foreground mt-1">Manage your team members</p>
      </div>

      <Tabs defaultValue="employee" className="space-y-4">
        <TabsList>
          <TabsTrigger value="employee" className="gap-2">
            <Users className="w-4 h-4" />
            All Employees ({employees.length})
          </TabsTrigger>
          <TabsTrigger value="department" className="gap-2">
            All Departments
          </TabsTrigger>
          <TabsTrigger value="designation" className="gap-2">
            All Designations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="employee">
          <Card className="glass-card">
            <CardHeader className="pb-3">
              <div className="page-header flex items-center justify-end pb-3">
                <Dialog
                  open={open}
                  onOpenChange={(v) => {
                    setOpen(v);
                    if (!v) {
                      // setEditingId(null);
                      // setForm(emptyForm);
                    }
                  }}
                >
                  <DialogTrigger asChild>
                    <Button disabled={user?.role !== "admin"}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Employee
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>
                        Add New Employee
                      </DialogTitle>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search employees..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
                </div>
                <Select value={deptFilter} onValueChange={setDeptFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="All Departments" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    {DEPARTMENTS.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Designation</TableHead>
                    <TableHead>Reporting Manager</TableHead>
                    <TableHead>Status</TableHead>
                    {isAdmin && <TableHead className="w-12">Action</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map(emp => (
                    <TableRow key={emp.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{emp.name}</p>
                          <p className="text-xs text-muted-foreground">{emp.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>{emp.department}</TableCell>
                      <TableCell>{emp.designation}</TableCell>
                      <TableCell>{emp.reportingManagerName || '—'}</TableCell>
                      <TableCell>
                        <Badge variant={emp.status === 'active' ? 'default' : 'secondary'}>
                          {emp.status}
                        </Badge>
                      </TableCell>
                      {isAdmin && (
                        <TableCell>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="icon" onClick={() => { setEditingEmployee(emp); setNewManagerId(emp.reportingManagerId || ''); }}>
                                <Edit2 className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Change Reporting Manager</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4 pt-2">
                                <div>
                                  <Label>Employee</Label>
                                  <p className="text-sm text-muted-foreground mt-1">{editingEmployee?.name}</p>
                                </div>
                                <div className="space-y-2">
                                  <Label>New Reporting Manager</Label>
                                  <Select value={newManagerId} onValueChange={setNewManagerId}>
                                    <SelectTrigger><SelectValue placeholder="Select manager" /></SelectTrigger>
                                    <SelectContent>
                                      {employees.filter(e => e.id !== editingEmployee?.id).map(e => (
                                        <SelectItem key={e.id} value={e.id}>{e.name} — {e.designation}</SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                <Button onClick={handleChangeManager} className="w-full">Update Manager</Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="department">
          <Card className="glass-card">
            <CardHeader className="pb-3">
              <div className="page-header flex items-center justify-end pb-3">
                <Dialog
                  open={deptOpen}
                  onOpenChange={(v) => {
                    setDeptOpen(v);
                    if (!v) {
                      // setEditingId(null);
                      // setForm(emptyForm);
                    }
                  }}
                >
                  <DialogTrigger asChild>
                    <Button disabled={user?.role !== "admin"}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Department
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>
                        Add New Department
                      </DialogTitle>
                    </DialogHeader>
                    <form
                      className="space-y-4 mt-4"
                      onSubmit={(e) => {
                        e.preventDefault();
                        // handle submit here
                      }}
                    >
                      {/* Department Name */}
                      <div className="space-y-2">
                        <Label htmlFor="name">Department Name</Label>
                        <Input
                          id="name"
                          placeholder="Enter department name"
                          value={deptForm.name}
                          onChange={(e) =>
                            setDeptForm({ ...deptForm, name: e.target.value })
                          }
                          required
                        />
                      </div>

                      {/* Description */}
                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          placeholder="Enter department description"
                          rows={3}
                          value={deptForm.description}
                          onChange={(e) =>
                            setDeptForm({ ...deptForm, description: e.target.value })
                          }
                        />
                      </div>

                      {/* Footer Buttons */}
                      <div className="flex justify-end gap-2 pt-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setDeptOpen(false)}
                        >
                          Cancel
                        </Button>

                        <Button type="submit">
                          Save Department
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search departments..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>S.No</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Created At</TableHead>
                    {isAdmin && <TableHead className="w-12">Action</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((emp, index) => (
                    <TableRow key={emp.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{index + 1}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{emp.name}</p>
                          <p className="text-xs text-muted-foreground">{emp.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>{emp.department}</TableCell>
                      <TableCell>{emp.designation}</TableCell>
                      {isAdmin && (
                        <TableCell>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="icon" onClick={() => { setEditingEmployee(emp); setNewManagerId(emp.reportingManagerId || ''); }}>
                                <Edit2 className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Change Reporting Manager</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4 pt-2">
                                <div>
                                  <Label>Employee</Label>
                                  <p className="text-sm text-muted-foreground mt-1">{editingEmployee?.name}</p>
                                </div>
                                <div className="space-y-2">
                                  <Label>New Reporting Manager</Label>
                                  <Select value={newManagerId} onValueChange={setNewManagerId}>
                                    <SelectTrigger><SelectValue placeholder="Select manager" /></SelectTrigger>
                                    <SelectContent>
                                      {employees.filter(e => e.id !== editingEmployee?.id).map(e => (
                                        <SelectItem key={e.id} value={e.id}>{e.name} — {e.designation}</SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                <Button onClick={handleChangeManager} className="w-full">Update Manager</Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="designation">
          <Card className="glass-card">
            <CardHeader className="pb-3">
              <div className="page-header flex items-center justify-end pb-3">
                <Dialog
                  open={desigOpen}
                  onOpenChange={(v) => {
                    setDesigOpen(v);
                    if (!v) {
                    }
                  }}
                >
                  <DialogTrigger asChild>
                    <Button disabled={user?.role !== "admin"}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Designations
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>
                        Add New Designations
                      </DialogTitle>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search departments..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>S.No</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Created At</TableHead>
                    {isAdmin && <TableHead className="w-12">Action</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((emp, index) => (
                    <TableRow key={emp.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{index + 1}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{emp.name}</p>
                          <p className="text-xs text-muted-foreground">{emp.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>{emp.department}</TableCell>
                      <TableCell>{emp.designation}</TableCell>
                      {isAdmin && (
                        <TableCell>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="icon" onClick={() => { setEditingEmployee(emp); setNewManagerId(emp.reportingManagerId || ''); }}>
                                <Edit2 className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Change Reporting Manager</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4 pt-2">
                                <div>
                                  <Label>Employee</Label>
                                  <p className="text-sm text-muted-foreground mt-1">{editingEmployee?.name}</p>
                                </div>
                                <div className="space-y-2">
                                  <Label>New Reporting Manager</Label>
                                  <Select value={newManagerId} onValueChange={setNewManagerId}>
                                    <SelectTrigger><SelectValue placeholder="Select manager" /></SelectTrigger>
                                    <SelectContent>
                                      {employees.filter(e => e.id !== editingEmployee?.id).map(e => (
                                        <SelectItem key={e.id} value={e.id}>{e.name} — {e.designation}</SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                <Button onClick={handleChangeManager} className="w-full">Update Manager</Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Employees;
