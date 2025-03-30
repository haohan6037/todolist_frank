import React, {useEffect} from 'react';
import TodoDataService from "../services/todos";
import {Link} from "react-router-dom";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import moment from "moment";
import {useNavigate} from "react-router-dom";


const TodosList =  ({ token, setToken }) => {
    const [todos, setTodos] = React.useState([]);

    const navigate = useNavigate();
    const handleEdit = (todo) => {
        navigate("/todos/" + todo.id, {state: {currentTodo: todo}});
    }

    useEffect(() => {
        retrieveTodos();
    }, [token]);

    const completeTodo = (id) => {
        TodoDataService.completeTodo(id, token).then(response => {
            retrieveTodos();
            console.log("Todo completed", id);
        }).catch(e => {
            console.log(e);
        });
    }

    const deleteTodo = (id) => {
        TodoDataService.deleteTodo(id, token).then(response => {
            retrieveTodos();
            console.log("Todo deleted", id);
        }).catch(e => {
            console.log(e);
        });
    }

    const retrieveTodos = () => {
        TodoDataService.getAll(token).then(response => {
            setTodos(response.data);
        }).catch(e => {
            console.log(e);
        });
    };

    return (
        <Container>
            {!token? (
                <Alert variant="danger">
                    You are not logged in. Please <Link to={"/login"}>login</Link> to see your todos.
                </Alert>
            ) : (
            <div>
                <Link to={"/todos/create"}>
                    <Button variant={"outline-info"} className="m-2">Create Todo</Button>
                </Link>
            {todos.map((todo)=> {
                return (
                    <Card key={todo.id} className="mb-3">
                        <Card.Body>
                            <div className={todo.completed ? "text-decoration-line-through" : ""}>
                                <Card.Title>{todo.title}</Card.Title>
                                <Card.Text><b>Memo:</b>{todo.memo}</Card.Text>
                                <Card.Text>Date created:{moment(todo.created_at).format("Do MMMM YYYY")}</Card.Text>
                            </div>
                            {!todo.completed &&
                                <Button variant={"outline-info"} className="m-2" onClick={() => handleEdit(todo)}>Edit</Button>
                            }
                            <Button variant="outline-danger" className="m-2" onClick={()=>deleteTodo(todo.id)}>Delete</Button>
                            <Button variant={"outline-success"} className="m-2" onClick={() => completeTodo(todo.id)}>Complete</Button>
                        </Card.Body>
                    </Card>
                );
            }
            )}
            </div>
            )}
        </Container>
    );
}
export default TodosList;