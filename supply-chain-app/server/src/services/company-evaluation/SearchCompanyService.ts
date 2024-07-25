import CompanyRepository from '@/databases/postgresql/repository/Company.repository';
import { RequestSearchCompanyDTO, ResponseCompanyDTO, ResponseItem } from '@/dto/SearchCompanyDTO';
import { TypeSearch } from '@/utils/enum';

class SearchCompanyService {

  /**
   * This function is used to search for companies
   * @param {RequestSearchCompanyDTO} data - RequestSearchCompanyDTO
   */
  async searchCompany(data: RequestSearchCompanyDTO): Promise<any> {
    let responseDTO = new Array<ResponseCompanyDTO>();
    const mapCompany = new Map();

    let response = new Array<any>();

    // itemCategory group, itemCategory, itemName, keyWord
    if (
      data.itemCategoryGroup && data.itemCategoryGroup.length > 0 
      && data.itemCategory && data.itemCategory.length > 0 
      && data.itemName && data.itemName.length > 0
    ) {
      response = await CompanyRepository.querySearchCompany(
        data,
        TypeSearch.ITEM_NAME
      );
    } else if (
      data.itemCategoryGroup &&
      data.itemCategoryGroup.length > 0 &&
      data.itemCategory &&
      data.itemCategory.length > 0
    ) {
      response = await CompanyRepository.querySearchCompany(
        data,
        TypeSearch.CATEGORY
      );
    } else if (data.itemCategoryGroup && data.itemCategoryGroup.length > 0) {
      response = await CompanyRepository.querySearchCompany(
        data,
        TypeSearch.GROUP
      );
    } else {
      return [];
    }
    // mapping itemName, itemCategoryGroup, itemCategory
    response.forEach((company) => {
      mapCompany.set(company.companyId, company);
    });

    for (let [key, value] of mapCompany) {
      const items = new Array<ResponseItem>;
      const originalItemNames = new Array<ResponseItem>;
      const categories = new Array<string>;
      const categoryGroups = new Array<string>;


      if (response && response.length > 0) {
          response.forEach((company) => {
            if (key === company.companyId)
            {
              items.push({itemId: company.itemId, itemName: company.itemName})
              originalItemNames.push({itemId: company.itemId, itemName: company.originalItemName});
              categories.push(company.itemCategoryName)
              if (!categoryGroups.includes(company.itemCategoryGroupName)) {
                categoryGroups.push(company.itemCategoryGroupName)
              }
            }
          })
          value.itemName = items;
          value.originalItemName = originalItemNames;
          value.itemCategoryName = categories;
          value.itemCategoryGroupName = categoryGroups;
      }
    }

    if (mapCompany.size > 0) {
      for (let [key, value] of mapCompany) {

        const dto = {
          companyId: value.companyId,
          companyName: value.companyName,
          businessTypeId: value.businessTypeId,
          businessTypeName: value.businessTypeName,
          headquartersLocation: value.headquartersLocation,
          locationArea: value.locationArea,
          sales: value.sales,
          capital: value.capital,
          regularCustomer: value.regularCustomer,
          establishmentYear: value.establishmentYear,
          numberOfEmployees: value.numberOfEmployees,
          representative: value.representative,
          operatingProfit: value.operatingProfit,
          capitalRatio: value.capitalRatio,
          companyIntroduction: value.companyIntroduction,
          hpLink: value.hpLink,
          imagePath: value.imagePath,
          staffMessage: value.staffMessage,
          updateDate: value.updateDate,
          updateYear: value.updateYear,

          items: value.itemName,
          originalItemNames: value.originalItemName,
          itemCategories: value.itemCategoryName,
          itemCategoryGroups: value.itemCategoryGroupName,
          qualityScore: value.qualityScore,
          costScore: value.costScore,
          deliveryScore: value.deliveryScore,
          financeScore: value.financeScore,
          environmentScore: value.environmentScore,
          laborScore: value.laborScore,
          ethicsScore: value.ethicsScore,
          sustainableScore: value.sustainableScore,
        } as unknown as ResponseCompanyDTO;
        responseDTO.push(dto);
      }
    }
    return responseDTO;
  }
}

export default new SearchCompanyService();
