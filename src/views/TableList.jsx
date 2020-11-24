/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import { Grid, Row, Col, Table, FormGroup, ControlLabel, FormControl } from "react-bootstrap";
import Checkbox from "components/CustomCheckbox/CustomCheckbox.jsx";
import { Link } from 'react-router-dom';
import Button from "components/CustomButton/CustomButton.jsx";
import Tabs from "react-bootstrap/lib/Tabs";
import Tab from "react-bootstrap/lib/Tab";
import Card from "components/Card/Card.jsx";
import { thArray, tdArray } from "variables/Variables.jsx";
import { thInternalArr, tdInternalArr } from "variables/Variables.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import PopUp from "components/PopUp/PopUp.jsx";
import Select from 'react-select';
const options = [
  { value: 'CodingDojo', label: 'Coding Dojo' },
  { value: 'JFS', label: 'Jewish Family Service' },
  { value: 'CCL', label: 'Community Credit Lab' }
];

class TableList extends Component {
  state = {
    isOpen: false,
    seen: false,
    selectedOption: null,
    fullName: '',
    email: '',
    phone: '',
    td: tdArray,
    internalTd: tdInternalArr,
  };
  handleOption = selectedOption => {
    this.setState({ selectedOption });
  }

  handleAddUser = () => {
    if (this.state.selectedOption) {
      const newState = {
        ...this.state,
        isOpen: false,
        fullName: '',
        email: '',
        phone: '',
        selectedOption: null,
      };
      if (this.state.selectedOption.value == "CCL") {
        newState.internalTd = this.state.internalTd.concat([[this.state.fullName, this.state.phone, this.state.email]]);

      } else {
        newState.td = this.state.td.concat([[this.state.fullName, this.state.selectedOption.value, this.state.phone, this.state.email]]);
      }
    this.setState(newState);
    }
  }

  togglePop = () => {
    this.setState({
      seen: !this.state.seen
    });
  };

  handleCheckbox = event => {
    const target = event.target;
    console.log(event.target);
    this.setState({
      [target.name]: target.checked
    });
  };


  render() {
    const { selectedOption } = this.state;
    return (
      <div className="content user-content">
        <div>
          <Button onClick={(e) => this.setState({ isOpen: true })} bsStyle="info" pullRight fill type="submit">
            + New User
          </Button>
          <PopUp isOpen={this.state.isOpen} onClose={(e) => this.setState({ isOpen: false })}>
            <div className="user-popup">
              <h5>ENTER PROFILE</h5>
              <hr />
              <div className="user-info">
                <form>
                  <Row>
                    <Col md={1}>
                      <label>Group</label>
                    </Col>
                    <Col md={11}>
                      <Select
                        value={selectedOption}
                        onChange={this.handleOption}
                        options={options}
                      />
                    </Col>
                  </Row>
                  <FormInputs
                    ncols={["col-md-12"]}
                    properties={[
                      {
                        label: "Full name",
                        type: "text",
                        bsClass: "form-control",
                        placeholder: "Full name",
                        value: this.state.fullName,
                        onChange: (e) => { this.setState({ fullName: e.target.value }); }
                      }
                    ]}
                  />
                  <FormInputs
                    ncols={["col-md-6", "col-md-6"]}
                    properties={[
                      {
                        label: "Email Address",
                        type: "email",
                        bsClass: "form-control",
                        placeholder: "Email Address",
                        value: this.state.email,
                        onChange: (e) => { this.setState({ email: e.target.value }); }
                      },
                      {
                        label: "Phone",
                        type: "tel",
                        bsClass: "form-control",
                        placeholder: "Phone number",
                        value: this.state.phone,
                        onChange: (e) => { this.setState({ phone: e.target.value }); }
                      }
                    ]}
                  />
                </form>
              </div>
              <hr />
              <Button bsStyle="info" pullRight fill onClick={this.handleAddUser}>
                + ADD USER
              </Button>
            </div>
          </PopUp>
        </div>
        <div className="user-tab">
          <Tabs defaultActiveKey="Courses">
            <Tab eventKey="Courses" title="External Users">
              <Grid fluid>
                <Row>
                  <Col md={12}>
                    <Card
                      title={
                        <div>
                          <FormInputs
                            ncols={["col-md-6"]}
                            properties={[
                              {
                                label: [<Button fill >Filter</Button>],
                                type: "text",
                                bsClass: "form-control",
                                placeholder: "Search users by name, id, group"
                              }
                            ]}
                          />
                        </div>
                      }
                      // category="Here is a subtitle for this table"
                      ctTableFullWidth
                      ctTableResponsive
                      content={
                        <Table striped hover>
                          <thead>
                            <tr>
                              {thArray.map((prop, key) => {
                                return <th key={key}>{prop}</th>;
                              })}
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.td.map((prop, key) => {
                              return (
                                <tr key={key}>
                                  {prop.map((prop, key) => {
                                    return <td key={key}>{prop}</td>;
                                  })}
                                </tr>
                              );
                            })}
                          </tbody>
                        </Table>
                      }
                    />
                  </Col>
                </Row>
              </Grid>
              <Button bsStyle="info" pullRight fill>
                Remove User
              </Button>
            </Tab>

            <Tab eventKey="Internal" title="Internal Users">

              <Grid fluid>
                <Row>
                  <Col md={12}>
                    <Card
                      title={
                        <div>
                          <FormInputs
                            ncols={["col-md-6"]}
                            properties={[
                              {
                                label: [<Button fill >Filter</Button>],
                                type: "text",
                                bsClass: "form-control",
                                placeholder: "Search users by name, id, group"
                              }
                            ]}
                          />
                        </div>
                      }
                      ctTableFullWidth
                      ctTableResponsive
                      content={
                        <Table striped hover>
                          <thead>
                            <tr>
                              {thInternalArr.map((prop, key) => {
                                return <th key={key}>{prop}</th>;
                              })}
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.internalTd.map((prop, key) => {
                              return (
                                <tr key={key}>
                                  {prop.map((prop, key) => {
                                    return <td key={key}>{prop}</td>;
                                  })}
                                </tr>
                              );
                            })}
                          </tbody>
                        </Table>
                      }
                    />
                  </Col>
                </Row>
              </Grid>
              <Button bsStyle="info" pullRight fill>
                Remove User
              </Button>
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default TableList;
