import { DefaultMongoDBRepository } from './defaultRepository';
import { Posts} from '../models/posts';
import { PostsRepository } from '.';

export class UserMongoDBRepository
  extends DefaultMongoDBRepository<Posts>
  implements PostsRepository
{
  constructor(userModel = Posts) {
    super(userModel);
  }

  async findOneById(id: string) {
    return this.findOne({ _id: id });
  }

}