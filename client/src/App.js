import './App.css';
import {BrowserRouter, Routes,Route,Link } from 'react-router-dom'
import Register from './Register';
import Login from './Login';
import UserContext from './UserContent';
import {useState, useEffect} from 'react';
import axios from 'axios';
import Home from './Home';

function App() {
  const [email, setEmail] = useState('');

  useEffect(() =>{
    axios.get('http://localhost:5000/user',{withCredentials: true})
      .then(response =>{
        setEmail(response.data.email);
      })
  },[])

  function logout(){
    axios.post('http://localhost:5000/logout',{},{withCredentials: true})
      .then(() => setEmail(''));
  }

  return (
<UserContext.Provider value={{email, setEmail}}>
  <BrowserRouter>
    <nav>
      <Link to={'/'}>Home</Link>
      {!email &&(
        <>
          <Link to={'/login'}>Login</Link>
          <Link to={'/reg'}>Register</Link>
        </>
      )}
      {!!email &&(
        <a onClick={e =>{e.preventDefault();logout()}}>Logout</a>
      )}
    </nav>
    <main>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/reg' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
    </Routes>
    </main>
  </BrowserRouter>
</UserContext.Provider>
  );
}

export default App;
