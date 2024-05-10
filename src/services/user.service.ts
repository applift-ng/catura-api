/* eslint-disable prettier/prettier */
import User from '../models/user.model';
import { IUser } from '../interfaces/user.interface';

class UserService {
  //get all users
  public getAllUsers = async (): Promise<IUser[]> => {
    const data = await User.find();
    return data;
  };

  //create new user
  public newUser = async (body: IUser): Promise<IUser> => {
    const data = await User.create(body);
    return data;
  };

  //update a user
  public updateUser = async (_id: string, body: IUser): Promise<IUser> => {
    const data = await User.findByIdAndUpdate(
      {
        _id
      },
      body,
      {
        new: true
      }
    );
    return data;
  };

  //delete a user
  public deleteUser = async (_id: string): Promise<string> => {
    await User.findByIdAndDelete(_id);
    return '';
  };

  //get a single user
  public getUser = async (id: string): Promise<IUser> => {
    const data = await User.findById(id);
    return data;
  };
  public getUserByEmail = async (email: string): Promise<IUser> => {
    const data = await User.findOne({
      email
    });
    return data;
  };
}

export default UserService;
