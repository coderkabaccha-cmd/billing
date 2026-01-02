import React, { useState } from 'react';
import { ArrowUpIcon, ChevronUpIcon, ChevronDownIcon, ErrorIcon } from '../components/Icons';
import { useUser } from '../context/UserContext';

interface SubscriptionsListPageProps {
  onNavigate: (page: string) => void;
}

// Google Workspace colorful G icon
const GoogleWorkspaceIcon: React.FC = () => (
  <svg width="32" height="32" viewBox="0 0 48 48" className="flex-shrink-0">
    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
  </svg>
);

export const SubscriptionsListPage: React.FC<SubscriptionsListPageProps> = ({ onNavigate }) => {
  const [alertsExpanded, setAlertsExpanded] = useState(true);
  const { user } = useUser();

  const hasSuspendedPayment = user?.hasSuspendedPayment ?? false;
  const licenses = user?.licenses ?? 121;

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
    },
  ] : [];

  const subscriptions = [
    {
      id: '1',
      name: 'Google Workspace Business Plus',
      status: hasSuspendedPayment ? 'Suspended' : 'Active',
      licences: `${licenses} assigned`,
      paymentPlan: 'Flexible plan',
      paymentDue: 'View invoices',
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Page header */}
      <div className="border-b border-[#dadce0] bg-white">
        <div className="px-[16px] sm:px-[24px] py-[12px] sm:py-[16px]">
          <h1 className="text-[18px] sm:text-[22px] font-normal text-[#202124]">Subscriptions</h1>
        </div>
      </div>

      {/* Content */}
      <div className="p-[16px] sm:p-[24px]">
        {/* Alerts Section - Only show if there are alerts */}
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
                        {alert.id === '2' && (
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

        {/* Subscriptions Card */}
        <div className="bg-white rounded-[8px] shadow-[0_1px_2px_0_rgba(60,64,67,0.3),0_1px_3px_1px_rgba(60,64,67,0.15)]">
          {/* Card header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between px-[16px] sm:px-[24px] py-[12px] sm:py-[16px] border-b border-[#e8eaed] gap-[12px]">
            <h2 className="text-[16px] font-medium text-[#202124]">Subscriptions</h2>
            <button
              onClick={() => onNavigate('buy-or-upgrade')}
              className="h-[36px] px-[20px] sm:px-[24px] bg-[#1a73e8] text-white text-[14px] font-medium rounded-[18px] hover:bg-[#1765cc] hover:shadow-[0_1px_2px_0_rgba(60,64,67,0.3),0_1px_3px_1px_rgba(60,64,67,0.15)] transition-all w-full sm:w-auto"
            >
              Buy or upgrade
            </button>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#e8eaed]">
                  <th className="text-left px-[24px] py-[12px] text-[12px] font-medium text-[#5f6368]">
                    <div className="flex items-center gap-[4px]">
                      Name
                      <ArrowUpIcon size={16} className="text-[#5f6368]" />
                    </div>
                  </th>
                  <th className="text-left px-[16px] py-[12px] text-[12px] font-medium text-[#5f6368]">
                    Status
                  </th>
                  <th className="text-left px-[16px] py-[12px] text-[12px] font-medium text-[#5f6368]">
                    Licenses
                  </th>
                  <th className="text-left px-[16px] py-[12px] text-[12px] font-medium text-[#5f6368]">
                    Payment plan
                  </th>
                  <th className="text-left px-[16px] py-[12px] text-[12px] font-medium text-[#5f6368]">
                    Payment due
                  </th>
                </tr>
              </thead>
              <tbody>
                {subscriptions.map((subscription) => (
                  <tr
                    key={subscription.id}
                    className="border-b border-[#e8eaed] hover:bg-[#f8f9fa] cursor-pointer"
                    onClick={() => onNavigate('subscription-detail')}
                  >
                    <td className="px-[24px] py-[16px]">
                      <div className="flex items-center gap-[16px]">
                        <GoogleWorkspaceIcon />
                        <button
                          onClick={(e) => { e.stopPropagation(); onNavigate('subscription-detail'); }}
                          className="text-[14px] text-[#1a73e8] hover:underline text-left"
                        >
                          {subscription.name}
                        </button>
                      </div>
                    </td>
                    <td className="px-[16px] py-[16px]">
                      <span className={`text-[14px] ${subscription.status === 'Suspended' ? 'text-[#d93025]' : 'text-[#202124]'}`}>
                        {subscription.status}
                      </span>
                    </td>
                    <td className="px-[16px] py-[16px] text-[14px] text-[#202124]">
                      {subscription.licences}
                    </td>
                    <td className="px-[16px] py-[16px] text-[14px] text-[#202124]">
                      {subscription.paymentPlan}
                    </td>
                    <td className="px-[16px] py-[16px]">
                      <button
                        onClick={(e) => { e.stopPropagation(); onNavigate('transactions'); }}
                        className="text-[14px] text-[#1a73e8] hover:underline"
                      >
                        {subscription.paymentDue}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden">
            {subscriptions.map((subscription) => (
              <div
                key={subscription.id}
                className="p-[16px] border-b border-[#e8eaed]"
              >
                <div className="flex items-start gap-[12px] mb-[12px]">
                  <GoogleWorkspaceIcon />
                  <div className="flex-1 min-w-0">
                    <button
                      onClick={() => onNavigate('subscription-detail')}
                      className="text-[14px] text-[#1a73e8] hover:underline text-left block"
                    >
                      {subscription.name}
                    </button>
                    <p className={`text-[12px] mt-[4px] ${subscription.status === 'Suspended' ? 'text-[#d93025]' : 'text-[#5f6368]'}`}>
                      {subscription.status}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-[8px] text-[13px]">
                  <div>
                    <span className="text-[#5f6368]">Licenses: </span>
                    <span className="text-[#202124]">{subscription.licences}</span>
                  </div>
                  <div>
                    <span className="text-[#5f6368]">Plan: </span>
                    <span className="text-[#202124]">{subscription.paymentPlan}</span>
                  </div>
                </div>
                <button
                  onClick={() => onNavigate('transactions')}
                  className="mt-[12px] text-[14px] text-[#1a73e8] hover:underline"
                >
                  {subscription.paymentDue}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionsListPage;
