import React, { Component } from "react";
import { NavItem, Nav, NavDropdown, MenuItem } from "react-bootstrap";
import { Auth } from 'aws-amplify'


async function signOut() {
  console.log("signing out")
  try {
      await Auth.signOut();
      window.location.replace("/user/usercourse");
      } catch (error) {
      console.log('error signing out: ', error);
  }
}


class AdminNavbarLinks extends Component {
  render() {
    return (
      <div>
        <Nav pullRight>
        <NavItem eventKey={2} href="/user/usercourse">
            User Portal
          </NavItem>
          <NavItem eventKey={3} href="#" onClick={signOut}>
            Log out
          </NavItem>
        </Nav>
      </div>
    );
  }
}

export default AdminNavbarLinks;
