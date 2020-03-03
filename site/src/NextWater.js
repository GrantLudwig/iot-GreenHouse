import React from 'react';
import axios from 'axios'

class NextWater extends React.Component {
    constructor(props) {
        super(props);     
        this.state = {
            lastWater: "0", // seconds
            nextWater: "0" // seconds
        };
    }
    
    render() {
        return (
            <div className="Next-water">
                <h2>Next Water Time:</h2>
                <h3> {this.calcTime(this.state.lastWater)} - {this.calcTime(this.state.nextWater)} </h3>
            </div>
        );
    }
    
    componentDidMount() {
        axios.get('http://127.0.0.1:5000/getWaterTimes').then(response => response.data)
            .then((data) => {
                this.setState({ 
                    startTime: data.start,
                    endTime: data.end
                })
        })
    }
    
    calcTime(lTime, nTime) {
        var currTime = Math.floor(Date.now() / 1000)
        var returnString = "";
        var hours = Math.floor(time/60);
        if (hours > 0){
            returnString = hours + ":";
        }
        var minLeft = time - (hours * 60);
        if (hours == 0) {
            returnString += "00:"
        }
        if (minLeft < 10){
            returnString += "0"
        }
        returnString += minLeft;
        
        return returnString
    }
    
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

export default NextWater;