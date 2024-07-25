import { AppDataSource } from '@/databases/postgresql/AppDataSource';
import { CompanyParameter } from '@/services/company-evaluation/DetailQcdService';
import { Between, In } from 'typeorm';

export interface ParametersOfAllCompany {
  company_id: string;
  parameter: string;
  score: number;
  value: number;
}

class DetailQcdRepository {
  getCompanyParameters = async (companyId: string, relevantScore: string, tableName: string, conditionSearch: string) => {
    const companyParameters: CompanyParameter[] = await AppDataSource.query(
      `
      select
      edbt.score,
      edbt."parameter" as "parameter",
      r.company_id,
      edbt.value,
      edbt.min_value,
      edbt.bottom_25per_value,
      edbt.median_value,
      edbt.top_25per_value,
       edbt.max_value
    from
      (
      select
        max(update_date) as mdate,
        parameter,
        company_id
      from
      ${tableName} edbt
      where
        relevant_score = $2
        and company_id = $1
        ${conditionSearch}
      group by
        "parameter",
        company_id
      ) as r
    left join ${tableName} edbt
      on
      r.mdate = edbt.update_date
      and r.parameter = edbt."parameter"
      and r.company_id = edbt.company_id
      where relevant_score = $2
    `,
      [companyId, relevantScore]
    );

    return companyParameters;
  };

  getParametersOfAllCompany = async (
    companyId: string,
    companyIds: string[],
    relevantScore: string,
    tableName: string
  ) => {
    const parametersOfAllCompany: ParametersOfAllCompany[] = await AppDataSource.query(
      `
      with test1 as (
        select
            company_id,
            "parameter",
            Max(update_date) as daaTest
        from
            ${tableName}
        where
          company_id = any ($2)
          and relevant_score = $1
        group by
            company_id,
            "parameter"
        )
        select
          t1.company_id,
          t1."parameter",
          ab.score,
          ab.value,
          ab.update_date
        from
          test1 as t1
        left join ${tableName} as ab
        on
          ab.update_date = t1.daaTest
          and ab."parameter" = t1."parameter"
          and ab.company_id = t1.company_id
      `,
      [relevantScore, companyIds]
    );

    return parametersOfAllCompany;
  };

  getDataRelevantChart = async (
    data: any,
    entity: any,
    type: any,
  ) => {
    let { from, to, companyId } = data;
      const { querySearch, table } = this.getQuerySearch(data, entity, type);
      const records = await table.find({
          where: {
            ...querySearch,
            updateDate: Between(new Date(from), new Date(to)),
            companyId: companyId
          },
          order: { 
            updateDate: "ASC" 
          }
      });     
    return records;
  }

  getDataParameterChart = async (
    data: any,
    entity: any,
    type: any,
  ) => {
    let { from, to, companyId, relevantScore } = data;
    const { querySearch, table } = this.getQuerySearch(data, entity, type);

    const records = await table.find({
          select: {
            score: true,
            parameter: true,
            updateDate: true,
          },
          where: {
            ...querySearch,
            updateDate: Between(new Date(from), new Date(to)),
            companyId: companyId,
            relevantScore: relevantScore,
          },
          order: { 
            updateDate: "ASC" 
          }    
    })
    return records;
  }

  getQuerySearch = (data: any, entity: any, type: any) => {
    let querySearch: any;
    let table: any;

    // ĐK 1 - only data for categoryGroup
    if (type === 'Group') {
      querySearch = {
        companyId: Array.isArray(data.companyId) ? In(data.companyId): data.companyId,
        itemCategoryGroupId: In(data.itemCategoryGroup),
      };

      table = entity;
    }

    if (type === 'Category') {
      querySearch = {
        companyId: Array.isArray(data.companyId) ? In(data.companyId): data.companyId,
        itemCategoryId: In(data.categoryIds),
        itemCategoryGroupId: In(data.itemCategoryGroup),
      };

      table = entity;
    }
    if (type === 'ItemName') {
      querySearch = {
        companyId: Array.isArray(data.companyId) ? In(data.companyId): data.companyId,
        itemCategoryId: In(data.categoryIds),
        itemCategoryGroupId: In(data.itemCategoryGroup),
        itemId: In(data.itemNameIds),
      };
      table = entity;
    }
    return { querySearch, table}
  }
}

export default new DetailQcdRepository();
