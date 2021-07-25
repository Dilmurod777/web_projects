import {useState, useEffect} from "react";
import axios from 'axios'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import TodoList from "../todo_list/TodoList";

function App() {
  const [todoList, setTodoList] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    axios.get('http://localhost:8000/api/todo')
      .then(res => {
        setTodoList(res.data)
      })
  }, [])

  const addTodoHandler = () => {
    axios.post('http://localhost:8000/api/todo', {
      'title': title,
      'description': description,
    })
      .then(res => console.log(res))
  }

  return (
    <div
      className="App list-group-item d-flex flex-column justify-content-center align-items-center mx-auto p-2"
      style={{
        'width': '400px',
        'backgroundColor': 'white',
        'marginTop': '15px'
      }}
    >
      <h1
        className="card text-white bg-primary mb-1 py-1"
        style={{
          'width': '100%',
          'margin': '0'
        }}
      >
        Task Manager
      </h1>
      <h6
        className="card text-white bg-primary mb-3 py-1"
        style={{
          'width': '100%',
        }}
      >
        FASTAPI - React - MongoDB
      </h6>

      <div className="card-body w-100">
        <h5
          className="card text-white bg-dark mb-3 py-1"
        >Add Your Task</h5>

        <span className="card-text">
            <input
              type="text"
              className="mb-2 form-control titleIn"
              placeholder={'Title'}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              className="mb-2 form-control desIn"
              placeholder={'Description'}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button
              className="btn btn-outline-primary mx-2 mb-3"
              style={{
                'borderRadius': '50px',
                'fontWeight': 'bold',
              }}
              onClick={(e) => {
                e.preventDefault();
                addTodoHandler();
              }}
            >Add Task</button>
          </span>

        <h5 className="card text-white bg-dark mb-3 py-1">Your Tasks</h5>
        <div>
          {todoList.length > 0 && <TodoList todoList={todoList}/>}
          {todoList.length === 0 && <p>No Todos yet.</p>}
        </div>
      </div>

      <h6 className="card text-dark bg-warning py-1 mb-0 w-100">
        Copyright 2021, All rights reserved &copy;
      </h6>
    </div>
  );
}

export default App;
