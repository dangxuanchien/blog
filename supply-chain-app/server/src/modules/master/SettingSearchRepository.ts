import { ResponseSearchConditionDTO } from '@/modules/master/ResponseSearchConditionDTO';
import { AppDataSource } from '../../databases/postgresql/AppDataSource';

class SettingSearchRepository {
  queryMasterData = async (where: string) => {
    const result: ResponseSearchConditionDTO[] = await AppDataSource.query(
      `
      with filter_name as (
        select
          item_temp.item_category_id
                ,
          item_temp.item_id
                ,
          (
          select
            distinct item_name
          from
            item_information
          where
            item_category_id = item_temp.item_category_id
            and item_id = item_temp.item_id
            and update_date = item_temp.update_date
                ) as item_name
                ,
          item_temp.update_date
        from
          (
          select
            item_category_id
                        ,
            item_id
                        ,
            max(update_date) as update_date
          from
            item_information
          group by
            item_category_id
                        ,
            item_id
                ) item_temp
        ),
        filter_id as (
        select
          id_temp.item_category_id
                ,
          (
          select
            distinct item_id
          from
            filter_name
          where
            item_category_id = id_temp.item_category_id
            and item_name = id_temp.item_name
            and update_date = id_temp.update_date
                ) as item_id
                ,
          id_temp.item_name
                ,
          id_temp.update_date
        from
          (
          select
            item_category_id
                        ,
            item_name
                        ,
            max(update_date) as update_date
          from
            filter_name
          group by
            item_category_id
                        ,
            item_name
                ) id_temp
        ),
        filter_category as (
        select
          (
          select
            distinct item_category_id
          from
            filter_id
          where
            item_id = category_temp.item_id
            and item_name = category_temp.item_name
            and update_date = category_temp.update_date
                ) as item_category_id
                ,
          category_temp.item_id
                ,
          category_temp.item_name
        from
          (
          select
            item_id
                        ,
            item_name
                        ,
            max(update_date) as update_date
          from
            filter_id
          group by
            item_id
                        ,
            item_name
                ) category_temp
        )SELECT    icgi.item_category_group_id as "itemCategoryGroupId"
    ,icgi.item_category_group_name as "itemCategoryGroupName"
    ,ici.item_category_id as "itemCategoryId"
    ,ici.item_category_name as "itemCategoryName"
    ,filter_category.item_id as "itemId"
    ,filter_category.item_name as "itemName"
     FROM  filter_category 
    INNER JOIN item_category_information ici 
        ON filter_category.item_category_id = ici.item_category_id 
    INNER JOIN item_category_group_information icgi 
        ON ici.item_category_group_id = icgi.item_category_group_id
        ${where}    
        order by
        icgi."item_category_group_name" asc,
        ici."item_category_name" asc
      `
    );
    return result;
  };
}
export default new SettingSearchRepository();
