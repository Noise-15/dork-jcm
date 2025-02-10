export interface DorkGeneratorFormData {
  productName: string;
  paymentGateway: string;
  customGateway: string;
  dorkCount: number;
}

export interface DorkResponse {
  dorks: string[];
  searchUrls: string[];
}
