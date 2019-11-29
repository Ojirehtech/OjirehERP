import React from 'react';
import Withdraw from './views/Transactions/Withdraw';

const Account = React.lazy(() => import('./views/Account/MyAccount/Account'));

const Profile = React.lazy(() => import('./views/Profile/Profile/Profile'));
const Charts = React.lazy(() => import('./views/Charts'));
const Dashboard = React.lazy(() => import('./views/Dashboard/MainDashboard'));
const CoreUIIcons = React.lazy( () => import( './views/Icons/CoreUIIcons' ) );
const Loan = React.lazy( () => import( "./views/Loan/Container" ) );
const Container = React.lazy( () => import( "./views/Loan/Menu/Container" ) );
const Network = React.lazy(() => import('./views/MyNetwork/Network/Network'));
const Users = React.lazy(() => import('./views/Users/Users'));
const User = React.lazy( () => import( './views/Users/User' ) );
const Transfer = React.lazy( () => import( "./views/Transfer/Transfer" ) );
const Transactions = React.lazy( () => import( "./views/Transactions/Transactions" ) );
const LonContainer = React.lazy( () => import( "./views/Loan/Admin/LoanContainer" ) );

const routes = [
  { path: '/', name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/network', name: 'Network', component: Network },
  { path: '/account', exact: true, name: 'Account', component: Account },
  { path: '/profile', exact: true, name: 'Buttons', component: Profile },
  { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  { path: '/menu', name: 'Container', component: Container },
  { path: "/loan", name: "Loan", component: Loan},
  { path: "/transaction/transfer", name: "Transaction", component: Transactions },
  { path: "/transaction/withdraw", name: "Transaction", component: Withdraw },
  { path: "/transfer", name: "Transfer Fund", component: Transfer},
  { path: '/charts', name: 'Charts', component: Charts },
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },
  { path: "/loan_dashboard", exact: true, name: "Loan Management", component: LonContainer}
];

export default routes;
