import React, { Component } from "react";


class Form extends Component {
    state = {
        btn: false,
        item: ""
    }

    render() {
        return (
            <div className="d-flex form-group">
                <input
                    className="form-control mr-2"
                    type="text"
                    placeholder="Add a new task from here..."
                    value={this.state.item}
                    onChange={this.handleChange}
                />
                <button 
                    className="btn btn-sm btn-primary mr-1"
                    onClick={() => {
                        this.props.addTodoItem(this.state.item);
                        this.setState({item: ""})
                    }}
                >Add</button>
            </div>
        );
    }

    handleChange = (e) => {
        this.setState({
            btn: e.target.value.length > 0,
            item: e.target.value,
        });
    };
}


class TodoItem extends Component {
    render() {
        return (
            <div 
                className="d-flex align-tiems-center list-group-item list-group-item-action"
                onClick={() => this.props.markTodoItem(this.props.todoItem.id)}
            >
                <span>{this.props.todoItem.completed ? <s>{this.props.todoItem.item}</s> : this.props.todoItem.item }</span>
                <button 
                    className="btn btn-sm btn-danger ml-auto" 
                    onClick={(e) => {
                        e.stopPropagation();
                        this.props.deleteTodoItem(this.props.todoItem.id)
                    }}
                >Delete</button>
            </div>
        );
    }
}



class TodoList extends Component {
    render() {
        return (
            <div className="list-group my-4">
                {this.props.todoList.length === 0 && <div className="list-group-item list-group-item-action text-center disabled">Fresh start!</div>}
                {this.props.todoList.map((todo) => (
                        <TodoItem
                            key={todo.id}
                            todoItem={todo}
                            markTodoItem={this.props.markTodoItem}
                            deleteTodoItem={this.props.deleteTodoItem}
                        />
                    
                ))}
            </div>
        );
    }
}





class TodoApp extends Component {
    id = 3
    state = {
        todoList: [
            {
                id: 0,
                item: "Finish the TodoApp",
                completed: true
            }, 
            {
                id: 1,
                item: "Read REST Framework docs",
                completed: false
            },
            {
                id: 2,
                item: "Graduate from ITI :D",
                completed: false
            }
        ],
    };

    render() {
        return (
            <div className="d-flex justify-content-center mt-5">
                <div className="d-flex flex-column bg-light col-lg-5 col-md-8 col-12 rounded border">
                    <h1 className="lead mt-3" style={{fontSize: 40}}>&lt;Tasks /&gt;</h1>
                    <TodoList
                        todoList={this.state.todoList}
                        markTodoItem={this.markTodoItem}
                        deleteTodoItem={this.deleteTodoItem}
                    />
                    <Form
                        addTodoItem={this.addTodoItem}
                    />
                </div>
            </div>
        );
    }

    addTodoItem = (todoItem) => {
        const updatedTodoList = [...this.state.todoList];
        updatedTodoList.push({
            id: this.id++,
            item: todoItem,
            completed: false 
        });
        this.setState(state => ({
            todoList: updatedTodoList
        }));
    }

    markTodoItem = (id) => {
        const updatedTodoList = [...this.state.todoList];
        const index = updatedTodoList.findIndex(todoItem => todoItem.id === id)
        updatedTodoList[index].completed = !updatedTodoList[index].completed 
        this.setState(state => ({
            todoList: updatedTodoList
        }));
    }

    deleteTodoItem = (id) => {
        const updatedTodoList = [...this.state.todoList];
        const index = updatedTodoList.findIndex(todoItem => todoItem.id === id)
        updatedTodoList.splice(index, 1);
        this.setState(state => ({
            todoList: updatedTodoList
        }));
    }
}

export default TodoApp;
