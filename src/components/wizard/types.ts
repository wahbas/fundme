export type Product = 'working-capital' | 'invoice' | 'sadad' | ''

export interface BankAccount {
  id: string
  bankName: string
  iban: string
  lastFour: string
  verified: boolean
  primary: boolean
}

export interface WizardData {
  product: Product
  // Business profile
  purpose: string
  revenue: string
  contracts: string
  debt: string
  bankBalance: string
  // Amount & terms
  amount: number
  purposeDescription: string
  term: number
  // Invoice financing
  invoices: InvoiceRow[]
  // SADAD
  selectedBills: string[]
  // Bank selection
  selectedBankId: string
}

export interface InvoiceRow {
  id: string
  number: string
  client: string
  amount: number
  dueDate: string
}

export interface StepDef {
  id: string
  label: string
}

export const FLOWS: Record<Exclude<Product, ''>, StepDef[]> = {
  'working-capital': [
    { id: 'product', label: 'Choose Product' },
    { id: 'business', label: 'Business Profile' },
    { id: 'amount', label: 'Amount & Terms' },
    { id: 'bank', label: 'Select Bank' },
    { id: 'review', label: 'Review & Submit' },
  ],
  invoice: [
    { id: 'product', label: 'Choose Product' },
    { id: 'business', label: 'Business Profile' },
    { id: 'invoices', label: 'Upload Invoices' },
    { id: 'amount', label: 'Amount & Terms' },
    { id: 'bank', label: 'Select Bank' },
    { id: 'review', label: 'Review & Submit' },
  ],
  sadad: [
    { id: 'product', label: 'Choose Product' },
    { id: 'business', label: 'Business Profile' },
    { id: 'sadad', label: 'Select SADAD Bills' },
    { id: 'amount', label: 'Amount & Terms' },
    { id: 'bank', label: 'Select Bank' },
    { id: 'review', label: 'Review & Submit' },
  ],
}

export const INITIAL_DATA: WizardData = {
  product: '',
  purpose: '',
  revenue: '',
  contracts: '',
  debt: '',
  bankBalance: '',
  amount: 100000,
  purposeDescription: '',
  term: 12,
  invoices: [],
  selectedBills: [],
  selectedBankId: '',
}

export const CONNECTED_BANKS: BankAccount[] = [
  { id: 'bank1', bankName: 'Al Rajhi Bank', iban: 'SA44 2000 0001 2345 6789 0123', lastFour: '0123', verified: true, primary: true },
  { id: 'bank2', bankName: 'Saudi National Bank', iban: 'SA03 1000 0000 0040 1019 9902', lastFour: '9902', verified: true, primary: false },
  { id: 'bank3', bankName: 'Riyad Bank', iban: 'SA87 2000 0000 0060 1016 7519', lastFour: '7519', verified: false, primary: false },
]

export const SADAD_BILLS = [
  { id: 'b1', billNumber: '8801-2025-0042', biller: 'Saudi Electricity Company', amount: 45000, dueDate: '2025-04-15' },
  { id: 'b2', billNumber: '7702-2025-0118', biller: 'STC Business', amount: 12500, dueDate: '2025-04-20' },
  { id: 'b3', billNumber: '6603-2025-0331', biller: 'National Water Co.', amount: 8200, dueDate: '2025-04-22' },
  { id: 'b4', billNumber: '5504-2025-0087', biller: 'GOSI', amount: 67000, dueDate: '2025-05-01' },
  { id: 'b5', billNumber: '4405-2025-0215', biller: 'Zakat & Tax Authority', amount: 120000, dueDate: '2025-05-10' },
]
