import { PostsRepository } from "../repositories";

interface postDatas {
  usuario: string;
  conteudo: string;
  data_criada: Date;
  hora_criada: Date;
}

export interface Ipost {
  execute({
    usuario,
    conteudo,
    data_criada,
    hora_criada,
  }: postDatas): Promise<any>;
}

class PostService implements Ipost {
  private postRepository: PostsRepository;
  constructor(postRepository: PostsRepository) {
    this.postRepository = postRepository;
  }
  public async execute({
    usuario,
    conteudo,
    data_criada,
    hora_criada,
  }: postDatas): Promise<any> {
    const post = await this.postRepository.create({
      usuario,
      conteudo,
      data_criada,
      hora_criada,
    });

    return post;
  }
}
