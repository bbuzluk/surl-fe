import axios from 'axios';
import type { ICreateAccountData, ILoginData } from '../types/auth';
import type { IApiResponse } from '../types/common';

const API_URL = 'http://localhost:8080/api';
export const api = axios.create({ baseURL: API_URL });

export const postUser = async (body: ICreateAccountData): Promise<IApiResponse<void>> => {
    const response = await api.post('/v1/users', body);
    return response.data;
}

export const postLogin = async (body: ILoginData): Promise<IApiResponse<string>> => {
    const response = await api.post('/v1/auth/login', body);
    return response.data;
}
