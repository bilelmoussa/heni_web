import { fetchMessages, fetchMessagesCount, deleteMessageById, updateSeenMessage, fetchNewMessagesCount } from '../use-cases';
import { Response, Request } from 'express';
import { auth } from '../middleware';

const messageController = async (req: Request, res: Response) => {
    try {
        auth(req);

        const { skip, limit } = req.body;
        
        const msgs = await fetchMessages(skip, limit);

        res.status(200).json({success: true, messages: msgs});
    } catch (err) {
        console.log(err);
        res.status(err.status || 500).json({success: false, message: err.message});
    }
}

const messagesCountController = async (req: Request, res: Response) => {
    try {
        auth(req);

        const msgsCount = await fetchMessagesCount();

        res.status(200).json({success: true, messagesCount: msgsCount});
    } catch (err) {
        console.log(err);
        res.status(err.status || 500).json({success: false, message: err.message});
    }
}

const deleteMessageController = async (req: Request, res: Response) => {
    try {
        auth(req);

        const{ id } = req.body;

        const result = await deleteMessageById(id);

        res.status(200).json({success: true, deletedMsg: result});
    } catch (err) {
        console.log(err);
        res.status(err.status || 500).json({success: false, message: err.message});
    }
}

const updateSeenMessageController = async (req: Request, res: Response) => {
    try {
        auth(req);

        const{ ids } = req.body;

        const result = await updateSeenMessage(ids);

        res.status(200).json({success: true, updatedMessage: result});
    } catch (err) {
        console.log(err);
        res.status(err.status || 500).json({success: false, message: err.message});
    }
}

const newMessagesCountController = async (req: Request, res: Response) => {
    try {
        auth(req);

        const newMsgsCount = await fetchNewMessagesCount();

        res.status(200).json({success: true, newMessagesCount: newMsgsCount});
    } catch (err) {
        console.log(err);
        res.status(err.status || 500).json({success: false, message: err.message});
    }
}

export { messageController, messagesCountController, deleteMessageController, updateSeenMessageController, newMessagesCountController };