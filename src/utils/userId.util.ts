/* eslint-disable prettier/prettier */
import crypto from 'crypto'
class IdGenerator {
  public getId = (): string => {
    const id = crypto.randomUUID();
    return id;
  };
}

export default IdGenerator;
