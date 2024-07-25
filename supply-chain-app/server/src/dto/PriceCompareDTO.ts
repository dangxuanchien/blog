import { TransactionInformation } from "@/databases/postgresql/entities/TransactionInformation";

export class PriceCompareCompanyDTO {
  companyId: string;
  transactions: Array<TransactionInformation>;
}
