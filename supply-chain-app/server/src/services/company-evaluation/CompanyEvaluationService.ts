import { ItemCategoryInformation } from "@/databases/postgresql/entities/ItemCategoryInformation";
import { ItemInformation } from "@/databases/postgresql/entities/ItemInformation";
import { TransactionInformation } from "@/databases/postgresql/entities/TransactionInformation";
import { PriceCompareCompanyDTO } from "@/dto/PriceCompareDTO";
import { RequestSearchCompanyDTO } from "@/dto/SearchCompanyDTO";
import { Between } from "typeorm";


class CompanyEvaluationService {
  /**
   * This function is used to get the business conditions for the search company page
   * @param {RequestSearchCompanyDTO} data - RequestSearchCompanyDTO
   * @returns an object with two properties: itemCategoryName and itemName.
   */
  async getBusinessConditions(data: RequestSearchCompanyDTO): Promise<any> {
    const itemName = ItemInformation.find({
      select: {
        itemName: true,
        itemId: true,
      },
    });
    const itemCategoryName = ItemCategoryInformation.find({
      select: {
        itemCategoryName: true,
        itemCategoryId: true,
      },
    });
    const item_name: Array<object> = (await itemName).map((item) => {
      const itemNameObj = {
        name: item.itemName,
        value: item.itemId,
      };
      return itemNameObj;
    });
    const item_category_name: Array<object> = (await itemCategoryName).map((item) => {
      const itemCategoryNameObj = {
        name: item.itemCategoryName,
        value: item.itemCategoryId,
      };
      return itemCategoryNameObj;
    });

    return {
      itemCategoryName: this.deduplicate(item_category_name),
      itemName: this.deduplicate(item_name),
    };
  }

  /**
   * It returns a new array with only the unique values from the original array
   * @param arr - Array<Object> - The array that you want to deduplicate.
   * @returns the array with the duplicates removed.
   */
  deduplicate(arr: Array<Object>) {
    return arr.filter((value, index, arr) => arr.indexOf(value) === index);
  }

  /**
   * It takes an array of objects and a key, and returns an array of objects with only the key value
   * @param data - Array<Object> - The data that you want to convert.
   * @param {string} key - The key of the data you want to extract.
   * @returns An array of objects.
   */
  convertData(data: Array<Object>, key: string): Array<Object> {
    return data.map((item: any) => {
      return item?.[key];
    });
  }

  /**
   * It returns an array of ItemCategoryInformation objects that have the same name as the name
   * parameter
   * @param {string} name - The name of the item category you want to search for.
   * @returns An array of ItemCategoryInformation objects.
   */
  async searchItemCategory(name: string): Promise<Array<ItemCategoryInformation>> {
    return ItemCategoryInformation.createQueryBuilder('itemCategoryInformation')
      .where('itemCategoryInformation.itemCategoryName = :itemCategoryName', { itemCategoryName: name })
      .getMany();
  }

  /**
   * It returns an array of objects, each object contains a companyId and an array of transactions
   * @param {any} data - any
   * @returns - An array of objects with the following structure:
   *     {
   *       companyId: string,
   *       transactions: Array<TransactionInformation>
   *     }
   */
  async priceCompare(data: any): Promise<any> {
    let { from, to, itemId, companyIds } = data;
    if (!Array.isArray(companyIds)) {
      companyIds = [companyIds]
    }
    const records = await TransactionInformation.find({
      where: {
        updateDate: Between(new Date(from), new Date(to)),
        itemId: itemId
      },
      order: { 
        updateDate: "ASC" 
      }
    });    
    const transactionInforData: Array<PriceCompareCompanyDTO> = [];
    companyIds.forEach((companyId:string) => {
        const result = records.filter(record => 
          record.buyerCompanyId === companyId || record.vendorCompanyId === companyId
        )
        if(result.length > 0) {
          transactionInforData.push({companyId: companyId, transactions: result})
        }
    });
    return transactionInforData;
  }
}

export default new CompanyEvaluationService();
