import React, { Component } from 'react';
// import { render } from 'react-dom';
import ProgressBar from './ProgressBar';
import './style.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numOfProgressBars: 0
    };

    this.addProgressBar = this.addProgressBar.bind(this);
  }

  componentWillMount() {
    this.addProgressBar()


  }

  addProgressBar() {
    this.setState(({ numOfProgressBars }) => ({ numOfProgressBars: numOfProgressBars + 1 }));
  }

  render() {    

    const { numOfProgressBars } = this.state;
    var progressBars = [];

    for (let i = 0; i < numOfProgressBars; i++) {
      progressBars = [...progressBars, <ProgressBar key={i} duration={31104000} />];
    }

    return (
      <div>
        {progressBars}
      </div>
    );
  }
}

export default  App