import { RequestDetailCompanyDTO, RequestSearchDetailCompanyDTO } from '@/dto/DetailCompanyDTO';
import { TypeSearch } from '@/utils/enum';
import { AppDataSource } from '../AppDataSource';
import { EvaluationDetailItem } from '../entities/EvaluationDetailItem';
import { EvaluationDetailItemCategory } from '../entities/EvaluationDetailItemCategory';
import { EvaluationDetailItemCategoryGroup } from '../entities/EvaluationDetailItemCategoryGroup';

class Achivement {
  queryAchivement = (data: any) => {
    let table: any;
    let condition : any = {
      companyIds: data.companyId
    };
    let where = 'ed.companyId IN(:companyIds)';
    
    // ĐK 1 - only data for categoryGroup
    if (
      data.itemCategoryGroup &&
      data.itemCategoryGroup.length > 0 &&
      data.categoryIds &&
      data.categoryIds.length === 0 &&
      data.itemNameIds &&
      data.itemNameIds.length === 0
    ) {
 
      table = EvaluationDetailItemCategoryGroup;
      where += 'AND ed.itemCategoryGroupId IN(:...groupIds)';
      condition.groupIds = data.itemCategoryGroup;
    }

    if (
      data.itemCategoryGroup &&
      data.itemCategoryGroup.length > 0 &&
      data.categoryIds &&
      data.categoryIds.length > 0 &&
      data.itemNameIds &&
      data.itemNameIds.length === 0
    ) {
      table = EvaluationDetailItemCategory;
      where += 'AND ed.itemCategoryGroupId IN(:...groupIds)';
      condition.groupIds = data.itemCategoryGroup;

      where += 'AND ed.itemCategoryId IN(:...categoryIds)';
      condition.categoryIds = data.categoryIds;
    }
    if (
      data.itemCategoryGroup &&
      data.itemCategoryGroup.length > 0 &&
      data.categoryIds &&
      data.categoryIds.length > 0 &&
      data.itemNameIds &&
      data.itemNameIds.length > 0
    ) {
      table = EvaluationDetailItem;
      where += 'AND ed.itemCategoryGroupId IN(:...groupIds)';
      condition.groupIds = data.itemCategoryGroup;
      
      where += 'AND ed.itemCategoryId IN(:...categoryIds)';
      condition.categoryIds = data.categoryIds;

      where += 'AND ed.itemId IN(:...itemIds)';
      condition.itemIds = data.itemNameIds;
    }

    return table.createQueryBuilder("ed")
    .select('ed.parameter', 'parameter')
    .addSelect("ed.companyId", 'companyId')
    .addSelect('ed.update_date', 'updateDate')                                                                                    
    .addSelect('ed.score', 'score')
    .addSelect('ed.value', 'value')
    .where(where, condition)
    .getRawMany();
  };

  searchAchivement(data: RequestDetailCompanyDTO, type: string){
    let query: string;

    const companyIds = data.companies.map((company) => company.companyId);


    let where = `WHERE ed1.company_id IN(${companyIds.map(x => x = `'${x}'`).join(',')}) `;
    // ĐK 1 - only data for categoryGroup
    switch (type) {
      case TypeSearch.GROUP:
        query = `
        SELECT
          ed1.company_id as "companyId",
          ed1."parameter" as "parameter",
          COALESCE(ed1.value, 0) as "value" 
        FROM
            ( 
                SELECT
                  ed1.company_id
                  , ed1."parameter"
                  , max(ed1.update_date) as update_date
                FROM
                evaluation_detail_item_category_group as ed1
                ${where}
                AND ed1.item_category_group_id IN(${data.itemCategoryGroupIds.map(x => x = `'${x}'`).join(',')})
                GROUP BY
                  ed1.company_id,
                  ed1."parameter"
            ) temp
        INNER JOIN evaluation_detail_item_category_group as ed1
        ON temp.company_id = ed1.company_id 
        AND temp.update_date = ed1.update_date
        and temp."parameter" = ed1."parameter"
      `
        break;
      case TypeSearch.CATEGORY:

        query = `
        SELECT
          ed1.company_id as "companyId",
          ed1."parameter" as "parameter",
          ed1.item_category_id as "categoryId",
          COALESCE(ed1.value, 0) as "value"
        FROM
            ( 
                SELECT
                  ed1.company_id
                  , ed1.item_category_id
                  , ed1."parameter"
                  , max(ed1.update_date) as update_date
                FROM
                evaluation_detail_item_category as ed1
                ${where}
                AND ed1.item_category_group_id IN(${data.itemCategoryGroupIds.map(x => x = `'${x}'`).join(',')})
                AND ed1.item_category_id IN(${data.categoryIds.map(x => x = `'${x}'`).join(',')}) 
                GROUP BY
                  ed1.company_id,
                  ed1."parameter",
                  ed1.item_category_id
            ) temp
        INNER JOIN evaluation_detail_item_category as ed1
        ON temp.company_id = ed1.company_id
        AND temp.item_category_id = ed1.item_category_id
        AND temp.update_date = ed1.update_date
        and temp."parameter" = ed1."parameter"
      `
      break;
      case TypeSearch.ITEM_NAME:
  
        query = `
        SELECT
          ed1.company_id as "companyId",
          ed1."parameter" as "parameter",
          ed1.item_category_id as "categoryId",
          ed1.item_id as "itemId",
          COALESCE(ed1.value, 0) as "value"
        FROM
            ( 
                SELECT
                  ed1.company_id
                  , ed1.item_category_id
                  , ed1.item_id
                  , ed1."parameter"
                  , max(ed1.update_date) as update_date
                FROM
                evaluation_detail_item as ed1
                ${where}
                AND ed1.item_category_group_id IN(${data.itemCategoryGroupIds.map(x => x = `'${x}'`).join(',')}) 
                AND ed1.item_category_id IN(${data.categoryIds.map(x => x = `'${x}'`).join(',')}) 
                AND ed1.item_id IN(${data.itemIds.map(x => x = `'${x}'`).join(',')}) 
                GROUP BY
                  ed1.company_id,
                  ed1."parameter",
                  ed1.item_id,
                  ed1.item_category_id
            ) temp
        INNER JOIN evaluation_detail_item as ed1
        ON temp.company_id = ed1.company_id
        AND temp.item_category_id = ed1.item_category_id
        AND temp.item_id = ed1.item_id
        and temp."parameter" = ed1."parameter"
        AND temp.update_date = ed1.update_date
        `
      break;
      default:
        break;
    }
    
    return AppDataSource.query(query);
  };
}
export default new Achivement();
