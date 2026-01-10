export interface InvoiceData {
  // From details (Vedant Enterprises - fixed)
  fromCompany: string;
  fromGST: string;
  
  // Bill details
  billNumber: string;
  year: string;
  date: string;
  
  // To details
  toCompany: string;
  toAddress: string;
  toGSTIN: string;
  
  // Project
  project: string;
  
  // Line items
  lineItems: LineItem[];
  
  // Tax details
  taxType: 'IGST' | 'CGST+SGST';
  taxRate: number;
  
  // Calculated totals
  subtotal: number;
  taxAmount: number;
  grandTotal: number;
}

export interface LineItem {
  description: string;
  sacCode: string;
  amount: number;
}

