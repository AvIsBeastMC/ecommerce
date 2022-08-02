import axios, { AxiosError, AxiosResponse } from 'axios';
import React from 'react'
import { GlobalStateInterface } from './useGlobalState';
import { MongooseAccountInterface } from '../interfaces/account';
import moment from 'moment';
import handleAxiosError from './handleAxiosError';

export default function refresh(state: GlobalStateInterface, setState: React.Dispatch<React.SetStateAction<GlobalStateInterface>>):boolean {
    axios.get("/api/accountHandler", {
        headers: {
            method: "login",
            email: state.account.email,
            password: state.account.password,
        }
    }).then((response: AxiosResponse<MongooseAccountInterface>) => {
        setState({
            account: response.data,
            expiresOn: moment(Date()).add(24, 'hours').toString(),
            loggedIn: true
        });
        return true;
    }).catch((e: AxiosError<Error>) => handleAxiosError(e))

    return false;
}