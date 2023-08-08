
export {
 
  integrationsAccountCards,
  integrationsEcommerceCards,
  integrationsERPCards,
  integrationsMarketplaceCards,
  integrationsPaymentCards
};

export const UUID = () => (Math.random() + 1).toString(36).substring(2);

export const AddUniqueID = (Arr: any[], lable: string) =>
  Arr.map((d: any) => {
    return {
      ...d,
      [lable]: UUID()
    };
  });

const integrationsAccountCards = AddUniqueID(
  [
    {
      title: 'Connect With Quickbooks Online',
      buttonText: 'Connect',
      logo: '/assets/Accounting/QBO.png',
      ghost: false,
      select: false,

      connect: false
    },
    {
      title: 'Connect With Xero',
      buttonText: 'Connect',
      logo: '/assets/Accounting/XERO.png',
      ghost: false,
      select: false,

      connect: false
    },
    {
      title: 'Connect With ZohoBooks',
      buttonText: 'Connect',
      logo: '/assets/Accounting/ZB.png',
      ghost: false,
      select: false,

      connect: false
    },

    {
      title: 'Connect With myOb Business',
      buttonText: 'Connect',
      logo: '/assets/Accounting/MYOB.png',
      select: false,
      connect: false,
      ghost: false
    }
  ],
  'id'
);
const integrationsERPCards = AddUniqueID(
  [
    {
      title: 'Connect With Netsuite ',
      buttonText: 'Connect',
      logo: '/assets/ERP/NetSuit.png',
      select: false,
      connect: false,
      ghost: false
    },
    {
      title: 'Connect With Sage Intacct',
      buttonText: 'Connect',
      logo: '/assets/ERP/SAGE.png',
      select: false,
      connect: false,
      ghost: false
    },
    {
      title: 'Connect With SAP',
      buttonText: 'Connect',
      logo: '/assets/ERP/SAP.png',
      select: false,
      connect: false,
      ghost: false
    }
  ],
  'id'
);
const integrationsEcommerceCards = AddUniqueID(
  [
    {
      title: 'Connect With shopify',
      buttonText: 'Connect',
      logo: '/assets/Ecommerce/shopify.png',
      select: false,
      connect: false,
      ghost: false
    },
    {
      title: 'Connect With Magento Online',
      buttonText: 'Connect',
      logo: '/assets/Ecommerce/Magento.png',
      select: false,
      connect: false,
      ghost: false
    },
    {
      title: 'Connect With Woo Commerce',
      buttonText: 'Connect',
      logo: '/assets/Ecommerce/Woo.png',
      select: false,
      connect: false,
      ghost: false
    },
    {
      title: 'Connect With ShopWare',
      buttonText: 'Connect',
      logo: '/assets/Ecommerce/ShopWare.png',
      select: false,
      connect: false,
      ghost: false
    }
  ],
  'id'
);
const integrationsMarketplaceCards = AddUniqueID(
  [
    {
      title: 'Connect With Amazon ',
      buttonText: 'Connect',
      logo: '/assets/Marketplace/AWSMP.png',
      select: false,
      connect: false,
      ghost: false
    },
    {
      title: 'Connect With Ebay',
      buttonText: 'Connect',
      logo: '/assets/Marketplace/Ebay.png',
      select: false,
      connect: false,
      ghost: false
    },
    {
      title: 'Connect With  Wallmart',
      buttonText: 'Connect',
      logo: '/assets/Marketplace/Wallmart.png',
      select: false,
      connect: false,
      ghost: false
    }
  ],
  'id'
);
const integrationsPaymentCards = AddUniqueID(
  [
    {
      title: 'Connect With Stripe ',
      buttonText: 'Connect',
      logo: '/assets/Payment/AUTHORIZE.png',
      select: false,
      connect: false,
      ghost: false
    },
    {
      title: 'Connect With Authorize.net',
      buttonText: 'Connect',
      logo: '/assets/Payment/STRIPE.png',
      select: false,
      connect: false,
      ghost: false
    }
  ],
  'id'
);

