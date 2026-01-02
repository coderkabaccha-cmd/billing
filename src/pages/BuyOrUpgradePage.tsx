import React from 'react';
import { CheckIcon, CloseIcon, ChevronDownIcon } from '../components/Icons';

interface BuyOrUpgradePageProps {
  onNavigate: (page: string) => void;
}

// Cloud/Storage icon
const CloudStorageIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
  </svg>
);

// Sparkle/AI icon
const SparkleIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 3L9.5 9.5L3 12l6.5 2.5L12 21l2.5-6.5L21 12l-6.5-2.5L12 3z" />
  </svg>
);

// Wifi/NotebookLM icon
const NotebookIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
  </svg>
);

// Grid/Features icon
const GridIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z" />
  </svg>
);

interface ComparisonRow {
  icon: React.ReactNode;
  feature: string;
  currentValue: string;
  upgradeValue: string;
  upgradeColor?: 'green' | 'blue';
}

const comparisonData: ComparisonRow[] = [
  {
    icon: <CloudStorageIcon className="text-[#5f6368]" />,
    feature: 'Pooled storage per user (email, files, photos)',
    currentValue: '30 GB',
    upgradeValue: '2 TB',
    upgradeColor: 'blue',
  },
  {
    icon: <SparkleIcon className="text-[#1a73e8]" />,
    feature: 'Gemini AI assistant in Gmail, Docs, Meet and more',
    currentValue: 'Gmail only',
    upgradeValue: '✓',
  },
  {
    icon: <NotebookIcon className="text-[#5f6368]" />,
    feature: 'NotebookLM – AI thinking and research partner',
    currentValue: 'Basic access',
    upgradeValue: 'Expanded access',
    upgradeColor: 'green',
  },
  {
    icon: <SparkleIcon className="text-[#ea8600]" />,
    feature: 'Chat with AI in the Gemini app on desktop and mobile',
    currentValue: 'Basic access',
    upgradeValue: 'Expanded access',
    upgradeColor: 'green',
  },
  {
    icon: <GridIcon className="text-[#5f6368]" />,
    feature: 'eSignatures, appointment scheduling and more features to grow your business',
    currentValue: '✗',
    upgradeValue: '✓',
  },
];

export const BuyOrUpgradePage: React.FC<BuyOrUpgradePageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Page header */}
      <div className="border-b border-[#dadce0] bg-white">
        <div className="px-[16px] sm:px-[24px] py-[12px] sm:py-[16px]">
          <h1 className="text-[18px] sm:text-[22px] font-normal text-[#202124]">Buy or upgrade</h1>
        </div>
      </div>

      {/* Content */}
      <div className="p-[16px] sm:p-[24px]">
        {/* Header with current plan info */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-[16px] mb-[16px] sm:mb-[24px]">
          <h2 className="text-[22px] sm:text-[28px] font-normal text-[#202124]">Recommended for Your Team</h2>

          {/* Current plan badge */}
          <div className="bg-white border border-[#dadce0] rounded-[8px] p-[12px] sm:p-[16px] shadow-sm">
            <div className="flex gap-[16px] sm:gap-[24px]">
              <div>
                <p className="text-[11px] sm:text-[12px] text-[#5f6368] mb-[2px] sm:mb-[4px]">Currently using</p>
                <p className="text-[13px] sm:text-[14px] text-[#202124] font-medium">Business Starter</p>
              </div>
              <div>
                <p className="text-[11px] sm:text-[12px] text-[#5f6368] mb-[2px] sm:mb-[4px]">Per user/month</p>
                <p className="text-[13px] sm:text-[14px] text-[#202124] font-medium">$200.00 USD</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main comparison card */}
        <div className="flex flex-col lg:flex-row gap-[16px] lg:gap-[24px]">
          {/* Left promotional card */}
          <div className="w-full lg:w-[380px] bg-[#f1f3f4] rounded-[16px] p-[20px] sm:p-[32px] flex flex-col">
            <p className="text-[14px] text-[#5f6368] mb-[8px]">Upgrade to Business Standard</p>
            <h3 className="text-[24px] sm:text-[32px] font-normal text-[#202124] leading-[1.2] mb-[20px] sm:mb-[24px]">
              Grow your business in an AI-powered Workspace and <em className="not-italic">get loads more storage</em>
            </h3>
            <div className="mt-auto">
              <button
                onClick={() => onNavigate('subscription-detail')}
                className="w-full h-[44px] sm:h-[48px] bg-[#1a73e8] text-white text-[14px] sm:text-[16px] font-medium rounded-[22px] sm:rounded-[24px] hover:bg-[#1765cc] hover:shadow-[0_1px_2px_0_rgba(60,64,67,0.3),0_1px_3px_1px_rgba(60,64,67,0.15)] transition-all"
              >
                Upgrade
              </button>
            </div>
          </div>

          {/* Right comparison table */}
          <div className="flex-1 bg-white rounded-[16px] shadow-[0_1px_2px_0_rgba(60,64,67,0.3),0_1px_3px_1px_rgba(60,64,67,0.15)] overflow-hidden">
            {/* Table header */}
            <div className="flex border-b border-[#e8eaed]">
              <div className="flex-1 px-[16px] sm:px-[24px] py-[12px] sm:py-[16px]">
                <h4 className="text-[16px] sm:text-[18px] font-medium text-[#202124]">Highlights</h4>
              </div>
              <div className="w-[80px] sm:w-[120px] px-[8px] sm:px-[16px] py-[12px] sm:py-[16px] text-center">
                <p className="text-[11px] sm:text-[12px] text-[#5f6368]">Current</p>
                <p className="text-[12px] sm:text-[14px] text-[#5f6368]">edition</p>
              </div>
              <div className="w-[90px] sm:w-[140px] px-[8px] sm:px-[16px] py-[12px] sm:py-[16px] text-center bg-[#e8f0fe]">
                <p className="text-[12px] sm:text-[14px] text-[#202124] font-medium">Business</p>
                <p className="text-[12px] sm:text-[14px] text-[#202124] font-medium">Standard</p>
              </div>
            </div>

            {/* Comparison rows */}
            {comparisonData.map((row, index) => (
              <div
                key={index}
                className="flex border-b border-[#e8eaed] hover:bg-[#f8f9fa] transition-colors"
              >
                <div className="flex-1 flex items-center gap-[8px] sm:gap-[16px] px-[16px] sm:px-[24px] py-[12px] sm:py-[16px]">
                  <span className="flex-shrink-0 hidden sm:block">{row.icon}</span>
                  <span className="text-[13px] sm:text-[14px] text-[#202124]">{row.feature}</span>
                </div>
                <div className="w-[80px] sm:w-[120px] px-[8px] sm:px-[16px] py-[12px] sm:py-[16px] flex items-center justify-center">
                  {row.currentValue === '✗' ? (
                    <CloseIcon size={18} className="text-[#5f6368]" />
                  ) : (
                    <span className="text-[12px] sm:text-[14px] text-[#5f6368] text-center">{row.currentValue}</span>
                  )}
                </div>
                <div className="w-[90px] sm:w-[140px] px-[8px] sm:px-[16px] py-[12px] sm:py-[16px] flex items-center justify-center bg-[#f8fbff]">
                  {row.upgradeValue === '✓' ? (
                    <CheckIcon size={18} className="text-[#1a73e8]" />
                  ) : row.upgradeColor === 'green' ? (
                    <span className="text-[12px] sm:text-[14px] text-[#137333] font-medium text-center">{row.upgradeValue}</span>
                  ) : row.upgradeColor === 'blue' ? (
                    <span className="text-[12px] sm:text-[14px] text-[#1a73e8] font-medium text-center">{row.upgradeValue}</span>
                  ) : (
                    <span className="text-[12px] sm:text-[14px] text-[#202124] text-center">{row.upgradeValue}</span>
                  )}
                </div>
              </div>
            ))}

            {/* Pricing row */}
            <div className="flex border-b border-[#e8eaed]">
              <div className="flex-1 px-[16px] sm:px-[24px] py-[12px] sm:py-[16px]">
                <span className="text-[13px] sm:text-[14px] text-[#202124] font-medium">Starting price per user per month</span>
              </div>
              <div className="w-[80px] sm:w-[120px] px-[8px] sm:px-[16px] py-[12px] sm:py-[16px] flex items-center justify-center">
                <span className="text-[12px] sm:text-[14px] text-[#5f6368]">$200</span>
              </div>
              <div className="w-[90px] sm:w-[140px] px-[8px] sm:px-[16px] py-[12px] sm:py-[16px] flex flex-col items-center justify-center bg-[#f8fbff]">
                <span className="text-[12px] sm:text-[14px] text-[#1a73e8] font-medium">$320</span>
                <span className="text-[11px] sm:text-[12px] text-[#5f6368] line-through">$400</span>
              </div>
            </div>

            {/* Promotional banner */}
            <div className="bg-[#e6f4ea] px-[16px] sm:px-[24px] py-[10px] sm:py-[12px]">
              <p className="text-[13px] sm:text-[14px] text-[#137333] text-center">
                <span className="font-medium">20% off</span> for up to 20 users
              </p>
            </div>
          </div>
        </div>

        {/* Show more link */}
        <div className="mt-[20px] sm:mt-[24px] flex justify-center">
          <button className="flex items-center gap-[8px] text-[14px] text-[#1a73e8] hover:underline">
            <ChevronDownIcon size={20} className="text-[#1a73e8]" />
            Show more Workspace editions
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyOrUpgradePage;
