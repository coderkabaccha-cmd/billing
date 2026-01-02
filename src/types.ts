// Types for Google Admin Console Clone

export interface Subscription {
  id: string;
  name: string;
  icon: 'google-workspace';
  status: 'Active' | 'Inactive' | 'Suspended';
  licences: string;
  paymentPlan: string;
  paymentDue: string;
}

export interface SubscriptionDetail {
  id: string;
  name: string;
  description: string;
  icon: 'google-workspace';
  status: 'Active' | 'Inactive';
  startDate: string;
  paymentPlan: string;
  licences: string;
  estimatedMonthlyBill: string;
  pricing: PricingTier[];
  billingDetails: BillingDetails;
}

export interface PricingTier {
  dateRange: string;
  tiers: {
    description: string;
    price: string;
    originalPrice?: string;
    discount?: string;
  }[];
}

export interface BillingDetails {
  nextBillingDate: string;
  paymentsAccountId: string;
  viewInvoicesLink?: string;
  viewPaymentMethodsLink?: string;
  viewPaymentSettingsLink?: string;
  manageInvoiceRecipientsLink?: string;
}

export interface PaymentAccount {
  id: string;
  accountId: string;
  status: 'In use' | 'Inactive';
  subscriptions: string;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: string;
  isPayment?: boolean;
  isLink?: boolean;
}

export interface TransactionPeriod {
  dateRange: string;
  startingBalance?: string;
  endingBalance?: string;
  transactions: Transaction[];
  documents?: Document[];
}

export interface Document {
  type: 'PDF Invoice' | 'CSV Invoice';
  count: number;
  items: {
    id: string;
    createdDate: string;
  }[];
}

export interface PlanComparison {
  feature: string;
  icon?: string;
  currentValue: string;
  upgradeValue: string;
  upgradeHighlight?: boolean;
}

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  path?: string;
  children?: NavItem[];
  badge?: string;
  isExpanded?: boolean;
  isActive?: boolean;
}

export type PageType =
  | 'subscriptions'
  | 'subscription-detail'
  | 'payment-accounts'
  | 'transactions'
  | 'buy-or-upgrade';
