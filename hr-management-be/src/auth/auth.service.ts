import {
  Injectable,
  UnauthorizedException,
  ForbiddenException
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from '../employees/entities/employee.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    private jwtService: JwtService,
  ) {}

  async login(username: string, password: string) {

    const user = await this.employeeRepository.findOne({
      where: { username },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (user.status !== 'active') {
      throw new ForbiddenException('Employee inactive');
    }

    if (user.account_status !== 'active') {
      throw new ForbiddenException('Account disabled');
    }

    if (user.locked_until && user.locked_until > new Date()) {
      throw new ForbiddenException('Account temporarily locked');
    }

    const passwordValid = await bcrypt.compare(
      password,
      user.password_hash,
    );

    if (!passwordValid) {

      user.failed_login_attempts += 1;

      if (user.failed_login_attempts >= 5) {
        user.locked_until = new Date(
          Date.now() + 30 * 60 * 1000,
        );
      }

      await this.employeeRepository.save(user);

      throw new UnauthorizedException('Invalid credentials');
    }

    user.failed_login_attempts = 0;
    user.last_login = new Date();

    await this.employeeRepository.save(user);

    const { password_hash, ...userData } = user;

    const payload = {
    ...userData
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      access_token: token,
      ...userData
    };
  }

  async logout() {
    return { message: 'Logout successful' };
  }
}