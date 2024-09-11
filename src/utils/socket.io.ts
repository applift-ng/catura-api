/* eslint-disable prettier/prettier */
import AppUtils from './app.util';
class socketActions {
  public io;
  private appUtils = new AppUtils();
  private driversOnline = [];
  constructor(socket: unknown) {
    this.io = socket;
    this.connectInternal();
  }
  public connectInternal = (): void => {
    this.io.on('connection', (socket) => {
      // console.log('friesland');
      socket.on('userConnect', (room) => {
        socket.join(`${room}`);
        console.log(`${socket.id} has joined room: ${room}`);
      });
      socket.on('dataFilled', (data) => {
        console.log(data);
        if (data) {
          socket.to(data.orderId).emit('dataFilled', data);
        }
      });
      socket.on('calculatePrice', (data) => {
        console.log(data);
        if (data) {
          const value = this.appUtils.calcPrice(data.position1, data.position2);
          //   console.log(value);
          socket.emit('priceCalced', value);
        }
      });
      socket.on('findDrivers', (data) => {
        socket.join(`findDrivers${data.id}`);
        const closestDriver =
        this.appUtils.findClosestDrivers(this.driversOnline, data);
        socket.to(`findDrivers${data.id}`).emit(`driverFound`, closestDriver);
      });
      socket.on('connectToServer', (data) => {
        this.driversOnline.push(data);
      })
      socket.on('disconnectFromServer', (data) => {
        this.driversOnline = this.driversOnline.filter(x => x.id !== data.id);
      })
    });
  };
}

export default socketActions;
