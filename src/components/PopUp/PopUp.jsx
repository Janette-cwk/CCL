import React, { Component } from 'react';





class PopUp extends Component {
    render() {
        let dialog = (
            <div className="dialog" >
                <button className="dialog-btn" onClick={this.props.onClose}> X </button>
                {this.props.children}
            </div>
        );

        if (!this.props.isOpen) {
            dialog = null;
        }
        return (
            <div className="pop-div">
                {dialog}
            </div>
        );
    }
}

export default PopUp;