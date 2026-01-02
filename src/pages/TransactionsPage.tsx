import React, { useState } from 'react';
import {
  ChevronRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  DownloadIcon,
  PrintIcon,
} from '../components/Icons';
import { useUser } from '../context/UserContext';

interface TransactionsPageProps {
  onNavigate: (page: string) => void;
}

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: string;
  isPayment?: boolean;
  isCredit?: boolean;
}

interface MonthData {
  id: string;
  month: string;
  year: string;
  dateRange: string;
  totalCharges: string;
  netTotal: string;
  startingBalance: string;
  endingBalance: string;
  transactions: Transaction[];
  documents?: {
    pdfInvoices: { id: string; createdDate: string }[];
  };
}

// Arrow icons for month navigation
const ArrowLeftIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
  </svg>
);

const ArrowRightNavIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
  </svg>
);

export const TransactionsPage: React.FC<TransactionsPageProps> = ({ onNavigate }) => {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);
  const [expandedDocuments, setExpandedDocuments] = useState<Record<string, boolean>>({});
  const { user } = useUser();

  const totalAmount = user?.totalAmount ?? 5490;
  const licenses = user?.licenses ?? 121;
  const pricePerUser = user?.pricePerUser ?? 45;
  const monthlyCharge = licenses * pricePerUser;

  // Generate months data based on user
  const monthsData: MonthData[] = [
    {
      id: 'dec-2025',
      month: 'December',
      year: '2025',
      dateRange: 'Dec 1 – Dec 31, 2025',
      totalCharges: `$${totalAmount.toLocaleString()}.00`,
      netTotal: `$${totalAmount.toLocaleString()}.00`,
      startingBalance: '$0.00',
      endingBalance: `$${totalAmount.toLocaleString()}.00`,
      transactions: [
        { id: '1', date: 'Dec 1 – Dec 31', description: `Google Workspace Business Plus: Usage of ${licenses} seats`, amount: `$${monthlyCharge.toLocaleString()}.00` },
        { id: '2', date: 'Dec 1 – Dec 31', description: 'Platform fee', amount: `$${(totalAmount - monthlyCharge).toLocaleString()}.00` },
      ],
      documents: {
        pdfInvoices: [{ id: 'INV-2025-1201', createdDate: '12/01/2025' }],
      },
    },
    {
      id: 'nov-2025',
      month: 'November',
      year: '2025',
      dateRange: 'Nov 1 – Nov 30, 2025',
      totalCharges: `$${totalAmount.toLocaleString()}.00`,
      netTotal: `$${totalAmount.toLocaleString()}.00`,
      startingBalance: '$0.00',
      endingBalance: `$${totalAmount.toLocaleString()}.00`,
      transactions: [
        { id: '3', date: 'Nov 1 – Nov 30', description: `Google Workspace Business Plus: Usage of ${licenses} seats`, amount: `$${monthlyCharge.toLocaleString()}.00` },
        { id: '4', date: 'Nov 1 – Nov 30', description: 'Platform fee', amount: `$${(totalAmount - monthlyCharge).toLocaleString()}.00` },
      ],
      documents: {
        pdfInvoices: [{ id: 'INV-2025-1101', createdDate: '11/01/2025' }],
      },
    },
    {
      id: 'oct-2025',
      month: 'October',
      year: '2025',
      dateRange: 'Oct 1 – Oct 31, 2025',
      totalCharges: `$${totalAmount.toLocaleString()}.00`,
      netTotal: `$${totalAmount.toLocaleString()}.00`,
      startingBalance: '$0.00',
      endingBalance: `$${totalAmount.toLocaleString()}.00`,
      transactions: [
        { id: '5', date: 'Oct 1 – Oct 31', description: `Google Workspace Business Plus: Usage of ${licenses} seats`, amount: `$${monthlyCharge.toLocaleString()}.00` },
        { id: '6', date: 'Oct 1 – Oct 31', description: 'Platform fee', amount: `$${(totalAmount - monthlyCharge).toLocaleString()}.00` },
      ],
      documents: {
        pdfInvoices: [{ id: 'INV-2025-1001', createdDate: '10/01/2025' }],
      },
    },
  ];

  const currentMonth = monthsData[currentMonthIndex];

  const goToPreviousMonth = () => {
    if (currentMonthIndex < monthsData.length - 1) {
      setCurrentMonthIndex(currentMonthIndex + 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonthIndex > 0) {
      setCurrentMonthIndex(currentMonthIndex - 1);
    }
  };

  const toggleDocuments = (monthId: string) => {
    setExpandedDocuments((prev) => ({
      ...prev,
      [monthId]: !prev[monthId],
    }));
  };

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
            <span className="text-[#202124] font-medium">Transactions</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-[16px] sm:p-[24px]">
        {/* Month navigation */}
        <div className="flex items-center justify-between mb-[16px] sm:mb-[24px]">
          <div className="flex items-center gap-[8px] sm:gap-[16px]">
            <button
              onClick={goToPreviousMonth}
              disabled={currentMonthIndex >= monthsData.length - 1}
              className={`p-[8px] rounded-full transition-colors ${
                currentMonthIndex >= monthsData.length - 1
                  ? 'text-[#dadce0] cursor-not-allowed'
                  : 'text-[#5f6368] hover:bg-[#e8eaed]'
              }`}
            >
              <ArrowLeftIcon />
            </button>
            <h2 className="text-[20px] sm:text-[24px] font-normal text-[#202124]">
              {currentMonth.month} {currentMonth.year}
            </h2>
            <button
              onClick={goToNextMonth}
              disabled={currentMonthIndex <= 0}
              className={`p-[8px] rounded-full transition-colors ${
                currentMonthIndex <= 0
                  ? 'text-[#dadce0] cursor-not-allowed'
                  : 'text-[#5f6368] hover:bg-[#e8eaed]'
              }`}
            >
              <ArrowRightNavIcon />
            </button>
          </div>
          <div className="flex items-center gap-[4px] sm:gap-[8px]">
            <button className="p-[8px] hover:bg-[#e8eaed] rounded-full transition-colors">
              <DownloadIcon size={20} className="text-[#5f6368]" />
            </button>
            <button className="p-[8px] hover:bg-[#e8eaed] rounded-full transition-colors hidden sm:block">
              <PrintIcon size={20} className="text-[#5f6368]" />
            </button>
          </div>
        </div>

        {/* Summary card */}
        <div className="bg-white rounded-[8px] shadow-[0_1px_2px_0_rgba(60,64,67,0.3),0_1px_3px_1px_rgba(60,64,67,0.15)] mb-[16px] sm:mb-[24px]">
          <div className="p-[16px] sm:p-[24px]">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-[16px]">
              <div>
                <p className="text-[12px] sm:text-[14px] text-[#5f6368] mb-[4px]">Total Charges</p>
                <p className="text-[16px] sm:text-[20px] font-medium text-[#202124]">{currentMonth.totalCharges}</p>
              </div>
              <div>
                <p className="text-[12px] sm:text-[14px] text-[#5f6368] mb-[4px]">Net Total</p>
                <p className="text-[16px] sm:text-[20px] font-medium text-[#1a73e8]">{currentMonth.netTotal}</p>
              </div>
              <div className="hidden sm:block">
                <p className="text-[14px] text-[#5f6368] mb-[4px]">Starting Balance</p>
                <p className="text-[20px] font-medium text-[#202124]">{currentMonth.startingBalance}</p>
              </div>
              <div className="hidden sm:block">
                <p className="text-[14px] text-[#5f6368] mb-[4px]">Ending Balance</p>
                <p className="text-[20px] font-medium text-[#202124]">{currentMonth.endingBalance}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Documents section */}
        {currentMonth.documents && (
          <div className="bg-white rounded-[8px] shadow-[0_1px_2px_0_rgba(60,64,67,0.3),0_1px_3px_1px_rgba(60,64,67,0.15)] mb-[16px] sm:mb-[24px]">
            <button
              onClick={() => toggleDocuments(currentMonth.id)}
              className="w-full flex items-center justify-between px-[16px] sm:px-[24px] py-[12px] sm:py-[16px] hover:bg-[#f8f9fa] transition-colors"
            >
              <span className="text-[14px] sm:text-[16px] font-medium text-[#202124]">
                Documents ({currentMonth.documents.pdfInvoices.length})
              </span>
              {expandedDocuments[currentMonth.id] ? (
                <ChevronUpIcon size={24} className="text-[#5f6368]" />
              ) : (
                <ChevronDownIcon size={24} className="text-[#5f6368]" />
              )}
            </button>

            {expandedDocuments[currentMonth.id] && (
              <div className="px-[16px] sm:px-[24px] pb-[16px]">
                <div className="mb-[8px]">
                  <p className="text-[14px] font-medium text-[#202124] mb-[4px]">
                    PDF Invoice ({currentMonth.documents.pdfInvoices.length})
                  </p>
                  {currentMonth.documents.pdfInvoices.map((invoice) => (
                    <button
                      key={invoice.id}
                      className="text-[14px] text-[#1a73e8] hover:underline"
                    >
                      {invoice.id} (Created: {invoice.createdDate})
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Transactions card */}
        <div className="bg-white rounded-[8px] shadow-[0_1px_2px_0_rgba(60,64,67,0.3),0_1px_3px_1px_rgba(60,64,67,0.15)]">
          {/* Desktop Table Header */}
          <div className="hidden sm:flex px-[24px] py-[12px] border-b border-[#e8eaed] bg-[#f8f9fa]">
            <div className="w-[160px] text-[14px] font-medium text-[#5f6368]">Date</div>
            <div className="flex-1 text-[14px] font-medium text-[#5f6368]">Description</div>
            <div className="w-[120px] text-right text-[14px] font-medium text-[#5f6368]">
              Amount (USD)
            </div>
          </div>

          {/* Transactions */}
          {currentMonth.transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex flex-col sm:flex-row px-[16px] sm:px-[24px] py-[12px] sm:py-[16px] border-b border-[#e8eaed] hover:bg-[#f8f9fa] transition-colors"
            >
              {/* Mobile layout */}
              <div className="sm:hidden flex justify-between items-start mb-[4px]">
                <span className="text-[12px] text-[#5f6368]">{transaction.date}</span>
                <span
                  className={`text-[14px] font-medium ${
                    transaction.isCredit ? 'text-[#137333]' : 'text-[#202124]'
                  }`}
                >
                  {transaction.amount}
                </span>
              </div>
              <div className="sm:hidden text-[14px] text-[#202124]">
                {transaction.description}
              </div>

              {/* Desktop layout */}
              <div className="hidden sm:block w-[160px] text-[14px] text-[#202124]">
                {transaction.date}
              </div>
              <div className="hidden sm:block flex-1 text-[14px] text-[#202124]">
                {transaction.description}
              </div>
              <div
                className={`hidden sm:block w-[120px] text-right text-[14px] font-medium ${
                  transaction.isCredit ? 'text-[#137333]' : 'text-[#202124]'
                }`}
              >
                {transaction.amount}
              </div>
            </div>
          ))}

          {/* Totals */}
          <div className="px-[16px] sm:px-[24px] py-[12px] sm:py-[16px] bg-[#f8f9fa] border-t border-[#e8eaed]">
            <div className="flex justify-between items-center">
              <span className="text-[14px] font-medium text-[#202124]">Net Total for {currentMonth.month}</span>
              <span className="text-[16px] font-medium text-[#1a73e8]">{currentMonth.netTotal}</span>
            </div>
          </div>
        </div>

        {/* Month indicators */}
        <div className="flex justify-center items-center gap-[8px] mt-[24px]">
          {monthsData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentMonthIndex(index)}
              className={`w-[8px] h-[8px] rounded-full transition-colors ${
                index === currentMonthIndex ? 'bg-[#1a73e8]' : 'bg-[#dadce0]'
              }`}
            />
          ))}
        </div>
        <p className="text-center text-[12px] text-[#5f6368] mt-[8px]">
          Showing {currentMonthIndex + 1} of {monthsData.length} months
        </p>
      </div>
    </div>
  );
};

export default TransactionsPage;
