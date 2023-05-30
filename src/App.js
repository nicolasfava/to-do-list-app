import React from "react"
import Todo from "./components/Todo"
import {nanoid} from "nanoid"

export default function App() {
  //creo lo state to-do che interagisce con il localstorage 
  //per controllare se hai valori dello state todo salvati
  const [todos, setTodos] = React.useState(
    JSON.parse(localStorage.getItem("todos"))|| 
   [])

   //salvo lo state todo nel local storage
  React.useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  /*
    creo la funzione che al click del btn genera un to-do
    questo to-do è un'oggetto all'interno dell'arrey 
    state to-do che è provvisto di id univo generato
    con nanoid(), un valoree boolean per controllare 
    se è completato o meno, un valore boolean per controllare
    se è mostrato o meno ed infine un titolo
  */
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


  /*
    funzione filtro che permette di mostrare in base alla scelta dell'utente
    solo i to-do che rispecchiano tale valore, il filtro avviene attraverso
    il controllo del valore isDone
  */
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


  /* 
    funzione che permette al click del checkbox presente nel todo di eliminarlo dalla lista
    la funzione riceve come paramentro l'id del to-do di cui il check-box è stato premuto,
    cicla lo state attraverso il metdo map() e controlla se l'id ricevuto in ingresso è uguale
    all'id di ongi elemento. Se si allora ritorna un oggetto con tutte le caratteristiche 
    dell'oggetto precedente immutate a parte per il valore isDone che lo all'opposto
  */
  function setDone(id) {
      setTodos(oldTodo => oldTodo.map(todo => {
        return todo.id === id ? {
          ...todo,
          isDone: !todo.isDone
        } : todo
      }))
  }


  /*
    fiunzione che riceve come paramentro l'id del to-do interessato e cicla con il metodo filter()
    tutto lo state ritornando solo gli elementi con id differente a quello che riceve 
  */
  function deleteTodo(id) {
    setTodos(oldTodo => oldTodo.filter(todo => todo.id != id))
  }

  //setto una costante che cicla lo state todo e ritorna un component Todo con svariati attributi al suo interno
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
