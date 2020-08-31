import { makeGetMessagesQueryVerification } from '../validation';

const makeGetMessages = (getMessages: Function) => {
    return async (skip: number, limit: number) => {
        await makeGetMessagesQueryVerification(skip, limit);
        
        return await getMessages({skip, limit});
    }
}

export default makeGetMessages;