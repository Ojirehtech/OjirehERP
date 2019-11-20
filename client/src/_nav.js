import React from "react";
import { isAuthenticated } from "./helper/authenticate";
import Auth from "./helper/Auth";
const role = isAuthenticated().user && isAuthenticated().user.role === "admin" ? true : false;

const handleLogout = () => {
  Auth.deauthenticateUser();
}
const logout = <span onClick={handleLogout}>Logout</span>

const navAdmin = [
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
    class: ''
  },
  {
    // title: true,
    name: 'Transfer Funds',
    url: "/transfer",
    icon: "icon-credit-card"
  },
  {
    // title: true,
    name: "Transaction",
    icon: "icon-briefcase",
    children: [
      {
        name: 'Cash Transfer',
        url: '/transaction/transfer',
        icon: 'icon-briefcase',
      },
      {
        name: 'Cash Withdraw',
        url: '/transaction/withdraw',
        icon: 'icon-briefcase',
      },
    ],
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
  {
    name: "Loan",
    url: "/loan",
    icon: "icon-money"
  },
  {
    name: "User Management",
    url: "/users",
    icon: "icon-user"
  },
  {
    name: logout,
    icon: "icon-logout"
  }, 
];

const navUser = [
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
    name: "My Network",
    url: "/network",
    icon: "icon-people"
  },
  {
    name: "My profile",
    url: "/profile",
    icon: "icon-user"
  }, 
  {
    name: "Loan",
    url: "/loan",
    icon: "icon-dollar-circle"
  },
  {
    name: logout,
    icon: "icon-logout"
  }, 
];

export default {
  items: role ? navAdmin : navUser
};
