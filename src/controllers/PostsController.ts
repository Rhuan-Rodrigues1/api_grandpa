import { Request, Response } from "express";
import { InternalError } from "../utils/errors/userErrors";
import { PostMongoDBepository } from "../repositories/postsRepository";

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
    } catch (err) {
      console.log(err);

      throw new InternalError("Not found !!");
    }
  }

  public async deletePost(req: Request, res: Response): Promise<any> {
    //implementar
  }
}
