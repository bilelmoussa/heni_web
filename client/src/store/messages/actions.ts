import { MessagesState, FETCH_MESSAGES, MessagesActionTypes, MessageCountState, FETCH_MESSAGES_COUNT, ADD_NEW_MESSAGE, DELETE_MESSAGE, UPDATE_SEEN_MESSAGE, NewMessageCountState, FETCH_NEW_MESSAGES_COUNT } from './types';

export function fetchMessages(newMessages: MessagesState): MessagesActionTypes  {
    return {
        type: FETCH_MESSAGES,
        payload: newMessages
    }
}

export function fetchNewMessage(newMessages: MessagesState): MessagesActionTypes  {
    return {
        type: ADD_NEW_MESSAGE,
        payload: newMessages
    }
}

export function fetchMessagesCount(messagesCount: MessageCountState): MessagesActionTypes  {
    return {
        type: FETCH_MESSAGES_COUNT,
        payload: messagesCount
    }
}

export function deleteMessage(_id: string): MessagesActionTypes {
    return {
      type: DELETE_MESSAGE,
      meta: {
        _id
      }
    }
}

export function updateSeenMessage(ids: string[]): MessagesActionTypes {
    return {
      type: UPDATE_SEEN_MESSAGE,
      meta: {
        ids
      }
    }
}

export function fetchNewMessagesCount(newMessagesCount: NewMessageCountState): MessagesActionTypes  {
  return {
      type: FETCH_NEW_MESSAGES_COUNT,
      payload: newMessagesCount
  }
}