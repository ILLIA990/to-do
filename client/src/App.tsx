import './App.css'
import {Button, Card, Form, InputGroup, ListGroup, ListGroupItem} from "react-bootstrap";
import {useState} from "react";

function TodoList(props: { todos: string[] }) {
    return (<>
        <ListGroup>
            {props.todos.map(x => <ListGroupItem>{x}</ListGroupItem>)}
        </ListGroup>
    </>)
}

function App() {
    const [todos, setTodos] = useState<string[]>([])
    const [input, setInput] = useState("")

    function updateState() {
        getTodos().then(x => setTodos(x))
    }

    return (<>
        <Card>
            <InputGroup className="mb-3">
                <Form.Control onChange={x => setInput(x.target.value)} placeholder="What do you think?"/>
                <Button onClick={async () => {
                    await newTodo(input);
                    updateState()
                }} variant="success">Add Note</Button>
            </InputGroup>
            <TodoList todos={todos}/>
        </Card>
    </>)
}

async function newTodo(note: string) {
    await fetch("http://localhost:3000/note", {
        method: "POST", body: JSON.stringify({note})
    })
}

async function getTodos() {
    const response = await fetch("http://localhost:3000/notes", {method: "GET"})
    const {notes} = await response.json() as { notes: string[] }
    return notes
}


export default App
