import type { ICreateAccountData, ILoginData } from '../types/auth';
import type { IApiResponse } from '../types/common';
import api from './api';

export const postUser = async (body: ICreateAccountData): Promise<IApiResponse<void>> => {
    const response = await api.post('/users', body);
    return response.data;
}

export const postLogin = async (body: ILoginData): Promise<IApiResponse<string>> => {
    const response = await api.post('/auth/login', body);
    return response.data;
}
