import api from './api';

export interface Department {
  id: number;
  name: string;
  description?: string;
  created_at: string;
}

export interface CreateDepartmentDto {
  name: string;
  description?: string;
}

export interface UpdateDepartmentDto {
  name?: string;
  description?: string;
}


export interface Designation {
  id: number;
  name: string;
  description?: string;
  created_at: string;
}

export interface CreateDesignationDto {
  name: string;
  description?: string;
}

export interface UpdateDesignationDto {
  name?: string;
  description?: string;
}


export interface Employee {
  id: number;
  name: string;
  email: string;
  phone?: string;
  department_id?: number;
  designation_id?: number;
  reporting_manager_id?: number;
  join_date: string;
  end_date?: string;
  employment_type: 'full-time' | 'part-time' | 'contract' | 'intern';
  username: string;
  role: 'admin' | 'hr' | 'manager' | 'employee';
  created_at?: string;
}

export interface CreateEmployeeDto {
  name: string;
  email: string;
  phone?: string;
  department_id?: number;
  designation_id?: number;
  reporting_manager_id?: number;
  join_date: Date;
  end_date?: Date;
  employment_type: 'full-time' | 'part-time' | 'contract' | 'intern';
  username: string;
  password: string;
  role: 'admin' | 'hr' | 'manager' | 'employee';
}

export interface UpdateEmployeeDto {
  name?: string;
  email?: string;
  phone?: string;
  department_id?: number;
  designation_id?: number;
  reporting_manager_id?: number;
  join_date?: Date;
  end_date?: Date;
  employment_type?: 'full-time' | 'part-time' | 'contract' | 'intern';
  username?: string;
  password?: string;
  role?: 'admin' | 'hr' | 'manager' | 'employee';
}



/* Create Department */
export const createDepartment = async (
  data: CreateDepartmentDto
): Promise<Department> => {
  const res: any = await api.post("/departments", data);
  return res;
};


/* Get All Departments */
export const getDepartments = async (): Promise<Department[]> => {
  const res: any = await api.get("/departments");
  return res;
};


/* Get Department by ID */
export const getDepartmentById = async (
  id: number
): Promise<Department> => {
  const res: any = await api.get(`/departments/${id}`);
  return res;
};


/* Update Department */
export const updateDepartment = async (
  id: number,
  data: UpdateDepartmentDto
): Promise<Department> => {
  const res: any = await api.patch(`/departments/${id}`, data);
  return res;
};


/* Delete Department */
export const deleteDepartment = async (
  id: number
): Promise<void> => {
  const res: any = await api.delete(`/departments/${id}`);
  return res;
};

/* Create Designation */
export const createDesignation = async (
  data: CreateDesignationDto
): Promise<Designation> => {
  const res: any = await api.post("/designations", data);
  return res;
};


/* Get All Designations */
export const getDesignations = async (): Promise<Designation[]> => {
  const res: any = await api.get("/designations");
  return res;
};


/* Get Designation by ID */
export const getDesignationById = async (
  id: number
): Promise<Designation> => {
  const res: any = await api.get(`/designations/${id}`);
  return res;
};

/* Update Designation */
export const updateDesignation = async (
  id: number,
  data: UpdateDesignationDto
): Promise<Designation> => {
  const res: any = await api.patch(`/designations/${id}`, data);
  return res;
};


/* Delete Designation */
export const deleteDesignation = async (
  id: number
): Promise<void> => {
  const res: any = await api.delete(`/designations/${id}`);
  return res;
};

/* Create Employee */
export const createEmployee = async (
  data: CreateEmployeeDto
): Promise<Employee> => {
  const res: any = await api.post("/employees", data);
  return res;
};


/* Get All Employees */
export const getEmployees = async (): Promise<Employee[]> => {
  const res: any = await api.get("/employees");
  return res;
};


/* Get Employee By ID */
export const getEmployeeById = async (
  id: number
): Promise<Employee> => {
  const res: any = await api.get(`/employees/${id}`);
  return res;
};


/* Update Employee */
export const updateEmployee = async (
  id: number,
  data: UpdateEmployeeDto
): Promise<Employee> => {
  const res: any = await api.patch(`/employees/${id}`, data);
  return res;
};


/* Delete Employee */
export const deleteEmployee = async (
  id: number
): Promise<void> => {
  const res: any = await api.delete(`/employees/${id}`);
  return res;
};