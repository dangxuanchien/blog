import { RequestSearchCompanyDTO } from '@/dto/SearchCompanyDTO';
import { TypeSearch } from '@/utils/enum';
import { AppDataSource } from '../AppDataSource';


class CompanyRepository {
   querySearchCompany = async (
    data: RequestSearchCompanyDTO,
    typeSearch: string,
    ) => {
    const result = await AppDataSource.query(this.querybuider(data, typeSearch));
    return  result;
  };

  querybuider(data: RequestSearchCompanyDTO, type: string) : string {
    let table: string;
    let where: string;
    let query: string;

    // where keyWords
    let whereKeyWords = ''
    const keyWords = data.keyWord === '' ?  [] : data.keyWord.split(' ');

    if (keyWords && keyWords.length > 0) {
        keyWords.forEach((keyWord : any) => {
        whereKeyWords = whereKeyWords.length === 0 ? '' : `${whereKeyWords} OR `
        whereKeyWords = whereKeyWords.concat( `ci.company_name like '${keyWord}%'
        OR ci.headquarters_location like '${keyWord}%'`);
        });

        whereKeyWords = `AND (${whereKeyWords})`
    }

    switch (type) {
      case TypeSearch.GROUP:
        table = `( 
          SELECT
            ericg.* 
          FROM
              ( 
                  SELECT
                      company_id
                      , max(update_date) as update_date 
                  FROM
                      evaluation_result_item_category_group 
                  GROUP BY
                      company_id
              ) temp 
              INNER JOIN evaluation_result_item_category_group ericg
                  ON temp.company_id = ericg.company_id 
                  AND temp.update_date = ericg.update_date
      ) filter_eri 
          ON filter_eri.company_id = ci.company_id`;
          where = `WHERE icgi.item_category_group_id IN(${data.itemCategoryGroup.map(x => x = `'${x}'`).join(',')}) ${whereKeyWords}`;
        break;
      case TypeSearch.CATEGORY:
        table = `( 
          SELECT
              eric.* 
          FROM
              ( 
                  SELECT
                      company_id
                      , item_category_id
                      , max(update_date) as update_date 
                  FROM
                      evaluation_result_item_category 
                  GROUP BY
                      company_id
                      , item_category_id
              ) temp 
              INNER JOIN evaluation_result_item_category eric 
                  ON temp.company_id = eric.company_id 
                  AND temp.item_category_id = eric.item_category_id 
                  AND temp.update_date = eric.update_date
      ) filter_eri 
          ON filter_eri.company_id = ci.company_id 
          AND filter_eri.item_category_id = filter_category.item_category_id`;
          where = `WHERE icgi.item_category_group_id IN(${data.itemCategoryGroup.map(x => x = `'${x}'`).join(',')})
                   AND ici.item_category_id IN(${data.itemCategory.map(x => x = `'${x}'`).join(',')}) ${whereKeyWords}`;
        break;
      case TypeSearch.ITEM_NAME:
      table = `( 
        SELECT
            eri.*
        FROM
            ( 
                SELECT
                    company_id
                    , item_category_id
                    , item_id
                    , max(update_date) as update_date 
                FROM
                    evaluation_result_item 
                GROUP BY
                    company_id
                    , item_category_id
                    , item_id
            ) temp 
            INNER JOIN evaluation_result_item eri 
                ON temp.company_id = eri.company_id 
                AND temp.item_category_id = eri.item_category_id 
                AND temp.item_id = eri.item_id 
                AND temp.update_date = eri.update_date
    ) filter_eri 
        ON filter_eri.company_id = ci.company_id 
        AND filter_eri.item_category_id = filter_category.item_category_id 
        AND filter_eri.item_id = filter_category.item_id`;
        where = `WHERE icgi.item_category_group_id IN(${data.itemCategoryGroup.map(x => x = `'${x}'`).join(',')})
        AND ici.item_category_id IN(${data.itemCategory.map(x => x = `'${x}'`).join(',')})
        AND filter_category.item_id IN(${data.itemName.map(x => x = `'${x}'`).join(',')})
        ${whereKeyWords}`;
      break;
      default:
        break;
    }
    where += ` AND COALESCE(filter_eri.quality_score, 0) >= ${data.qualityScore}
              AND COALESCE(filter_eri.cost_score, 0) >= ${data.costScore}
              AND COALESCE(filter_eri.delivery_score, 0) >= ${data.deliveryScore}
              AND COALESCE(filter_eri.finance_score, 0) >= ${data.financeScore}
              AND COALESCE(filter_eri.environment_score, 0) >= ${data.environmentScore}
              AND COALESCE(filter_eri.labor_score, 0) >= ${data.laborScore}
              AND COALESCE(filter_eri.ethics_score, 0) >= ${data.ethicsScore}
              AND COALESCE(filter_eri.sustainable_score, 0) >= ${data.sustainableScore}`;



    query = `
    WITH filter_name AS ( 
      SELECT
          item_temp.item_category_id
          , item_temp.item_id
          , ( 
              SELECT 
                  item_name 
              FROM
                  item_information 
              WHERE
                  item_category_id = item_temp.item_category_id 
                  and item_id = item_temp.item_id 
                  and update_date = item_temp.update_date
              LIMIT 1
          ) as item_name
          , item_temp.update_date 
      FROM
          ( 
              SELECT
                  item_category_id
                  , item_id
                  , max(update_date) as update_date 
              FROM
                  item_information 
              GROUP BY
                  item_category_id
                  , item_id
          ) item_temp
  ) 
  , filter_id AS ( 
      SELECT
          id_temp.item_category_id
          , ( 
              SELECT
                  item_id 
              FROM
                  filter_name 
              WHERE
                  item_category_id = id_temp.item_category_id 
                  and item_name = id_temp.item_name 
                  and update_date = id_temp.update_date
              LIMIT 1
          ) as item_id
          , id_temp.item_name
          , id_temp.update_date 
      FROM
          ( 
              SELECT
                  item_category_id
                  , item_name
                  , max(update_date) as update_date 
              FROM
                  filter_name 
              GROUP BY
                  item_category_id
                  , item_name
          ) id_temp
  ) 
  , filter_category AS ( 
      SELECT
          ( 
              SELECT
                  item_category_id 
              FROM
                  filter_id 
              WHERE
                  item_id = category_temp.item_id 
                  and item_name = category_temp.item_name 
                  and update_date = category_temp.update_date
              LIMIT 1                  
          ) as item_category_id
          , category_temp.item_id
          , category_temp.item_name
          , category_temp.update_date 
      FROM
          ( 
              SELECT
                  item_id
                  , item_name
                  , max(update_date) as update_date 
              FROM
                  filter_id 
              GROUP BY
                  item_id
                  , item_name
          ) category_temp
  ) 
  SELECT
      ci.company_id as "companyId"
      , ci.company_name as "companyName"
      , ci.headquarters_location as "headquartersLocation"
      , ci.location_area as "locationArea"
      , ci.sales as "sales"
      , ci.capital as "capital"
      , ci.regular_customer as "regularCustomer"
      , ci.establishment_year as "establishmentYear"
      , ci.number_of_employees as "numberOfEmployees"
      , ci.representative as "representative"
      , ci.operating_profit as "operatingProfit"
      , COALESCE(ci.capital_ratio, 0) as "capitalRatio"
      , ci.company_introduction as "companyIntroduction"
      , ci.hp_link as "hpLink"
      , ci.image_path as "imagePath"
      , ci.staff_message as "staffMessage"
      , ci.update_date as "updateDate"
      , ci.update_year as "updateYear"
      , bi.business_type_id as "businessTypeId"
      , bi.business_type_name as "businessTypeName"
      , icgi.item_category_group_id as "itemCategoryGroupId"
      , icgi.item_category_group_name as "itemCategoryGroupName"
      , ici.item_category_id as "itemCategoryId"
      , ici.item_category_name as "itemCategoryName"
      , filter_category.item_id as "itemId"
      , filter_category.item_name as "itemName"
      , ii.original_item_name as "originalItemName"
      , COALESCE(filter_eri.quality_score, 0) as "qualityScore"
      , COALESCE(filter_eri.cost_score, 0) as "costScore"
      , COALESCE(filter_eri.delivery_score, 0) as "deliveryScore"
      , COALESCE(filter_eri.finance_score, 0) as "financeScore"
      , COALESCE(filter_eri.environment_score, 0) as "environmentScore"
      , COALESCE(filter_eri.labor_score, 0) as "laborScore"
      , COALESCE(filter_eri.ethics_score, 0) as "ethicsScore"
      , COALESCE(filter_eri.sustainable_score, 0) as "sustainableScore" 
  FROM
      filter_category 
      INNER JOIN item_category_information ici 
          ON filter_category.item_category_id = ici.item_category_id 
      INNER JOIN item_category_group_information icgi 
          ON ici.item_category_group_id = icgi.item_category_group_id 
      INNER JOIN item_information ii 
          ON filter_category.item_id = ii.item_id 
          AND filter_category.item_category_id = ii.item_category_id 
          AND filter_category.update_date = ii.update_date 
      INNER JOIN company_information ci 
          ON ii.company_id = ci.company_id
      INNER JOIN business_type_infomation bi 
          ON bi.business_type_id = ci.business_type_id
      INNER JOIN 
            ${table}
            ${where}
      `;
      return query;

  }
}

export default new CompanyRepository();
