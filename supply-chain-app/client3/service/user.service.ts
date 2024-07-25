import axios from '@/api/axios';
import { Endpoints } from '@/api/endpoints';
import { IUser } from 'redux/login/operations';
import CacheService from './cache.service';
import request from './http';

class UserService {
    static login(data: IUser) : Promise<any> {
        return axios.post(Endpoints.LOGIN, data);
    }

    static getUserId(): string  {
        return CacheService.get('userId');
    } 
}

export default UserService;
