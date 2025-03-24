// src/app/(admin)/admin/analytics/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AdminMetricCard } from '@/components/admin/AdminMetricCard';
import { Button } from '@/components/ui/button';
import { Calendar, Download, Users, DollarSign, ShoppingBag, TrendingUp } from 'lucide-react';
import { api } from '@/lib/api';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { RevenueChart } from '@/components/admin/analytics/RevenueChart';
import { UserAcquisitionChart } from '@/components/admin/analytics/UserAcquisitionChart';
import { TopSellingProducts } from '@/components/admin/analytics/TopSellingProducts';
import { DateRangePicker } from '@/components/admin/analytics/DateRangePicker';

export default function AnalyticsDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [dateRange, setDateRange] = useState({ 
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), 
    to: new Date() 
  });
  
  useEffect(() => {
    const fetchAnalytics = async () => {
      setIsLoading(true);
      try {
        // Format dates for API
        const fromDate = dateRange.from.toISOString().split('T')[0];
        const toDate = dateRange.to.toISOString().split('T')[0];
        
        const response = await api.get(`/api/admin/analytics?from=${fromDate}&to=${toDate}`);
        setAnalyticsData(response.data);
      } catch (error) {
        console.error('Failed to fetch analytics data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAnalytics();
  }, [dateRange]);
  
  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center min-h-[500px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h2>
          <p className="text-muted-foreground">
            Overview of platform performance and business metrics
          </p>
        </div>
        <div className="mt-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 md:mt-0">
          <DateRangePicker value={dateRange} onChange={setDateRange} />
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Export Data
          </Button>
        </div>
      </div>
      
      {/* Key Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <AdminMetricCard 
          title="Total Users"
          value={analyticsData?.userMetrics.totalUsers.toLocaleString() || "0"}
          trend={`${analyticsData?.userMetrics.userGrowthRate.toFixed(1)}%`}
          trendUp={analyticsData?.userMetrics.userGrowthRate > 0}
          description="vs. previous period"
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
        />
        <AdminMetricCard 
          title="Revenue"
          value={`$${analyticsData?.financialMetrics.totalRevenue.toLocaleString() || "0"}`}
          trend={`${analyticsData?.financialMetrics.revenueGrowthRate.toFixed(1)}%`}
          trendUp={analyticsData?.financialMetrics.revenueGrowthRate > 0}
          description="vs. previous period"
          icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
        />
        <AdminMetricCard 
          title="Orders"
          value={analyticsData?.orderMetrics.totalOrders.toLocaleString() || "0"}
          trend={`${analyticsData?.orderMetrics.orderGrowthRate.toFixed(1)}%`}
          trendUp={analyticsData?.orderMetrics.orderGrowthRate > 0}
          description="vs. previous period"
          icon={<ShoppingBag className="h-4 w-4 text-muted-foreground" />}
        />
        <AdminMetricCard 
          title="Conversion Rate"
          value={`${analyticsData?.conversionMetrics.conversionRate.toFixed(1)}%`}
          trend={`${analyticsData?.conversionMetrics.conversionRateChange.toFixed(1)}%`}
          trendUp={analyticsData?.conversionMetrics.conversionRateChange > 0}
          description="vs. previous period"
          icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
        />
      </div>
      
      {/* Dashboard Tabs */}
      <Tabs defaultValue="revenue" className="space-y-4">
        <TabsList>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="users">User Acquisition</TabsTrigger>
          <TabsTrigger value="products">Product Performance</TabsTrigger>
          <TabsTrigger value="content">Content Engagement</TabsTrigger>
        </TabsList>
        
        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
              <CardDescription>
                Revenue trends over the selected time period
              </CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <RevenueChart data={analyticsData?.revenueData || []} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Acquisition</CardTitle>
              <CardDescription>
                New user registrations over time
              </CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <UserAcquisitionChart data={analyticsData?.userAcquisitionData || []} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Selling Products</CardTitle>
              <CardDescription>
                Best performing products by revenue
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TopSellingProducts data={analyticsData?.topProducts || []} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Content Engagement</CardTitle>
              <CardDescription>
                Blog and program content performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Content engagement table/chart */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}