import messageSchema from './message-schema';
import Message, { MessageType } from './message';
import validateSchema from '../../shared/validator';

const checkMessageSchema = validateSchema(messageSchema);

const makeMessage = async (messageInfo: MessageType) => new Message(messageInfo, checkMessageSchema);


export { makeMessage, checkMessageSchema };