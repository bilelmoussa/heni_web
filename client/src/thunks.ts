import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { updateSession } from "./store/system/actions";
import { AppState } from "./store";
import axios from 'axios';
import { addError } from './store/error/actions';
import { switchTheme } from './store/theme/actions';
import { addMessageError } from './store/message-error/actions';
import { addMessageSuccess } from './store/message-success/actions'
import { fetchMessages, fetchMessagesCount, fetchNewMessage, deleteMessage, updateSeenMessage, fetchNewMessagesCount } from './store/messages/actions';
import { Message } from "./store/messages/types";
import setCsrfToken from './setCsrfToken';
import { add_error_msg, add_success_msg } from './store/add-projects-response/actions'


export type ThunkType = ThunkAction<void, AppState, null, Action<string>>;

export const fetchCsrfToken = (): any => async (dispatch: any) => {
    try {
        const { data } = await axios.get('/api/csrf-token');

        setCsrfToken(data.csrfToken);
    } catch (err) {
        console.log(err)
    }
}

export const thunkLogin = (
    email: string,
    password: string
  ): ThunkType  => async dispatch => {
    try {
        const res = await axios.post('/api/login/', {email, password});

        dispatch(
            updateSession({
                verified: true,
                loggedIn: true,
                email: res.data.email,
                fullName: res.data.fullName,
            })
        );
    } catch (err) {
        console.log(err.response.data);
        dispatch(
            addError({
                message: err.response.data?.message
            })
        )
    }
};

export const thunkLogout = (
  ): ThunkType  => async dispatch => {
    try{
        await axios.post('/api/logout/');

        dispatch(
            updateSession({
                verified: true,
                loggedIn: false,
                email:'',
                fullName: {firstName: '', lastName: ''},
            })
        );
    } catch (err) {
        console.log(err.response.data);
    }
};

export const resetError = ():ThunkType => dispatch => {
    dispatch(addError({
        message: ''
    }));
} 

export const verifyOpenSession = ():any => async (dispatch: any) => {
    try {
        const res = await axios.post('/api/verifyOpenSession');
        dispatch(
            updateSession({
                verified: true,
                loggedIn: res.data.loggedIn,
                email: res.data.email || '',
                fullName: res.data.fullName || '',
            })
        )
    } catch (err) {
        console.log(err);
        dispatch(
            updateSession({
                verified: true,
                loggedIn: false,
                email:'',
                fullName: {firstName: '', lastName: ''},
            })
        )
    }
}

export const switchDark = (darkState: boolean):ThunkType => dispatch => {
    localStorage.setItem('darkState', JSON.stringify(darkState));
    dispatch(
        switchTheme({
            darkState: darkState
        })
    )
}

export const addMsgError = (message: string): any => (dispatch: any) => {
    dispatch(
        addMessageError({
            message: message
        })
    )
}

export const addMsgSuccess = (message: string): any => (dispatch: any) => {
    dispatch(
        addMessageSuccess({
            message: message
        })
    )
}

export const fetchMsgs = (skip: number, limit: number): any => async (dispatch: any) => {
    try {
        const { data } = await axios.post('/api/message/fetch-messages', {skip: skip, limit: limit});

        dispatch(fetchMessages({messages: data.messages}));
    } catch (err) {
        console.log(err)
    }
}

export const getNewMessage = (message: Message): any => (dispatch: any) => {
    dispatch(fetchNewMessage({messages: [message] }));
}

export const fetchMsgsCount = (): any => async (dispatch: any) => {
    try {
        const { data } = await axios.post('/api/message/fetch-messages-count');
        
        dispatch(fetchMessagesCount({count: data.messagesCount}));
    } catch (err) {
        console.log(err)
    }
}

export const deleteMessageById = (id: string) => async (dispatch: any) => {
    try {
        await axios.post('/api/message/delete-message', {id: id});

        dispatch(deleteMessage(id));
    } catch (err) {
        console.log(err)
    }
} 

export const updateSeenMsg = (ids: any) => async (dispatch: any) => {
    try {
        await axios.post('/api/message/update-seen-message', {ids});   
        
        dispatch(updateSeenMessage(ids));
    } catch (err) {
        console.log(err)
    }
}

export const fetchNewMsgsCount = (): any => async (dispatch: any) => {
    try {
        const { data } = await axios.post('/api/message/fetch-new-messages-count');
        dispatch(fetchNewMessagesCount({newMessages: data.newMessagesCount}));
    } catch (err) {
        console.log(err)
    }
}


export const addProject = (files: any, name: string, description: string): any => async (dispatch :any) => {
    try {
        // Initial FormData
        const formData = new FormData();
        formData.append('name', `${name}`);
        formData.append('description', `${description}`);
        formData.append('createdOn', `${Date.now()}`);
        formData.append('modifiedOn', `${Date.now()}`);

        await files.forEach((file: any) => {
            formData.append("file", file, file.name);
        });
        
        await axios.post('/api/project/add-project', formData, {
            headers: {
                "Content-Type": "multipart/form-data"
              } 
        });
        
        dispatch(add_success_msg({success_msg: 'Project Saved With Success'}))    
    } catch (err) {
        console.log(err)
        console.log(err.response.data);
        dispatch(add_error_msg({error_msg: err.response.data.message}));
    }
}

export const resetAddProjectRes = () => (dispatch: any) => {
    dispatch(add_success_msg({success_msg: ''}));
    dispatch(add_error_msg({error_msg: ''}));
}
