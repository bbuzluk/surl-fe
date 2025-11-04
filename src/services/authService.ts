import type { ILoginRequest } from '../types/auth';
import type { IApiResponse } from '../types/common';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/auth';
const api = axios.create({ baseURL: API_URL });

export const login = async (data: ILoginRequest): Promise<IApiResponse<string>> => {
    const response = await api.post<IApiResponse<string>>('/login', data);
    return response.data;
};