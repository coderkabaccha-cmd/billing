import React, { useState } from 'react';
import { CloseIcon, CreditCardIcon } from './Icons';

interface AddPaymentMethodModalProps {
  onClose: () => void;
}

// Visa logo
const VisaLogo: React.FC = () => (
  <svg width="32" height="10" viewBox="0 0 50 16" fill="none">
    <path d="M21.5 1.5L19 14.5H16L18.5 1.5H21.5Z" fill="#1434CB"/>
    <path d="M34.5 1.8C33.8 1.5 32.7 1.2 31.4 1.2C28.4 1.2 26.3 2.8 26.3 5C26.3 6.6 27.7 7.5 28.8 8.1C29.9 8.7 30.3 9.1 30.3 9.6C30.3 10.4 29.3 10.8 28.4 10.8C27.1 10.8 26.4 10.6 25.3 10.1L24.9 9.9L24.5 12.7C25.3 13.1 26.7 13.4 28.2 13.4C31.4 13.4 33.4 11.8 33.4 9.5C33.4 8.2 32.6 7.2 30.9 6.4C29.9 5.8 29.3 5.5 29.3 4.9C29.3 4.4 29.9 3.9 31.1 3.9C32.1 3.9 32.9 4.1 33.5 4.4L33.8 4.5L34.5 1.8Z" fill="#1434CB"/>
    <path d="M39.2 1.5C38.6 1.5 38.1 1.7 37.8 2.3L33.3 14.5H36.5L37.1 12.7H40.9L41.3 14.5H44.2L41.7 1.5H39.2ZM38 10.2C38.2 9.6 39.2 6.7 39.2 6.7C39.2 6.7 39.5 5.8 39.7 5.3L39.9 6.6C39.9 6.6 40.5 9.4 40.7 10.2H38Z" fill="#1434CB"/>
    <path d="M14.2 1.5L11.3 10.5L11 9C10.4 7.1 8.6 5.1 6.5 4L9.2 14.5H12.4L17.4 1.5H14.2Z" fill="#1434CB"/>
    <path d="M8.3 1.5H3.3L3.3 1.7C7.1 2.7 9.6 5.1 10.5 8L9.5 2.4C9.3 1.8 8.9 1.5 8.3 1.5Z" fill="#F9A533"/>
  </svg>
);

// Mastercard logo
const MastercardLogo: React.FC = () => (
  <svg width="24" height="15" viewBox="0 0 32 20" fill="none">
    <circle cx="10" cy="10" r="8" fill="#EB001B"/>
    <circle cx="22" cy="10" r="8" fill="#F79E1B"/>
  </svg>
);

// India flag
const IndiaFlag: React.FC = () => (
  <svg width="24" height="16" viewBox="0 0 24 16" fill="none">
    <rect width="24" height="5.33" fill="#FF9933"/>
    <rect y="5.33" width="24" height="5.33" fill="#FFFFFF"/>
    <rect y="10.67" width="24" height="5.33" fill="#138808"/>
    <circle cx="12" cy="8" r="2" fill="#000080"/>
  </svg>
);

export const AddPaymentMethodModal: React.FC<AddPaymentMethodModalProps> = ({ onClose }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cardholderName, setCardholderName] = useState('Abishek B');
  const [country, setCountry] = useState('India (IN)');
  const [addressLine1, setAddressLine1] = useState('velozity global soins india pvt ltd');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [isExpanded, _setIsExpanded] = useState(true);
  const [error, setError] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    const formatted = value.replace(/(.{4})/g, '$1 ').trim();
    setCardNumber(formatted);

    // Basic validation
    if (value.length > 0 && value.length < 13) {
      setError('Invalid card number');
    } else {
      setError('');
    }
  };

  const detectCardType = () => {
    const num = cardNumber.replace(/\s/g, '');
    if (num.startsWith('4')) return 'visa';
    if (num.startsWith('5') || num.startsWith('2')) return 'mastercard';
    return null;
  };

  const cardType = detectCardType();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[10000] p-[16px]">
      <div className="bg-white rounded-[8px] w-full max-w-[500px] max-h-[90vh] overflow-y-auto shadow-[0_11px_15px_-7px_rgba(0,0,0,0.2),0_24px_38px_3px_rgba(0,0,0,0.14),0_9px_46px_8px_rgba(0,0,0,0.12)]">
        {/* Header */}
        <div className="flex items-center justify-between px-[24px] py-[16px] border-b border-[#e8eaed]">
          <h2 className="text-[18px] font-normal text-[#202124]">Add a payment method</h2>
          <button
            onClick={onClose}
            className="w-[40px] h-[40px] flex items-center justify-center rounded-full hover:bg-[#f1f3f4] text-[#5f6368]"
          >
            <CloseIcon size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="px-[24px] py-[20px]">
          {/* Add credit or debit card header */}
          <div className="flex items-center gap-[12px] mb-[20px]">
            <CreditCardIcon size={20} className="text-[#5f6368]" />
            <span className="text-[14px] text-[#202124]">Add credit or debit card</span>
          </div>

          {isExpanded && (
            <>
              {/* Card number field */}
              <div className="mb-[20px]">
                <label className="block text-[12px] text-[#1a73e8] mb-[4px]">Card number</label>
                <div className={`flex items-center border-b-[2px] ${error ? 'border-[#d93025]' : isFocused ? 'border-[#1a73e8]' : 'border-[#dadce0]'} pb-[8px]`}>
                  <span className="text-[#5f6368] mr-[12px]">#</span>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="Card details"
                    maxLength={19}
                    className="flex-1 text-[14px] text-[#202124] outline-none placeholder:text-[#5f6368]"
                  />
                  <div className="flex items-center gap-[8px]">
                    {cardType === 'visa' && <VisaLogo />}
                    {cardType === 'mastercard' && <MastercardLogo />}
                    {!cardType && (
                      <>
                        <VisaLogo />
                        <MastercardLogo />
                      </>
                    )}
                  </div>
                </div>
                {error && (
                  <p className="text-[12px] text-[#d93025] mt-[4px]">{error}</p>
                )}
                {!cardNumber && !error && (
                  <p className="text-[12px] text-[#d93025] mt-[4px]">Card number is required</p>
                )}
              </div>

              {/* Expiry date */}
              <div className="flex gap-[16px] mb-[20px]">
                <div className="flex-1">
                  <input
                    type="text"
                    value={expiryMonth}
                    onChange={(e) => setExpiryMonth(e.target.value.replace(/\D/g, '').slice(0, 2))}
                    placeholder="MM"
                    className="w-full border-b border-[#dadce0] py-[8px] text-[14px] text-[#202124] outline-none placeholder:text-[#5f6368] focus:border-[#1a73e8] focus:border-b-[2px]"
                  />
                </div>
                <div className="flex items-center text-[#5f6368]">/</div>
                <div className="flex-1">
                  <input
                    type="text"
                    value={expiryYear}
                    onChange={(e) => setExpiryYear(e.target.value.replace(/\D/g, '').slice(0, 2))}
                    placeholder="YY"
                    className="w-full border-b border-[#dadce0] py-[8px] text-[14px] text-[#202124] outline-none placeholder:text-[#5f6368] focus:border-[#1a73e8] focus:border-b-[2px]"
                  />
                </div>
              </div>

              {/* Cardholder name */}
              <div className="mb-[20px]">
                <label className="block text-[12px] text-[#5f6368] mb-[4px]">Cardholder name</label>
                <input
                  type="text"
                  value={cardholderName}
                  onChange={(e) => setCardholderName(e.target.value)}
                  className="w-full border-b border-[#dadce0] py-[8px] text-[14px] text-[#202124] outline-none focus:border-[#1a73e8] focus:border-b-[2px]"
                />
              </div>

              {/* Country */}
              <div className="mb-[20px]">
                <div className="flex items-center gap-[12px] border-b border-[#dadce0] py-[8px]">
                  <IndiaFlag />
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="flex-1 text-[14px] text-[#202124] outline-none bg-transparent cursor-pointer"
                  >
                    <option value="India (IN)">India (IN)</option>
                    <option value="United States (US)">United States (US)</option>
                    <option value="United Kingdom (GB)">United Kingdom (GB)</option>
                  </select>
                </div>
              </div>

              {/* Address line 1 */}
              <div className="mb-[20px]">
                <label className="block text-[12px] text-[#5f6368] mb-[4px]">Address line 1</label>
                <input
                  type="text"
                  value={addressLine1}
                  onChange={(e) => setAddressLine1(e.target.value)}
                  className="w-full border-b border-[#dadce0] py-[8px] text-[14px] text-[#202124] outline-none focus:border-[#1a73e8] focus:border-b-[2px]"
                />
              </div>

              {/* Address line 2 */}
              <div className="mb-[20px]">
                <label className="block text-[12px] text-[#5f6368] mb-[4px]">Address line 2</label>
                <input
                  type="text"
                  value={addressLine2}
                  onChange={(e) => setAddressLine2(e.target.value)}
                  placeholder="Address line 2"
                  className="w-full border-b border-[#dadce0] py-[8px] text-[14px] text-[#202124] outline-none placeholder:text-[#5f6368] focus:border-[#1a73e8] focus:border-b-[2px]"
                />
              </div>

              {/* City */}
              <div className="mb-[20px]">
                <label className="block text-[12px] text-[#5f6368] mb-[4px]">City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full border-b border-[#dadce0] py-[8px] text-[14px] text-[#202124] outline-none focus:border-[#1a73e8] focus:border-b-[2px]"
                />
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-[16px] px-[24px] py-[16px] border-t border-[#e8eaed]">
          <button
            className="h-[36px] px-[24px] bg-[#1a73e8] text-white text-[14px] font-medium rounded-[4px] hover:bg-[#1765cc] transition-colors"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="text-[14px] text-[#1a73e8] font-medium hover:underline"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPaymentMethodModal;
