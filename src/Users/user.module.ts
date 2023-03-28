import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { User } from './entity/user.entity';
import { AuthService } from "../auth/auth.service";
import { AuthModule } from "../auth/auth.module";
import { UserRepository } from "../repository/user.repository";
import { JwtService } from "@nestjs/jwt";

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule],
  controllers: [UserController],
  providers: [UserService, AuthService, UserRepository, JwtService],
  exports: [UserService],
})
export class UserModule {}