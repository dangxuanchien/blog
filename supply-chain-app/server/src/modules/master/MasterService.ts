import { UserMaster } from '@/databases/postgresql/entities/UserMaster';
import { WeightMaster } from "@/databases/postgresql/entities/WeightMaster";
import SettingSearchRepository from "@/modules/master/SettingSearchRepository";
import { Equal } from "typeorm";
import { RequestSearchConditionDTO } from './RequestSearchConditionDTO';
import { ResponseSearchConditionDTO } from './ResponseSearchConditionDTO';

class MasterService {
  /**
   * It updates the weight_master table with the values passed in the body
   * @param {any} body - any
   * @returns The updated row
   */
  async saveWeightInfo(userId: string, body: any): Promise<any> {
    const user = await UserMaster.findOneBy({userId: userId});
    const res = WeightMaster.save({user: user, updateDate: new Date(), ...body});
    return res;
  }

  /**
   * It returns a promise of a WeightMaster object, which is a database object
   * @param {string} userId - string
   * @returns The weight master record for the user.
   */
  async getByIdWeightInfo(userId: string): Promise<any> {
    const res = await WeightMaster.find(
        { 
          select: {
            qualityWeight: true,
            costWeight:  true,
            deliveryWeight:  true,
            financeWeight:  true,
            environmentWeight:  true,
            laborWeight:  true,
            ethicsWeight:  true,
            sustainableWeight:  true,
          },
          where: {
            user: Equal(userId)
          },
          order: {
            updateDate: "DESC",
          },
          take: 1,
        }
    )
    return res;
  }
  async getSearchCondition(param: RequestSearchConditionDTO ): Promise<ResponseSearchConditionDTO[]> {
    let where = '';
    const itemCategoryGroup = param.itemCategoryGroupName && param.itemCategoryGroupName.trim().split(" ");
    const itemCategory = param.itemCategoryName && param.itemCategoryName.trim().split(" ");
    const itemName = param.itemName && param.itemName.trim().split(" ");

    const handleQuery = (paramSearch: Array<string>, tableQuery: string) => {

      paramSearch.forEach( (item: any) => {
        where = where.concat( where.length === 0 ? 'where ' : ` OR `,`${tableQuery} like '${item}%' `);

      })
    }
    if (itemCategoryGroup.length > 0) {

      handleQuery(itemCategoryGroup, 'icgi."item_category_group_name"')
    }
    if (itemCategory.length > 0) {
      handleQuery(itemCategory, 'ici."item_category_name"')
   
    }
    if (itemName.length > 0) {
      handleQuery(itemName, 'filter_category."item_name"')
   
    }

    return SettingSearchRepository.queryMasterData(where)
  }
}
export default new MasterService();
