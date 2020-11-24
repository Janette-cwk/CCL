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
import courseIcon from "../assets/img/course.png";
import amplify, { API, graphqlOperation } from 'aws-amplify'
import { listCoursesAll } from 'graphql/queries'
import { deleteCourse } from 'graphql/mutations'


const delStyle = {
    color: "red",
    top: "-283px",
    position: "relative",
    left: "226px",
    width: "50px",
    cursor: "pointer"
}

class Courses extends Component {
    constructor() {
        super();
        this.state = {
            courses: [],
            renderTarget: null,
        }
    }

    async componentDidMount() {
        let courseList = []
        try {
            const { data: { listCourses: { items } } } = await API.graphql(graphqlOperation(listCoursesAll, { limit: 100 }))
            console.log(items)
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
                            console.log(content[ii])
                            page.contents[content[ii].index] = content[ii]
                        }
                    }
                }
            }
            items.sort(function (a, b) {
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
        for (let i = 0; i < this.state.courses.length; i++) {
            console.log(this.state.courses[i].id);
            console.log(id);
            if (this.state.courses[i].id == id) {
                console.log(this.state.courses[i]);
                course = this.state.courses[i];
                break;
            }
        }
        console.log(course);
        this.setState({ renderTarget: <Redirect push to={{ pathname: '/admin/addcourse', state: { sectionIndex: 0, pageIndex: 0, course, loadPropState: true } }} /> });
        console.log(this.renderTarget);
        // //const course = _.cloneDeep(courseUnreadable);
        // course.sections[0].pages[0].template === "FULLSCREEN VIDEO" ?
        //     this.setState({ renderTarget: <Redirect push to={{ pathname: '/admin/addcourse', state: { sectionIndex: 0, pageIndex: 0, course } }} /> })
        //     : (course.sections[0].pages[0].template === "VIDEO WITH CAPTION" ?
        //         this.setState({ renderTarget: <Redirect to={{ pathname: '/admin/addcourse', state: { sectionIndex: 0, pageIndex: 0, course } }} /> })
        //         : (course.sections[0].pages[0].template === "IMAGE WITH TEXT" ?
        //             this.setState({ renderTarget: <Redirect to={{ pathname: '/admin/addcourse', state: { sectionIndex: 0, pageIndex: 0, course } }} /> })
        //             : (course.sections[0].pages[0].template === "HORIZONTAL IMAGES WITH TEXT" ?
        //                 this.setState({ renderTarget: <Redirect to={{ pathname: '/admin/addcourse', state: { sectionIndex: 0, pageIndex: 0, course } }} /> })
        //                 : (course.sections[0].pages[0].template === "QUIZ CONTENT" ?
        //                     this.setState({ renderTarget: <Redirect to={{ pathname: '/admin/addcourse', state: { sectionIndex: 0, pageIndex: 0, course } }} /> })
        //                     : (course.sections[0].pages[0].template === "IMAGES WITH TEXT" ?
        //                         this.setState({ renderTarget: <Redirect to={{ pathname: '/admin/addcourse', state: { sectionIndex: 0, pageIndex: 0, course } }} /> })
        //                         : (course.sections[0].pages[0].template === "FULLSCREEN IMAGE" ?
        //                             this.setState({ renderTarget: <Redirect to={{ pathname: '/admin/addcourse', state: { sectionIndex: 0, pageIndex: 0, course } }} /> })
        //                             :
        //                             this.setState({ renderTarget: <Redirect to={{ pathname: '/admin/addcourse', state: { sectionIndex: 0, pageIndex: 0, course } }} /> })
        //                         )
        //                     )
        //                 )
        //             )
        //         )
        //     );
    }

    async deleteCourse(id) {
        try {
            const data = await API.graphql(graphqlOperation(deleteCourse, { input: { id: id, expectedVersion: 1 } }))
            console.log(data)
            for (let i = 0; i < this.state.courses.length; i++) {
                if (this.state.courses[i].id == id) {
                    this.state.courses.splice(i, 1);
                }
            }
            this.setState({ courses: this.state.courses })
        }
        catch (err) {
            console.log("failed to delete course with id " + id)
            console.log(err)
        }
    }

    render() {
        console.log(this.state.renderTarget);
        if (this.state.renderTarget) {
            console.log(this.state.renderTarget);
            return (this.state.renderTarget);
        }
        let courses = this.state.courses; //this would be populated by the api call attached to however they got to admin/courses
        let draftCourses;
        let activeCourses;
        let retiredCourses;
        console.log("courses")
        console.log(courses)
        if (courses != undefined) {
            activeCourses = courses.map((course) => {
                console.log(course)
                if (course.status == "PUBLISHED") {
                    return (
                        <Col md={4}>
                            <Card
                                id={course.id}
                                title={course.name}
                                category={"Created: " + course.created_at}
                                stats={course.status}
                                statsIcon="fa fa-refresh"
                                content={
                                    <div className="ct-chart course-img">
                                        <a
                                            className="img-holder switch-trigger"
                                            onClick={() => this.getCourse(course.id)}
                                        >
                                            <img src={courseIcon} alt="..." />
                                        </a>
                                        <div style={delStyle} onClick={this.deleteCourse.bind(this, course.id)}>
                                            Delete
                                    </div>
                                    </div>
                                }
                            />
                        </Col>);
                }
            });
            draftCourses = courses.map((course) => {
                if (course.status == "DRAFT") {
                    return (
                        <Col md={4}>
                            <Card
                                id={course.id}
                                title={course.name}
                                category={"Created: " + course.created_at}
                                stats={course.status}
                                statsIcon="fa fa-refresh"
                                content={
                                    <div className="ct-chart course-img">
                                        <a
                                            className="img-holder switch-trigger"
                                            onClick={() => this.getCourse(course.id)}
                                        >
                                            <img src={courseIcon} alt="..." />
                                        </a>
                                        {/* <Link to='/admin/addcourse'>
                                        <a><img className="edit" src={edit} /></a>
                                    </Link> */}
                                        <div style={delStyle} onClick={this.deleteCourse.bind(this, course.id)}>
                                            Delete
                                    </div>
                                    </div>
                                }
                            />
                        </Col>);
                }
            });
            retiredCourses = courses.map((course) => {
                if (course.status == "RETIRED") {
                    return (
                        <Col md={4}>
                            <Card
                                id={course.id}
                                title={course.name}
                                category={"Created: " + course.created_at}
                                stats={course.status}
                                statsIcon="fa fa-refresh"
                                content={
                                    <div className="ct-chart course-img">
                                        <a
                                            className="img-holder switch-trigger"
                                            onClick={() => this.getCourse(course.id)}
                                        >
                                            <img src={courseIcon} alt="..." />
                                        </a>
                                        {/* <Link to='/admin/addcourse'>
                                            <a><img className="edit" src={edit} /></a>
                                        </Link> */}
                                        <div style={delStyle} onClick={this.deleteCourse.bind(this, course.id)}>
                                            Delete
                                        </div>
                                    </div>
                                }
                            />
                        </Col>);
                };
            });
            console.log(activeCourses);
            console.log(draftCourses);
            console.log(retiredCourses);
            return (
                <div className="course-content">
                    <Link to='/admin/addcourse'>
                        <Button bsStyle="info" pullRight fill type="submit">
                            + New Course
                        </Button>
                    </Link>
                    <div className="course-tabs">
                        <Tabs defaultActiveKey="Courses">
                            <Tab eventKey="Courses" title="Published Courses">
                                <Grid fluid>
                                    <Row>
                                        <Col md={12}>
                                            {activeCourses}
                                        </Col>
                                    </Row>
                                </Grid>
                            </Tab>
                            <Tab eventKey="Draft" title="Draft Courses">
                                <Grid>
                                    <Row>
                                        <Col md={12}>
                                            {draftCourses}
                                        </Col>
                                    </Row>
                                </Grid>
                            </Tab>
                            <Tab eventKey="Retired" title="Retired Courses">
                                <Grid>
                                    <Row>
                                        <Col md={12}>
                                            {retiredCourses}
                                        </Col>
                                    </Row>
                                </Grid>
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            );
        }
    }
}
export default Courses;