'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CreditCard, AlertCircle, CheckCircle, ExternalLink } from 'lucide-react';

export function StripeConnect({ org }: { org: any }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [account, setAccount] = useState<any>(null);

  useEffect(() => {
    loadAccountStatus();
    
    // Check for return from Stripe
    const stripeStatus = searchParams.get('stripe');
    if (stripeStatus === 'success') {
      router.refresh();
      // Remove query param
      const newUrl = window.location.pathname;
      window.history.replaceState({}, '', newUrl);
    }
  }, [searchParams]);

  const loadAccountStatus = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/stripe/connect?orgId=${org.id}`);
      const data = await response.json();
      if (data.connected) {
        setAccount(data.account);
      }
    } catch (error) {
      console.error('Failed to load account status:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = async () => {
    setConnecting(true);
    try {
      const response = await fetch('/api/stripe/connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orgId: org.id })
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Failed to create Stripe account');
      }
    } catch (error) {
      console.error('Failed to connect:', error);
      alert('Failed to connect to Stripe');
    } finally {
      setConnecting(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg p-6">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="text-gray-600">Loading payment settings...</span>
        </div>
      </div>
    );
  }

  if (account) {
    return (
      <div className="bg-white rounded-lg p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <CreditCard className="h-5 w-5 mr-2" />
              Payment Processing
            </h3>
            
            <div className="mt-4 space-y-3">
              <div className="flex items-center">
                {account.charges_enabled ? (
                  <>
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-sm text-gray-700">Payments enabled</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
                    <span className="text-sm text-gray-700">Payments pending verification</span>
                  </>
                )}
              </div>

              <div className="flex items-center">
                {account.payouts_enabled ? (
                  <>
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-sm text-gray-700">Payouts enabled</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
                    <span className="text-sm text-gray-700">Payouts pending verification</span>
                  </>
                )}
              </div>

              {account.requirements_due && account.requirements_due.length > 0 && (
                <div className="mt-4 p-3 bg-yellow-50 rounded-md">
                  <p className="text-sm text-yellow-800">
                    <strong>Action required:</strong> Additional information needed to complete setup.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6 flex items-center space-x-4">
              <button
                onClick={handleConnect}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Manage in Stripe
              </button>
              
              <a
                href="https://dashboard.stripe.com/test/connect/accounts/overview"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:text-blue-500"
              >
                View Stripe Dashboard →
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6">
      <div className="text-center">
        <CreditCard className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-lg font-medium text-gray-900">
          Accept Payments
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Connect your organization to Stripe to accept tryout fees and other payments.
        </p>
        
        <div className="mt-6">
          <button
            onClick={handleConnect}
            disabled={connecting}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {connecting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Connecting...
              </>
            ) : (
              <>
                <CreditCard className="h-4 w-4 mr-2" />
                Connect with Stripe
              </>
            )}
          </button>
        </div>

        <div className="mt-4 text-xs text-gray-500">
          <p>Stripe handles all payment processing securely.</p>
          <p>RosterUp takes a 5% platform fee on transactions.</p>
        </div>
      </div>
    </div>
  );
}
