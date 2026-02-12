
import { useState } from "react";
export default function App() {
  const [todo , setTodo] = useState("") ;  
  function todos(todoooo) { 
    todoooo.preventDefault() ; 
const value  = todoooo.target.title.value;  
  setTodo(value)
  }
  return (
  <div>
    <h1>Todos</h1> 
    <form action="submit" onSubmit={todos}>
      <input type="text" name="title" placeholder="Enter Your todo: "/> 
      <button type="submit">submit button</button>
    </form>
<div>
  <button onClick={test}>hello</button>
  <h1>My Todo List</h1> 
 <p>{todo}</p>
</div>
  </div>

  )
} 




