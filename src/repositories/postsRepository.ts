import { DefaultMongoDBRepository } from "./defaultRepository";
import { Posts } from "../models/posts";
import { PostsRepository } from ".";

export class PostMongoDBepository
  extends DefaultMongoDBRepository<Posts>
  implements PostsRepository
{
  constructor(postModel = Posts) {
    super(postModel);
  }

  async findOneById(id: string) {
    return this.findOne({ _id: id });
  }
}
