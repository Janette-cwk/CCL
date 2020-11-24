import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import Button from "components/CustomButton/CustomButton.jsx";
import { Link } from 'react-router-dom';
import next from "assets/img/next.png";
import previous from "assets/img/previous.png";
import Uploader from "components/PopUp/Uploader.jsx";
import _ from "lodash";
class MultiImgCapContent extends Component {
    constructor(props) {
        super(props)
        this.handleFileChange = this.handleFileChange.bind(this)
    }
    state = {
        isOpen: -1,
        files: [null, null, null],
        text: ""
    };
    flushState = () => {
        if (this.props.location.state.flushState) {
            this.props.location.state.flushState = false;
            this.setState({
                isOpen: -1,
                files: [null, null, null],
                text: ""
            });
        }
    }
    handleFileChange(event) {
        if (this.state.isOpen > -1) {
            const newFiles = [...this.state.files]; //copy
            newFiles[this.state.isOpen] = URL.createObjectURL(event.target.files[0])
            this.setState({
                files: newFiles
            })
        }
    };
    inputText = event => {
        this.setState({ text: event.target.value });
    };

    render() {
        this.flushState();
        const locState = this.props.location.state;
        const sectionIndex = locState.sectionIndex;
        const pageIndex = locState.pageIndex;
        const course = _.cloneDeep(locState.course);
        const page = course.sections[sectionIndex].pages[pageIndex];
        if (this.state.files[0] !== null || this.state.files[1] !== null || this.state.files[2] !== null) {
            page.contents[0] = {
                content: this.state.files,
                contentType: 'image',
            };
        } else {
            // check if the file is set already
            if (page.contents[0]) {
                if (page.contents[0].content[0] !== null || page.contents[0].content[1] !== null || page.contents[0].content[2] !== null) {
                    this.setState({ files: page.contents[0].content });
                }
            }
        }
        if (this.state.text) {
            page.contents[1] = {
                content: this.state.text,
                contentType: 'text'
            };
        } else {
            // check if the text is set already
            if (page.contents[1]) {
                this.setState({ text: page.contents[1].content });
            }
        }
        console.log(pageIndex);
        console.log(course);
        return (
            <div className="course-content">
                <div className="course-tabs">
                    <h4>Section {sectionIndex + 1} - {course.sections[sectionIndex].name} || Page {pageIndex + 1} - {course.sections[sectionIndex].pages[pageIndex].name}
                        <Link to={{ pathname: '/admin/addcourse', state: { loadPropState: true, course: course } }}>
                            <Button bsStyle="info" pullRight fill type="submit">
                                BACK TO PLANNER
                            </Button>
                        </Link>
                    </h4>
                    <hr />
                </div>
                <div className="container">
                    <Grid fluid>
                        <Row>
                            <Col md={1}>
                                {
                                    pageIndex > 0 && course.sections[sectionIndex].pages.length > 1 ?
                                        course.sections[sectionIndex].pages[pageIndex - 1].template === "FULLSCREEN VIDEO" ?
                                            <div className="previous">
                                                <Link to={{ pathname: '/admin/fullvideocontent', state: { sectionIndex, pageIndex: pageIndex - 1, course } }}>
                                                    <Button className='btn-previous'>
                                                        <img src={previous} width="20px" height="20px" alt="..." />
                                                    </Button>
                                                </Link>
                                            </div>
                                            : (course.sections[sectionIndex].pages[pageIndex - 1].template === "VIDEO WITH CAPTION" ?
                                                <div className="previous">
                                                    <Link to={{ pathname: '/admin/videocapcontent', state: { sectionIndex, pageIndex: pageIndex - 1, course } }}>
                                                        <Button className='btn-previous'>
                                                            <img src={previous} width="20px" height="20px" alt="..." />
                                                        </Button>
                                                    </Link>
                                                </div>
                                                : (course.sections[sectionIndex].pages[pageIndex - 1].template === "HORIZONTAL IMAGES WITH TEXT" ?
                                                    <div className="previous">
                                                        <Link to={{ pathname: '/admin/horizontalmultiimgs', state: { sectionIndex, pageIndex: pageIndex - 1, course } }}>
                                                            <Button className='btn-previous'>
                                                                <img src={previous} width="20px" height="20px" alt="..." />
                                                            </Button>
                                                        </Link>
                                                    </div>
                                                    : (course.sections[sectionIndex].pages[pageIndex - 1].template === "IMAGE WITH TEXT" ?
                                                        <div className="previous">
                                                            <Link to={{ pathname: '/admin/imagecapcontent', state: { sectionIndex, pageIndex: pageIndex - 1, course } }}>
                                                                <Button className='btn-previous'>
                                                                    <img src={previous} width="20px" height="20px" alt="..." />
                                                                </Button>

                                                            </Link>
                                                        </div>
                                                        : (course.sections[sectionIndex].pages[pageIndex - 1].template === "QUIZ CONTENT" ?
                                                            <div className="previous">
                                                                <Link to={{ pathname: '/admin/quizcontent', state: { sectionIndex, pageIndex: pageIndex - 1, course, loadPropState: true } }}>
                                                                    <Button className='btn-previous'>
                                                                        <img src={previous} width="20px" height="20px" alt="..." />
                                                                    </Button>
                                                                </Link>
                                                            </div>
                                                            : (course.sections[sectionIndex].pages[pageIndex - 1].template === "IMAGES WITH TEXT" ?
                                                                <div className="previous">
                                                                    <Link to={{ pathname: '/admin/multiimgcapcontent', state: { sectionIndex, pageIndex: pageIndex - 1, course, flushState: true } }}>
                                                                        <Button className='btn-previous'>
                                                                            <img src={previous} width="20px" height="20px" alt="..." />
                                                                        </Button>
                                                                    </Link>
                                                                </div>
                                                                : (course.sections[sectionIndex].pages[pageIndex - 1].template === "FULLSCREEN IMAGE" ?
                                                                    <div className="previous">
                                                                        <Link to={{ pathname: '/admin/fullimagecontent', state: { sectionIndex, pageIndex: pageIndex - 1, course } }}>
                                                                            <Button className='btn-previous'>
                                                                                <img src={previous} width="20px" height="20px" alt="..." />
                                                                            </Button>
                                                                        </Link>
                                                                    </div>
                                                                    :
                                                                    <div className="previous">
                                                                        <Link to={{ pathname: '/admin/fulltextcontent', state: { sectionIndex, pageIndex: pageIndex - 1, course } }}>
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

                            <Col md={10}>
                                <div className="container-window video-cap" >
                                    <div className="img-part" id="div-1">
                                        <Row >
                                            {this.state.files.map((f, idx) =>
                                                <Col md={4} key={idx}>
                                                    <Button onClick={(e) => this.setState({ isOpen: idx })} bsStyle="info" className="upload-btn uploads-btn">
                                                        Upload Image
                                                </Button>

                                                    <img className="img-upload" src={this.state.files[idx]} />
                                                </Col>
                                            )}
                                        </Row>
                                    </div>
                                    <div className="text-part" id="div-2">
                                        <Row >
                                            <Col md={12}>
                                                <textarea
                                                    className="text-input"
                                                    placeholder="Enter Text Here"
                                                    value={this.state.text}
                                                    onChange={this.inputText}
                                                />
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </Col>
                            <Uploader isOpen={this.state.isOpen !== -1} onClose={(e) => this.setState({ isOpen: -1 })}>
                                <div className="video-uploader">
                                    <div className="uploader-title">
                                        <label>UPLOAD IMAGE</label>
                                        <hr />
                                    </div>
                                    <input type="file" className="custom-file-input" onChange={this.handleFileChange} />
                                    <hr />
                                    <Row>
                                        <Col md={8}>
                                            <p>NOTE: All files should be less than 4.0 GB</p>
                                        </Col>
                                        <Col md={4}>
                                            <Button
                                                bsStyle="info" pullRight onClick={(e) => this.setState({ isOpen: -1 })}>
                                                Upload
                                            </Button>
                                        </Col>
                                    </Row>

                                </div>
                            </Uploader>
                            <Col md={1}>
                                {
                                    pageIndex !== course.sections[sectionIndex].pages.length - 1 && course.sections[sectionIndex].pages.length > 1 ?
                                        course.sections[sectionIndex].pages[pageIndex + 1].template === "FULLSCREEN VIDEO" ?
                                            <div className="next">
                                                <Link to={{ pathname: '/admin/fullvideocontent', state: { sectionIndex, pageIndex: pageIndex + 1, course } }}>
                                                    <Button className='btn-next'>
                                                        <img src={next} width="20px" height="20px" alt="..." />
                                                    </Button>
                                                </Link>
                                            </div>
                                            : (course.sections[sectionIndex].pages[pageIndex + 1].template === "VIDEO WITH CAPTION" ?
                                                <div className="next">
                                                    <Link to={{ pathname: '/admin/videocapcontent', state: { sectionIndex, pageIndex: pageIndex + 1, course } }}>
                                                        <Button className='btn-next'>
                                                            <img src={next} width="20px" height="20px" alt="..." />
                                                        </Button>
                                                    </Link>
                                                </div>
                                                : (course.sections[sectionIndex].pages[pageIndex + 1].template === "HORIZONTAL IMAGES WITH TEXT" ?
                                                    <div className="next">
                                                        <Link to={{ pathname: '/admin/horizontalmultiimgs', state: { sectionIndex, pageIndex: pageIndex + 1, course } }}>
                                                            <Button className='btn-next'>
                                                                <img src={next} width="20px" height="20px" alt="..." />
                                                            </Button>
                                                        </Link>
                                                    </div>
                                                    : (course.sections[sectionIndex].pages[pageIndex + 1].template === "IMAGE WITH TEXT" ?
                                                        <div className="next">
                                                            <Link to={{ pathname: '/admin/imagecapcontent', state: { sectionIndex, pageIndex: pageIndex + 1, course } }}>
                                                                <Button className='btn-next'>
                                                                    <img src={next} width="20px" height="20px" alt="..." />
                                                                </Button>

                                                            </Link>
                                                        </div>
                                                        : (course.sections[sectionIndex].pages[pageIndex + 1].template === "QUIZ CONTENT" ?
                                                            <div className="next">
                                                                <Link to={{ pathname: '/admin/quizcontent', state: { sectionIndex, pageIndex: pageIndex + 1, course, loadPropState: true } }}>
                                                                    <Button className='btn-next'>
                                                                        <img src={next} width="20px" height="20px" alt="..." />
                                                                    </Button>
                                                                </Link>
                                                            </div>
                                                            : (course.sections[sectionIndex].pages[pageIndex + 1].template === "IMAGES WITH TEXT" ?
                                                                <div className="next">
                                                                    <Link to={{ pathname: '/admin/multiimgcapcontent', state: { sectionIndex, pageIndex: pageIndex + 1, course, flushState: true} }}>
                                                                        <Button className='btn-next'>
                                                                            <img src={next} width="20px" height="20px" alt="..." />
                                                                        </Button>
                                                                    </Link>
                                                                </div>
                                                                : (course.sections[sectionIndex].pages[pageIndex + 1].template === "FULLSCREEN IMAGE" ?
                                                                    <div className="next">
                                                                        <Link to={{ pathname: '/admin/fullimagecontent', state: { sectionIndex, pageIndex: pageIndex + 1, course } }}>
                                                                            <Button className='btn-next'>
                                                                                <img src={next} width="20px" height="20px" alt="..." />
                                                                            </Button>
                                                                        </Link>
                                                                    </div>
                                                                    :
                                                                    <div className="next">
                                                                        <Link to={{ pathname: '/admin/fulltextcontent', state: { sectionIndex, pageIndex: pageIndex + 1, course } }}>
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
                                        <div className="next"></div>
                                }
                            </Col>
                        </Row>
                    </Grid>

                </div>
            </div>

        );
    }
}
export default MultiImgCapContent;