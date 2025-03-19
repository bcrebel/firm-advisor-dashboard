export interface Account {
  name: string;
  number: string;
  custodian: string;
  holdings: Array<{
    units: number;
    unitPrice: number;
    ticker: string;
  }>;
}

export interface Advisor {
  id: string;
  name: string;
  accounts?: Account[];
}
