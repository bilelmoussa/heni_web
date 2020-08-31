import { FETCH_MESSAGES, MessagesActionTypes, FETCH_MESSAGES_COUNT, inboxMessagesState, ADD_NEW_MESSAGE, DELETE_MESSAGE, UPDATE_SEEN_MESSAGE, FETCH_NEW_MESSAGES_COUNT } from './types';

const initialState: inboxMessagesState = {
    messages: [],
    count: 0,
    newMessages: 0
}

export function messagesReducer(
    state = initialState,
    action: MessagesActionTypes
): inboxMessagesState {
    switch (action.type) {
        case FETCH_MESSAGES:
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages],
            }
        case ADD_NEW_MESSAGE:
            return {
                messages: [...action.payload.messages, ...state.messages],
                count: (state.count + 1),
                newMessages: (state.newMessages + 1)
            }    
        case FETCH_MESSAGES_COUNT: 
            return {
                ...state,
                count: action.payload.count
            }
        case DELETE_MESSAGE:
            return {
                ...state,
                messages: state.messages.filter(
                    message => message._id !== action.meta._id
                ),
                count: (state.count - 1),
            }
        case UPDATE_SEEN_MESSAGE:
            action.meta.ids.forEach(id => {
               const i = state.messages.findIndex(msg => msg._id === id);
               state.messages[i].seen = true
            });
            
            return {
               ...state,
               messages: state.messages,
               newMessages: (state.newMessages - action.meta.ids.length)
            }      
        case FETCH_NEW_MESSAGES_COUNT: 
            return {
                ...state,
                newMessages: action.payload.newMessages
            }
        default:
            return state;
    }
}