import { Request, Response } from "express";
import { InternalError } from "../utils/errors/userErrors";
import { PostMongoDBepository } from "../repositories/postsRepository";



export class Posts {
    private postService: PostMongoDBepository
    constructor(postService: PostMongoDBepository) {
        this.postService = postService
    }
    public async create(req: Request, res: Response): Promise<any> {
        const { usuario, conteudo, data_criada, hora_criada } = req.body

        try {
            
            const post = await this.postService.create({usuario, conteudo, data_criada, hora_criada})
    
            return res.status(200).send(post)
        } catch (err){
            throw new InternalError("Not found !!")           
            
        }
    }

}