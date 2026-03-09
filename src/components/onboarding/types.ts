export type OnboardingStep =
  | 'create-account'
  | 'verify-identity'
  | 'verify-business'
  | 'connect-bank'
  | 'upload-documents'

export interface IdentityVerificationData {
  nafathRequestId: string
  nafathStatus: 'pending' | 'approved' | 'rejected' | 'expired'
  nationalId: string
  fullNameAr: string
  fullNameEn: string
  dateOfBirth: string
  verifiedAt?: Date
  amlScreeningStatus: 'pending' | 'clear' | 'flagged'
  amlScreeningId?: string
}

export type CRType = 'main' | 'branch'
export type SignatoryRole = 'owner' | 'partner' | 'manager' | 'authorized-signatory'
export type SignatoryPermission = 'full' | 'limited' | 'none'

export interface NationalAddress {
  buildingNumber: string
  street: string
  district: string
  city: string
  postalCode: string
  additionalCode: string
}

export interface Signatory {
  name: string
  nameAr: string
  nationalId: string
  role: SignatoryRole
  permission: SignatoryPermission
  idExpiryDate: string
}

export interface CommercialRegistration {
  crNumber: string
  companyNameAr: string
  companyNameEn: string
  companyType: string
  crType: CRType
  registrationDate: string
  expiryDate: string
  isicActivities: string[]
  nationalAddress: NationalAddress
  capital: number
  signatories: Signatory[]
  status: 'active' | 'expired' | 'suspended'
}

export interface BusinessVerificationData {
  selectedCR: CommercialRegistration
  isAuthorizedSignatory: boolean
  authorizationLetterUploaded?: boolean
  amlScreeningStatus: 'pending' | 'clear' | 'flagged'
  amlScreeningId?: string
  wathiqVerifiedAt?: Date
}

export interface SupportedBank {
  id: string
  name: string
  nameAr: string
  color: string
  isPopular: boolean
}

export interface BankConnectionData {
  leanConnectionId: string
  leanCustomerId: string
  bankId: string
  bankName: string
  bankNameAr: string
  accountId: string
  accountNumber: string
  iban: string
  accountType: 'current' | 'savings' | 'business'
  accountHolderName: string
  currency: string
  availableBalance?: number
  statementsRetrieved: boolean
  statementsPeriod?: { from: string; to: string }
  connectedAt: Date
}

export interface DocumentUploadData {
  documents: UploadedDocument[]
  legalDocumentsComplete: boolean
  financialDocumentsComplete: boolean
  allRequiredUploaded: boolean
  submittedAt?: Date
  reviewStatus: 'draft' | 'submitted' | 'under-review' | 'approved' | 'needs-revision'
}

export interface UploadedDocument {
  id: string
  docType: DocumentType
  category: 'legal' | 'financial'
  fileName: string
  fileSize: number
  uploadedAt: Date
  status: 'uploading' | 'uploaded' | 'verified' | 'rejected'
}

export type DocumentType =
  // Legal
  | 'articles_of_association'
  | 'cr_certificate'
  | 'gosi_certificate'
  | 'zatca_certificate'
  | 'chamber_certificate'
  | 'loan_schedule'
  // Financial
  | 'financial_statements'
  | 'revenue_3_months'
  | 'projected_revenue'
  | 'business_profile'
  | 'aging_schedule'

export interface OnboardingState {
  currentStep: OnboardingStep
  completedSteps: OnboardingStep[]
  stepData: {
    identity?: IdentityVerificationData
    business?: BusinessVerificationData
    bank?: BankConnectionData
    documents?: DocumentUploadData
  }
}

// Mock initial state — account created, rest pending
export const INITIAL_ONBOARDING_STATE: OnboardingState = {
  currentStep: 'verify-identity',
  completedSteps: ['create-account'],
  stepData: {},
}

export const STEP_ORDER: OnboardingStep[] = [
  'create-account',
  'verify-identity',
  'verify-business',
  'connect-bank',
  'upload-documents',
]
