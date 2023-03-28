import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';

import { User } from './entity/user.entity';
import { CreateUserDto } from "./dto/createUser.dto";
import { UserRepository } from "../repository/user.repository";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository
  ) {}

  // 유저 생성
  async createUser(userData: CreateUserDto): Promise<User> {
    const { userId, password, name, phone, email } = userData;

    // userId, email 존재여부
    const isUserIdExist = await this.userRepository.exist({ where: { userId: userId } });
    const isEmailExist = await this.userRepository.exist({ where: { email: email } });

    // Exception 처리
    if (isUserIdExist) {
      throw new UnauthorizedException('해당하는 아이디는 이미 존재합니다.');
    }

    if (isEmailExist) {
      throw new UnauthorizedException('해당하는 이메일은 이미 존재합니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepository.create({
      userId,
      password: hashedPassword,
      name,
      phone,
      email
    });
    return await this.userRepository.save(newUser);
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }
}