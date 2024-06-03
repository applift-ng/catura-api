/* eslint-disable prettier/prettier */
class socketActions {
    public io;
    constructor(socket: unknown){
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
                if(data) {
                    socket.to(data.orderId).emit('dataFilled', data);
                }
            })
        })
    }
}

export default socketActions;