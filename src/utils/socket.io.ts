/* eslint-disable prettier/prettier */
class socketActions {
    public io;
    constructor(socket: unknown){
        this.io = socket;
        this.connectInternal();
    }
    public connectInternal = (): void => {
        this.io.on('connection', (socket) => {
            console.log('friesland');
            socket.on('join', (room) => {
                socket.join(`${room}`);
            });
        })
    }
}

export default socketActions;