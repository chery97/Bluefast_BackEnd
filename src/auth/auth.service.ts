import { Injectable } from '@nestjs/common';
import { UserRepository } from "../repository/user/user.repository";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async validateUser(userId: string, password: string): Promise<any> {
    console.log('AuthService');

    const user = await this.userRepository.findByLogin(userId, password);

    //사용자가 요청한 비밀번호와 DB에서 조회한 비밀번호 일치여부 검사
    if (user && user.password === password) {
      const { password, ...result } = user;

      //비밀번호를 제외하고 유저 정보를 반환
      return result;
    }
    return null;
  }

  async login(user: any) {
    console.log(user.userId)
    const payload = { username: user.userId, sub: user.password };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
