import React from 'react';
import axios from 'axios';
import moment from 'moment';

class NextWater extends React.Component {
    constructor(props) {
        super(props);     
        this.state = {
            nextWaterMoment: "",
            nextWaterOutput: "",
            timeTill: ""
        };
    }
    
    render() {
        return (
            <div className="Next-water">
                <h2>Next Water Time:</h2>
                <h3> {this.state.nextWaterOutput} {this.state.timeTill}</h3>
            </div>
        );
    }
    
    componentDidMount() {
        axios.get('http://127.0.0.1:5000/nextWater').then(response => response.data)
            .then((data) => {
                this.setState({ 
                    nextWaterMoment: moment.unix(data.nextWater)
                })
            })
            .then(() => {
                this.setState({
                    nextWaterOutput: this.state.nextWaterMoment.format('MMMM, h:mm:ss a'),
                    timeTill: this.state.nextWaterMoment.fromNow()
                })
            })
            
        this.intervalID = setInterval(
            () => this.tick(),
            1000
        );
    }
    
    componentWillUnmount() {
        clearInterval(this.intervalID);
    }
    
    tick() {
        this.setState({
            timeTill: this.state.nextWaterMoment.fromNow()
        });
    }
}

export default NextWater;