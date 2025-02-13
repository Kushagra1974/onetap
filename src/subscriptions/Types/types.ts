export interface SubscriptionBenefit {
  benefit: string;
  description: string;
}

export interface Subscription {
  id: number;
  tier: string;
  cost: number;
  benefits: SubscriptionBenefit[];
  startDate: string;
  endDate: string;
}
