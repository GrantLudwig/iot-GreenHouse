import React from 'react';
import axios from 'axios'

class NextWater extends React.Component {
    render() {
        return (
            <div className="App-water-time">
                <h2>Next Water Time:</h2>
                <h3>00:00 - 0 min</h3>
            </div>
        );
    }
    
    componentDidMount() {
        axios.put(`http://127.0.0.1:5000/test`)
    }
}

export default NextWater;