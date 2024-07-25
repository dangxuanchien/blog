export class RequestTransactionInfo {
  transactionInformations: TransactionInfoDTO[];
}
export class TransactionInfoDTO {
  buyerCompanyId: string;
  vendorCompanyId: string;
  originalItemName: string;
  proposedPrice: string;
  actualPrice: string;
  orderQuantity: string;
}
