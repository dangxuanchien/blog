
import AchivementRepository from '@/databases/postgresql/repository/Achivement.repository';
import { Achivement, RequestSearchDetailCompanyDTO, ResponseDetailCompanyDTO } from '@/dto/DetailCompanyDTO';
import { stringToNumber } from '@/utils/commonUtils';

class SearchCompanyService {

  /**
   * This function is used to search for companies based on the itemcategory
   * @param {RequestSearchCompanyDTO} data - RequestSearchCompanyDTO
   */
  async searchCompanyDetail(request: RequestSearchDetailCompanyDTO): Promise<any> {
    const { type, data } = request;
    const response = await AchivementRepository.searchAchivement(data, type) ;

    return this.convertDTO(response, data);
  }

  convertDTO = (responseAchivement: Array<any>, data: any ) => {

    let responseDTO = new Array<ResponseDetailCompanyDTO>;
    const sumWeight = [stringToNumber(data.qualityWeight),
      stringToNumber(data.costWeight),
      stringToNumber(data.deliveryWeight),
      stringToNumber(data.financeWeight),
      stringToNumber(data.environmentWeight),
      stringToNumber(data.laborWeight),
      stringToNumber(data.ethicsWeight),
      stringToNumber(data.sustainableWeight)].reduce((a, b) => a + b, 0);
    
    // re-sort companies
    const responseDetailOrder: any = [];
    data.companies.map((company: any) => {
        responseDetailOrder.push(company);
    })
    if (responseDetailOrder && responseDetailOrder.length > 0) {

      responseDetailOrder.forEach((company: any) => {
        const companyDTO = new ResponseDetailCompanyDTO();
        const parameters = new Array<Achivement>();
        companyDTO.companyId = company.companyId;
        companyDTO.companyName = company.companyName;
        companyDTO.headquartersLocation = company.headquartersLocation;
        companyDTO.locationArea = company.locationArea;
        companyDTO.sales = company.sales;
        companyDTO.businessTypeName = company.businessTypeName;
        companyDTO.businessTypeCode = company.businessTypeId;
        companyDTO.capital = company.capital;
        companyDTO.regularCustomer = company.regularCustomer;
        companyDTO.establishmentYear = company.establishmentYear;
        companyDTO.numberOfEmployees = company.numberOfEmployees;
        companyDTO.representative = company.representative;
        companyDTO.operatingProfit = company.operatingProfit;
        companyDTO.capitalRatio = company.capitalRatio;
        companyDTO.companyIntroduction = company.companyIntroduction;
        companyDTO.hpLink = company.hpLink;
        companyDTO.imagePath = company.imagePath;
        companyDTO.staffMessage = company.staffMessage;
        companyDTO.updateDate = company.updateDate;
        companyDTO.updateYear = company.updateYear;
        
        companyDTO.qualityScore = company.qualityScore;
        companyDTO.costScore = company.costScore;
        companyDTO.deliveryScore = company.deliveryScore;
        companyDTO.financeScore = company.financeScore;
        companyDTO.environmentScore = company.environmentScore;
        companyDTO.laborScore = company.laborScore;
        companyDTO.ethicsScore = company.ethicsScore;
        companyDTO.sustainableScore = company.sustainableScore;
        if (responseAchivement && responseAchivement.length > 0) {
          responseAchivement.forEach((param ) => {
            if (param.companyId === company.companyId) {
              parameters.push({parameter: param.parameter, value: param.value})
            }
            companyDTO.achivements = parameters;
          })
        }
   
          const sumWeightScore = (stringToNumber(data.qualityWeight) * stringToNumber(company.qualityScore)) 
          + (stringToNumber(data.costWeight) *stringToNumber(company.costScore))
          + (stringToNumber(data.deliveryWeight) *stringToNumber(company.deliveryScore))
          + (stringToNumber(data.financeWeight) * stringToNumber(company.financeScore))
          + (stringToNumber(data.environmentWeight) * stringToNumber(company.environmentScore))
          + (stringToNumber(data.laborWeight) * stringToNumber(company.laborScore))
          + (stringToNumber(data.ethicsWeight) * stringToNumber(company.ethicsScore))
          + (stringToNumber(data.sustainableWeight) * stringToNumber(company.sustainableScore))

        companyDTO.overalScore =  Math.round(sumWeightScore / sumWeight);
        responseDTO.push(companyDTO);
      });   
    }
    return responseDTO;
  }
}

export default new SearchCompanyService();
