
import Achivement from "@/databases/postgresql/repository/Achivement.repository";
import { ParameterDetailDTO } from "@/dto/ParameterDetailsDTO";

import { In } from "typeorm";

class AchivementService {
    /**
   * It returns an array of objects, each object contains a companyId and an array of transactions
   * @param {any} data - any
   * @returns - An array of objects with the following structure:
   *     {
   *       companyId: string,
   *       transactions: Array<TransactionInformation>
   *     }
   */
  async parameterDetail(data: any): Promise<any> {
    const transactionInforData: Array<ParameterDetailDTO> = [];

    const handleDataRes = (record : any) => {
        record.filter((record: any) => {
            transactionInforData.push({
                id: Math.floor(Math.random()*10000),
                parameter: record.parameter,
                selected: false,
                chartData: [{
                    x: record.updateDate,
                    y:  record.value,
                    score: record.score,
                }]
            })
        });
    }

    const record = await Achivement.queryAchivement(data);
    handleDataRes(record)

    const dataRes = transactionInforData.reduce((accumulator: any, currentItem: any) => {
        const condition = accumulator.some((item: any) => item.parameter === currentItem.parameter);
        if (!condition) {
            accumulator.push(currentItem);
        } else {
            accumulator.forEach((item: any) => {
                if (item.parameter === currentItem.parameter) {
                    item.chartData.push(...currentItem.chartData)
                }
            }) 
        }
        return accumulator
    }, []);
    return dataRes;
  }
}
export default new AchivementService;