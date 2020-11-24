import React, { Component } from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';

class CourseSidebar extends Component {
    constructor(props) {
        super(props)
    };
    state = {
        open: {}, //assuming the names are unique
    };
    handleClick = (name) => {
        const newOpen = { ...this.state.open };
        newOpen[name] = !newOpen[name];
        this.setState({ open: newOpen });
    };

    render() {
        // let checkOpen = { ...this.state.open };
        // if(this.props.sectionIndex >= 0 && checkOpen[this.props.course[this.props.sectionIndex].name] !== true) {
        //     this.handleClick(this.props.course[this.props.sectionIndex].name);
        // }
        return (
            <div className="content-sidebar">
                <List disablePadding dense>
                    {this.props.course.map(({ name, pages: subItems, ...rest }) => {
                        return (
                            <React.Fragment key={name}>
                                <ListItem onClick={()=> this.handleClick(name)} style={{ paddingLeft: 10, borderBottom: "1px #eee solid" }} button {...rest}>
                                    <ListItemText>
                                        <span className="sidebar-text">
                                            {name}
                                        </span>
                                    </ListItemText>
                                    {this.state.open[name] ? <ExpandLess /> : <ExpandMore />}
                                </ListItem>
                                {Array.isArray(subItems) ? (
                                    <Collapse in={this.state.open[name]} timeout="auto" unmountOnExit>
                                        <List disablePadding dense>
                                            {subItems.map((subItem) => {
                                                    return (
                                                        <ListItem
                                                            key={subItem.name}
                                                            style={{ paddingLeft: 30, borderBottom: "0.5px #eee solid" }}
                                                            button
                                                            dense
                                                        >
                                                            <ListItemText>
                                                                <span className="sidebar-subitem-text">
                                                                    {subItem.name}
                                                                </span>
                                                            </ListItemText>
                                                        </ListItem>
                                                    )
                                            })}
                                        </List>
                                    </Collapse>
                                ) : null}
                            </React.Fragment>
                        )
                    })}
                </List>
            </div>
        )
    }
}
export default CourseSidebar;