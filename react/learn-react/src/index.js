import React from 'react';
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';
// import { Counter1, Counter2, Counter3, } from './CounterApp';
// import TodoApp from "./TodoApp";
import CalcApp from "./CalcApp"
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <CalcApp />
    {/* 
    <TodoApp
    <Counter />
    <hr />
    <App2 />
    <hr/>
    <App3 /> */}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
