import React from 'react';
import TodoDataService from "../services/todos";
import {Link} from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Navbar";
import {useLocation,} from "react-router-dom";



const AddTodo = (props) => {
    let editing = false;
    let initialTodoTitle = '';
    let initialTodoMemo = '';
    const location = useLocation();

    if(location.state && location.state.currentTodo){
        editing = true;
        initialTodoTitle = location.state.currentTodo.title;
        initialTodoMemo = location.state.currentTodo.memo;

    }

    const[title, setTitle] = React.useState(initialTodoTitle);
    const[memo, setMemo] = React.useState(initialTodoMemo);
    const [submitted, setSubmitted] = React.useState(false);

    const onChangeTitle = (e) => {
        const title = e.target.value;
        setTitle(title);
    };

    const onChangeMemo = (e) => {
        const memo = e.target.value;
        setMemo(memo);
    };

    const saveTodo = () => {
        var data = {
            title: title,
            memo: memo,
            completed: false,
        };

        if(editing){
            TodoDataService.updateTodo(location.state.currentTodo.id, data, props.token)
                .then(response => {
                    setSubmitted(true);
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
            })
        } else {

        TodoDataService.createTodo(data, props.token)
            .then(response => {
                setSubmitted(true);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
        }
    }

    return (
        <Container>
            {submitted ? (
                <div>
                    <h4>You submitted successfully!</h4>
                    <Link to={'/todos'} className="btn btn-success">Back to Todos</Link>
                </div>
            ) : (
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>{editing ? "Edit Todo" : "Add Todo"}</Form.Label>
                        <Form.Control type="text" required placeholder="e.g. buy milk tomorrow" value={title} onChange={onChangeTitle} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Enter memo" value={memo} onChange={onChangeMemo} />
                    </Form.Group>
                    <Button variant="info" onClick={saveTodo}>
                        {editing ? "Edit" : "Create"}
                    </Button>
                </Form>
            )}
        </Container>
    );
}

export default AddTodo;