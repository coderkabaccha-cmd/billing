import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon, ErrorIcon, PinIcon } from '../components/Icons';
import { useUser } from '../context/UserContext';

interface PaymentAccountsPageProps {
  onNavigate: (page: string) => void;
}

interface ActionsDropdownProps {
  onViewInvoices: () => void;
  onViewPaymentMethods: () => void;
  onViewPaymentSettings: () => void;
  onViewHistory: () => void;
}

const ActionsDropdown: React.FC<ActionsDropdownProps> = ({
  onViewInvoices,
  onViewPaymentMethods,
  onViewPaymentSettings,
  onViewHistory,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0 });
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    if (!isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 4,
        right: window.innerWidth - rect.right,
      });
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={handleToggle}
        className="flex items-center gap-[4px] text-[14px] text-[#1a73e8] font-medium hover:bg-[#e8f0fe] px-[12px] sm:px-[16px] py-[8px] rounded-[4px] transition-colors"
      >
        Actions
        {isOpen ? (
          <ChevronUpIcon size={20} className="text-[#1a73e8]" />
        ) : (
          <ChevronDownIcon size={20} className="text-[#1a73e8]" />
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-[9998]"
            onClick={() => setIsOpen(false)}
          />
          <div
            className="fixed w-[200px] sm:w-[220px] bg-white rounded-[4px] shadow-[0_1px_2px_0_rgba(60,64,67,0.3),0_2px_6px_2px_rgba(60,64,67,0.15)] py-[8px] z-[9999]"
            style={{ top: dropdownPosition.top, right: dropdownPosition.right }}
          >
            <button
              onClick={() => { onViewInvoices(); setIsOpen(false); }}
              className="w-full text-left px-[16px] py-[12px] text-[14px] text-[#202124] hover:bg-[#f1f3f4] transition-colors"
            >
              View invoices
            </button>
            <button
              onClick={() => { onViewPaymentMethods(); setIsOpen(false); }}
              className="w-full text-left px-[16px] py-[12px] text-[14px] text-[#202124] hover:bg-[#f1f3f4] transition-colors"
            >
              View payment methods
            </button>
            <button
              onClick={() => { onViewPaymentSettings(); setIsOpen(false); }}
              className="w-full text-left px-[16px] py-[12px] text-[14px] text-[#202124] hover:bg-[#f1f3f4] transition-colors"
            >
              View payment settings
            </button>
            <button
              onClick={() => { onViewHistory(); setIsOpen(false); }}
              className="w-full text-left px-[16px] py-[12px] text-[14px] text-[#202124] hover:bg-[#f1f3f4] transition-colors"
            >
              View history
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export const PaymentAccountsPage: React.FC<PaymentAccountsPageProps> = ({ onNavigate }) => {
  const { user } = useUser();
  const hasSuspendedPayment = user?.hasSuspendedPayment ?? false;

  const handleViewInvoices = () => onNavigate('transactions');
  const handleViewPaymentMethods = () => onNavigate('payment-method');
  const handleViewPaymentSettings = () => {};
  const handleViewHistory = () => onNavigate('transactions');

  const paymentAccounts = [
    {
      id: '1',
      accountId: '8454-3765-8897-3061',
      status: 'In use' as const,
      subscriptions: 'Google Workspace Business Plus',
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Page header */}
      <div className="border-b border-[#dadce0] bg-white">
        <div className="px-[16px] sm:px-[24px] py-[12px] sm:py-[16px]">
          <h1 className="text-[18px] sm:text-[22px] font-normal text-[#202124]">Payment accounts</h1>
        </div>
      </div>

      {/* Content */}
      <div className="p-[16px] sm:p-[24px]">
        {/* Page title */}
        <h2 className="text-[24px] sm:text-[28px] font-normal text-[#202124] mb-[16px] sm:mb-[24px]">Payment accounts</h2>

        {/* Alert Banner - RED - Only show for suspended payment users */}
        {hasSuspendedPayment && (
          <div className="bg-[#d93025] rounded-[4px] px-[16px] sm:px-[24px] py-[12px] sm:py-[16px] mb-[16px] sm:mb-[24px] flex flex-col sm:flex-row sm:items-center justify-between gap-[12px]">
            <div className="flex items-start gap-[12px] sm:gap-[16px]">
              <ErrorIcon size={20} className="text-white flex-shrink-0 mt-[2px]" />
              <p className="text-[13px] sm:text-[14px] text-white leading-[1.5]">
                You've got a payment due. - Pay your overdue account balance by updating your Visa •••• 6189, which was declined or contact your bank to resolve the issue.
              </p>
            </div>
            <button
              onClick={() => onNavigate('payment-account-detail')}
              className="border border-white text-white text-[13px] sm:text-[14px] font-medium px-[16px] sm:px-[24px] py-[6px] rounded-[4px] hover:bg-white/10 transition-colors whitespace-nowrap self-start sm:self-center"
            >
              PAY NOW
            </button>
          </div>
        )}

        {/* Table Card */}
        <div className="bg-white rounded-[8px] shadow-[0_1px_2px_0_rgba(60,64,67,0.3),0_1px_3px_1px_rgba(60,64,67,0.15)]">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#e8eaed]">
                  <th className="text-left px-[24px] py-[16px] text-[14px] font-medium text-[#5f6368]">
                    <div className="flex items-center gap-[8px]">
                      Account ID
                      <PinIcon size={18} className="text-[#5f6368]" />
                    </div>
                  </th>
                  <th className="text-left px-[16px] py-[16px] text-[14px] font-medium text-[#5f6368]">
                    Status
                  </th>
                  <th className="text-left px-[16px] py-[16px] text-[14px] font-medium text-[#5f6368]">
                    Subscriptions
                  </th>
                  <th className="text-right px-[24px] py-[16px] text-[14px] font-medium text-[#5f6368]">
                  </th>
                </tr>
              </thead>
              <tbody>
                {paymentAccounts.map((account) => (
                  <tr
                    key={account.id}
                    className="border-b border-[#e8eaed] hover:bg-[#f8f9fa]"
                  >
                    <td className="px-[24px] py-[16px]">
                      <button
                        onClick={() => onNavigate('payment-account-detail')}
                        className="text-[14px] text-[#1a73e8] hover:underline"
                      >
                        {account.accountId}
                      </button>
                    </td>
                    <td className="px-[16px] py-[16px]">
                      <span className="inline-block px-[8px] py-[2px] text-[12px] font-medium text-[#1a73e8] bg-[#e8f0fe] rounded-[4px]">
                        {account.status}
                      </span>
                    </td>
                    <td className="px-[16px] py-[16px] text-[14px] text-[#202124]">
                      {account.subscriptions}
                    </td>
                    <td className="px-[24px] py-[16px] text-right">
                      <ActionsDropdown
                        onViewInvoices={handleViewInvoices}
                        onViewPaymentMethods={handleViewPaymentMethods}
                        onViewPaymentSettings={handleViewPaymentSettings}
                        onViewHistory={handleViewHistory}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden">
            {paymentAccounts.map((account) => (
              <div
                key={account.id}
                className="p-[16px] border-b border-[#e8eaed]"
              >
                <div className="flex items-start justify-between mb-[12px]">
                  <div>
                    <button
                      onClick={() => onNavigate('payment-account-detail')}
                      className="text-[14px] text-[#1a73e8] hover:underline block mb-[8px]"
                    >
                      {account.accountId}
                    </button>
                    <span className="inline-block px-[8px] py-[2px] text-[12px] font-medium text-[#1a73e8] bg-[#e8f0fe] rounded-[4px]">
                      {account.status}
                    </span>
                  </div>
                  <ActionsDropdown
                    onViewInvoices={handleViewInvoices}
                    onViewPaymentMethods={handleViewPaymentMethods}
                    onViewPaymentSettings={handleViewPaymentSettings}
                    onViewHistory={handleViewHistory}
                  />
                </div>
                <div className="text-[13px]">
                  <span className="text-[#5f6368]">Subscription: </span>
                  <span className="text-[#202124]">{account.subscriptions}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentAccountsPage;
