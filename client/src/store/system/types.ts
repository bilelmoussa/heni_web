type fullName = {
    firstName: string
    lastName: string
}

export interface SystemState {
    verified: boolean;
    loggedIn: boolean;
    email: string;
    fullName: fullName;
}

export const UPDATE_SESSION = 'UPDATE_SESSION';

interface IUpdateSessionAction {
    type: typeof UPDATE_SESSION;
    payload: SystemState
}

export type SystemActionTypes = IUpdateSessionAction;
