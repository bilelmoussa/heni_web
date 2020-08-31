import socket from 'socket.io';
import { Server } from 'http';
import { Logger } from '../shared/logger';
import express from 'express';
import { isLoggedIn } from '../shared/auth';
import { addMessage } from '../use-cases';

const setupSocket = (server: Server, session: express.RequestHandler) => {
    const io = socket(server);
    
    //  CLIENT SOCKET
    const clientSocket = io.of('/client');

    //  ADMIN SOCKET
    const adminSocket = io.of('/admin');

    //  SOCKET SESSION MIDDLEWARE
    adminSocket.use((socket, next) => {
        session(socket.request, socket.request.res, next);
    });

    adminSocket.use((socket, next) => {
        if(isLoggedIn(socket.request)) {
            next();
        } else {
            next(new Error('unauthorized'));
        }
    });

    clientSocket.use((socket, next) => {
        session(socket.request, socket.request.res, next);
    });

    // SOCKET CLIENT CONNECTION INIT
    clientSocket.on('connection', (socket) => {

        socket.on('message', async (data) => {
            try {
                const { message } = data;
                
               const newMessage = await addMessage(message);
                
                clientSocket.emit('message-response', { message: 'Message sent with success !' });
                
                adminSocket.emit('new-message', { message: newMessage });
            } catch (err) {
                clientSocket.emit('messageError', { error: err.message })
            }
        });
        
        //  SOCKET ERROR EVENTHANDLER
        clientSocket.on('error', (err: any) => {
            Logger.error('client socket.io error', err);
        });

        //  SOCKET DISCONNECT EVENTHANDLER
        socket.on('disconnect', () => {
            io.emit('client user disconnected');
        });
    });

    // SOCKET ADMIN CONNECTION INIT
    adminSocket.on('connection', (socket) => {        
    });
  
}

export { setupSocket }