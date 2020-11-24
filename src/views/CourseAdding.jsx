import React, { Component } from "react";
import { Link } from 'react-router-dom';
import {
    Grid,
    Row
} from "react-bootstrap";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import Section from "components/Section/Section.jsx";
import _ from "lodash";
import { Card } from "components/Card/Card.jsx";
import amplify, { API, graphqlOperation, Storage } from 'aws-amplify'
import { createCourse, createSection, createPage, createContent, deleteCourse } from 'graphql/mutations'
import uuid from 'react-uuid'

import config from '../aws-exports'

const {
  aws_user_files_s3_bucket_region: region,
  aws_user_files_s3_bucket: bucket
} = config

class CourseAdding extends Component {
    constructor() {
        super();
        this.state = {
            loadPropState: false,
            course: {
                name: '',
                sections: [{
                    name: '',
                    pages: [],
                }],
                edited_at: '',
                status: 'DRAFT'
            }
        }
    }

      _processCourse() {
        // window.LOG_LEVEL='DEBUG'
        let course = this.state.course;
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

      async deleteCourse(id) {
        try {
          const data = await API.graphql(graphqlOperation(deleteCourse, { input: {id: id, expectedVersion: 1} }))
          console.log(data)
          for (let i = 0; i < this.state.courses.length; i++) {
              if (this.state.courses[i].id == id) {
                  this.state.courses.splice(i, 1);
              }
          }
          this.setState({ courses: this.state.courses })
      }
        catch(err) {
            console.log("failed to delete course with id " + id)
            console.log(err)
        }
    }
    
      _createCourse = async (status) => {
        const course = this._processCourse()
        let approved = true;
        if (status == "PUBLISHED" && (course.sections.length == 0 || course.sections[0].pages.length == 0)) {
            alert("Cannot publish course with no pages!")
            approved = false
        }
        if (!course.name || course.name == "") {
            alert("Cannot create course with no name!")
            approved = false
        }
        for (let aa = 0; aa < course.sections.length; aa++) {
            let section = course.sections[aa]
            console.log(section)
            for (let bb = 0; bb < section.pages.length; bb++) {
                let page = section.pages[bb]
                if (!page.name || page.name == "") {
                    page.name = "Page " + (bb + 1)
                }
                let contentsObj = page.contents
                if ((!contentsObj || contentsObj.length == 0) && status == "PUBLISHED") {
                    alert("Cannot publish course with pages that have no content!")
                    approved = false
                    break;
                }
                if (page.template == "QUIZ CONTENT") {
                    console.log(contentsObj)
                    if (contentsObj.length != 9 || (contentsObj[5].content == false && contentsObj[6].content == false && contentsObj[7].content == false && contentsObj[8].content == false)) {
                        alert("Cannot create course with quiz content that have no correct answer")
                        approved = false
                        break;
                    }
                }
            }
        }
        if (approved) {
            let courseID = uuid()
            let d = new Date().toLocaleString()
            let courseInput = {name: course.name, id: courseID, status: status, created_at: d}
            try {
                try {
                    const data = await API.graphql(graphqlOperation(deleteCourse, { input: {id: course.id, expectedVersion: 1} }))
                }
                catch(err) {
                    console.log("couldn't delete course")
                }
              const courseData = await API.graphql(graphqlOperation(createCourse, { input: courseInput }))
              let sections = course.sections;
              for (let i = 0; i < sections.length; i++) {
                let sectionID = uuid()
                let sectionInput = {name: sections[i].name, id: sectionID, sectionCourseId: courseID, index: i}
                const sectionData = await API.graphql(graphqlOperation(createSection, { input: sectionInput }))
                let pages = sections[i].pages;
                for (let j = 0; j < pages.length; j++) {
                  let pageID = uuid()
                  let pageInput = {name: pages[j].name, id: pageID, template: pages[j].template, pageSectionId: sectionID, index: j}
                  const pageData = await API.graphql(graphqlOperation(createPage, { input: pageInput }))
                  let contents = pages[j].contents
                  for (let k = 0; k < contents.length; k++) {
                    let contentID = uuid()
                    if (contents[k].contentType == "image" && contents[k].contentFile) {
                      let file = contents[k].contentFile
                      const extension = file.name.split(".")[1]
                      const { type: mimeType } = file
                      const key = `images/${uuid()}.${extension}`
                      const url = `https://${bucket}.s3.${region}.amazonaws.com/public/${key}`
                      contents[k].content = url
                      await Storage.put(key, file, {contentType: mimeType})
                    }
                    let contentInput = {id: contentID, content: contents[k].content, contentType: contents[k].contentType, contentPageId: pageID, index: k}
                    const contentData = await API.graphql(graphqlOperation(createContent, { input: contentInput }))
                  }
                }
              }
              alert("course created!")
              window.location.replace("/admin/courses");
            } catch (err) {
              console.log(err)
            }
        }
      }

    loadPropsCourse = () => {
        if (this.props.location.state) {
            if (this.props.location.state.loadPropState) {
                this.props.location.state.loadPropState = false;
                this.setState({ loadPropState: false, course: this.props.location.state.course })
            }
        }

    }
    handleCourseName = (event) => {
        // const course = JSON.parse(JSON.stringify(this.state.course)); //deep clone
        const course = _.cloneDeep(this.state.course);
        course.name = event.target.value;
        this.setState({ course });
    };
    handleSectionName = (i, name) => {
        // const course = JSON.parse(JSON.stringify(this.state.course)); //deep clone
        const course = _.cloneDeep(this.state.course);
        course.sections[i].name = name;
        this.setState({ course });
    };

    _showSection = () => {
        // const course = JSON.parse(JSON.stringify(this.state.course)); //deep clone
        const course = _.cloneDeep(this.state.course);
        course.sections = (course.sections || []).concat([{
            name: '',
            pages: [],
        }]);
        this.setState({ course });
    };

    handlePageAdded = (i, label, name) => {
        // i in sections array
        // label = template in page obj
        // const course = JSON.parse(JSON.stringify(this.state.course)); //deep clone
        const course = _.cloneDeep(this.state.course);
        course.sections[i].pages.push({
            // new page obj
            name,
            template: label,
            contents: [],
        });
        this.setState({ course }, () =>
        console.log(
          this.state
        ));
    }
    handlePageDeleted = (sectionIndex, pageIndex) => {
        // i in sections array
        // label = template in page obj
        // const course = JSON.parse(JSON.stringify(this.state.course)); //deep 
        const course = _.cloneDeep(this.state.course);
        course.sections[sectionIndex].pages.splice(pageIndex, 1);
        this.setState({ course });
    }
    handleSectionDeleted = (i) => {
        // const course = JSON.parse(JSON.stringify(this.state.course)); //deep clone //_.deepCopy(this.state.course)
        const course = _.cloneDeep(this.state.course);
        course.sections.splice(i, 1);
        this.setState({ course });
    }

    render() {
        // console.log(this.state.course.documents[0].name);
        this.loadPropsCourse();
        const sections = this.state.course.sections.map((section, sectionIndex) =>
            <Section
                title={`Section ${sectionIndex + 1}`}
                sectionNumber={sectionIndex}
                section={section}
                course={_.cloneDeep(this.state.course)}
                onPageAdded={(template, name) => this.handlePageAdded(sectionIndex, template, name)}
                onPageDeleted={(pageIndex) => this.handlePageDeleted(sectionIndex, pageIndex)}
                onSectionDeleted={() => this.handleSectionDeleted(sectionIndex)}
                onSectionNameChange={(name) => this.handleSectionName(sectionIndex, name)}
            />);


        return (
            <div className="content add-content">
                <Grid fluid>
                    <Row>
                        <form>
                        <Button onClick={this.popTempCourse} bsStyle="info" pullRight fill style={{zIndex: 1}}>
                                + Temp Course
                            </Button>
                            <Button onClick={this._showSection} bsStyle="info" pullRight fill style={{zIndex: 1}}>
                                + New Section
                            </Button>
                            <FormInputs
                                ncols={["col-md-10 course-label"]}
                                properties={[
                                    {
                                        label: "Course Name (" + this.state.course.status + "): ",
                                        type: "text",
                                        bsClass: "form-control",
                                        placeholder: "Course Name",
                                        value: this.state.course.name,
                                        onChange: this.handleCourseName
                                    }
                                ]}
                            />
                        </form>
                    </Row>
                    {sections}
                </Grid>
                <Button bsStyle="info" pullRight fill  onClick={this._createCourse.bind(this, "RETIRED")}>
                        Retire
                    </Button>
                    <Button bsStyle="info" pullRight fill onClick={this._createCourse.bind(this, "PUBLISHED")}>
                        Publish
                    </Button>
                <Button bsStyle="info" pullRight fill onClick={this._createCourse.bind(this, "DRAFT")}>
                        Save
                    </Button>
            </div>
        );
    }
}

export default CourseAdding;
