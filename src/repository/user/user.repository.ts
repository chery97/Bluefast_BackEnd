import { EntityRepository, Repository } from "typeorm";
import { User } from '../../users/entity/user.entity';
import { ForbiddenException } from "@nestjs/common";
import CreateUserDto from "../../users/dto/createUser.dto";

@EntityRepository(User)
export class UserRepository extends Repository<User> {가
  //유저 생성
  async onCreate(createUserDto: CreateUserDto): Promise<boolean> {
    const { userId, password, name} = createUserDto;

    const user = await this.save({
      userId,
      password,
      salt: '임시',
      name,
    });

    return user ? true : false;
  }

  //로그인 유저 조회
  async findByLogin(userId: string, password: string): Promise<User> {
    const user = await this.findOne({ where: { userId, password } });

    if (!user) {
      throw new ForbiddenException('아이디와 비밀번호를 다시 확인해주세요.');
    }

    return user;
  }
}
