import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesModule } from './employees/employees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './employees/entities/employee.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { DepartmentsModule } from './departments/departments.module';
import { DesignationsModule } from './designations/designations.module';
import { EducationsModule } from './educations/educations.module';
import { ExperiencesModule } from './experiences/experiences.module';
import { TimelogsModule } from './timelogs/timelogs.module';
import { LeavepoliciesModule } from './leavepolicies/leavepolicies.module';
import { LeaverequestsModule } from './leaverequests/leaverequests.module';
import { PermissionpoliciesModule } from './permissionpolicies/permissionpolicies.module';
import { PermissionrequestsModule } from './permissionrequests/permissionrequests.module';
import { RequestapprovalsModule } from './requestapprovals/requestapprovals.module';
import { HolidaysModule } from './holidays/holidays.module';
import { Department } from './departments/entities/department.entity';
import { Designation } from './designations/entities/designation.entity';
import { Education } from './educations/entities/education.entity';
import { Experience } from './experiences/entities/experience.entity';
import { WorklogsModule } from './worklogs/worklogs.module';
import { WorkLog } from './worklogs/entities/worklog.entity';
import { LeavePolicy } from './leavepolicies/entities/leavepolicy.entity';
import { LeaveRequest } from './leaverequests/entities/leaverequest.entity';
import { PermissionPolicy } from './permissionpolicies/entities/permissionpolicy.entity';
import { PermissionRequest } from './permissionrequests/entities/permissionrequest.entity';
import { RequestApproval } from './requestapprovals/entities/requestapproval.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // makes process.env available everywhere
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Bharathk_99',
      database: 'naatscorp_hr',
      entities: [Employee, Department, Designation, Education, Experience, WorkLog, LeavePolicy, LeaveRequest, PermissionPolicy, PermissionRequest, WorkLog, RequestApproval],
      synchronize: true, // ⚠️ only for dev
    }),
    EmployeesModule,
    AuthModule,
    DepartmentsModule,
    DesignationsModule,
    EducationsModule,
    ExperiencesModule,
    TimelogsModule,
    LeavepoliciesModule,
    LeaverequestsModule,
    PermissionpoliciesModule,
    PermissionrequestsModule,
    RequestapprovalsModule,
    HolidaysModule,
    WorklogsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
