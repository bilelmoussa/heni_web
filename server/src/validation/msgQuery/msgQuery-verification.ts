import { BadRequest } from '../../errors';

const getMessagesQueryVerification = (checkGetMessagesQuery: Function) => {
    return async (skip: number, limit: number) => {
        const getMsgsQueryValidation = checkGetMessagesQuery({
            skip,
            limit
        });

        if(getMsgsQueryValidation) {
            throw new BadRequest('bad query');
        }
    }
}

export default getMessagesQueryVerification;