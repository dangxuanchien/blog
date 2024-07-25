import CacheService from 'service/cache.service';

export class UserData {
    public loginID?: string;
    public userCompany?: string;
    public accountName?: string;
    public authority?: string;
    public lang?: string;
}

export const getUserDataFromStorage = ():object | null => {
    //get user data from storage
    const loginID = CacheService.get('loginID');
    const userCompany = CacheService.get('userCompany');
    const accountName = CacheService.get('accountName');
    const authority = CacheService.get('authority');
    const lang = CacheService.get('lang');

    //convert user data to object
    const userData = new UserData();
    userData.loginID = loginID;
    userData.userCompany = userCompany;
    userData.accountName = accountName;
    userData.authority = authority;
    userData.lang = lang;
    
    return userData;
};