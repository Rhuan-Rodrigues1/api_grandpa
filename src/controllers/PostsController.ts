import { Request, Response } from "express";
import { PostMongoDBepository } from "../repositories/postsRepository";
import {
  GetPostError,
  CreatePostError,
  UpdatePostError,
  DeletePostsError,
} from "../utils/errors/postsErrors";

export class Posts {
  private postService: PostMongoDBepository;
  constructor(postService: PostMongoDBepository) {
    this.postService = postService;
  }
  public async createPost(req: Request, res: Response): Promise<any> {
    const data_criada = new Date();
    const hora_criada = new Date();
    const usuario = req.context?.userId;
    const { conteudo } = req.body;

    try {
      const post = await this.postService.create({
        usuario,
        conteudo,
        data_criada,
        hora_criada,
      });

      return res.status(200).send(post);
    } catch (error) {
      throw new CreatePostError("Error creating post", 400, error as string);
    }
  }

  public async deletePost(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    const userId = req.context?.userId;

    const postsFind = await this.postService.findOneById(id);
    if (userId == postsFind.usuario) {
      await this.postService.delete(id as any);
      return res.status(200).send({
        message: "Post deleted !!",
      });
    } else {
      throw new DeletePostsError("Error when deleting post", 400);
    }
  }

  public async showMyPosts(req: Request, res: Response): Promise<any> {
    const userId = req.context?.userId;

    try {
      const myPosts = await this.postService.find({ userId });

      return res.status(200).send({
        myPosts: myPosts,
      });
    } catch (error) {
      throw new GetPostError("Error showing post", 400, error as string);
    }
  }

  public async updatePosts(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    const userId = req.context?.userId;
    const { conteudo } = req.body;

    try {
      const postsFind = await this.postService.findOneById(id);

      if (userId == postsFind.usuario) {
        await this.postService.update(id as any, conteudo);

        return res.status(200).send({
          message: "post was updated",
          data: postsFind,
        });
      }
    } catch (error) {
      throw new UpdatePostError(
        "error when updated post",
        400,
        error as string
      );
    }
  }
}
