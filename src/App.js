import './App.css';
import axios from "axios";
import React, {useState, useEffect} from "react";

const UserLogin = () => {
  const fetchUserLogin = () => {
    axios.get("http://localhost:8080/client/").then(res =>{
      console.log(res);
    });
  }
  useEffect ( () =>{
fetchUserLogin();
  }, [] );
return <h1> oieee</h1>

};

function App() {
  return (
    <div className="App">
    <UserLogin></UserLogin>


      {/* <header className="App-header">
        <h1>Tela de Login da shay deu certo? ebaaa</h1>
      </header> */}
    </div>
  );
}

export default App;
