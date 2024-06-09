/* eslint-disable prettier/prettier */
import { hash } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import { IMover } from '../interfaces/mover.interface';

interface IBody {
    email: string,
    password: string
}
class MoverUtils {
  private JWT_SECRET: string;

  constructor() {
    this.JWT_SECRET = process.env.JWT_SECRET;
  }
  public hashPassword = async (body: IBody): Promise<IMover> => {
    const data = {
      ...body,
      isGoogleUser: false,
      isVerified: false,
      password: await hash(body.password, 10)
    };
    return data as IMover;
  };
  public signToken = async (body: {
    moverId: string;
    email: string;
  }): Promise<string> => {
    const token = await sign(
      {
        moverId: body.moverId,
        email: body.email,
      },
      this.JWT_SECRET,
      { expiresIn: '30d' }
    );
    return token;
  };
  public verifyToken = async (token: string): Promise<IMover> => {
    const Mover = await verify(token, this.JWT_SECRET);
    return Mover as IMover;
  }
}

export default MoverUtils;
