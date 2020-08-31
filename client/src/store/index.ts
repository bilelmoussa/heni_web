import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { systemReducer } from './system/reducers';
import { errorReducer } from './error/reducers';
import { themeReducer } from './theme/reducers';
import { messageErrorReducer } from './message-error/reducers';
import { messageSuccessReducer } from './message-success/reducers';
import { messagesReducer } from './messages/reducers';
import { cloudinaryReducer } from './cloudinary/reducers'
import { addProjectResReducer } from './add-projects-response/reducers';

const rootReducer = combineReducers({
    system: systemReducer,
    error: errorReducer,
    theme: themeReducer,
    messageError: messageErrorReducer,
    messageSuccess: messageSuccessReducer,
    inbox: messagesReducer,
    cloudinary: cloudinaryReducer,
    add_project_response: addProjectResReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
    const middlewares = [thunkMiddleware];
    const middlewareEnhancer = applyMiddleware(...middlewares);

    const store = createStore(
        rootReducer,
        composeWithDevTools(middlewareEnhancer)
    );

    return store;
}

