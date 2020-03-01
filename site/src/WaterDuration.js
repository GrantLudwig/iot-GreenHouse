import React from 'react';
import axios from 'axios'

class WaterDuration extends React.Component {
    constructor(props) {
        super(props);     
        this.state = {
            duration: 0
        };
    }
    
    componentDidMount() {
        axios.get('http://127.0.0.1:5000/wateringDuration').then(response => response.data)
            .then((data) => {
                this.setState({ duration: data.timeSeconds })
                console.log(this.state.duration)
        })
    }
    
    render() {
        return (
            <div className="App-water-duration">
                <h2>Watering Duration</h2>
                <h3>
                    {this.state.duration} seconds
                </h3>
                <button>Change</button>
            </div>
            
        );
    }
}

export default WaterDuration;