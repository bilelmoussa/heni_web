import io from 'socket.io-client';
import { addMsgError, addMsgSuccess, getNewMessage  } from '../thunks';
import { store } from '../appStore';

const clientSocket = io.connect('localhost:5000/client');

export const addMessage = (message: any) => {
    clientSocket.emit('message', { message });

    clientSocket.on('message-response', (data: any) => {
        store.dispatch(addMsgSuccess(data.message))
    });

    clientSocket.on('messageError', (data: any) => {
        store.dispatch(addMsgError(data.error));
    });
      
    clientSocket.on('error', (err: any) => {
        console.log('client Socket.io Server Error : ', err);
    });
}

export const getMessage = () => {
    const adminSocket = io.connect('http://localhost:5000/admin');

    adminSocket.on('new-message', (data: any) => {
        store.dispatch(getNewMessage(data.message));
    });
}