import React from 'react';
import {
  ChevronRightIcon,
  DownloadIcon,
  WarningIcon,
  PaymentIcon,
  CalendarIcon,
  AddIcon,
} from '../components/Icons';
import { useUser } from '../context/UserContext';

interface PaymentAccountDetailPageProps {
  onNavigate: (page: string) => void;
}

// Visa logo component
const VisaLogo: React.FC = () => (
  <svg width="50" height="16" viewBox="0 0 50 16" fill="none">
    <path d="M21.5 1.5L19 14.5H16L18.5 1.5H21.5Z" fill="#1434CB"/>
    <path d="M34.5 1.8C33.8 1.5 32.7 1.2 31.4 1.2C28.4 1.2 26.3 2.8 26.3 5C26.3 6.6 27.7 7.5 28.8 8.1C29.9 8.7 30.3 9.1 30.3 9.6C30.3 10.4 29.3 10.8 28.4 10.8C27.1 10.8 26.4 10.6 25.3 10.1L24.9 9.9L24.5 12.7C25.3 13.1 26.7 13.4 28.2 13.4C31.4 13.4 33.4 11.8 33.4 9.5C33.4 8.2 32.6 7.2 30.9 6.4C29.9 5.8 29.3 5.5 29.3 4.9C29.3 4.4 29.9 3.9 31.1 3.9C32.1 3.9 32.9 4.1 33.5 4.4L33.8 4.5L34.5 1.8Z" fill="#1434CB"/>
    <path d="M39.2 1.5C38.6 1.5 38.1 1.7 37.8 2.3L33.3 14.5H36.5L37.1 12.7H40.9L41.3 14.5H44.2L41.7 1.5H39.2ZM38 10.2C38.2 9.6 39.2 6.7 39.2 6.7C39.2 6.7 39.5 5.8 39.7 5.3L39.9 6.6C39.9 6.6 40.5 9.4 40.7 10.2H38Z" fill="#1434CB"/>
    <path d="M14.2 1.5L11.3 10.5L11 9C10.4 7.1 8.6 5.1 6.5 4L9.2 14.5H12.4L17.4 1.5H14.2Z" fill="#1434CB"/>
    <path d="M8.3 1.5H3.3L3.3 1.7C7.1 2.7 9.6 5.1 10.5 8L9.5 2.4C9.3 1.8 8.9 1.5 8.3 1.5Z" fill="#F9A533"/>
  </svg>
);

export const PaymentAccountDetailPage: React.FC<PaymentAccountDetailPageProps> = ({ onNavigate }) => {
  const { user } = useUser();
  const hasSuspendedPayment = user?.hasSuspendedPayment ?? false;
  const totalAmount = user?.totalAmount ?? 5490;
  const domain = user?.domain === 'linodegpu' ? 'linodegpu.com' : 'linkerdm.online';
  const licenses = user?.licenses ?? 121;

  // Transaction history based on user
  const transactions = hasSuspendedPayment ? [
    { id: '1', date: 'Dec 6, 2025', amount: `$${totalAmount.toLocaleString()}.00` },
    { id: '2', date: 'Nov 30, 2025', amount: '$3,825.00', hasDownload: true },
    { id: '3', date: 'Oct 31, 2025', amount: '$3,690.00', hasDownload: true },
  ] : [
    { id: '1', date: 'Dec 6, 2025', amount: `$${totalAmount.toLocaleString()}.00`, hasDownload: true },
    { id: '2', date: 'Nov 30, 2025', amount: '$5,445.00', hasDownload: true },
    { id: '3', date: 'Oct 31, 2025', amount: '$5,445.00', hasDownload: true },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Page header with breadcrumb */}
      <div className="border-b border-[#dadce0] bg-white">
        <div className="px-[16px] sm:px-[24px] py-[12px] sm:py-[16px]">
          <div className="flex items-center gap-[8px] text-[13px] sm:text-[14px] flex-wrap">
            <button
              onClick={() => onNavigate('payment-accounts')}
              className="text-[#5f6368] hover:underline"
            >
              Payment accounts
            </button>
            <ChevronRightIcon size={18} className="text-[#5f6368]" />
            <span className="text-[#202124]">8454-3765-8897-3061</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-[16px] sm:p-[24px]">
        {/* Help text */}
        <p className="text-[14px] text-[#5f6368] mb-[16px]">
          Need help learning how Google Workspace billing works?{' '}
          <button className="text-[#1a73e8] hover:underline">Learn more</button>
        </p>

        {/* Red Alert Banner - Only show for suspended payment users */}
        {hasSuspendedPayment && (
          <div className="bg-[#d93025] rounded-[4px] px-[16px] sm:px-[24px] py-[12px] sm:py-[16px] mb-[16px] sm:mb-[24px] flex flex-col sm:flex-row sm:items-center justify-between gap-[12px]">
            <div className="flex items-start gap-[12px] sm:gap-[16px]">
              <WarningIcon size={20} className="text-white flex-shrink-0 mt-[2px]" />
              <p className="text-[13px] sm:text-[14px] text-white leading-[1.5]">
                Pay your overdue account balance by updating your Visa •••• 6189, which was declined or contact your bank to resolve the issue.
              </p>
            </div>
            <button
              onClick={() => onNavigate('payment-method')}
              className="border border-white text-white text-[13px] sm:text-[14px] font-medium px-[16px] sm:px-[24px] py-[8px] rounded-[4px] hover:bg-white/10 transition-colors whitespace-nowrap self-start sm:self-center"
            >
              Pay now
            </button>
          </div>
        )}

        {/* Balance Card */}
        <div className="bg-white rounded-[8px] shadow-[0_1px_2px_0_rgba(60,64,67,0.3),0_1px_3px_1px_rgba(60,64,67,0.15)] mb-[16px] sm:mb-[24px]">
          <div className="px-[16px] sm:px-[24px] py-[20px] sm:py-[24px]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-[16px]">
              <div>
                <h2 className="text-[16px] font-normal text-[#202124] mb-[8px]">Your balance</h2>
                <p className="text-[32px] sm:text-[40px] font-normal text-[#202124]">${totalAmount.toLocaleString()}.00</p>
              </div>
            </div>
          </div>
          <div className="border-t border-[#e8eaed] px-[16px] sm:px-[24px] py-[12px] sm:py-[16px]">
            <div className="flex flex-col sm:flex-row sm:items-center gap-[12px] sm:gap-[24px] text-[14px] text-[#5f6368]">
              <div className="flex items-center gap-[8px]">
                <PaymentIcon size={18} className="text-[#5f6368]" />
                <span>Automatic payments</span>
              </div>
              <div className="flex items-center gap-[8px]">
                <CalendarIcon size={18} className="text-[#5f6368]" />
                <span>Your last payment was on Oct 16 for $3,150.00.</span>
              </div>
            </div>
          </div>
          <div className="border-t border-[#e8eaed] px-[16px] sm:px-[24px] py-[12px]">
            <button className="text-[14px] text-[#1a73e8] hover:underline font-medium">
              Make a payment
            </button>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[16px] sm:gap-[24px]">
          {/* Transactions Card */}
          <div className="bg-white rounded-[8px] shadow-[0_1px_2px_0_rgba(60,64,67,0.3),0_1px_3px_1px_rgba(60,64,67,0.15)]">
            <div className="px-[16px] sm:px-[24px] py-[16px] sm:py-[20px]">
              <h2 className="text-[18px] font-normal text-[#202124]">Transactions</h2>
            </div>
            <div className="border-t border-[#e8eaed]">
              {transactions.map((transaction, index) => (
                <div
                  key={transaction.id}
                  className={`px-[16px] sm:px-[24px] py-[12px] flex items-center justify-between ${
                    index !== transactions.length - 1 ? 'border-b border-[#e8eaed]' : ''
                  }`}
                >
                  <button className="text-[14px] text-[#1a73e8] hover:underline">
                    {transaction.date}
                  </button>
                  <div className="flex items-center gap-[16px]">
                    <span className="text-[14px] text-[#202124]">{transaction.amount}</span>
                    {transaction.hasDownload && (
                      <button className="text-[#5f6368] hover:text-[#202124]">
                        <DownloadIcon size={20} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-[#e8eaed] px-[16px] sm:px-[24px] py-[12px]">
              <button
                onClick={() => onNavigate('transactions')}
                className="text-[14px] text-[#1a73e8] hover:underline font-medium"
              >
                View transactions and documents
              </button>
            </div>
          </div>

          {/* How you pay Card */}
          <div className="bg-white rounded-[8px] shadow-[0_1px_2px_0_rgba(60,64,67,0.3),0_1px_3px_1px_rgba(60,64,67,0.15)]">
            <div className="px-[16px] sm:px-[24px] py-[16px] sm:py-[20px]">
              <h2 className="text-[18px] font-normal text-[#202124]">How you pay</h2>
            </div>
            <div className="border-t border-[#e8eaed] px-[16px] sm:px-[24px] py-[16px] sm:py-[20px]">
              <div className="flex gap-[40px] sm:gap-[80px]">
                {/* Primary */}
                <div>
                  <p className="text-[12px] font-medium text-[#5f6368] mb-[12px]">PRIMARY</p>
                  <div className="flex items-center gap-[12px] mb-[4px]">
                    <VisaLogo />
                    <span className="text-[14px] text-[#202124]">Visa •••• 6189</span>
                  </div>
                  {hasSuspendedPayment && (
                    <p className="text-[14px] text-[#d93025]">Transaction declined</p>
                  )}
                </div>

                {/* Backup */}
                <div>
                  <p className="text-[12px] font-medium text-[#5f6368] mb-[12px]">BACKUP</p>
                  <button
                    onClick={() => onNavigate('payment-method')}
                    className="flex items-center gap-[8px] text-[14px] text-[#1a73e8] hover:underline"
                  >
                    <AddIcon size={20} />
                    <span>Add a backup</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="border-t border-[#e8eaed] px-[16px] sm:px-[24px] py-[12px]">
              <button
                onClick={() => onNavigate('payment-method')}
                className="text-[14px] text-[#1a73e8] hover:underline font-medium"
              >
                Manage payment methods
              </button>
            </div>
          </div>
        </div>

        {/* Settings Card */}
        <div className="bg-white rounded-[8px] shadow-[0_1px_2px_0_rgba(60,64,67,0.3),0_1px_3px_1px_rgba(60,64,67,0.15)] mt-[16px] sm:mt-[24px]">
          <div className="px-[16px] sm:px-[24px] py-[16px] sm:py-[20px]">
            <h2 className="text-[18px] font-normal text-[#202124]">Settings</h2>
          </div>
          <div className="border-t border-[#e8eaed] px-[16px] sm:px-[24px] py-[16px] sm:py-[20px]">
            <p className="text-[14px] text-[#202124] mb-[4px]">{domain}</p>
            <p className="text-[14px] text-[#202124] mb-[8px]">Admin Account</p>
            <button className="text-[14px] text-[#1a73e8] hover:underline">{licenses} users</button>
          </div>
          <div className="border-t border-[#e8eaed] px-[16px] sm:px-[24px] py-[12px]">
            <button className="text-[14px] text-[#1a73e8] hover:underline font-medium">
              Manage settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentAccountDetailPage;
