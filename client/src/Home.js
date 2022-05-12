import axios from "axios";
import { useContext, useEffect, useState } from "react";
import UserContext from "./UserContent";

function Home(){

    const userInfo = useContext(UserContext);
    const[inputVal, setInputVal] = useState('');
    const [todos, setTodos] = useState([]);
    
    useEffect(() => {
        axios.get('http://localhost:5000/todos', {withCredentials: true})
            .then(response => {
                setTodos(response.data);
            })
    }, [])

    if(!userInfo.email) {
        return 'Добро пожаловать в Todo app :) \n Зарегистрируйтесь или войдите в аккаунт. ';
    }

    function addTodo(e) {
        e.preventDefault();
        axios.put('http://localhost:5000/todos', 
        {
            text : inputVal
        }, {withCredentials: true})
            .then(response => {
                setTodos([...todos, response.data]);
                setInputVal('');
            })
        }

    function deleteTodo(todo) {
        const data = {id: todo._id , done :!todo.done}
        axios.post('http://localhost:5000/todos', data, {withCredentials: true})
            .then(() => {
                const newTodos = todos.map(t => {
                    if(t._id === todo._id) {
                        t.done = !t.done;
                    }
                    return t
                })
                setTodos([...newTodos]);
            })
        }
    return ( <div>
    <form onSubmit={e => addTodo(e)}>
        <input placeholder={'What do you want to do?'} 
        value={inputVal} 
        onChange={e => setInputVal(e.target.value)}/>
    </form>
        <ul>

        {todos.map(todo =>(
            <li>
                <input type = {'checkbox'}
                 checked = {todo.done}
                 onClick= {() => deleteTodo(todo)} 
                 />
                {todo.done ? <del>{todo.text}</del> : todo.text}
            </li>
            ))}
        </ul>
    </div>
    )
}

export default Home;