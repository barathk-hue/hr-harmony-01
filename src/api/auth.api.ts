import { UserRole } from '@/contexts/AuthContext';
import api from './api';

export type LoginResponse = {
  access_token: string;
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
};

export const loginUser = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  const res: any = await api.post('/auth/login', {
    username,
    password
  });
  return res;
};