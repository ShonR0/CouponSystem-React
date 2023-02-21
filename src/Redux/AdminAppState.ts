import { Admin, UserType } from "../Models/Auth";

export class AdminAppState {
    // Step 1 - Define User global app state
    public admin: Admin = { email:"", token:"", userType: null };
}

// Step 2 - Define all actions
export enum ActionType {
    LOGGED_IN = "LOGGED_IN",
    LOGGED_OUT = "LOGGED_OUT",
    REGISTERED = "REGISTERED",
}

// Step 3 - define what is action in terms of data
export interface AdminAction {
    type: ActionType;
    payload: any;
}

// Step 4 - Create creator function
export function loggedIn(admin: Admin): AdminAction {
    return{
        type: ActionType.LOGGED_IN,
        payload: admin
    }
}
export function registered(): AdminAction {
    return{
        type: ActionType.REGISTERED,
        payload: {}
    }
}
export function loggedOut(): AdminAction {
    return{
        type: ActionType.LOGGED_OUT,
        payload: {}
    }
}

// Step 5 - Reducer function perform the required action
export function adminReducer(currentState: AdminAppState = new AdminAppState(),action:AdminAction): AdminAppState {
    const newState = {...currentState} //Spread Operator
    switch(action.type){
        case ActionType.LOGGED_IN: {
            newState.admin = action.payload;
            break;
        }
        case ActionType.LOGGED_OUT: {
            newState.admin = { email:"", token:"", userType: null };
            break;
        }
        case ActionType.REGISTERED: {
            
        }
    }
    return newState;
}