import React, {useState, useEffect }  from 'react';
import './App.css';

interface Todo {
  text: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setinputValue] = useState<string>('');

const  handleInputChange  = (e: React.ChangeEvent<HTMLInputElement>) => {
  setinputValue(e.target.value);
}

useEffect(() =>{
  const storedTodos = localStorage.getItem("todo");
  if (storedTodos) {
    setTodos(JSON.parse(storedTodos));
  }
}, [])

useEffect(() => {
  localStorage.setItem("todo", JSON.stringify(todos));
}, [todos]);

const handleAddTodo = () => {
  if (inputValue.trim() === '') return;
  const newTodo: Todo = { text: inputValue.trim(), completed: false};
  setTodos([...todos, newTodo]);
  setinputValue('')
}

const handleDeleteTodo = (index: number) => {
  const newTodos = todos.filter((_, i) => i !== index);
  setTodos(newTodos);
}

const handleToggleComplete = (index: number) => {
  const newTodos = [...todos];
  newTodos[index].completed = !newTodos[index].completed;
  setTodos(newTodos);
}

  return (
    <div className="container">
      <h1 className="title">투두리스트</h1>
      <div className="input-area">
        <input 
          value = {inputValue}
          onChange={handleInputChange}
          onKeyDown={(e) => e.key === "Enter" && handleAddTodo()}
          className="input" 
          type='text' 
          placeholder='할 일을 입력해주세요.'
        />
        <button className="button" onClick={handleAddTodo}>추가</button>
      </div>
      
        <ul className="todo-list">
          {todos.map((todo, index) => (
            <li key={index} className='todo-item'>
              <input type="checkbox" 
              checked={todo.completed} 
              onChange={() => handleToggleComplete(index)} 
              />
              <span style={{textDecoration: todo.completed ? "line-through" : "none"}}>
                {todo.text}
              </span>
              <button className="button" onClick={() => handleDeleteTodo(index)}>삭제</button>
            </li>
          ))}
        </ul>
    </div>
  );
}

export default App;
