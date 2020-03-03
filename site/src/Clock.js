import React from 'react';
import moment from 'moment';

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: moment().format('MMMM Do YYYY, h:mm a')
        };
    }
    
    componentDidMount() {
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
            time: moment().format('MMMM Do YYYY, h:mm a')
        });
    }
    
    render() {
        return (
            <h2 className="App-clock">
                {this.state.time}
            </h2>
        );
    }
}

export default Clock;