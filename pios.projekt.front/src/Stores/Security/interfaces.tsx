import { VerifiedUser } from '../../Models/User';
import * as actionTypes from './actionTypes';

// STATE
export interface ISecutiryState {
    verifiedUser: VerifiedUser;
}

// ACTIONS

interface ILogin {
    type: typeof actionTypes.USER_LOGIN;
    verifiedUser: VerifiedUser;
}

export type ISecurityActionType = ILogin;
