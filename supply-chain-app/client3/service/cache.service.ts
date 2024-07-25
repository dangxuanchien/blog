class CacheService {
    static get = (cacheKey) => JSON.parse(localStorage.getItem(cacheKey));

    static getValue = (key) => localStorage.getItem(key);

    static set = (cacheKey, data) => {
        const checkData = this.get(cacheKey);
        if(checkData){
            return;
        }
        localStorage.setItem(cacheKey, JSON.stringify(data));
    };

    static clear = (cacheKey) => {
        localStorage.removeItem(cacheKey);
    };

    static clearAll = () => {
        localStorage.clear();
    };
}

export default CacheService;
