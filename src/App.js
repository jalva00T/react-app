import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList'
import { v4 as uuidv4 } from 'uuid'
import './App.css'

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  /* Loading To-Do Items */

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  /* Saving To-Do Items To Local Storage */

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  /* Toggle Checkbox For To-Do Items*/

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  /* Creates To-Do With Unique ID  */

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }]
    })
    todoNameRef.current.value = null
  }

  /* Clear Completed To-Do */

  function handleClearCompleted() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }
  return (
    <>
      <div className='main-main'> 
        <div className='main'>
          <h1 className='header'>TO DO LIST</h1>
          <div className='list-container' >
            <TodoList className='list' todos={todos} toggleTodo={toggleTodo} />
          </div>
          <div className='stuff'>
            <input className='stuff-item' ref={todoNameRef} type="text" />
            <button className='add stuff-item' onClick={handleAddTodo}>Add Todo</button>
            <button className='clear stuff-item' onClick={handleClearCompleted}>Clear Completed</button>
          </div>
          <div className='taskleft' >{todos.filter(todo => !todo.complete).length} tasks left.</div>
        </div>
      </div>
    </>
  )
}

export default App;
