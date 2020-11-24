import React, { Component } from "react";
import { NavItem, Nav, NavDropdown, MenuItem } from "react-bootstrap";

class UserNavbarLinks extends Component {
  render() {
    return (
      <div>
        <Nav pullRight>
        <NavItem eventKey={2} href="/home">
            Admin Portal
          </NavItem>
        </Nav>
      </div>
    );
  }
}

export default UserNavbarLinks;
