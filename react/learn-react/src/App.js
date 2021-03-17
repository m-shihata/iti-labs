import './App.css';
import React, {Component, useState} from 'react'

// Method 1: Same way explained in the lecture
class App1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0
    }
    this.handleIncClick =this.handleIncClick.bind(this) 
  }

  render() {
    return (
      <div className="App">
        <p>App1: with class, constructor and regular functions</p>
        <h1>{ this.state.counter }</h1>
        <button onClick={this.handleIncClick}>Add</button>

      </div>
    );
  }

  handleIncClick() {
    this.setState(function(state) {
      return {counter: state.counter + 1}
    });
  }
}



// Just for Remebering
// Method2: With some shorthandss and arrow functions
export class App2 extends Component {
  // Everything we removed in this example will be done for us
  state = {
    counter: 0
  }
 
  render() {
    return (
      <div className="App">
        <p>App2: class, arrow functions to auto-bind them (constructor is removed as short-hand syntax)</p>
        <h1>{ this.state.counter }</h1>
        <button onClick={this.handleIncClick}>Add</button>
      </div>
    );
  }

  // arrow functin binded to the instance by default
  handleIncClick = () => {
    this.setState({counter: this.state.counter + 1});
  }

}



// Method3: Using functions and hooks
export function App3(props) {
  var [counter, setCounter] = useState(0)  

  return (
    <div className="App">
      <p>App3: with useState Hook</p>
      <h1>{ counter }</h1>
      <button onClick={() => setCounter(counter+1)}>Add</button>
    </div>
  );
  // in case of using more logic than get and set a state we will use a reducer
}

export default App1;
