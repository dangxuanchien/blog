import axios from '@/api/axios';
import { Endpoints } from '@/api/endpoints';
class WeightService {
    public async getWeight(): Promise<any> {
        const res = await axios.get(Endpoints.GET_WEIGHT);
        return res;
    }
    //call Api save data weight
    public async saveWeight(body: object) {
        return await axios.post(Endpoints.SAVE_WEIGHT, body);
    }
}

export default WeightService;
