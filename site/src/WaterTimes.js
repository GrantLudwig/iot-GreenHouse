import React from 'react';
import axios from 'axios'

class WaterTimes extends React.Component {
    constructor(props) {
        super(props);     
        this.state = {
            startTime: "",
            endTime: ""
        };
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
    
    render() {
        return (
            <div className="Water-times">
                <h2>Watering Times:</h2>
                <h3> {this.calcFull(this.state.startTime, this.state.endTime)} </h3>
                <button>Change</button>
            </div>
        );
    }
    
    calcFull(start, end) {
        if (end == 1440) {
            end = 0;
        }
        if (start == end) {
            return "All day";
        }
        
        var returnString = this.calcTime(start);
        return returnString + " - " + this.calcTime(end);
    }
    
    // time in min, convert to time 24H
    calcTime(time) {
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
}

export default WaterTimes;