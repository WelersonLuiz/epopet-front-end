import './App.css';
import axios from "axios";
import React, {useState, useEffect} from "react";
import Login from './pages/Login';


const UserLogin = () => {
  const [userLogin, setUserLogin] = useState([]);
  const fetchUserLogin = () => {
    axios.get("http://localhost:8080/client/").then(res =>{
      console.log(res);
     // const data = res.data;
      setUserLogin(res.data);
    });
  } //fim de fetchUserLogin

  useEffect ( () =>{
fetchUserLogin();
  }, [] );
return userLogin.map((usersLogin, index) => {
  return (
    <div key ={index}>
      {/* <h1>Username: {usersLogin.name}</h1>
      <p>id: {usersLogin.id}</p>
      <p>CPF: {usersLogin.cpf}</p> */}
    </div>
  )
})
}; // fim de useEffect

function App() {
  return (
    <div className="App">
    <UserLogin></UserLogin>
<Login/>

      {/* <header className="App-header">
        <h1>Tela de Login da shay deu certo? ebaaa</h1>
      </header> */}
    </div>
  );
}// fim de App

export default App;
