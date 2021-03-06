import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import Button from "components/CustomButton/CustomButton.jsx";
import { Link } from 'react-router-dom';
import next from "assets/img/next.png";
import previous from "assets/img/previous.png";
import Uploader from "components/PopUp/Uploader.jsx";
import ProgressBar from "components/ProgressBar/ProgressBar.jsx";
import CourseSidebar from "components/Sidebar/CourseSidebar.jsx";
import _ from "lodash";
class VideoCapPreview extends Component {
    constructor() {
        super();
        // this.state = {
        //     percentage: 0
        // }
    }
    state = {
        setText: false,
        setVideo: false,
        videoEmbeddingCode: null,
        text: "",
    };

    createDangerousHTML = () => {
        return { __html: this.state.videoEmbeddingCode }
    };

    render() {
        const locState = this.props.location.state;
        const sectionIndex = locState.sectionIndex;
        const pageIndex = locState.pageIndex;
        const course = _.cloneDeep(locState.course);
        const page = course.sections[sectionIndex].pages[pageIndex];
        console.log(page);
        if (page.contents[0] && this.state.videoEmbeddingCode != page.contents[0].content) {
            console.log("here")
            this.setState({ videoEmbeddingCode: page.contents[0].content, setVideo: true});
        }
        if (page.contents[1] && !this.state.setText) {
            console.log("here2")
            this.setState({ text: page.contents[1].content, setText: true})
        }
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
        //sets the sections index and page index for the previous and next buttons
        let prevSect = null;
        let prevPage = null;
        let nextSect = null;
        let nextPage = null;
        // are we at the last page, and is there 1 more section
        if(pageIndex == course.sections[sectionIndex].pages.length - 1 && sectionIndex < course.sections.length - 1) {
            nextSect = sectionIndex + 1;
            nextPage = 0;
            prevSect = sectionIndex;
            prevPage = pageIndex - 1;
        // are we at the first page and not on the first section
        } else if (pageIndex == 0 && sectionIndex != 0) {
            prevSect = sectionIndex - 1;
            prevPage = course.sections[prevSect].pages.length - 1;
            //make sure theres another page
            if(course.sections[sectionIndex].pages.length - 1 != pageIndex) {
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
                                                <Link to={{ pathname: '/user/fullvideopreview', state: { sectionIndex: prevSect, pageIndex: prevPage, course} }}>
                                                    <Button  className='btn-previous'>
                                                        <img src={previous} width="20px" height="20px" alt="..." />
                                                    </Button>
                                                </Link>
                                            </div>
                                            : (course.sections[prevSect].pages[prevPage].template === "VIDEO WITH CAPTION" ?
                                                <div className="previous">
                                                    <Link to={{ pathname: '/user/videocappreview', state: { sectionIndex: prevSect, pageIndex: prevPage, course } }}>
                                                        <Button  className='btn-previous'>
                                                            <img src={previous} width="20px" height="20px" alt="..." />
                                                        </Button>
                                                    </Link>
                                                </div>
                                                : (course.sections[prevSect].pages[prevPage].template === "IMAGE WITH TEXT" ?
                                                    <div className="previous">
                                                        <Link to={{ pathname: '/user/imagecappreview', state: { sectionIndex: prevSect, pageIndex: prevPage, course } }}>
                                                            <Button  className='btn-previous'>
                                                                <img src={previous} width="20px" height="20px" alt="..." />
                                                            </Button>

                                                        </Link>
                                                    </div>
                                                    : (course.sections[prevSect].pages[prevPage].template === "QUIZ CONTENT" ?
                                                        <div className="previous">
                                                            <Link to={{ pathname: '/user/quizpreview', state: { sectionIndex: prevSect, pageIndex: prevPage, course } }}>
                                                                <Button  className='btn-previous'>
                                                                    <img src={previous} width="20px" height="20px" alt="..." />
                                                                </Button>
                                                            </Link>
                                                        </div>
                                                        : (course.sections[prevSect].pages[prevPage].template === "HORIZONTAL IMAGES WITH TEXT" ?
                                                            <div className="previous">
                                                                <Link to={{ pathname: '/user/horizontalmultiimgspreview', state: { sectionIndex: prevSect, pageIndex: prevPage, course } }}>
                                                                    <Button  className='btn-previous'>
                                                                        <img src={previous} width="20px" height="20px" alt="..." />
                                                                    </Button>
                                                                </Link>
                                                            </div>
                                                            : (course.sections[prevSect].pages[prevPage].template === "IMAGES WITH TEXT" ?
                                                                <div className="previous">
                                                                    <Link to={{ pathname: '/user/multiimgcappreview', state: { sectionIndex: prevSect, pageIndex: prevPage, course } }}>
                                                                        <Button  className='btn-previous'>
                                                                            <img src={previous} width="20px" height="20px" alt="..." />
                                                                        </Button>
                                                                    </Link>
                                                                </div>
                                                                : (course.sections[prevSect].pages[prevPage].template === "FULLSCREEN IMAGE" ?
                                                                    <div className="previous">
                                                                        <Link to={{ pathname: '/user/fullimagepreview', state: { sectionIndex: prevSect, pageIndex: prevPage, course } }}>
                                                                            <Button  className='btn-previous'>
                                                                                <img src={previous} width="20px" height="20px" alt="..." />
                                                                            </Button>
                                                                        </Link>
                                                                    </div>
                                                                    :
                                                                    <div className="previous">
                                                                        <Link to={{ pathname: '/user/fulltextpreview', state: { sectionIndex: prevSect, pageIndex: prevPage, course } }}>
                                                                            <Button  className='btn-previous'>
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
                                        <div className="next"></div>
                                }
                            </Col>

                            <Col md={7}>
                                <div className="container-window video-cap display-window" >
                                    <div className="video-part" id="div-1">
                                        <Row >
                                            <Col md={12}>
                                                <div className="video-display" dangerouslySetInnerHTML={this.createDangerousHTML()} />
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="text-part" id="div-2">
                                        <Row >
                                            <Col md={12}>
                                                <span>{this.state.text}</span>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </Col>
                            
                            <Col md={1}>
                                {
                                    nextPage !== null || nextSect !== null ?
                                        course.sections[nextSect].pages[nextPage].template === "FULLSCREEN VIDEO" ?
                                            <div className="next">
                                                <Link to={{ pathname: '/user/fullvideopreview', state: { sectionIndex: nextSect, pageIndex: nextPage, course} }}>
                                                    <Button  className='btn-next'>
                                                        <img src={next} width="20px" height="20px" alt="..." />
                                                    </Button>
                                                </Link>
                                            </div>
                                            : (course.sections[nextSect].pages[nextPage].template === "VIDEO WITH CAPTION" ?
                                                <div className="next">
                                                    <Link to={{ pathname: '/user/videocappreview', state: { sectionIndex: nextSect, pageIndex: nextPage, course } }}>
                                                        <Button  className='btn-next'>
                                                            <img src={next} width="20px" height="20px" alt="..." />
                                                        </Button>
                                                    </Link>
                                                </div>
                                                : (course.sections[nextSect].pages[nextPage].template === "IMAGE WITH TEXT" ?
                                                    <div className="next">
                                                        <Link to={{ pathname: '/user/imagecappreview', state: { sectionIndex: nextSect, pageIndex: nextPage, course } }}>
                                                            <Button  className='btn-next'>
                                                                <img src={next} width="20px" height="20px" alt="..." />
                                                            </Button>

                                                        </Link>
                                                    </div>
                                                    : (course.sections[nextSect].pages[nextPage].template === "HORIZONTAL IMAGES WITH TEXT" ?
                                                        <div className="next">
                                                            <Link to={{ pathname: '/user/horizontalmultiimgspreview', state: { sectionIndex: nextSect, pageIndex: nextPage, course } }}>
                                                                <Button  className='btn-next'>
                                                                    <img src={next} width="20px" height="20px" alt="..." />
                                                                </Button>
                                                            </Link>
                                                        </div>
                                                        : (course.sections[nextSect].pages[nextPage].template === "QUIZ CONTENT" ?
                                                            <div className="next">
                                                                <Link to={{ pathname: '/user/quizpreview', state: { sectionIndex: nextSect, pageIndex: nextPage, course } }}>
                                                                    <Button  className='btn-next'>
                                                                        <img src={next} width="20px" height="20px" alt="..." />
                                                                    </Button>
                                                                </Link>
                                                            </div>
                                                            : (course.sections[nextSect].pages[nextPage].template === "IMAGES WITH TEXT" ?
                                                                <div className="next">
                                                                    <Link to={{ pathname: '/user/multiimgcappreview', state: { sectionIndex: nextSect, pageIndex: nextPage, course } }}>
                                                                        <Button  className='btn-next'>
                                                                            <img src={next} width="20px" height="20px" alt="..." />
                                                                        </Button>
                                                                    </Link>
                                                                </div>
                                                                : (course.sections[nextSect].pages[nextPage].template === "FULLSCREEN IMAGE" ?
                                                                    <div className="next">
                                                                        <Link to={{ pathname: '/user/fullimagepreview', state: { sectionIndex: nextSect, pageIndex: nextPage, course } }}>
                                                                            <Button  className='btn-next'>
                                                                                <img src={next} width="20px" height="20px" alt="..." />
                                                                            </Button>
                                                                        </Link>
                                                                    </div>
                                                                    :
                                                                    <div className="next">
                                                                        <Link to={{ pathname: '/user/fulltextpreview', state: { sectionIndex: nextSect, pageIndex: nextPage, course } }}>
                                                                            <Button  className='btn-next'>
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
export default VideoCapPreview;