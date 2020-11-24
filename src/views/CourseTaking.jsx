import React, { Component, useState } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import CourseSidebar from "components/Sidebar/CourseSidebar.jsx";
import ProgressBar from "components/ProgressBar/ProgressBar.jsx";
import { Button } from "react-bootstrap";
import previous from "assets/img/previous.png";
import next from "assets/img/next.png";
import { Document, Page, Text, View, StyleSheet, Image, Font } from "@react-pdf/renderer";
import { PDFViewer } from '@react-pdf/renderer';
import frame from "assets/img/cert-border.png";
import stamp from "assets/img/stamp1.png";
import logo from "assets/img/cert_logo.png";
import { PDFDownloadLink } from "@react-pdf/renderer";
import _ from "lodash";

// Font.register({
//     family: 'Dancing Script',
//     src: 'https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap'
//   });
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    title: {
        fontSize: 60,
        textAlign: 'center',
        paddingTop: 15,
        color: '#605e5e',
        fontFamily: 'Times-Roman'
    },
    subtitle: {
        paddingTop: 20,
        textAlign: 'center',
        fontSize: 25
    },
    courseName: {
        paddingTop: 30,
        textAlign: 'center',
        fontSize: 30,
        fontFamily: 'Times-Roman'
    },
    image: {
        height: 100,
        width: 100,
        marginTop: -90,
        marginLeft: 630,
        transform: "rotate(20deg)"
    },
    background: {
        position: 'absolute',
        minWidth: '100%',
        minHeight: '100%',
        display: 'block',
        height: '800px',
        width: '900px',
        marginTop: -110,
        marginLeft: -40
    },
    logo:{
        width: '300px',
        height: '70px',
        marginTop: 58,
        marginLeft: 250
    },
    underLine:{
        marginTop: -20,
        textAlign: 'center'
    },
    name:{
        paddingTop: 30,
        fontSize: 35,
        textAlign: 'center',
        fontFamily: 'Times-Roman'
    },
    date:{
        paddingTop: 20,
        fontSize: 30,
        textAlign: 'center',
        fontFamily: 'Times-Roman'
    }
});

class CourseTaking extends Component {
    constructor() {
        super();
        this.state = {
            percentage: 0
        }

    }

    render() {
        // console.log(course.reduce((sum, obj) => sum + obj.pages.length, 0)); //get how many pages in the entire course obj
        const course = this.props.location.state.course;
        const MyDocument = (
                <Document>
                    <Page size="A4" orientation="landscape" style={styles.page}>
                        <View style={styles.section}>
                            <Image style={styles.background} src={frame}></Image>
                            <Image style={styles.logo} src={logo}></Image>
                            <Text style={styles.title}>Certificate of Completion</Text>
                            <Text style={styles.subtitle}>This is to certify</Text>
                            <Text style={styles.subtitle}>the successful completion of</Text>
                            <Text style={styles.name}>{course.name}</Text> 
                            {/* <Text style={styles.underLine}>__________________________________________</Text>
                            <Text style={styles.subtitle}>for completing </Text>
                            <Text style={styles.courseName}>Introduction to Community Credit Lab</Text>  */}
                            <Text style={styles.subtitle}>on</Text> 
                            <Text style={styles.date}>{`${new Date().getMonth() + 1} / ${new Date().getDate()} / ${new Date().getFullYear()}`}</Text> 
                            <Image style={styles.image} src={stamp}></Image>
                        </View>
                    </Page>
                </Document>
            );
        console.log(this.props);
        return (
            <div>
                <div className="course-content course-display">
                    <div className="course-tabs">
                        <h4>{course.name}</h4>
                        {/* <p className="percentage">{Math.round(this.state.percentage)}%</p> */}
                        <p className="percentage">100%</p>
                        <React.Fragment>
                            {/* <ProgressBar percentage={this.state.percentage} /> */}
                            <ProgressBar percentage="100" />
                        </React.Fragment>
                        <hr />
                    </div>
                    <div className="container">
                        <Grid fluid>
                            <Row>
                            <Col md={9}>
                                    <div className="container-window display-window pdf-display">
                                        <div>
                                            <Row>
                                                <Col md={12}>
                                                    <PDFViewer>{MyDocument}</PDFViewer>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div className="download-link">
                                            <Row>
                                                <Col>
                                                    <PDFDownloadLink document={MyDocument} filename="certificate.pdf" style={{ padding: "10px" }}>
                                                        {({ blob, url, loading, error }) =>
                                                            loading ? "Loading Certificate..." : "Download PDF"}
                                                    </PDFDownloadLink>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                </Col>
                                <Col md={3}>
                                <CourseSidebar course={course.sections} />
                                </Col>
                            </Row>
                        </Grid>

                    </div>
                </div>
            </div >
        );
    }
}
export default CourseTaking;
