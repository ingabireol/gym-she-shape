export interface AnalyticsData {
  userMetrics: {
    totalUsers: number;
    userGrowthRate: number;
    activeUsers: number;
    newUsersThisMonth: number;
  };
  financialMetrics: {
    totalRevenue: number;
    revenueGrowthRate: number;
    averageOrderValue: number;
    customerLifetimeValue: number;
  };
  orderMetrics: {
    totalOrders: number;
    orderGrowthRate: number;
    abandonedCarts: number;
    conversionRate: number;
  };
  conversionMetrics: {
    conversionRate: number;
    conversionRateChange: number;
  };
  revenueData: Array<{
    date: string;
    revenue: number;
    orders: number;
  }>;
  contentEngagement: {
    blogViews: number;
    programViews: number;
    averageTimeSpent: number;
  };
}

export interface DateRange {
  from: Date;
  to: Date;
}