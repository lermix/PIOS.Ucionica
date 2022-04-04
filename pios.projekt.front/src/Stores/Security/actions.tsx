import * as actionTypes from './actionTypes';
import { ISecurityActionType } from './interfaces';
import { AppState } from '../rootReducer';
import { requests } from '../agent';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { LoginDto, VerifiedUser } from '../../Models/User';

const apiActions = {
    Login: (login: LoginDto): Promise<VerifiedUser> => requests.post('Security/Login', login),
};

export function dispatchUserInfo(token: string | undefined, username: string | undefined, role: string | undefined): ISecurityActionType {
    return {
        type: actionTypes.USER_LOGIN,
        verifiedUser: { token: token, username: username, roles: role },
    };
}
export const login =
    (loginDto: LoginDto): ThunkAction<void, AppState, unknown, Action<string>> =>
    async (dispatch) => {
        function loginSuccess(verifiedUser: VerifiedUser): ISecurityActionType {
            if (verifiedUser.token) {
                document.cookie = `jwt=` + verifiedUser.token + `;path=/`;
                verifiedUser.username && (document.cookie = `username=` + verifiedUser.username + `; path=/`);
            }
            return {
                type: actionTypes.USER_LOGIN,
                verifiedUser: verifiedUser,
            };
        }

        try {
            dispatch(loginSuccess(await apiActions.Login(loginDto)));
        } catch (error) {
            console.log('ERROR  ---- ' + error);
        }
    };

export const logOut = (): ThunkAction<void, AppState, unknown, Action<string>> => async (dispatch) => {
    function logOut(): ISecurityActionType {
        return {
            type: actionTypes.USER_LOGIN,
            verifiedUser: { token: undefined, username: undefined, roles: undefined },
        };
    }

    try {
        document.cookie.split(';').forEach(function (c) {
            document.cookie = c.replace(/^ +/, '').replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
        });
        //window.localStorage.clear();
        dispatch(logOut());
    } catch (error) {
        console.log(error);
    }
};

export const setTokenIfExists = (): ThunkAction<void, AppState, unknown, Action<string>> => async (dispatch) => {
    try {
        const token = document.cookie
            .split('; ')
            .find((row) => row.startsWith('jwt='))
            ?.split('=')[1];
        const username = document.cookie
            .split('; ')
            .find((row) => row.startsWith('username='))
            ?.split('=')[1];

        if (token) {
            const jwtData = token.split('.')[1];
            const decodedJwtJsonData = window.atob(jwtData);
            const decodedJwtData = JSON.parse(decodedJwtJsonData);

            const roles = decodedJwtData.role;
            dispatch(dispatchUserInfo(token, username, roles));
        }
    } catch (error) {
        dispatch(dispatchUserInfo(undefined, undefined, undefined));
        console.log(error);
    }
};
