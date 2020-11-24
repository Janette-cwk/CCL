import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import Button from "components/CustomButton/CustomButton.jsx";
import { Link } from 'react-router-dom';
import plus from "assets/img/plus.png";
import { Card } from "components/Card/Card.jsx";
import amplify, { API, graphqlOperation, Storage } from 'aws-amplify'
import { createCourse, createSection, createPage } from 'graphql/mutations'
import uuid from 'react-uuid'

import config from '../aws-exports'

const {
  aws_user_files_s3_bucket_region: region,
  aws_user_files_s3_bucket: bucket
} = config


class CourseOutline extends Component {
  state = {
    isOpen: false
  }

    // https://dev.to/rahmanfadhil/how-to-generate-unique-id-in-javascript-1b13

  // https://aws-amplify.github.io/docs/cli-toolchain/graphql#connection

  // https://dev.to/dabit3/graphql-tutorial-how-to-manage-image-file-uploads-downloads-with-aws-appsync-aws-amplify-hga
  

  _createContent = async () => {
    const course = this.props.location.state;
    console.log(course)
    let courseID = uuid()
    let sectionID = uuid()
    let tempContent = {content: "fjdlafjdal", contentType: "text", position: 0, id: uuid()}
    let tempCourseContent = {name: "tempcourse", id: courseID, status: 'DRAFT'}
    let tempSectionContent = {name: "tempsection1", id: sectionID, sectionCourseId: courseID}
    try {
      const data = await API.graphql(graphqlOperation(createCourse, { input: tempCourseContent }))
      const data2 = await API.graphql(graphqlOperation(createSection, { input: tempSectionContent }))
      console.log("i think it worked?")
      console.log(data)
      console.log(data2)
    } catch (err) {
      console.log(err)
    }
  }

  _processCourse() {
    window.LOG_LEVEL='DEBUG'
    let course = this.props.location.state;
    if (course.name == "") {
      course.name = null;
    }
    let sections = course.sections;
    for (let i = 0; i < sections.length; i++) {
      if (sections[i].name == "") {
        sections[i].name = null;
      }
      let pages = sections[i].pages;
      for (let j = 0; j < pages.length; j++) {
        if (pages[j].name == "") {
          pages[j].name = null;
        }
      }
    }
    return course
  }

  _createCourse = async (status) => {
    const course = this._processCourse()
    console.log(course)
    console.log(status)
    let courseID = uuid()
    let courseInput = {name: course.name, id: courseID, status: status}
    try {
      const courseData = await API.graphql(graphqlOperation(createCourse, { input: courseInput }))
      let sections = course.sections;
      console.log(courseData)
      for (let i = 0; i < sections.length; i++) {
        let sectionID = uuid()
        let sectionInput = {name: sections[i].name, id: sectionID, sectionCourseId: courseID}
        const sectionData = await API.graphql(graphqlOperation(createSection, { input: sectionInput }))
        console.log(sectionData)
        let pages = sections[i].pages;
        for (let j = 0; j < pages.length; j++) {
          let pageID = uuid()
          let pageInput = {name: pages[j].name, id: pageID, template: pages[j].template}
          const pageData = await API.graphql(graphqlOperation(createPage, { input: pageInput }))
          console.log(pageData)
          let contents = pages[j].contents
          for (let k = 0; k < contents.length; k++) {
            let contentID = uuid()
            if (contents[k].contentType == "image") {
              let file = contents[k].contentFile
              console.log(file)
              const extension = file.name.split(".")[1]
              const { type: mimeType } = file
              const key = `images/${uuid()}.${extension}`
              const url = `https://${bucket}.s3.${region}.amazonaws.com/public/${key}`
              contents[k].content = url
              console.log(url)
              await Storage.put(key, file, {contentType: mimeType})
            }
            let contentInput = {name: contents[k].name, id: contentID, content: contents[k].content, contentType: contents[k].contentType}

            const contentData = await API.graphql(graphqlOperation(createPage, { input: contentInput }))
            console.log(contentData)
          }
        }
      }
    } catch (err) {
      console.log(err)
    }
  }



  render() {
    const course = this.props.location.state;
    const pageDivs = [];
    for (let i = 0; i < course.sections.length; i++) {
      let pages = course.sections[i].pages;
      const cards = pages.map((page, pageIndex) =>
        <Col md={4} key={page.name}>
          <Card
            category={`Page ${pageIndex + 1} - ${page.name}`}
            stats={page.template}
            content={
              <div className="outline-content">
                {page.template === "FULLSCREEN VIDEO" ?
                  <Link to={{ pathname: '/admin/fullvideocontent', state: { sectionIndex: i, pageIndex, course } }}>
                    <Button className='btn-simple-add' >
                      <img src={plus} width="20px" height="20px" alt="..." />
                    </Button>
                  </Link>
                  : (page.template === "VIDEO WITH CAPTION" ?
                    <Link to={{ pathname: '/admin/videocapcontent', state: { sectionIndex: i, pageIndex, course } }}>
                      <Button className='btn-simple-add' >
                        <img src={plus} width="20px" height="20px" alt="..." />
                      </Button>
                    </Link>
                    : (page.template === "IMAGE WITH TEXT" ?
                      <Link to={{ pathname: '/admin/imagecapcontent', state: { sectionIndex: i, pageIndex, course } }}>
                        <Button className='btn-simple-add' >
                          <img src={plus} width="20px" height="20px" alt="..." />
                        </Button>
                      </Link>
                      : (page.template === "QUIZ CONTENT" ?
                        <Link to={{ pathname: '/admin/quizcontent', state: { sectionIndex: i, pageIndex, course } }}>
                          <Button className='btn-simple-add' >
                            <img src={plus} width="20px" height="20px" alt="..." />
                          </Button>
                        </Link>
                        : (page.template === "HORIZONTAL IMAGES WITH TEXT" ?
                        <Link to={{ pathname: '/admin/horizontalmultiimgs', state: { sectionIndex: i, pageIndex, course } }}>
                          <Button className='btn-simple-add' >
                            <img src={plus} width="20px" height="20px" alt="..." />
                          </Button>
                        </Link>
                        : (page.template === "IMAGES WITH TEXT" ?
                          <Link to={{ pathname: '/admin/multiimgcapcontent', state: { sectionIndex: i, pageIndex, course } }}>
                            <Button className='btn-simple-add' >
                              <img src={plus} width="20px" height="20px" alt="..." />
                            </Button>
                          </Link>
                          : (page.template === "TEXT" ?
                            <Link to={{ pathname: '/admin/fulltextcontent', state: { sectionIndex: i, pageIndex, course } }}>
                              <Button className='btn-simple-add' >
                                <img src={plus} width="20px" height="20px" alt="..." />
                              </Button>
                            </Link> :
                            <Link to={{ pathname: '/admin/fullimagecontent', state: { sectionIndex: i, pageIndex, course } }}>
                              <Button className='btn-simple-add' >
                                <img src={plus} width="20px" height="20px" alt="..." />
                              </Button>
                            </Link>))))))
                }

              </div>
            } />
        </Col>);
      pageDivs.push(
        <Row key={i}>
          <Col md={100} className="section-card">
            <Card
              title={`Section ${i + 1} - ${course.sections[i].name}`}
              content={
                <div className="outline-card">
                  {cards}
                </div>
              }
            />
          </Col>
        </Row>
      )
    }
    return (
      <div className="content">
        <Grid fluid>
          {pageDivs}
          <h3>
            {/* <Link to='/admin/courses'> */}
            <Button bsStyle="info" pullRight fill onClick={this._createContent}>
                Publish
            </Button>
            {/* </Link> */}
            <Link to='/admin/courses'>
              <Button bsStyle="info" pullRight fill>
                Preview
            </Button>
            </Link>
            {/* <Link to='/admin/courses'> */}
            <Button bsStyle="info" pullRight fill onClick={this._createCourse.bind(this, "DRAFT")}>
                Saveasdf
            </Button>
            {/* </Link> */}
          </h3>
        </Grid>
      </div >
    );
  }
}

export default CourseOutline;