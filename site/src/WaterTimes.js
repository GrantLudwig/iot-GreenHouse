import React from 'react';
import axios from 'axios'

class WaterTimes extends React.Component {
    constructor(props) {
        super(props);     
        this.state = {
            startTime: "00:00",
            endTime: "00:00"
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
                <h3> {this.calcTime(this.state.startTime)} - {this.calcTime(this.state.startTime)} </h3>
                <button>Change</button>
            </div>
        );
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