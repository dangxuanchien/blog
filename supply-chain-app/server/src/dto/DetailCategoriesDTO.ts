import { ItemCategoryGroupInformation } from '@/databases/postgresql/entities/ItemCategoryGroupInformation';
import { ItemCategoryInformation } from '@/databases/postgresql/entities/ItemCategoryInformation';
import { ItemInformation } from '@/databases/postgresql/entities/ItemInformation';

export interface Categories {
  dataItemInfor: ItemInformationDTO[];
  dataItemCategoryInfor: ItemCategoryInformationDTO[];
  dataItemCategoryGroupInfor: ItemCategoryGroupInformationDTO[];
}
export class ResponseDetailCategoriesDTO {
  itemInfor: ItemInformationDTO[];
  itemCategoryInfor: ItemCategoryInformationDTO[];
  itemCategoryGroupInfor: ItemCategoryGroupInformationDTO[];
  constructor(dataCategories: Categories) {
    this.itemInfor = dataCategories.dataItemInfor;
    this.itemCategoryInfor = dataCategories.dataItemCategoryInfor;
    this.itemCategoryGroupInfor = dataCategories.dataItemCategoryGroupInfor;
  }
}
export class ItemInformationDTO {
  companyId: string;
  itemCategoryId: string;
  itemId: string;
  itemName: string;
  constructor(data: ItemInformation) {
    this.companyId = data.companyId;
    this.itemCategoryId = data.itemCategoryId;
    this.itemId = data.itemId;
    this.itemName = data.itemName;
  }
}
export class ItemCategoryInformationDTO {
  itemCategoryGroupId: string;
  itemCategoryId: string;
  itemCategoryName: string;
  constructor(data: ItemCategoryInformation) {
    this.itemCategoryGroupId = data.itemCategoryGroupId;
    this.itemCategoryId = data.itemCategoryId;
    this.itemCategoryName = data.itemCategoryName;
  }
}
export class ItemCategoryGroupInformationDTO {
  itemCategoryGroupId: string;
  itemCategoryGroupName: string;
  constructor(data: ItemCategoryGroupInformation) {
    this.itemCategoryGroupId = data.itemCategoryGroupId;
    this.itemCategoryGroupName = data.itemCategoryGroupName;
  }
}
