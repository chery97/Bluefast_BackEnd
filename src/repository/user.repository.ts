import { EntityRepository, Repository } from "typeorm";
import { User } from '../Users/entity/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  // findByName(fir)
}
