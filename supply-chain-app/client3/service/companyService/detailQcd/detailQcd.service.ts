import axios from '@/api/axios';
import { Endpoints } from '@/api/endpoints';

class DetailQcdService {
    public getCompanyDetail(paramSearch: any): Promise<any> {
        return axios.post(Endpoints.COMPANY_EVALUATION_GET_PARAMETER, paramSearch);
    }

    public qcdChartRelevant(param: any): Promise<any> {
        return axios.post(Endpoints.COMPANY_EVALUATION_QCD_RELEVANT, param);
    }

    public qcdChartParameter(param: any): Promise<any> {
        return axios.post(Endpoints.COMPANY_EVALUATION_QCD_PARAMETER, param);
    }
}

export default new DetailQcdService();
