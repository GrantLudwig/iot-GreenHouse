// import React from 'react';
// import ReactDOM from 'react-dom';
// import Main from './Main';

// ReactDOM.render(<Main />, document.getElementById('root'));

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Clock from './Clock';
import NextWater from './NextWater';
import WaterDuration from './WaterDuration';
import TimeBetweenWater from './TimeBetweenWater';
import WaterTimes from './WaterTimes';
import moment from 'moment';

class Index extends React.Component {
    render() {
        return (
            <div className="App">
                <h1>Irrigation System</h1>
                <Clock></Clock>
                
                <button>Manually Water</button>
                
                <NextWater></NextWater>
                
                <WaterTimes></WaterTimes>
                
                <TimeBetweenWater></TimeBetweenWater>
                
                <WaterDuration></WaterDuration>
                
                <h2>Flow Rate</h2>
                <h3>Normal</h3>
            </div>
        )

    }
}

ReactDOM.render(<Index />, document.getElementById('root'));