export interface Message {
    _id: string
    name: string
    email: string
    message: string
    seen: boolean
    createdOn: number
}

export interface MessagesState {
    messages: Message[];
}

export interface MessageCountState {
    count: number
}

export interface NewMessageCountState {
    newMessages: number
}

export interface inboxMessagesState {
    messages: Message[]
    count: number
    newMessages: number
}

export const FETCH_MESSAGES = 'FETCH_MESSAGES';

export const FETCH_MESSAGES_COUNT = 'FETCH_MESSAGES_COUNT';

export const FETCH_NEW_MESSAGES_COUNT = 'FETCH_NEW_MESSAGES_COUNT';

export const ADD_NEW_MESSAGE = 'ADD_NEW_MESSAGE';

export const DELETE_MESSAGE = 'DELETE_MESSAGE';

export const UPDATE_SEEN_MESSAGE = 'UPDATE_SEEN_MESSAGE';

interface IFetchMessagesAction {
    type: typeof FETCH_MESSAGES;
    payload: MessagesState
}

interface IFetchMessagesCountAction {
    type: typeof FETCH_MESSAGES_COUNT;
    payload: MessageCountState
}

interface IFetchNewMessagesCountAction {
    type: typeof FETCH_NEW_MESSAGES_COUNT;
    payload: NewMessageCountState
}

interface IAddNewMessageAction {
    type: typeof ADD_NEW_MESSAGE;
    payload: MessagesState
}

interface DeleteMessageAction {
    type: typeof DELETE_MESSAGE
    meta: {
      _id: string
    }
}

interface UpdateSeenMessageAction {
    type: typeof UPDATE_SEEN_MESSAGE
    meta: {
        ids: string[]
    }
}

export type MessagesActionTypes = IFetchMessagesAction | IFetchMessagesCountAction | IAddNewMessageAction | DeleteMessageAction | UpdateSeenMessageAction | IFetchNewMessagesCountAction;