import React, { Component } from 'react';

class Uploader extends Component {
    render() {
        let dialog = (
            <div className="uploader" >
                <button className="uploader-btn" onClick={this.props.onClose}> X </button>
                {this.props.children}
            </div>
        );

        if (!this.props.isOpen) {
            dialog = null;
        }
        return (
            <div className="uploader-div">
                {dialog}
            </div>
        );
    }
}

export default Uploader;