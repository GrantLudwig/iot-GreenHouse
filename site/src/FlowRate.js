import React from 'react';
import axios from 'axios';

class FlowRate extends React.Component {
    constructor(props) {
        super(props);     
        this.state = {
            flow: ""
        };
    }
    
    render() {
        return (
            <div className="Next-water">
                <h2>Flow Rate:</h2>
                <h3> {this.state.flow} </h3>
            </div>
        );
    }
    
    componentDidMount() {
        axios.get('http://127.0.0.1:5000/flowRate').then(response => response.data)
            .then((data) => {
                this.setState({ 
                    flow: data.rate
                })
            })
    }
}

export default FlowRate;