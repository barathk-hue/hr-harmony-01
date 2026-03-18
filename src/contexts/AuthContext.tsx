import { loginUser } from '@/api/auth.api';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type UserRole = 'admin' | 'hr' | 'manager' | 'employee';

export interface User {
  id: string;
  employee_code: null;
  name: string;
  email: string;
  phone: string;
  department_id: null;
  designation_id: null;
  reporting_manager_id: string;
  join_date: string;
  end_date: null;
  employment_type: string;
  status: string;
  address: null;
  username: string;
  department: string;
  role: UserRole;
  must_change_password: boolean;
  account_status: string;
  last_login: string;
  failed_login_attempts: number;
  locked_until: null;
  password_changed_at: null;
  created_at: string;
  updated_at: string;
}

const DUMMY_USERS: User[] = [
  {
    id: '1',
    employee_code: null,
    name: 'Priya Sharma',
    email: 'priya@company.com',
    phone: '9876543210',
    department_id: null,
    designation_id: null,
    reporting_manager_id: '0',
    join_date: '2024-01-15',
    end_date: null,
    employment_type: 'full-time',
    status: 'active',
    address: null,
    username: 'priya@company.com',
    department: 'Human Resources',
    role: 'admin',
    must_change_password: false,
    account_status: 'active',
    last_login: '2026-03-13T09:00:00Z',
    failed_login_attempts: 0,
    locked_until: null,
    password_changed_at: null,
    created_at: '2024-01-15T08:00:00Z',
    updated_at: '2026-03-13T08:00:00Z'
  },
  {
    id: '2',
    employee_code: null,
    name: 'Rajesh Kumar',
    email: 'rajesh@company.com',
    phone: '9123456780',
    department_id: null,
    designation_id: null,
    reporting_manager_id: '1',
    join_date: '2023-06-01',
    end_date: null,
    employment_type: 'full-time',
    status: 'active',
    address: null,
    username: 'rajesh@company.com',
    department: 'Engineering',
    role: 'manager',
    must_change_password: false,
    account_status: 'active',
    last_login: '2026-03-12T10:15:00Z',
    failed_login_attempts: 0,
    locked_until: null,
    password_changed_at: null,
    created_at: '2023-06-01T08:00:00Z',
    updated_at: '2026-03-12T10:15:00Z'
  },
  {
    id: '3',
    employee_code: null,
    name: 'Anita Desai',
    email: 'anita@company.com',
    phone: '9012345678',
    department_id: null,
    designation_id: null,
    reporting_manager_id: '2',
    join_date: '2024-09-10',
    end_date: null,
    employment_type: 'full-time',
    status: 'active',
    address: null,
    username: 'anita@company.com',
    department: 'Engineering',
    role: 'employee',
    must_change_password: true,
    account_status: 'active',
    last_login: '2026-03-11T14:20:00Z',
    failed_login_attempts: 0,
    locked_until: null,
    password_changed_at: null,
    created_at: '2024-09-10T08:00:00Z',
    updated_at: '2026-03-11T14:20:00Z'
  }
];

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<{ error: Error | null }>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('userData');

    if (userData) {
      setUser(JSON.parse(userData));
      console.log('user is set')
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const { access_token, ...userData } = await loginUser(username, password);
      setUser(userData);
      localStorage.setItem('userData', JSON.stringify(userData));
      localStorage.setItem('token', access_token);
      return { error: null };
    } catch (err: any) {
      return {
        error: new Error(
          err?.response?.data?.message || 'Invalid username or password'
        )
      };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
