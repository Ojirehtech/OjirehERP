import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.scss';
import Auth from "./helper/Auth";

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./views/Pages/Login'));
const Register = React.lazy( () => import( './views/Pages/Register' ) );
const Page404 = React.lazy( () => import( './views/Pages/Page404' ) );
const AdminSignin = React.lazy( () => import( "./views/Pages/Admin/AdminSignin" ) );
const EditPage = React.lazy( () => import( "./views/Pages/Edit/EditPage" ) );
const UserData = React.lazy( () => import( "./views/DataUpload/Container" ) );
const AdminSignup = React.lazy( () => import( "./views/Pages/Admin/AdminSignup" ) );

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <React.Suspense fallback={loading()}>
          <Switch>
            <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
            <Route exact path="/register" name="Register Page" render={props => <Register {...props} />} />
            <Route exact path="/editProfile" name="Edit Page" render={(props) => <EditPage {...props}/>} />
            <Route exact path="/data_upload" name="Data Upload" render={props => <UserData {...props} />} />
            <Route exact path="/signup" name="Sign up" render={props => <AdminSignup {...props} />} />
            <Route exact path="/signin" name="Sign up" render={props => <AdminSignin {...props} />} />
            {Auth.isUserAuthenticated() ? (
              <Route path="/" name="Index" render={props => <DefaultLayout {...props} />} />
            ) : <Redirect to="/login" />}
            <Route exact path="/*" name="Page 404" render={props => <Page404 {...props} />} />
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    );
  }
}

export default App;
