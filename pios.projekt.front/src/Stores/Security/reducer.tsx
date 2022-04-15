import { ISecurityActionType, ISecutiryState } from './interfaces';
import * as actionTypes from './actionTypes';
import { VerifiedUserClass } from '../../Models/User';

const initialState: ISecutiryState = {
    verifiedUser: new VerifiedUserClass(),
};

// REDUCER
export function securityReducer(state: ISecutiryState = initialState, action: ISecurityActionType): ISecutiryState {
    switch (action.type) {
        case actionTypes.USER_LOGIN:
            console.log('ININ');
            return {
                ...state,
                verifiedUser: action.verifiedUser,
            };

        default:
            return state;
    }
}
