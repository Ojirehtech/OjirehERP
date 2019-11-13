import { isAuthenticated } from "./helper/authenticate";
const role = isAuthenticated().user.role === "admin" ? true : false;
export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: 'NEW',
      },
    },
    {
      // title: true,
      name: 'My Account',
      url: "/account",
      icon: "icon-credit-card",
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },

    {
      // title: true,
      name: 'Transfer Funds',
      url: "/transfer",
      icon: "icon-credit-card"
    },
    {
      name: "Transaction",
      url: "/transaction/finalize",
      icon: "icon-briefcase"
    },
    {
      name: "My Network",
      url: "/network",
      icon: "icon-people" 
    },
    {
      name: "My profile",
      url: "/profile",
      icon: "icon-user"
    },
    
    // {
      // name: 'Deposit Funds',
      // url: '/deposit',
      // icon: 'icon-credit-card',
      // children: [
      //   {
      //     name: 'Buttons',
      //     url: '/buttons/buttons',
      //     icon: 'icon-cursor',
      //   },
      //   {
      //     name: 'Button dropdowns',
      //     url: '/buttons/button-dropdowns',
      //     icon: 'icon-cursor',
      //   },
      //   {
      //     name: 'Button groups',
      //     url: '/buttons/button-groups',
      //     icon: 'icon-cursor',
      //   },
      //   {
      //     name: 'Brand Buttons',
      //     url: '/buttons/brand-buttons',
      //     icon: 'icon-cursor',
      //   },
      // ],
    // },
    // {
    //   name: "Pay Bills",
    //   url: "/bills",
    //   icon: "icon-credit-card"
    // },
    
    // {
    //   name: "Latest News",
    //   url: "/news",
    //   icon: "icon-briefcase"
    // },
    // {
    //   name: "Request a card",
    //   url: "/request_card",
    //   icon: "icon-credit-card"
    // },
    // {
    //   name: 'Charts',
    //   url: '/charts',
    //   icon: 'icon-pie-chart',
    // },
    
  ],
};
