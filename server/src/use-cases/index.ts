import { User, addNewUser, getUserByEmail, Message, addNewMessage, getMessages, messagesCount, deleteMessage, updateSeenMsg, newMessagesCount, Project, addNewProject } from '../data-access';
import makeAddUser from './addUser';
import loginVerify from './login-verify';
import makeAddMessage from './addMessage';
import makeGetMessages from './getMessages';
import makeGetMessagesCount from './getMessagesCount';
import makeDeleteMessage from './deleteMessage';
import makeUpdateSeenMsg from './updateSeenMsg';
import makeNewGetMessagesCount from './getNewMessagesCount';
import makeAddProject from './addProject';
import makeSaveImages from './saveImages';
import { uploadImage } from '../cloudinary'

const addUser = makeAddUser({User, addNewUser});

const makeLoginVerify = loginVerify(getUserByEmail);

const addMessage = makeAddMessage({Message, addNewMessage});

const fetchMessages =  makeGetMessages(getMessages);

const fetchMessagesCount = makeGetMessagesCount(messagesCount);

const fetchNewMessagesCount = makeNewGetMessagesCount(newMessagesCount);

const deleteMessageById = makeDeleteMessage(deleteMessage);

const updateSeenMessage = makeUpdateSeenMsg(updateSeenMsg);

const addProject = makeAddProject({Project, addNewProject});
 
const saveImages = makeSaveImages({uploadImage});

export { addUser, makeLoginVerify, addMessage, fetchMessages, fetchMessagesCount, deleteMessageById, updateSeenMessage, fetchNewMessagesCount, addProject, saveImages };