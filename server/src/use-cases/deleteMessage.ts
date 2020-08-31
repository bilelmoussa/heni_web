import { makeIdValidation } from '../validation';

const makeDeleteMessage = (deleteMessage: Function) => {
    return async (id: string) => {
        await makeIdValidation(id);
        return await deleteMessage(id);
    }
}

export default makeDeleteMessage;