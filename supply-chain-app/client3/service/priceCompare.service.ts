import axios from '@/api/axios';
import { Endpoints } from '@/api/endpoints';

const compareAPI = {
    comparison: (paramPriceCompare) => {
        return axios.post(Endpoints.COMPANY_EVALUATION_PRICE_COMPARE, paramPriceCompare);
    },
};
export default compareAPI;
