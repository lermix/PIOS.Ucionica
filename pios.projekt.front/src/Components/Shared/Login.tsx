import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import { Input } from '@progress/kendo-react-inputs';
import { useEffect } from 'react';
import { login } from '../../Stores/Security/actions';
import { LoginDto } from '../../Models/User';

const Login: React.FC = () => {
    const dipatch = useDispatch();

    const [password, setPassword] = useState<string>('');
    const [username, setUsername] = useState<string>('');

    const handleLogin = () => {
        username && password && dipatch(login({ username: username, password: password } as LoginDto));
    };

    const handleKeyboardInput = (e: any) => {
        if (e.code == 'Enter') {
            handleLogin();
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyboardInput);
        return () => {
            window.removeEventListener('keydown', handleKeyboardInput);
        };
    }, [handleKeyboardInput]);

    return (
        <>
            <Dialog className="Login" title={'login'} minWidth={'20vh'} closeIcon={false}>
                <Input
                    name="value"
                    style={{ width: '100%', marginBottom: 20 }}
                    minLength={1}
                    type="text"
                    onChange={(e) => setUsername(e.target.value ? e.target.value.toString() : '')}
                    placeholder={'username'}
                />
                <Input
                    name="value"
                    style={{ width: '100%' }}
                    minLength={1}
                    type="password"
                    onChange={(e) => setPassword(e.target.value ? e.target.value.toString() : '')}
                    placeholder={'password'}
                />
                <DialogActionsBar>
                    <button className="k-button" onClick={() => handleLogin()}>
                        login
                    </button>
                </DialogActionsBar>
            </Dialog>
        </>
    );
};

export default Login;
