
import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col } from "react-bootstrap";
import Button from "components/CustomButton/CustomButton.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";

//import Dialog from "components/dialog.jsx";
import upload from "assets/img/upload.png";



import PopUp from "components/PopUp/PopUp.jsx";
import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import { Tasks } from "components/Tasks/Tasks.jsx";
import {
    dataPie,
    legendPie,
    dataSales,
    optionsSales,
    responsiveSales,
    legendSales,
    dataBar,
    optionsBar,
    responsiveBar,
    legendBar
} from "variables/Variables.jsx";

class CourseMedia extends Component {
    state = {
        isOpen: false
    }

    render() {
        return (
            <div className="content">
                <Grid fluid>

                    <Row>
                        <Col md={100}>

                            <h3>
                                <Button
                                    a href="/admin/courseoutline"
                                    bsStyle="info"
                                    pullRight fill>
                                    Back to outline
                                </Button>

                            </h3>
                            <Card
                                title="Section 1: Introduction | Page: 1"
                                content={
                                    <div className="ct-chart">

                                        <div class="container">
                                            <img src={upload} width="100%" alt="..." />
                                            <Button onClick={(e) => this.setState({ isOpen: true })}>
                                                Upload Video
                                            </Button>

                                            <PopUp isOpen={this.state.isOpen} onClose={(e) => this.setState({ isOpen: false })}>
                                                <Button pullRight fill> Add Content</Button>
                                              
                                            </PopUp>

                                            <Button bsStyle="info" pullRight fill>
                                                next
                                            </Button>

                                            <Button bsStyle="info" pullLeft fill>
                                                previous
                                            </Button>
                                        </div>


                                        {/* Save for later button dialog
                     <Col lg={2} sm={2}>
                                            <Button onClick={(e) => this.setState({ isOpen: true })}>
                                                Upload Video
          </Button>

                                            <PopUp isOpen={this.state.isOpen} onClose={(e) => this.setState({ isOpen: false })}>
                                                Add Content
            </PopUp>
                                        </Col> */}

                                        {/* <img src={upload} width="100%" alt="..." /> */}
                                        {/* 
                                        <Button bsStyle="info" pullRight fill>
                                            next
                                        </Button>

                                        <Button bsStyle="info" fill>
                                            previous
                                        </Button> */}
                                    </div>
                                }
                            />
                        </Col>
                    </Row>
                </Grid>


            </div >
        );
    }
}

export default CourseMedia;

{/* Save for later button dialog */ }
{/* <Col lg={2} sm={2}>
          <Button onClick={(e) => this.setState({ isOpen: true })}>
            <Card
              title="Page 4"
              stats="Add Images"
              statsIcon="fa fa-plus" />
          </Button>

          <PopUp isOpen={this.state.isOpen} onClose={(e) => this.setState({ isOpen: false })}>
            Add Content
            </PopUp>
        </Col> */}