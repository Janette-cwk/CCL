import React, { Component } from "react";
import { Link, Redirect } from 'react-router-dom';
import { Grid, Row, Col } from "react-bootstrap";
import Tabs from "react-bootstrap/lib/Tabs";
import Tab from "react-bootstrap/lib/Tab";
import Button from "components/CustomButton/CustomButton.jsx";
import { Card } from "components/Card/Card.jsx";
import course1 from "assets/img/codingdojo.JPG";
import course2 from "assets/img/jfs.png";
import edit from "assets/img/edit.png";
import _ from "lodash";
import courseIcon from "../assets/img/course.png";
import amplify, { API, graphqlOperation } from 'aws-amplify'
import { listCoursesAll, getCourseComplete } from 'graphql/queries'

class UserCourse extends Component {
    constructor() {
        super();

        this.state = {
            renderTarget: null,
            courses: null
        }
    }

    async componentDidMount() {
        let courseList = []
        try {
          const { data: { listCourses: { items }}} = await API.graphql(graphqlOperation(listCoursesAll, { limit: 100 }))
          for (let i = 0; i < items.length; i++) {
            let course = items[i]
            let sections = course.sections.items;
            course.sections = []
            for (let j = 0; j < sections.length; j++) {
              let section = sections[j]
              course.sections[section.index] = section
              let pages = section.pages.items
              section.pages = []
              for (let k = 0; k < pages.length; k++) {
                  let page = pages[k]
                  section.pages[page.index] = page
                  let content = page.content.items
                  page.contents = []
                  for (let ii = 0; ii < content.length; ii++) {
                      page.contents[content[ii].index] = content[ii]
                  }
              }
            }
        }
        items.sort(function(a, b) {
            if (!a.created_at) {
                return 2
            }
            if (!b.created_at) {
                return 1
            }
            var dateA = new Date(a.created_at);
            var dateB = new Date(b.created_at);
            let comparison = 0;
            if (dateA.getTime() > dateB.getTime()) {
                comparison = 1;
            } else if (dateA.getTime() < dateB.getTime()) {
                comparison = -1;
            }
            return -1 * comparison;
          });
          this.setState({ courses: items })
        } catch (err) {
          console.log('error fetching courses...', err)
        }
    }
    getCourse = (id) => {
        let course;
        for(let i = 0; i < this.state.courses.length; i++) {
            if (this.state.courses[i].id == id) {
                course = this.state.courses[i];
                break;
            }
        }
        console.log(course);
        // console.log(course.sections[0].pages[0].template);
        course.sections[0].pages[0].template === "FULLSCREEN VIDEO" ?
            this.setState({ renderTarget: <Redirect push to={{ pathname: '/user/fullvideopreview', state: { sectionIndex: 0, pageIndex: 0, course } }} /> })
            : (course.sections[0].pages[0].template === "VIDEO WITH CAPTION" ?
                this.setState({ renderTarget: <Redirect to={{ pathname: '/user/videocappreview', state: { sectionIndex: 0, pageIndex: 0, course } }} /> })
                : (course.sections[0].pages[0].template === "IMAGE WITH TEXT" ?
                    this.setState({ renderTarget: <Redirect to={{ pathname: '/user/imagecappreview', state: { sectionIndex: 0, pageIndex: 0, course } }} /> })
                    : (course.sections[0].pages[0].template === "HORIZONTAL IMAGES WITH TEXT" ?
                        this.setState({ renderTarget: <Redirect to={{ pathname: '/user/horizontalmultiimgspreview', state: { sectionIndex: 0, pageIndex: 0, course } }} /> })
                        : (course.sections[0].pages[0].template === "QUIZ CONTENT" ?
                            this.setState({ renderTarget: <Redirect to={{ pathname: '/user/quizpreview', state: { sectionIndex: 0, pageIndex: 0, course } }} /> })
                            : (course.sections[0].pages[0].template === "IMAGES WITH TEXT" ?
                                this.setState({ renderTarget: <Redirect to={{ pathname: '/user/multiimgcappreview', state: { sectionIndex: 0, pageIndex: 0, course } }} /> })
                                : (course.sections[0].pages[0].template === "FULLSCREEN IMAGE" ?
                                    this.setState({ renderTarget: <Redirect to={{ pathname: '/user/fullimagepreview', state: { sectionIndex: 0, pageIndex: 0, course } }} /> })
                                    :
                                    this.setState({ renderTarget: <Redirect to={{ pathname: '/user/fulltextpreview', state: { sectionIndex: 0, pageIndex: 0, course } }} /> })
                                )
                            )
                        )
                    )
                )
            );

    }

    render() {
        const renderTarget = this.state.renderTarget;
        if (renderTarget) {
            return renderTarget;
        } else {
            let courses = this.state.courses;
            let activeCourses;
            if (courses != undefined) {
                activeCourses = courses.map( (course) => { 
                    if (course.status == "PUBLISHED") {
                        return(
                            <Col md={4}>
                            <Card
                                id={course.id}
                                title={course.name}
                                category="Published: 2020-05-08"
                                stats={course.status}
                                statsIcon="fa fa-refresh"
                                content={
                                    <div className="ct-chart course-img">
                                        <div className="ct-chart course-img">
                                            <a className="img-holder switch-trigger" onClick={() => this.getCourse(course.id)}>
                                                <img src={courseIcon} alt="..." />
                                            </a>
                                        </div>
                                    </div>
                                }
                            />
                            </Col>);
                    }
                });
            }
            return (
                <div className="course-content">
                    <div className="course-tabs">
                        <Grid fluid>
                            <Row>
                                <Col md={12}>
                                    {activeCourses}
                                </Col>  
                            </Row>
                        </Grid>
                    </div>
                </div>
            );
        }
    }
}
export default UserCourse;