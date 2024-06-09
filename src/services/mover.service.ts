/* eslint-disable prettier/prettier */
import Mover from '../models/mover.model';
import { IMover } from '../interfaces/mover.interface';

class MoverService {
  //get all Movers
  public getAllMovers = async (): Promise<IMover[]> => {
    const data = await Mover.find();
    return data;
  };

  //create new Mover
  public newMover = async (body: IMover): Promise<IMover> => {
    const data = await Mover.create(body);
    return data;
  };

  //update a Mover
  public updateMover = async (_id: string, body: IMover): Promise<IMover> => {
    const data = await Mover.findByIdAndUpdate(
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

  //delete a Mover
  public deleteMover = async (_id: string): Promise<string> => {
    await Mover.findByIdAndDelete(_id);
    return '';
  };

  //get a single Mover
  public getMover = async (id: string): Promise<IMover> => {
    // console.log(id);
    const data = await Mover.findById(id);
    // console.log(data);
    return data;
  };
  public getMoverByEmail = async (email: string): Promise<IMover> => {
    const data = await Mover.findOne({
      email
    });
    return data;
  };
}

export default MoverService;
