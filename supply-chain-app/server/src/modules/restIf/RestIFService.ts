import { AppDataSource } from '@/databases/postgresql/AppDataSource';
import { BusinessTypeInfomation } from '@/databases/postgresql/entities/BusinessTypeInfomation';
import { CompanyInformation } from '@/databases/postgresql/entities/CompanyInformation';
import { EvaluationDetailItem } from '@/databases/postgresql/entities/EvaluationDetailItem';
import { EvaluationDetailItemCategory } from '@/databases/postgresql/entities/EvaluationDetailItemCategory';
import { EvaluationDetailItemCategoryGroup } from '@/databases/postgresql/entities/EvaluationDetailItemCategoryGroup';
import { EvaluationResultItem } from '@/databases/postgresql/entities/EvaluationResultItem';
import { EvaluationResultItemCategory } from '@/databases/postgresql/entities/EvaluationResultItemCategory';
import { EvaluationResultItemCategoryGroup } from '@/databases/postgresql/entities/EvaluationResultItemCategoryGroup';
import { ItemInformation } from '@/databases/postgresql/entities/ItemInformation';
import { TransactionInformation } from '@/databases/postgresql/entities/TransactionInformation';
import DetailCategoriesRepository from '@/databases/postgresql/repository/DetailCategories.repository';
import { ResponseDetailCategoriesDTO } from '@/dto/DetailCategoriesDTO';
import { RequestCompanyInfo } from '@/dto/RequestCompanyDTO';
import { RequestTransactionInfo } from '@/dto/RequestTransactionDTO';
import {
  CompanyInforAndBusinessDto,
  EvaluationDataDto,
  EvaluationDetailItemCategoryDTO,
  EvaluationDetailItemCategoryGroupDTO,
  EvaluationDetailItemDTO,
  EvaluationResultItemCategoryDTO,
  EvaluationResultItemCategoryGroupDTO,
  EvaluationResultItemDTO,
  TransactionInformationDto,
} from '@/modules/restIf/RestIFDto';

class RestIfService {
  async addCompanyInfors(requestDTO: RequestCompanyInfo): Promise<void> {
    const { companyInformationList, businessTypeInformationList } = new CompanyInforAndBusinessDto(
      requestDTO.companyInformations
    );

    await AppDataSource.transaction(async (tem) => {
      await tem.query('TRUNCATE company_information CASCADE;');
      await tem.query('TRUNCATE business_type_infomation CASCADE;');
      await tem.insert(BusinessTypeInfomation, businessTypeInformationList);
      await tem.insert(CompanyInformation, companyInformationList);
    });
  }

  async addTransactions(requestDTO: RequestTransactionInfo): Promise<void> {
    const itemInforList = await ItemInformation.find();
    const transactionList: TransactionInformation[] = requestDTO.transactionInformations.reduce((acc, cur, index) => {
      const currItemInfor = itemInforList.find(
        (itemIF) => itemIF.companyId === cur.vendorCompanyId && itemIF.originalItemName === cur.originalItemName
      );
      if (currItemInfor) {
        const trans = new TransactionInformationDto(cur, currItemInfor, index);
        acc.push(trans);
      }
      return acc;
    }, []);

    await AppDataSource.transaction(async (tem) => {
      await tem.clear(TransactionInformation);
      await tem.insert(TransactionInformation, transactionList);
    });
  }

  /**
   * Insert Evaluation data
   * @author Viet Phan - <phan.viet@hitachivantara.com>
   * @function
   * @param {EvaluationDataDto} tableData - data table used to insert
   * @returns Promise resolve value of void
   */
  async insertEvaluationData(evaluationData: EvaluationDataDto): Promise<void> {
    await AppDataSource.transaction(async (tem) => {
      // Clear data table before insert
      await Promise.all([
        tem.clear(EvaluationDetailItem),
        tem.clear(EvaluationDetailItemCategory),
        tem.clear(EvaluationDetailItemCategoryGroup),
        tem.clear(EvaluationResultItem),
        tem.clear(EvaluationResultItemCategory),
        tem.clear(EvaluationResultItemCategoryGroup),
      ]);

      await Promise.all([
        tem.insert(
          EvaluationDetailItem,
          evaluationData.evaluationDetailItem.map((item, index) => new EvaluationDetailItemDTO(item, index))
        ),
        tem.insert(
          EvaluationDetailItemCategory,
          evaluationData.evaluationDetailItemCategory.map((item, index) => new EvaluationDetailItemCategoryDTO(item, index))
        ),
        tem.insert(
          EvaluationDetailItemCategoryGroup,
          evaluationData.evaluationDetailItemCategoryGroup.map((item, index) => new EvaluationDetailItemCategoryGroupDTO(item, index))
        ),
        tem.insert(
          EvaluationResultItem,
          evaluationData.evaluationResultItem.map((item, index) => new EvaluationResultItemDTO(item, index))
        ),
        tem.insert(
          EvaluationResultItemCategory,
          evaluationData.evaluationResultItemCategory.map((item, index) => new EvaluationResultItemCategoryDTO(item, index))
        ),
        tem.insert(
          EvaluationResultItemCategoryGroup,
          evaluationData.evaluationResultItemCategoryGroup.map((item, index) => new EvaluationResultItemCategoryGroupDTO(item, index))
        ),
      ]);
    });
  }

    /**
   * Get data categories
   * @function
   * @author MinhHuynh - <minh.huynh@hitachivantara.com>
   */

  async getDetailCategories() {
    const [itemInformation, itemCategoryInformation, itemCategoryGroupInformation] = await Promise.all([
      DetailCategoriesRepository.getItemInformation(),
      DetailCategoriesRepository.getItemCategoryInformation(),
      DetailCategoriesRepository.getItemCategoryGroupInformation(),
    ]);

    return new ResponseDetailCategoriesDTO({
      dataItemInfor: itemInformation,
      dataItemCategoryInfor: itemCategoryInformation,
      dataItemCategoryGroupInfor: itemCategoryGroupInformation,
    });
  }
}
export default new RestIfService();
