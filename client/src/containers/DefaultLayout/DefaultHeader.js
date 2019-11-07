import React, { Component } from 'react';
import { Link, NavLink, Redirect } from 'react-router-dom';
import { Nav, NavItem } from 'reactstrap';
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo.svg'
import sygnet from '../../assets/img/brand/sygnet.svg';
import Auth from "../../helper/Auth";
import { logout } from '../../store/actions/action_login';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {

  handleLogout = async () => {
    const { logout } = this.props;
    try {
      await logout();
      await Auth.deauthenticateUser();
      return <Redirect to="/login" />;
    } catch ( err ) { }
  }

  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 89, height: 25, alt: 'CoreUI Logo' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <NavLink to="/dashboard" className="nav-link" >Dashboard</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <Link to="/users" className="nav-link">Users</Link>
          </NavItem>
          <NavItem className="px-3">
            <NavLink to="#" className="nav-link">Settings</NavLink>
          </NavItem>
        </Nav>
        <Nav className="ml-auto" navbar>
          {/* <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><i className="icon-bell"></i><Badge pill color="danger">5</Badge></NavLink>
          </NavItem>
          <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><i className="icon-list"></i></NavLink>
          </NavItem> */}
          {/* <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><i className="icon-location-pin"></i></NavLink>
          </NavItem> */}
          <NavItem
            onClick={this.handleLogout}
            className="d-md-down-none"
            style={{ paddingRight: 15 }}>
            <i className="icon-logout"></i> Logout
          </NavItem>
        </Nav>
        {/* <AppAsideToggler className="d-md-down-none" /> */}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

const mapDispatchToProps = ( dispatch ) => {
  const dispatchProps = {
    logout: () => dispatch(logout())
  }

  return dispatchProps;
}

export default connect(null, mapDispatchToProps)(DefaultHeader);
