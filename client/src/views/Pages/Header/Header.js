import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  // NavbarText
} from 'reactstrap';

import logo from "../../../assets/img/brand/ojirehprime_logo.png";

const Header = ( props ) => {
  const [ isOpen, setIsOpen ] = useState( false );

  const toggle = () => setIsOpen( !isOpen );

  const styles = {
    nav: {
      color: "#fff"
    }
  }

  return (
    <div className="custom-header">
      <Navbar color="light" expand="md">
        <Container>
        <NavbarBrand href="/">
          <img src={logo} alt="" />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
                <NavLink
                  href={`${process.env.REACT_APP_SITE_URL}`}
                  style={styles.nav}
                >Home</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret style={styles.nav}>
                About Us
              </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <NavLink href={`${ process.env.REACT_APP_SITE_URL }/about-us/#wwd`}>
                      What We Do
                    </NavLink>
                  </DropdownItem>
                  <DropdownItem>
                    <NavLink href={`${ process.env.REACT_APP_SITE_URL }/about-us/#vision`}>
                      Our Vision, Mission, Core Values
                    </NavLink>
                  </DropdownItem>
                  <DropdownItem>
                    <NavLink href={`${ process.env.REACT_APP_SITE_URL }/about-us/#roadmap`}>
                      Roadmap
                    </NavLink>
                  </DropdownItem>
                  <DropdownItem>
                    <NavLink href={`${ process.env.REACT_APP_SITE_URL }/about-us/#team`}>
                      Our Team
                    </NavLink>
                  </DropdownItem>
                </DropdownMenu>
                </UncontrolledDropdown>
              <NavItem>
                <NavLink
                  href={`${ process.env.REACT_APP_SITE_URL }/faqs`}
                  style={styles.nav}
                >FAQs</NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  href={`${ process.env.REACT_APP_SITE_URL }/blog`}
                  style={styles.nav}
                >Blog</NavLink>
                
              </NavItem>
              <NavItem>
                <NavLink
                  href={`${ process.env.REACT_APP_SITE_URL }/careers`}
                  style={styles.nav}
                >Careers</NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  href="https://ojireh.com"
                  style={styles.nav}
                >Online Store</NavLink>
              </NavItem>
          </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header