/* eslint-disable prettier/prettier */
import { nanoid } from 'nanoid';
class IdGenerator {
  public getId = (): string => {
    const id = nanoid();
    return id;
  };
}

export default IdGenerator;
