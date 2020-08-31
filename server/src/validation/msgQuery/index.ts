import getMessagesQueryVerification from './msgQuery-verification';
import getMessagesQuerySchema from './msgQuery-schema';
import validateSchema from '../../shared/validator';

const checkGetMessagesQuery = validateSchema(getMessagesQuerySchema);

const makeGetMessagesQueryVerification = getMessagesQueryVerification(checkGetMessagesQuery);


export { makeGetMessagesQueryVerification }