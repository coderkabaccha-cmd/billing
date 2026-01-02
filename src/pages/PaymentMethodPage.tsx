import React, { useState } from 'react';
import {
  ChevronRightIcon,
  ChevronDownIcon,
  AddIcon,
  WarningIcon,
  InfoIcon,
} from '../components/Icons';
import { AddPaymentMethodModal } from '../components/AddPaymentMethodModal';

interface PaymentMethodPageProps {
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

// NetBanking placeholder icon
const NetBankingIcon: React.FC = () => (
  <div className="w-[60px] h-[40px] bg-[#5f6368] rounded-[4px] flex items-center justify-center">
    <span className="text-white text-[10px] font-medium">Bank</span>
  </div>
);

export const PaymentMethodPage: React.FC<PaymentMethodPageProps> = ({ onNavigate }) => {
  const [showAddPaymentModal, setShowAddPaymentModal] = useState(false);

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
            <button
              onClick={() => onNavigate('payment-account-detail')}
              className="text-[#5f6368] hover:underline"
            >
              8454-3765-8897-3061
            </button>
            <ChevronRightIcon size={18} className="text-[#5f6368]" />
            <span className="text-[#202124] font-medium">Payment method</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-[16px] sm:p-[24px]">
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[16px] sm:gap-[24px]">
          {/* PRIMARY Section */}
          <div>
            <h2 className="text-[12px] font-medium text-[#5f6368] mb-[12px] tracking-[0.5px]">PRIMARY</h2>
            <div className="bg-white rounded-[8px] shadow-[0_1px_2px_0_rgba(60,64,67,0.3),0_1px_3px_1px_rgba(60,64,67,0.15)]">
              <div className="p-[16px] sm:p-[24px]">
                <div className="flex items-start gap-[16px] mb-[12px]">
                  <div className="w-[60px] h-[40px] bg-[#1a1f71] rounded-[4px] flex items-center justify-center">
                    <VisaLogo />
                  </div>
                  <div>
                    <p className="text-[14px] text-[#202124] mb-[4px]">Visa •••• 6189</p>
                    <div className="flex items-center gap-[8px]">
                      <WarningIcon size={16} className="text-[#d93025]" />
                      <span className="text-[14px] text-[#d93025]">Transaction declined</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-[16px]">
                  <span className="text-[14px] text-[#202124]">Primary</span>
                  <button className="text-[14px] text-[#1a73e8] hover:underline">Remove</button>
                  <button className="text-[14px] text-[#1a73e8] hover:underline">Fix</button>
                </div>
              </div>
            </div>
          </div>

          {/* BACKUP Section */}
          <div>
            <h2 className="text-[12px] font-medium text-[#5f6368] mb-[12px] tracking-[0.5px]">BACKUP</h2>
            <div className="bg-white rounded-[8px] border-[2px] border-dashed border-[#dadce0]">
              <div className="p-[16px] sm:p-[24px]">
                <button
                  onClick={() => setShowAddPaymentModal(true)}
                  className="flex items-center gap-[8px] text-[14px] text-[#1a73e8] hover:underline mb-[12px]"
                >
                  <AddIcon size={20} className="text-[#1a73e8]" />
                  <span>Add a backup payment method</span>
                </button>
                <p className="text-[14px] text-[#5f6368] leading-[1.5]">
                  When the primary payment method fails, a backup payment method pays the balance automatically.{' '}
                  <button className="text-[#1a73e8] hover:underline">Learn more</button>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* OTHER PAYMENT METHODS Section */}
        <div className="mt-[24px] sm:mt-[32px]">
          <div className="flex items-center gap-[8px] mb-[12px]">
            <h2 className="text-[12px] font-medium text-[#5f6368] tracking-[0.5px]">OTHER PAYMENT METHODS</h2>
            <InfoIcon size={16} className="text-[#5f6368]" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[16px] sm:gap-[24px]">
            {/* NetBanking Card */}
            <div className="bg-white rounded-[8px] shadow-[0_1px_2px_0_rgba(60,64,67,0.3),0_1px_3px_1px_rgba(60,64,67,0.15)]">
              <div className="p-[16px] sm:p-[24px]">
                <div className="flex items-start gap-[16px] mb-[12px]">
                  <NetBankingIcon />
                  <div>
                    <p className="text-[14px] text-[#202124]">NetBanking</p>
                  </div>
                </div>
                <div className="flex items-center gap-[16px]">
                  <div className="flex items-center gap-[4px]">
                    <span className="text-[14px] text-[#202124]">Other</span>
                    <ChevronDownIcon size={20} className="text-[#5f6368]" />
                  </div>
                  <button className="text-[14px] text-[#1a73e8] hover:underline">Remove</button>
                </div>
              </div>
            </div>

            {/* Add Payment Method Card */}
            <div className="bg-white rounded-[8px] border-[2px] border-dashed border-[#dadce0]">
              <div className="p-[16px] sm:p-[24px] flex items-center justify-center min-h-[120px]">
                <button
                  onClick={() => setShowAddPaymentModal(true)}
                  className="flex items-center gap-[8px] text-[14px] text-[#1a73e8] hover:underline"
                >
                  <AddIcon size={20} className="text-[#1a73e8]" />
                  <span>Add payment method</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Payment Method Modal */}
      {showAddPaymentModal && (
        <AddPaymentMethodModal onClose={() => setShowAddPaymentModal(false)} />
      )}
    </div>
  );
};

export default PaymentMethodPage;
