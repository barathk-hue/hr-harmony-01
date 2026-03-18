export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  designation: string;
  reportingManagerId: string | null;
  reportingManagerName: string | null;
  joinDate: string;
  status: 'active' | 'inactive';
}

export interface TimeLog {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  checkIn: string;
  checkOut: string;
  totalHours: number;
  status: 'present' | 'half-day' | 'absent';
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  type: 'casual' | 'sick' | 'earned' | 'maternity' | 'paternity';
  fromDate: string;
  toDate: string;
  days: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedOn: string;
}

export interface PermissionRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  fromTime: string;
  toTime: string;
  hours: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedOn: string;
}

export interface LeavePolicy {
  id: string;
  type: string;
  totalDays: number;
  carryForward: boolean;
  maxCarryForward: number;
}

export interface PermissionPolicy {
  id: string;
  maxPerMonth: number;
  maxHoursPerPermission: number;
  minGapBetweenPermissions: number;
}

export const EMPLOYEES: Employee[] = [
  { id: '1', name: 'Priya Sharma', email: 'priya@company.com', department: 'Human Resources', designation: 'HR Director', reportingManagerId: null, reportingManagerName: null, joinDate: '2020-01-15', status: 'active' },
  { id: '2', name: 'Rajesh Kumar', email: 'rajesh@company.com', department: 'Engineering', designation: 'Engineering Manager', reportingManagerId: '1', reportingManagerName: 'Priya Sharma', joinDate: '2020-03-20', status: 'active' },
  { id: '3', name: 'Anita Desai', email: 'anita@company.com', department: 'Engineering', designation: 'Software Engineer', reportingManagerId: '2', reportingManagerName: 'Rajesh Kumar', joinDate: '2021-06-10', status: 'active' },
  { id: '4', name: 'Vikram Singh', email: 'vikram@company.com', department: 'Engineering', designation: 'Senior Developer', reportingManagerId: '2', reportingManagerName: 'Rajesh Kumar', joinDate: '2021-02-01', status: 'active' },
  { id: '5', name: 'Meera Patel', email: 'meera@company.com', department: 'Design', designation: 'UI/UX Designer', reportingManagerId: '2', reportingManagerName: 'Rajesh Kumar', joinDate: '2022-04-18', status: 'active' },
  { id: '6', name: 'Arjun Nair', email: 'arjun@company.com', department: 'Marketing', designation: 'Marketing Lead', reportingManagerId: '1', reportingManagerName: 'Priya Sharma', joinDate: '2021-09-05', status: 'active' },
  { id: '7', name: 'Deepa Rao', email: 'deepa@company.com', department: 'Finance', designation: 'Accountant', reportingManagerId: '1', reportingManagerName: 'Priya Sharma', joinDate: '2022-01-10', status: 'inactive' },
];

export const TIME_LOGS: TimeLog[] = [
  { id: '1', employeeId: '3', employeeName: 'Anita Desai', date: '2026-03-02', checkIn: '09:00', checkOut: '18:00', totalHours: 9, status: 'present' },
  { id: '2', employeeId: '3', employeeName: 'Anita Desai', date: '2026-03-01', checkIn: '09:15', checkOut: '13:00', totalHours: 3.75, status: 'half-day' },
  { id: '3', employeeId: '4', employeeName: 'Vikram Singh', date: '2026-03-02', checkIn: '08:45', checkOut: '17:30', totalHours: 8.75, status: 'present' },
  { id: '4', employeeId: '5', employeeName: 'Meera Patel', date: '2026-03-02', checkIn: '10:00', checkOut: '19:00', totalHours: 9, status: 'present' },
  { id: '5', employeeId: '4', employeeName: 'Vikram Singh', date: '2026-03-01', checkIn: '09:00', checkOut: '18:00', totalHours: 9, status: 'present' },
];

export const LEAVE_REQUESTS: LeaveRequest[] = [
  { id: '1', employeeId: '3', employeeName: 'Anita Desai', type: 'casual', fromDate: '2026-03-10', toDate: '2026-03-11', days: 2, reason: 'Family function', status: 'pending', appliedOn: '2026-03-01' },
  { id: '2', employeeId: '4', employeeName: 'Vikram Singh', type: 'sick', fromDate: '2026-02-25', toDate: '2026-02-26', days: 2, reason: 'Flu', status: 'approved', appliedOn: '2026-02-24' },
  { id: '3', employeeId: '5', employeeName: 'Meera Patel', type: 'earned', fromDate: '2026-03-15', toDate: '2026-03-20', days: 6, reason: 'Vacation', status: 'pending', appliedOn: '2026-02-28' },
  { id: '4', employeeId: '3', employeeName: 'Anita Desai', type: 'sick', fromDate: '2026-02-10', toDate: '2026-02-10', days: 1, reason: 'Headache', status: 'rejected', appliedOn: '2026-02-09' },
];

export const PERMISSION_REQUESTS: PermissionRequest[] = [
  { id: '1', employeeId: '3', employeeName: 'Anita Desai', date: '2026-03-05', fromTime: '14:00', toTime: '16:00', hours: 2, reason: 'Doctor appointment', status: 'pending', appliedOn: '2026-03-02' },
  { id: '2', employeeId: '4', employeeName: 'Vikram Singh', date: '2026-02-28', fromTime: '10:00', toTime: '11:30', hours: 1.5, reason: 'Bank work', status: 'approved', appliedOn: '2026-02-27' },
  { id: '3', employeeId: '5', employeeName: 'Meera Patel', date: '2026-03-04', fromTime: '15:00', toTime: '17:00', hours: 2, reason: 'Personal errand', status: 'pending', appliedOn: '2026-03-01' },
];

export const LEAVE_POLICIES: LeavePolicy[] = [
  { id: '1', type: 'Casual Leave', totalDays: 12, carryForward: false, maxCarryForward: 0 },
  { id: '2', type: 'Sick Leave', totalDays: 10, carryForward: false, maxCarryForward: 0 },
  { id: '3', type: 'Earned Leave', totalDays: 15, carryForward: true, maxCarryForward: 5 },
  { id: '4', type: 'Maternity Leave', totalDays: 180, carryForward: false, maxCarryForward: 0 },
  { id: '5', type: 'Paternity Leave', totalDays: 15, carryForward: false, maxCarryForward: 0 },
];

export const PERMISSION_POLICY: PermissionPolicy = {
  id: '1',
  maxPerMonth: 3,
  maxHoursPerPermission: 2,
  minGapBetweenPermissions: 2,
};

export const DEPARTMENTS = ['Human Resources', 'Engineering', 'Design', 'Marketing', 'Finance', 'Operations'];
