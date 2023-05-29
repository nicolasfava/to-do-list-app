import React from "react"
import Todo from "./components/Todo"
import {nanoid} from "nanoid"

export default function App() {

  const [todos, setTodos] = React.useState([])

  function todoGenerator(event) {
    event.preventDefault()
    setTodos(oldTodo => [...oldTodo, {
        id: nanoid(),
        isDone: false,
        isShown: true,
        title: event.target.title.value
    }])
    console.log(event.target.title.value)
  }

  function filter(event) {
    const {name} = event.target
    if (name === "all") {
      setTodos(oldTodo => oldTodo.map(todo => {
        return {
          ...todo,
          isShown: true
        }
      }))
    }
    else if (name === "done") {
      setTodos(oldTodo => oldTodo.map(todo => {
        return todo.isDone ? {
          ...todo,
          isShown: true
        } : {
          ...todo,
          isShown: false
        }
      }))
    }
    else if (name === "todo") {
      setTodos(oldTodo => oldTodo.map(todo => {
        return todo.isDone ? {
          ...todo,
          isShown: false
        } : {
          ...todo,
          isShown: true
        }
      }))
    }
  }

  function setDone(id) {
      setTodos(oldTodo => oldTodo.map(todo => {
        return todo.id === id ? {
          ...todo,
          isDone: !todo.isDone
        } : todo
      }))
  }

  function deleteTodo(id) {
    setTodos(oldTodo => oldTodo.filter(todo => todo.id != id))
  }

  console.log(todos)
  const element = todos.map(todo => <Todo key={todo.id} id={todo.id} value={todo.title} isDone={todo.isDone} isShown={todo.isShown} setDone={() => setDone(todo.id)} delete={() => deleteTodo(todo.id)}/>)

  return(
    <div>
      <header className="todo-input">
            <h2>TO-DO input</h2>
            <form className="todo-form" onSubmit={todoGenerator}>
                <input type="text" className="todo-title" placeholder="New to-do" name="title"/>
                <button className="todo-btn">Add new task</button>
            </form>
            <h2>
                TO-DO list
            </h2>
            <div className="todo-filter">
                <button name="all" onClick={filter}>All</button>
                <button name="done" onClick={filter}>Done</button>
                <button name="todo" onClick={filter}>To-do</button>
            </div>
      </header>
      <main className="todo-container">
        {element}
      </main>
      
    </div>
  )
}
