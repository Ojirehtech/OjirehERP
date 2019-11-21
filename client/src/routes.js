import React from 'react';
import Withdraw from './views/Transactions/Withdraw';

const Account = React.lazy(() => import('./views/Account/MyAccount/Account'));

const Profile = React.lazy(() => import('./views/Profile/Profile/Profile'));
const Charts = React.lazy(() => import('./views/Charts'));
const Dashboard = React.lazy(() => import('./views/Dashboard/MainDashboard'));
const CoreUIIcons = React.lazy( () => import( './views/Icons/CoreUIIcons' ) );
const Loan = React.lazy( () => import( "./views/Loan/Container" ) );
const Container = React.lazy( () => import( "./views/Loan/Menu/Container" ) );
// const Flags = React.lazy(() => import('./views/Icons/Flags'));
// const FontAwesome = React.lazy(() => import('./views/Icons/FontAwesome'));
// const SimpleLineIcons = React.lazy(() => import('./views/Icons/SimpleLineIcons'));
// const Alerts = React.lazy(() => import('./views/Notifications/Alerts'));
// const Badges = React.lazy(() => import('./views/Notifications/Badges'));
// const Modals = React.lazy(() => import('./views/Notifications/Modals'));
const Network = React.lazy(() => import('./views/MyNetwork/Network/Network'));
// const Widgets = React.lazy(() => import('./views/Widgets/Widgets'));
const Users = React.lazy(() => import('./views/Users/Users'));
const User = React.lazy( () => import( './views/Users/User' ) );
const Transfer = React.lazy( () => import( "./views/Transfer/Transfer" ) );
const Transactions = React.lazy( () => import( "./views/Transactions/Transactions" ) );

const routes = [
  { path: '/', name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/network', name: 'Network', component: Network },
  { path: '/account', exact: true, name: 'Account', component: Account },
  { path: '/profile', exact: true, name: 'Buttons', component: Profile },
  { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  // { path: '/icons/flags', name: 'Flags', component: Flags },
  // { path: '/icons/font-awesome', name: 'Font Awesome', component: FontAwesome },
  // { path: '/icons/simple-line-icons', name: 'Simple Line Icons', component: SimpleLineIcons },
  // { path: '/notifications', exact: true, name: 'Notifications', component: Alerts },
  // { path: '/notifications/alerts', name: 'Alerts', component: Alerts },
  // { path: '/notifications/badges', name: 'Badges', component: Badges },
  { path: '/menu', name: 'Container', component: Container },
  { path: "/loan", name: "Loan", component: Loan},
  { path: "/transaction/transfer", name: "Transaction", component: Transactions },
  { path: "/transaction/withdraw", name: "Transaction", component: Withdraw },
  { path: "/transfer", name: "Transfer Fund", component: Transfer},
  // { path: '/widgets', name: 'Widgets', component: Widgets },
  { path: '/charts', name: 'Charts', component: Charts },
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },
];

export default routes;
