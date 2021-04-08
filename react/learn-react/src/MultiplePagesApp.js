import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button, Alert } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import TodoApp from "./TodoApp";

class MultiplePagesApp extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <h1>Netflex</h1>
            <ul>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/todo">Todo</Link>
              </li>
              <li>
                <Link to="/movies">Movies</Link>
              </li>
            </ul>
          </div>

          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/todo">
              <TodoApp />
            </Route>
            <Route path="/movies">
              <Movies />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

class Login extends React.Component {

  state = {
    email: "",
    password: "",
    error: "",
    message:""
  };

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = () => {
    fetch("https://reqres.in/api/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          this.setState({"error": data.error})
        } else if (data.token) {
          localStorage.setItem("token", data.token)
          this.setState({"message": "logged in successfully"})
        }
      })
  }

  render() {
    return (
      <div>
        {this.state.error && (
          <Alert
            variant="danger"
            onClose={(e) => this.setState({ error: "" })}
            dismissible
          >
            <Alert.Heading>Error</Alert.Heading>
            <p>{this.state.error}</p>
          </Alert>
        )}

        {this.state.message && ( 
          <Alert
            variant="success"
            onClose={(e) => this.setState({ message: "" })}
            dismissible
          >
            <Alert.Heading>Success</Alert.Heading>
            <p>{this.state.message}</p>
          </Alert>
        )}  
       
        <input
          type="email"
          name="email"
          value={this.state.email}
          onChange={this.handleInput}
        />
        <br />
      
        <input
          type="password"
          name="password"
          value={this.state.password}
          onChange={this.handleInput}
        />
        <br />
        <button onClick={this.handleSubmit}>Login</button>
      </div>
    );
  }
}

class Movies extends React.Component {
  state = {
    data: [],
  };

  componentDidMount() {
    fetch("/movies.json")
    .then(res => res.json())
    .then(data => this.setState({ data: data }))
  }
  render() {
    return (
      <div>
        <h1>Movies...</h1>
        {this.state.data &&
          this.state.data.length > 0 &&
          this.state.data.map((item) => {
            return <Movie key={item.id} item={item} />;
          })}
      </div>
    );
  }
}


class Movie extends React.Component {
  render() {
    return (
      <Card style={{ width: "18rem", float: "left" }}>
        <Card.Img variant="top" src={this.props.item.img} />
        <Card.Body>
          <Card.Title>{this.props.item.first_name}</Card.Title>
          <Card.Text>
            {this.props.item.desc}
          </Card.Text>
          <Button variant="primary">Watch</Button>
        </Card.Body>
      </Card>
    );
  }
}

export default MultiplePagesApp;
