import React, { useState } from 'react';
import {
  ChevronRightIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  CreditCardIcon,
  ReceiptIcon,
  SettingsIcon,
  ErrorIcon,
} from '../components/Icons';
import { useUser } from '../context/UserContext';

interface SubscriptionDetailPageProps {
  onNavigate: (page: string) => void;
}

// Google Workspace colorful G icon
const GoogleWorkspaceIcon: React.FC = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" className="flex-shrink-0">
    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
  </svg>
);

// Info icon with circle border
const InfoCircleIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
  </svg>
);

export const SubscriptionDetailPage: React.FC<SubscriptionDetailPageProps> = ({ onNavigate }) => {
  const [chargesExpanded, setChargesExpanded] = useState(true);
  const [alertsExpanded, setAlertsExpanded] = useState(true);
  const { user } = useUser();

  const hasSuspendedPayment = user?.hasSuspendedPayment ?? false;
  const licenses = user?.licenses ?? 121;
  const pricePerUser = user?.pricePerUser ?? 45;
  const estimatedMonthlyBill = licenses * pricePerUser;

  const alerts = hasSuspendedPayment ? [
    {
      id: '1',
      type: 'error' as const,
      message: "You've got a payment due. - Pay your overdue account balance by updating your Visa •••• 6189, which was declined or contact your bank to resolve the issue.",
      actionLabel: 'PAY NOW',
      actionPage: 'payment-account-detail',
    },
    {
      id: '2',
      type: 'error' as const,
      message: 'Your Google Workspace Business Plus subscription is suspended due to a billing error and is scheduled for cancellation on Feb 4, 2026 (59 days remaining). To restore Google Workspace Business Plus for your organization, update payment info.',
      actionLabel: 'UPDATE PAYMENT',
      actionPage: 'payment-method',
      hasLearnMore: true,
    },
  ] : [];

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Page header with breadcrumb */}
      <div className="border-b border-[#dadce0] bg-white">
        <div className="px-[16px] sm:px-[24px] py-[12px] sm:py-[16px]">
          <div className="flex items-center gap-[8px] text-[13px] sm:text-[14px] flex-wrap">
            <button
              onClick={() => onNavigate('subscriptions')}
              className="text-[#5f6368] hover:underline"
            >
              Subscriptions
            </button>
            <ChevronRightIcon size={18} className="text-[#5f6368]" />
            <span className="text-[#202124] font-medium">Google Workspace Business Plus</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-[16px] sm:p-[24px]">
        {/* Alerts Section - Only show if suspended */}
        {alerts.length > 0 && (
          <div className="bg-white rounded-[8px] shadow-[0_1px_2px_0_rgba(60,64,67,0.3),0_1px_3px_1px_rgba(60,64,67,0.15)] mb-[16px] sm:mb-[24px]">
            {/* Alert header */}
            <button
              onClick={() => setAlertsExpanded(!alertsExpanded)}
              className="w-full flex items-center justify-between px-[16px] sm:px-[24px] py-[12px] sm:py-[16px] hover:bg-[#f8f9fa] transition-colors rounded-t-[8px]"
            >
              <span className="text-[14px] sm:text-[16px] font-medium text-[#202124]">
                {alerts.length} issues need your attention
              </span>
              {alertsExpanded ? (
                <ChevronUpIcon size={24} className="text-[#5f6368]" />
              ) : (
                <ChevronDownIcon size={24} className="text-[#5f6368]" />
              )}
            </button>

            {/* Alert items */}
            {alertsExpanded && (
              <div className="border-t border-[#e8eaed]">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="flex flex-col sm:flex-row sm:items-start gap-[12px] sm:gap-[16px] px-[16px] sm:px-[24px] py-[12px] sm:py-[16px] border-b border-[#e8eaed] last:border-b-0"
                  >
                    <ErrorIcon size={20} className="text-[#d93025] flex-shrink-0 mt-[2px]" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] sm:text-[14px] text-[#202124] leading-[1.5]">
                        {alert.message}
                        {alert.hasLearnMore && (
                          <button className="text-[#1a73e8] hover:underline ml-[4px]">
                            Learn more
                          </button>
                        )}
                      </p>
                    </div>
                    <button
                      onClick={() => onNavigate(alert.actionPage)}
                      className="text-[13px] sm:text-[14px] font-medium text-[#1a73e8] hover:bg-[#e8f0fe] px-[12px] sm:px-[16px] py-[8px] rounded-[4px] transition-colors whitespace-nowrap self-start sm:self-center"
                    >
                      {alert.actionLabel}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-[16px] lg:gap-[24px]">
          {/* Left column - Product card */}
          <div className="w-full lg:w-[320px] flex-shrink-0">
            <div className="bg-white rounded-[8px] shadow-[0_1px_2px_0_rgba(60,64,67,0.3),0_1px_3px_1px_rgba(60,64,67,0.15)] p-[20px] sm:p-[24px]">
              {/* Product info */}
              <div className="flex gap-[12px] sm:gap-[16px] mb-[16px]">
                <GoogleWorkspaceIcon />
                <div>
                  <h1 className="text-[18px] sm:text-[22px] font-normal text-[#202124] leading-[1.3]">
                    Google Workspace Business Plus
                  </h1>
                </div>
              </div>

              {/* Description */}
              <p className="text-[14px] text-[#5f6368] mb-[4px]">
                For small teams to work together and get started with AI. Includes ...
                <button className="text-[#1a73e8] hover:underline ml-[4px]">Show more</button>
              </p>

              {/* Status */}
              <div className="mb-[16px]">
                {hasSuspendedPayment ? (
                  <>
                    <span className="text-[14px] text-[#d93025] font-medium">Suspended</span>
                    <p className="text-[14px] text-[#5f6368]">On Dec 6, 2025</p>
                  </>
                ) : (
                  <>
                    <span className="text-[14px] text-[#137333] font-medium">Active</span>
                    <p className="text-[14px] text-[#5f6368]">Since Dec 6, 2024</p>
                  </>
                )}
              </div>

              {/* Upgrade button */}
              <button
                onClick={() => onNavigate('buy-or-upgrade')}
                className="w-full h-[40px] bg-[#1a73e8] text-white text-[14px] font-medium rounded-[20px] hover:bg-[#1765cc] hover:shadow-[0_1px_2px_0_rgba(60,64,67,0.3),0_1px_3px_1px_rgba(60,64,67,0.15)] transition-all mb-[20px] sm:mb-[24px]"
              >
                Upgrade
              </button>

              {/* Action links */}
              <div className="border-t border-[#e8eaed] pt-[16px] space-y-[4px]">
                <button
                  onClick={() => onNavigate('payment-method')}
                  className="w-full flex items-center gap-[12px] sm:gap-[16px] py-[10px] sm:py-[12px] px-[8px] text-left hover:bg-[#f8f9fa] rounded-[4px] transition-colors"
                >
                  <CreditCardIcon size={20} className="text-[#5f6368] flex-shrink-0" />
                  <span className="text-[13px] sm:text-[14px] text-[#5f6368] font-medium tracking-[0.25px]">
                    ADD PAYMENT METHOD
                  </span>
                </button>
                <button
                  onClick={() => onNavigate('transactions')}
                  className="w-full flex items-center gap-[12px] sm:gap-[16px] py-[10px] sm:py-[12px] px-[8px] text-left hover:bg-[#f8f9fa] rounded-[4px] transition-colors"
                >
                  <ReceiptIcon size={20} className="text-[#5f6368] flex-shrink-0" />
                  <span className="text-[13px] sm:text-[14px] text-[#5f6368] font-medium tracking-[0.25px]">
                    VIEW INVOICES
                  </span>
                </button>
                <button className="w-full flex items-center gap-[12px] sm:gap-[16px] py-[10px] sm:py-[12px] px-[8px] text-left hover:bg-[#f8f9fa] rounded-[4px] transition-colors">
                  <SettingsIcon size={20} className="text-[#5f6368] flex-shrink-0" />
                  <span className="text-[13px] sm:text-[14px] text-[#5f6368] font-medium tracking-[0.25px]">
                    VIEW PAYMENT SETTINGS
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Right column - Plan details */}
          <div className="flex-1 space-y-[16px] lg:space-y-[24px]">
            {/* Plan details card */}
            <div className="bg-white rounded-[8px] shadow-[0_1px_2px_0_rgba(60,64,67,0.3),0_1px_3px_1px_rgba(60,64,67,0.15)]">
              {/* Header */}
              <div className="px-[16px] sm:px-[24px] py-[12px] sm:py-[16px] border-b border-[#e8eaed]">
                <h2 className="text-[16px] font-normal text-[#5f6368]">Plan details</h2>
              </div>

              {/* Summary row */}
              <div className="px-[16px] sm:px-[24px] py-[16px] sm:py-[20px] border-b border-[#e8eaed]">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-[16px]">
                  {/* Payment plan */}
                  <div>
                    <div className="flex items-center gap-[4px] mb-[4px]">
                      <span className="text-[14px] text-[#5f6368]">Payment plan</span>
                      <InfoCircleIcon className="text-[#5f6368]" />
                    </div>
                    <p className="text-[14px] text-[#202124]">Flexible plan</p>
                  </div>

                  {/* Licences */}
                  <div>
                    <div className="flex items-center gap-[4px] mb-[4px]">
                      <span className="text-[14px] text-[#5f6368]">Licenses</span>
                      <InfoCircleIcon className="text-[#5f6368]" />
                    </div>
                    <p className="text-[14px] text-[#202124]">{licenses} assigned</p>
                  </div>

                  {/* Estimated monthly bill */}
                  <div>
                    <div className="flex items-center gap-[4px] mb-[4px]">
                      <span className="text-[14px] text-[#5f6368]">Estimated monthly bill</span>
                      <InfoCircleIcon className="text-[#5f6368]" />
                    </div>
                    <p className="text-[14px] text-[#202124]">${estimatedMonthlyBill.toLocaleString()}.00 USD</p>
                  </div>
                </div>
              </div>

              {/* Hide/Show charges toggle */}
              <div className="px-[16px] sm:px-[24px] py-[12px] border-b border-[#e8eaed]">
                <button
                  onClick={() => setChargesExpanded(!chargesExpanded)}
                  className="flex items-center gap-[4px] text-[14px] text-[#1a73e8] hover:underline"
                >
                  {chargesExpanded ? 'Hide' : 'Show'} charges
                  {chargesExpanded ? (
                    <ChevronUpIcon size={20} className="text-[#1a73e8]" />
                  ) : (
                    <ChevronDownIcon size={20} className="text-[#1a73e8]" />
                  )}
                </button>
              </div>

              {/* Pricing details */}
              {chargesExpanded && (
                <>
                  <div className="px-[16px] sm:px-[24px] py-[12px] sm:py-[16px] border-b border-[#e8eaed]">
                    <p className="text-[14px] text-[#202124]">
                      Standard pricing for all users.
                    </p>
                  </div>

                  {/* Pricing table */}
                  <div className="px-[16px] sm:px-[24px] overflow-x-auto">
                    <table className="w-full min-w-[400px]">
                      <thead>
                        <tr className="border-b border-[#e8eaed]">
                          <th className="text-left py-[12px] sm:py-[16px] text-[14px] font-medium text-[#5f6368]">
                            Date
                          </th>
                          <th className="text-left py-[12px] sm:py-[16px] text-[14px] font-medium text-[#5f6368]">
                            Price
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="py-[12px] sm:py-[16px] text-[14px] text-[#202124] align-top">
                            Starting Dec 6, 2024
                          </td>
                          <td className="py-[12px] sm:py-[16px]">
                            <div>
                              <p className="text-[12px] text-[#5f6368] mb-[2px]">For all users</p>
                              <p className="text-[14px] text-[#202124]">
                                ${pricePerUser}.00 USD per user/month
                              </p>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionDetailPage;
