import { Controller, Get } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from './entity/user.entity';
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags('User')
@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'User 리스트' })
  @Get('/list')
  getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }
}