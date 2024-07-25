import { ItemCategoryGroupInformation } from '../entities/ItemCategoryGroupInformation';
import { ItemCategoryInformation } from '../entities/ItemCategoryInformation';
import { ItemInformation } from '../entities/ItemInformation';

class DetailCategoriesRepository {
  /**
   * Get data item_information
   * @function
   * @author MinhHuynh - <minh.huynh@hitachivantara.com>
   */

  getItemInformation = async () => {
    const resultItemInformation = await ItemInformation.find({
      select: {
        companyId: true,
        itemCategoryId: true,
        itemId: true,
        itemName: true,
      },
    });
    return resultItemInformation;
  };

  /**
   * Get data item_category_information
   * @function
   * @author MinhHuynh - <minh.huynh@hitachivantara.com>
   */

  getItemCategoryInformation = async () => {
    const resultItemCategoryInformation = await ItemCategoryInformation.find({
      select: {
        itemCategoryGroupId: true,
        itemCategoryId: true,
        itemCategoryName: true,
      },
    });
    return resultItemCategoryInformation;
  };
  /**
   * Get data item_category_group_information
   * @function
   * @author MinhHuynh - <minh.huynh@hitachivantara.com>
   */

  getItemCategoryGroupInformation = async () => {
    const resultItemCategoryGroupInformation = await ItemCategoryGroupInformation.find({
      select: {
        itemCategoryGroupId: true,
        itemCategoryGroupName: true,
      },
    });
    return resultItemCategoryGroupInformation;
  };
}

export default new DetailCategoriesRepository();
