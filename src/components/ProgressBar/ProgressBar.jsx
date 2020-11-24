import React , {Component} from 'react';
import styled from 'styled-components';

const Tracker = styled.div`
    width: 50%;
    height: 15px;
    margin-right: 50px;
    background: white;
    border-radius: 10px;
    box-shadow: inset 0 0 3px #000;
    float: right;
    margin-top: -36px;
`;
const ProgressInTracker = styled.div`
    width: ${props => props.percentage}%;
    height: 100%;
    background-color: #1A8A9A;
    border-radius: 10px;
    transition: width 0.3s ease-in-out;
`;
class ProgressBar extends Component {
    percentageLimits = (min, value, max) => {
        return Math.min(Math.max(min, value), max);
    }
    render(){
        return (
            <Tracker>
                <ProgressInTracker percentage={this.percentageLimits(0, this.props.percentage, 100)} />
            </Tracker>
        )
    }
}
export default ProgressBar;