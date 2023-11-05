import {exportedPaymentLogos} from './exportedAssets';

const paymentMethods = [
  {
    id: 1,
    name: 'BCA',
    type: 'BANK_TRANSFER',
    image: exportedPaymentLogos.bcaLogo,
  },
  {
    id: 2,
    name: 'Mandiri',
    type: 'BANK_TRANSFER',
    image: exportedPaymentLogos.mandiriLogo,
  },
  {
    id: 3,
    name: 'BNI',
    type: 'BANK_TRANSFER',
    image: exportedPaymentLogos.bniLogo,
  },
  {
    id: 4,
    name: 'BRI',
    type: 'BANK_TRANSFER',
    image: exportedPaymentLogos.briLogo,
  },
  {
    id: 5,
    name: 'DANA',
    type: 'EWALLET',
    image: exportedPaymentLogos.danaLogo,
  },
  {
    id: 6,
    name: 'ShopeePay',
    type: 'EWALLET',
    image: exportedPaymentLogos.shopeePayLogo,
  },
  {
    id: 7,
    name: 'OVO',
    type: 'EWALLET',
    image: exportedPaymentLogos.ovoLogo,
  },
  {
    id: 8,
    name: 'BCA',
    type: 'VA',
    image: exportedPaymentLogos.bcaLogo,
  },
  {
    id: 9,
    name: 'Mandiri',
    type: 'VA',
    image: exportedPaymentLogos.mandiriLogo,
  },
  {
    id: 10,
    name: 'BNI',
    type: 'VA',
    image: exportedPaymentLogos.bniLogo,
  },
  {
    id: 11,
    name: 'BRI',
    type: 'VA',
    image: exportedPaymentLogos.briLogo,
  },
  {
    id: 13,
    name: 'Permata',
    type: 'VA',
    image: exportedPaymentLogos.permataLogo,
  },
  {
    id: 14,
    name: 'BSS',
    type: 'VA',
    image: exportedPaymentLogos.bssLogo,
  },
  {
    id: 15,
    name: 'CIMB',
    type: 'VA',
    image: exportedPaymentLogos.cimbLogo,
  },
  {
    id: 16,
    name: 'BJB',
    type: 'VA',
    image: exportedPaymentLogos.bjbLogo,
  },
  {
    id: 17,
    name: 'BSI',
    type: 'VA',
    image: exportedPaymentLogos.bsiLogo,
  },
  {
    id: 18,
    name: 'Alfamart',
    type: 'RETAIL_OUTLET',
    image: exportedPaymentLogos.alfamartLogo,
  },
  {
    id: 19,
    name: 'Indomaret',
    type: 'RETAIL_OUTLET',
    image: exportedPaymentLogos.indomaretLogo,
  },
  {
    id: 20,
    name: 'LinkAja',
    type: 'EWALLET',
    image: exportedPaymentLogos.linkAjaLogo,
  },
  {
    id: 21,
    name: 'AstraPay',
    type: 'EWALLET',
    image: exportedPaymentLogos.astraPayLogo,
  },
  {
    id: 50,
    name: 'QRIS',
    type: 'EWALLET',
    image: exportedPaymentLogos.qrisLogo,
  },
];

const paymentMethodData = [
  {
    name: 'Bank Transfer',
    method: 'BANK_TRANSFER',
    list: paymentMethods.filter((item: any) => item.type === 'BANK_TRANSFER'),
  },
  {
    name: 'Virtual Account',
    method: 'VA',
    list: paymentMethods.filter((item: any) => item.type === 'VA'),
  },
  {
    name: 'E-Wallet',
    method: 'EWALLET',
    list: paymentMethods.filter((item: any) => item.type === 'EWALLET'),
  },
  {
    name: 'Retail Outlet',
    method: 'RETAIL_OUTLET',
    list: paymentMethods.filter((item: any) => item.type === 'RETAIL_OUTLET'),
  },
];

export {paymentMethods, paymentMethodData};
