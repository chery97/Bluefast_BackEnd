import { Controller, Get, Post, UseGuards, Request, Body } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from './entity/user.entity';
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthService } from "../auth/auth.service";
import { UserRepository } from "../repository/user/user.repository";

@ApiTags('User')
@Controller('/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private authService: AuthService,
    private userRepository: UserRepository,
  ) {}

  @Post('/auth/login')
  async login(@Request() req) {
    console.log('Login Route');
    return this.authService.login(req.user);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  // 회원가입
  @ApiOperation({ summary: '회원가입' })
  @Post()
  async create(@Body() user: User): Promise<User> {
    return await this.userService.createUser(user);
  }

  // 회원 리스트
  @ApiOperation({ summary: 'User 리스트' })
  @Get('/list')
  getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }
}