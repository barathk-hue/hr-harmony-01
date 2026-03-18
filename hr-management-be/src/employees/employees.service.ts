import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EmployeesService {

constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>, // ✅ correct
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto) {

    const passwordHash = await bcrypt.hash(createEmployeeDto.password, 10);

    const employee = this.employeeRepository.create({
      ...createEmployeeDto,
      password_hash: passwordHash,
      must_change_password: true
    });

    return this.employeeRepository.save(employee);
  }

  async findAll() {
    return this.employeeRepository.find({
      where: { status: 'active' }
    });
  }

  async findOne(id: number) {

    const employee = await this.employeeRepository.findOne({
      where: { id }
    });

    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    return employee;
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {

    const employee = await this.findOne(id);

    await this.employeeRepository.update(id, updateEmployeeDto);

    return this.findOne(id);
  }

  async remove(id: number) {

    const employee = await this.findOne(id);

    employee.status = 'inactive';

    return this.employeeRepository.save(employee);
  }
}