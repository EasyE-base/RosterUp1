'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, TrendingUp, Users, Send, Eye, CheckCircle, XCircle, MessageSquare } from 'lucide-react';

interface AnalyticsData {
  metrics: {
    totalListingViews: number;
    totalApplications: number;
    totalOffersSent: number;
    totalOffersAccepted: number;
    totalOffersDeclined: number;
    totalMessages: number;
    conversionRate: string;
  };
  charts: {
    viewsOverTime: Array<{ date: string; count: number }>;
    applicationsOverTime: Array<{ date: string; count: number }>;
    messagesOverTime: Array<{ date: string; count: number }>;
  };
  topListings: Array<{
    id: string;
    title: string;
    status: string;
    views: number;
  }>;
}

export default function TeamAnalyticsPage() {
  const router = useRouter();
  const params = useParams();
  const teamId = params.teamId as string;

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [timeRange, setTimeRange] = useState(30);

  useEffect(() => {
    loadData();
  }, [teamId, timeRange]);

  const loadData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/analytics/dashboard?team_id=${teamId}&days=${timeRange}`
      );
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to load analytics');
      }

      setData(result);
    } catch (err: any) {
      console.error('Load analytics error:', err);
      alert('Failed to load analytics: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-red-600">Failed to load analytics data.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6 flex items-center justify-between">
        <Link
          href={`/dashboard/teams/${teamId}`}
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Team
        </Link>

        <select
          value={timeRange}
          onChange={(e) => setTimeRange(Number(e.target.value))}
          className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        >
          <option value={7}>Last 7 days</option>
          <option value={30}>Last 30 days</option>
          <option value={90}>Last 90 days</option>
        </select>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Track your recruiting performance and engagement
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          icon={<Eye className="h-6 w-6" />}
          label="Listing Views"
          value={data.metrics.totalListingViews}
          color="blue"
        />
        <MetricCard
          icon={<Users className="h-6 w-6" />}
          label="Applications"
          value={data.metrics.totalApplications}
          color="green"
        />
        <MetricCard
          icon={<TrendingUp className="h-6 w-6" />}
          label="Conversion Rate"
          value={data.metrics.conversionRate}
          color="purple"
        />
        <MetricCard
          icon={<MessageSquare className="h-6 w-6" />}
          label="Messages"
          value={data.metrics.totalMessages}
          color="indigo"
        />
      </div>

      {/* Offers Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <MetricCard
          icon={<Send className="h-5 w-5" />}
          label="Offers Sent"
          value={data.metrics.totalOffersSent}
          color="gray"
          small
        />
        <MetricCard
          icon={<CheckCircle className="h-5 w-5" />}
          label="Offers Accepted"
          value={data.metrics.totalOffersAccepted}
          color="green"
          small
        />
        <MetricCard
          icon={<XCircle className="h-5 w-5" />}
          label="Offers Declined"
          value={data.metrics.totalOffersDeclined}
          color="red"
          small
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Views Over Time */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Listing Views Over Time
          </h2>
          <SimpleChart data={data.charts.viewsOverTime} color="blue" />
        </div>

        {/* Applications Over Time */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Applications Over Time
          </h2>
          <SimpleChart data={data.charts.applicationsOverTime} color="green" />
        </div>
      </div>

      {/* Top Listings */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-5 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Top Listings</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {data.topListings.length === 0 ? (
            <div className="px-6 py-8 text-center text-gray-500">
              <p className="text-sm">No listing data yet.</p>
            </div>
          ) : (
            data.topListings.map((listing) => (
              <div
                key={listing.id}
                className="px-6 py-4 flex items-center justify-between"
              >
                <div>
                  <Link
                    href={`/dashboard/listings/${listing.id}`}
                    className="text-sm font-medium text-blue-600 hover:text-blue-800"
                  >
                    {listing.title}
                  </Link>
                  <p className="text-xs text-gray-500 capitalize">{listing.status}</p>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Eye className="h-4 w-4" />
                  <span className="font-medium">{listing.views}</span>
                  <span>views</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  color: 'blue' | 'green' | 'purple' | 'indigo' | 'gray' | 'red';
  small?: boolean;
}

function MetricCard({ icon, label, value, color, small = false }: MetricCardProps) {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    indigo: 'bg-indigo-100 text-indigo-600',
    gray: 'bg-gray-100 text-gray-600',
    red: 'bg-red-100 text-red-600'
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center">
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          {icon}
        </div>
        <div className="ml-4 flex-1">
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p className={`${small ? 'text-xl' : 'text-2xl'} font-bold text-gray-900 mt-1`}>
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

interface SimpleChartProps {
  data: Array<{ date: string; count: number }>;
  color: 'blue' | 'green';
}

function SimpleChart({ data, color }: SimpleChartProps) {
  if (data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-500">
        <p className="text-sm">No data available</p>
      </div>
    );
  }

  const maxCount = Math.max(...data.map(d => d.count), 1);
  const barColor = color === 'blue' ? 'bg-blue-500' : 'bg-green-500';

  return (
    <div className="h-64 flex items-end space-x-2">
      {data.map((point, index) => {
        const heightPercent = (point.count / maxCount) * 100;
        const date = new Date(point.date);
        const label = `${date.getMonth() + 1}/${date.getDate()}`;

        return (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div className="w-full flex items-end justify-center h-56">
              <div
                className={`w-full ${barColor} rounded-t hover:opacity-80 transition-opacity`}
                style={{ height: `${heightPercent}%` }}
                title={`${label}: ${point.count}`}
              />
            </div>
            <div className="mt-2 text-xs text-gray-500 text-center">
              {label}
            </div>
          </div>
        );
      })}
    </div>
  );
}
