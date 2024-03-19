/* eslint-disable prettier/prettier */
import { hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { IUser } from '../interfaces/user.interface';

interface IBody {
    email: string,
    password: string
}
class UserUtils {
  private JWT_SECRET: string;

  constructor() {
    this.JWT_SECRET = process.env.JWT_SECRET;
  }
  public hashPassword = async (body: IBody): Promise<IUser> => {
    const data = {
      ...body,
      password: await hash(body.password, 10)
    };
    return data as IUser;
  };
  public signToken = async (body: {
    userId: string;
    email: string;
    role: string;
  }): Promise<string> => {
    const token = await sign(
      {
        userId: body.userId,
        email: body.email,
        role: body.role
      },
      this.JWT_SECRET,
      { expiresIn: '30d' }
    );
    return token;
  };
}

export default UserUtils;
