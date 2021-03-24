import React, { Component } from "react";

class CalcApp extends Component {
    buttons = [
        ["AC", "+/-", "%", "/"],
        [7, 8, 9, "*"],
        [4, 5, 6, "-"],
        [1, 2, 3, "+"],
        [0, ".", "="],
    ];

    state = {
        screen: "",
    };

    handleClick = (e) => {
        switch (e.target.value) {
            case "=":
                this.setState({ screen: eval(this.state.screen) });
                break;
            case "AC":
                this.setState({ screen: "" });
                break;
            case "%":
                this.setState({ screen: eval(this.state.screen) / 100 });
                break;
            case "+/-":
                if (this.state.screen[this.state.screen.length - 1] === "+") {
                    this.setState({screen: this.state.screen.slice(0, -1) + "-"});
                } else if (this.state.screen[this.state.screen.length - 1] === "-") {
                    this.setState({screen: this.state.screen.slice(0, -1) + "+"});
                }
            break;
            default:
                this.setState({ screen: this.state.screen + e.target.value });
        }
    };

    render() {
        return (
            <div className="container d-flex w-100 justify-content-center py-5">
                <div className="h-100 d-flex flex-column col-lg-4 col-md-8 col-12 shadow bg-light pt-4">
                    <Screen output={this.state.screen} />
                    <Buttons buttons={this.buttons} func={this.handleClick} />
                </div>
            </div>
        );
    }
}

class Screen extends Component {
    render() {
        return (
            <div
                style={{ height: 50 }}
                className="d-flex bg-dark text-white overflow-hidden px-3 rounded"
            >
                <h1>{this.props.output}</h1>
            </div>
        );
    }
}

class Buttons extends Component {
    render() {
        return (
            <div className="px-3 py-3">
                {this.props.buttons.map((row, i) => (
                    <div className="row" key={i}>
                        {row.map((button, j) => (
                            <Button
                                key={j}
                                name={button}
                                func={this.props.func}
                                type={
                                    Number.isInteger(button)
                                        ? "number"
                                        : j === 3
                                        ? "operation"
                                        : "action"
                                }
                            />
                        ))}
                    </div>
                ))}
            </div>
        );
    }
}

class Button extends Component {
    render() {
        return (
            <button
                className={
                    this.props.name === 0
                        ? "btn btn-secondary border rounded-0 col-6"
                        : this.props.type === "operation" ||
                          this.props.name === "="
                        ? "btn btn-secondary border rounded-0 col-3 bg-warning text-dark"
                        : "btn btn-secondary border rounded-0 col-3"
                }
                value={this.props.name}
                onClick={this.props.func}
            >
                {this.props.name}
            </button>
        );
    }
}

export default CalcApp;
