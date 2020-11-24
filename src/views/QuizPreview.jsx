import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import Button from "components/CustomButton/CustomButton.jsx";
import { Link } from 'react-router-dom';
import next from "assets/img/next.png";
import previous from "assets/img/previous.png";
import ProgressBar from "components/ProgressBar/ProgressBar.jsx";
import CourseSidebar from "components/Sidebar/CourseSidebar.jsx";
import _ from "lodash";
class QuizPreview extends Component {
    constructor(props) {
        super(props)
        this.handleAnswerCheck = this.handleAnswerCheck.bind(this)
    }
    state = {
        theQuestion: "",
        checkOne: false,
        checkTwo: false,
        checkThree: false,
        checkFour: false,
        answerOne: "",
        answerTwo: "",
        answerThree: "",
        answerFour: "",
        submitted: false,
        checked: "",
    };

    toggleCheckOne = (idx) => {
        this.setState(prevState => ({
            checkOne: !prevState.checkOne, submitted: false
        }));
    }

    toggleCheckTwo = () => {
        this.setState(prevState => ({
            checkTwo: !prevState.checkTwo, submitted: false
        }));
    }

    toggleCheckThree = () => {
        this.setState(prevState => ({
            checkThree: !prevState.checkThree, submitted: false
        }));
    }

    toggleCheckFour = () => {
        this.setState(prevState => ({
            checkFour: !prevState.checkFour, submitted: false
        }));
    }
    handleAnswerCheck = () => {
        this.setState({ submitted: true });
    }

    render() {
        const locState = this.props.location.state;
        const sectionIndex = locState.sectionIndex;
        const pageIndex = locState.pageIndex;
        const course = _.cloneDeep(locState.course);
        const page = course.sections[sectionIndex].pages[pageIndex];
        // if (page.contents.content[0] && !this.state.setQuiz) {
        //     this.setState({ quiz: page.contents.content, setQuiz: true });
        // }
        let count = 0;
        let pageIdx;
        for (let s = 0; s <= sectionIndex; s++) {
            if (s == sectionIndex) {
                pageIdx = pageIndex
            } else {
                pageIdx = course.sections[s].pages.length
            }
            for (let p = 0; p < pageIdx; p++) {
                count++;
            }
        }
        let percentage = (count / course.sections.reduce((sum, obj) => sum + obj.pages.length, 0)) * 100;
        let prevSect = null;
        let prevPage = null;
        let nextSect = null;
        let nextPage = null;
        // are we at the last page, and is there 1 more section
        if (pageIndex == course.sections[sectionIndex].pages.length - 1 && sectionIndex < course.sections.length - 1) {
            nextSect = sectionIndex + 1;
            nextPage = 0;
            prevSect = sectionIndex;
            prevPage = pageIndex - 1;
            // are we at the first page and not on the first section
        } else if (pageIndex == 0 && sectionIndex != 0) {
            prevSect = sectionIndex - 1;
            prevPage = course.sections[prevSect].pages.length - 1;
            //make sure theres another page
            if (course.sections[sectionIndex].pages.length - 1 != pageIndex) {
                nextSect = sectionIndex;
                nextPage = pageIndex + 1;
            }
        // are we at the last page of the last section and are there no more sections
        } else if (pageIndex == course.sections[sectionIndex].pages.length - 1 && sectionIndex == course.sections.length - 1) {
            console.log("last page")
            prevSect = sectionIndex;
            prevPage = pageIndex - 1;
            console.log("prev page" + prevPage)
            // are we at the first page of the first section
        } else if (pageIndex == 0 && sectionIndex == 0) {
            nextSect = sectionIndex;
            nextPage = pageIndex + 1;
            // every page inbetween
        } else {
            nextSect = sectionIndex;
            nextPage = pageIndex + 1;
            prevSect = sectionIndex;
            prevPage = pageIndex - 1;
        }
        let question = "";
        let answerOne = "";
        let answerTwo = "";
        let answerThree = "";
        let answerFour = "";
        let checkOne;
        let checkTwo;
        let checkThree;
        let checkFour;
        if (page.contents) {
            console.log(page);
            question = page.contents[0].content;
            answerOne = page.contents[1].content;
            answerTwo = page.contents[2].content;
            answerThree = page.contents[3].content;
            answerFour = page.contents[4].content;
            checkOne = page.contents[5].content === "true";
            checkTwo = page.contents[6].content === "true";
            checkThree = page.contents[7].content === "true";
            checkFour = page.contents[8].content === "true";
        };

        let result;
        let correctAnswer; 
        if (checkOne == true) {
            correctAnswer = answerOne
        } else if (checkTwo == true) {
            correctAnswer = answerTwo
        } else if (checkThree == true) {
            correctAnswer = answerThree
        } else {
            correctAnswer = answerFour
        };
        if (this.state.submitted) {
            if (this.state.checkOne == checkOne && this.state.checkTwo == checkTwo && this.state.checkThree == checkThree && this.state.checkFour == checkFour) {
                result = <p style={{ color: "green", fontSize: "14px" }}>Your answer is correct.</p>
            } else {
                result = <p style={{ color: "red", fontSize: "14px" }}>Your answer is wrong. The correct answer is {correctAnswer}.</p>
            }
        }
        return (
            <div className="course-content course-display">
                <div className="course-tabs">
                    {/* <h4>Section {sectionIndex + 1} - {course.sections[sectionIndex].name} || Page {pageIndex + 1} - {course.sections[sectionIndex].pages[pageIndex].name} */}
                    <h4>{course.name}</h4>
                    <p className="percentage">{Math.round(percentage)}%</p>
                    <React.Fragment>
                        <ProgressBar percentage={percentage} />
                    </React.Fragment>

                    <hr />
                </div>
                <div className="container">
                    <Grid fluid>
                        <Row>
                            <Col md={1}>
                                {
                                    prevPage >= 0 && (prevPage !== null || prevSect !== null) ?
                                        course.sections[prevSect].pages[prevPage].template === "FULLSCREEN VIDEO" ?
                                            <div className="previous">
                                                <Link to={{ pathname: '/user/fullvideopreview', state: { sectionIndex: prevSect, pageIndex: prevPage, course } }}>
                                                    <Button className='btn-previous'>
                                                        <img src={previous} width="20px" height="20px" alt="..." />
                                                    </Button>
                                                </Link>
                                            </div>
                                            : (course.sections[prevSect].pages[prevPage].template === "VIDEO WITH CAPTION" ?
                                                <div className="previous">
                                                    <Link to={{ pathname: '/user/videocappreview', state: { sectionIndex: prevSect, pageIndex: prevPage, course } }}>
                                                        <Button className='btn-previous'>
                                                            <img src={previous} width="20px" height="20px" alt="..." />
                                                        </Button>
                                                    </Link>
                                                </div>
                                                : (course.sections[prevSect].pages[prevPage].template === "IMAGE WITH TEXT" ?
                                                    <div className="previous">
                                                        <Link to={{ pathname: '/user/imagecappreview', state: { sectionIndex: prevSect, pageIndex: prevPage, course } }}>
                                                            <Button className='btn-previous'>
                                                                <img src={previous} width="20px" height="20px" alt="..." />
                                                            </Button>

                                                        </Link>
                                                    </div>
                                                    : (course.sections[prevSect].pages[prevPage].template === "QUIZ CONTENT" ?
                                                        <div className="previous">
                                                            <Link to={{ pathname: '/user/quizpreview', state: { sectionIndex: prevSect, pageIndex: prevPage, course } }}>
                                                                <Button className='btn-previous'>
                                                                    <img src={previous} width="20px" height="20px" alt="..." />
                                                                </Button>
                                                            </Link>
                                                        </div>
                                                        : (course.sections[prevSect].pages[prevPage].template === "HORIZONTAL IMAGES WITH TEXT" ?
                                                            <div className="previous">
                                                                <Link to={{ pathname: '/user/horizontalmultiimgspreview', state: { sectionIndex: prevSect, pageIndex: prevPage, course } }}>
                                                                    <Button className='btn-previous'>
                                                                        <img src={previous} width="20px" height="20px" alt="..." />
                                                                    </Button>
                                                                </Link>
                                                            </div>
                                                            : (course.sections[prevSect].pages[prevPage].template === "IMAGES WITH TEXT" ?
                                                                <div className="previous">
                                                                    <Link to={{ pathname: '/user/multiimgcappreview', state: { sectionIndex: prevSect, pageIndex: prevPage, course } }}>
                                                                        <Button className='btn-previous'>
                                                                            <img src={previous} width="20px" height="20px" alt="..." />
                                                                        </Button>
                                                                    </Link>
                                                                </div>
                                                                : (course.sections[prevSect].pages[prevPage].template === "FULLSCREEN IMAGE" ?
                                                                    <div className="previous">
                                                                        <Link to={{ pathname: '/user/fullimagepreview', state: { sectionIndex: prevSect, pageIndex: prevPage, course } }}>
                                                                            <Button className='btn-previous'>
                                                                                <img src={previous} width="20px" height="20px" alt="..." />
                                                                            </Button>
                                                                        </Link>
                                                                    </div>
                                                                    :
                                                                    <div className="previous">
                                                                        <Link to={{ pathname: '/user/fulltextpreview', state: { sectionIndex: prevSect, pageIndex: prevPage, course } }}>
                                                                            <Button className='btn-previous'>
                                                                                <img src={previous} width="20px" height="20px" alt="..." />
                                                                            </Button>
                                                                        </Link>
                                                                    </div>
                                                                )
                                                            )
                                                        )
                                                    )
                                                )
                                            )
                                        :
                                        <div className="previous"></div>
                                }
                            </Col>

                            <Col md={7}>
                                <div className="container-window display-window" id="div-1" >

                                    <Row >
                                        <div >
                                            <Col md={12}>
                                                <h4 style={{ textAlign: "center" }}>{question}</h4>
                                            </Col>
                                            <Col md={12}>
                                                <label className='quiz-guide'>Select the correct answers
                                                {result}
                                                </label>
                                            </Col>
                                        </div>
                                        <Col md={12}>
                                            <Row>
                                                <Col md={4}>
                                                    <input type="checkbox"
                                                        checked={this.state.checkOne}
                                                        onChange={this.toggleCheckOne}
                                                        className="form-check-input"
                                                        style={{ float: "right" }}
                                                        disabled={this.state.checkTwo == true ? true : this.state.checkThree == true ? true : this.state.checkFour == true ? true : false}
                                                    />
                                                </Col>
                                                <Col md={8}>
                                                    <p>{answerOne}</p>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col md={12}>
                                            <Row>
                                                <Col md={4}>
                                                    <input type="checkbox"
                                                        checked={this.state.checkTwo}
                                                        onChange={this.toggleCheckTwo}
                                                        className="form-check-input"
                                                        style={{ float: "right" }}
                                                        disabled={this.state.checkOne == true ? true : this.state.checkThree == true ? true : this.state.checkFour == true ? true : false}
                                                    />
                                                </Col>
                                                <Col md={8}>
                                                    <p>{answerTwo}</p>
                                                </Col>
                                            </Row>
                                        </Col>

                                        <Col md={12}>
                                            <Row>
                                                <Col md={4}>
                                                    <input type="checkbox"
                                                        checked={this.state.checkThree}
                                                        onChange={this.toggleCheckThree}
                                                        className="form-check-input"
                                                        style={{ float: "right" }}
                                                        disabled={this.state.checkTwo == true ? true : this.state.checkOne == true ? true : this.state.checkFour == true ? true : false}
                                                    />
                                                </Col>
                                                <Col md={8}>
                                                    <p>{answerThree}</p>
                                                </Col>
                                            </Row>
                                        </Col>

                                        <Col md={12}>
                                            <Row>
                                                <Col md={4}>
                                                    <input type="checkbox"
                                                        checked={this.state.checkFour}
                                                        onChange={this.toggleCheckFour}
                                                        className="form-check-input"
                                                        style={{ float: "right" }}
                                                        disabled={this.state.checkTwo == true ? true : this.state.checkThree == true ? true : this.state.checkOne == true ? true : false}
                                                    />
                                                </Col>
                                                <Col md={8}>
                                                    <p>{answerFour}</p>
                                                </Col>
                                            </Row>
                                        </Col>

                                        <Col md={12}>
                                            <div >
                                                <button className="btn btn-primary" style={{ float: "right", marginTop: "60px" }} onClick={() => this.handleAnswerCheck()}>
                                                    Check My Answer
                                                </button>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>

                            <Col md={1}>
                                {
                                    nextPage !== null || nextSect !== null ?
                                        course.sections[nextSect].pages[nextPage].template === "FULLSCREEN VIDEO" ?
                                            <div className="next">
                                                <Link to={{ pathname: '/user/fullvideopreview', state: { sectionIndex: nextSect, pageIndex: nextPage, course } }}>
                                                    <Button className='btn-next'>
                                                        <img src={next} width="20px" height="20px" alt="..." />
                                                    </Button>
                                                </Link>
                                            </div>
                                            : (course.sections[nextSect].pages[nextPage].template === "VIDEO WITH CAPTION" ?
                                                <div className="next">
                                                    <Link to={{ pathname: '/user/videocappreview', state: { sectionIndex: nextSect, pageIndex: nextPage, course } }}>
                                                        <Button className='btn-next'>
                                                            <img src={next} width="20px" height="20px" alt="..." />
                                                        </Button>
                                                    </Link>
                                                </div>
                                                : (course.sections[nextSect].pages[nextPage].template === "IMAGE WITH TEXT" ?
                                                    <div className="next">
                                                        <Link to={{ pathname: '/user/imagecappreview', state: { sectionIndex: nextSect, pageIndex: nextPage, course } }}>
                                                            <Button className='btn-next'>
                                                                <img src={next} width="20px" height="20px" alt="..." />
                                                            </Button>

                                                        </Link>
                                                    </div>
                                                    : (course.sections[nextSect].pages[nextPage].template === "HORIZONTAL IMAGES WITH TEXT" ?
                                                        <div className="next">
                                                            <Link to={{ pathname: '/user/horizontalmultiimgspreview', state: { sectionIndex: nextSect, pageIndex: nextPage, course } }}>
                                                                <Button className='btn-next'>
                                                                    <img src={next} width="20px" height="20px" alt="..." />
                                                                </Button>
                                                            </Link>
                                                        </div>
                                                        : (course.sections[nextSect].pages[nextPage].template === "QUIZ CONTENT" ?
                                                            <div className="next">
                                                                <Link to={{ pathname: '/user/quizpreview', state: { sectionIndex: nextSect, pageIndex: nextPage, course } }}>
                                                                    <Button className='btn-next'>
                                                                        <img src={next} width="20px" height="20px" alt="..." />
                                                                    </Button>
                                                                </Link>
                                                            </div>
                                                            : (course.sections[nextSect].pages[nextPage].template === "IMAGES WITH TEXT" ?
                                                                <div className="next">
                                                                    <Link to={{ pathname: '/user/multiimgcappreview', state: { sectionIndex: nextSect, pageIndex: nextPage, course } }}>
                                                                        <Button className='btn-next'>
                                                                            <img src={next} width="20px" height="20px" alt="..." />
                                                                        </Button>
                                                                    </Link>
                                                                </div>
                                                                : (course.sections[nextSect].pages[nextPage].template === "FULLSCREEN IMAGE" ?
                                                                    <div className="next">
                                                                        <Link to={{ pathname: '/user/fullimagepreview', state: { sectionIndex: nextSect, pageIndex: nextPage, course } }}>
                                                                            <Button className='btn-next'>
                                                                                <img src={next} width="20px" height="20px" alt="..." />
                                                                            </Button>
                                                                        </Link>
                                                                    </div>
                                                                    :
                                                                    <div className="next">
                                                                        <Link to={{ pathname: '/user/fulltextpreview', state: { sectionIndex: nextSect, pageIndex: nextPage, course } }}>
                                                                            <Button className='btn-next'>
                                                                                <img src={next} width="20px" height="20px" alt="..." />
                                                                            </Button>
                                                                        </Link>
                                                                    </div>
                                                                )
                                                            )
                                                        )
                                                    )
                                                )
                                            )
                                        :
                                        <div className="next">
                                            <Link to={{ pathname: '/user/coursetaking', state: { course } }}>
                                                <Button className='btn-next'>
                                                    <img src={next} width="20px" height="20px" alt="..." />
                                                </Button>
                                            </Link>
                                        </div>
                                }
                            </Col>
                            <Col md={3}>
                                <CourseSidebar course={course.sections} sectionIndex={sectionIndex} pageIndex={pageIndex} />
                            </Col>
                        </Row>
                    </Grid>

                </div>
            </div>

        );
    }
}
export default QuizPreview;