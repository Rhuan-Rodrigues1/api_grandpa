import { UserMongoDBRepository } from '../repositories/usersRepository';

describe('Users tests', () => {
  const defaultUserRepository = new UserMongoDBRepository();
  beforeEach(async () => {
    await defaultUserRepository.deleteAll();
  });
  describe('When creating a new user', () => {
    it('should successfully create a new user with password', async () => {
      const newUser = {
        name: 'John Doe',
        email: 'john@mail.com',
        password: '1234',
      };
      const response = await global.testRequest.post('/users').send(newUser);
      expect(response.body).toEqual(
        expect.objectContaining({
          ...newUser
        })
      );
    });

    it('Should return a validation error when a field is missing', async () => {
      const newUser = {
        email: 'john@mail.com',
        password: '1234',
      };
      const response = await global.testRequest.post('/users').send(newUser);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        code: 400,
        error: 'Bad Request',
        message: 'Path `name` is required.',
      });
    });

    it('Should return 409 when the email already exists', async () => {
      const newUser = {
        name: 'John Doe',
        email: 'john@mail.com',
        password: '1234',
      };
      await global.testRequest.post('/users').send(newUser);
      const response = await global.testRequest.post('/users').send(newUser);

      expect(response.status).toBe(409);
      expect(response.body).toEqual({
        code: 409,
        error: 'Conflict',
        message:
          'Already exists in the database.',
      });
    });
})
})