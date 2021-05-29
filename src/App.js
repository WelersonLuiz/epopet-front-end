import './App.css';
import axios from "axios";
import React, {useState, useEffect} from "react";

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
      <h1>{usersLogin.name}</h1>
      <p>{usersLogin.id}</p>
    </div>
  )
})

}; // fim de UserLogin

function App() {
  return (
    <div className="App">
    <UserLogin></UserLogin>


      {/* <header className="App-header">
        <h1>Tela de Login da shay deu certo? ebaaa</h1>
      </header> */}
    </div>
  );
}// fim de App

export default App;
