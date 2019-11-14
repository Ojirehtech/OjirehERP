import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, NavItem } from 'reactstrap';
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/ojirehprime_logo.png'
import sygnet from '../../assets/img/brand/sygnet.svg';
import Auth from "../../helper/Auth";
import { logout } from '../../store/actions/action_login';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {

  handleLogout = () => {
    Auth.deauthenticateUser();
    window.location.href = "/login";
    this.onLogout();
  }

  onLogout = async () => {
    const { logout } = this.props;
    try {
      await logout();
    }catch(err) {}
  }

  render() {

    // const { children, history } = this.props;
    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 50, height: 25, alt: 'CoreUI Logo' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <NavLink to="/dashboard" className="nav-link" >Dashboard</NavLink>
          </NavItem>
        </Nav>
        <Nav className="ml-auto" navbar>
          <NavItem
            onClick={this.handleLogout}
            className="d-md-down-none"
            style={{ paddingRight: 15 }}>
            <i className="icon-logout"></i> Logout
          </NavItem>
        </Nav>
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
