import React from 'react';
import axios from 'axios'

class TimeBetweenWater extends React.Component {
    constructor(props) {
        super(props);     
        this.state = {
            duration: 0
        };
    }
    
    componentDidMount() {
        axios.get('http://127.0.0.1:5000/wateringDelay').then(response => response.data)
            .then((data) => {
                this.setState({ duration: data.timeMin })
        })
    }
    
    render() {
        return (
            <div className="Time-between-water">
                <h2>Time Between Watering</h2>
                {this.calcDuration(this.state.duration)}
                <button>Change</button>
            </div>
        );
    }
    
    // time in min, convert for hours and min
    calcDuration(time) {
        var returnString = "";
        var hours = Math.floor(time/60);
        if (hours > 0){
            returnString = hours;
            if (hours > 1) {
                returnString += " hours";
            }
            else {
                returnString += " hour";
            }
        }
        var minLeft = time - (hours * 60);
        if (minLeft > 0) {
            if (returnString.length > 0) {
                returnString += " "
            }
            returnString += minLeft;
            if (minLeft > 1) {
                returnString += " minutes";
            }
            else {
                returnString += " minute";
            }
        }
        
        return <h3> {returnString} </h3>
    }
}

export default TimeBetweenWater;