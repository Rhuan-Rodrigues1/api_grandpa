import { Request, Response } from "express";
import { InternalError, UserNotExist } from "../utils/errors/userErrors";
import { UserMongoDBRepository } from "../repositories/usersRepository";
import { AuthService } from "../services/AuthService";

export class Users {
  private userService: UserMongoDBRepository;
  constructor(userService: UserMongoDBRepository) {
    this.userService = userService;
  }
  public async create(req: Request, res: Response): Promise<any> {
    const { name, surname, email, password, age, cpf, address, isCareviger } =
      req.body;

    try {
      const user = await this.userService.create({
        name,
        surname,
        email,
        password,
        age,
        cpf,
        address,
        isCareviger,
      });

      return res.status(200).send(user);
    } catch (err) {
      console.log(err);

      throw new InternalError("Not found !!");
    }
  }

  public async login(req: Request, res: Response) {
    const user = await this.userService.findOneByEmail(req.body.email);

    if (!user) {
      throw new UserNotExist("User not found");
    }

    if (
      !(await AuthService.comparePassword(req.body.password, user.password))
    ) {
      throw new UserNotExist("Password does not match!");
    }

    const token = AuthService.generateToken(user.id);

    res.send({ ...user, ...{ token } });
  }

  public async getProfile(req: Request, res: Response) {
    const profileId = req.context?.userId;

    const findProfile = await this.userService.findOneById(profileId);

    const profileData = {
      name: findProfile.name,
      surname: findProfile.surname,
      email: findProfile.email,
    };

    res.status(200).send({
      profile: profileData,
    });
  }

  public async putProfile(req: Request, res: Response) {
    const profileId = req.context?.userId;
    const { surname, age, cpf, address, isCareviger } = req.body;
    try {
      const data: any = {
        surname,
        age,
        cpf,
        address,
        isCareviger,
      };

      await this.userService.update(profileId, data);
      const userUpdated = await this.userService.findOneById(profileId);
      res.status(200).send({
        profile: userUpdated,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
