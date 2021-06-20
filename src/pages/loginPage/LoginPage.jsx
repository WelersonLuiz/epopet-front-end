import React, { Component,useContext } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

import { Link } from "react-router-dom";
import "./LoginPage.css";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Card } from "react-bootstrap";
import logo_login from "../../images/login_image.png";
import {Context} from "../../components/authContext"

const crypto = require('crypto');

// class LoginPage extends Component {
//   constructor(props) {
//     super(props);

//     this.input = {
//       email: "",
//       password: "",
//       loginErrors: "",
//     };
//   }

//   handleLogin = () => {
//     const { email, password } = this.state;

//     axios
//       .get("http://localhost:8080/client/email/" + email)
//       .then((response) => {
//         if (response.data.email === "" || response.data.password === "") {
//           return;
//         }
//         if (response.data.password === password) {
//           // this.props.handleLogin(response.data);
//           this.props.history.push(this.props.dashboardPath);
//         }
//       })
//       .catch((error) => {
//         console.log("Login error", error);
//       });
//   };

//   isLogged(){
//     if (window.$isLoggedIn) {
//       return (<Redirect to={this.props.dashboardPath} />)
//     }
//   }
  
//   handleChange = (e) => {
//     if(e.target.name === 'password'){
//       this.setState({
//         [e.target.name]: crypto.createHash('sha1').update(e.target.value).digest('hex'),
//       });
//     }else{
//     this.setState({
//       [e.target.name]: e.target.value,
//     });}
//   };

//   render() {
//     return (
//       <div className="container">
//         <div>
//           <Link to="/">
//             <div className="container_login_imagem">
//               {/* <div className='container_login_imagem_img'></div> */}
//               <Card.Img
//                 src={logo_login}
//                 style={{ maxWidth: "95%", maxHeight: "95%", margin: "2.5%" }}
//               ></Card.Img>
//             </div>
//           </Link>
//           <div className="container_login_form">
//             <div className="container_login_form_welcome">
//               <h3>Bem vindo</h3>
//             </div>
//             <Form className="container_login_form_preenche">
//               <Form.Label>Conecte sua conta</Form.Label>
//               <Form.Group>
//                 <Form.Group controlId="formBasicEmail">
//                   <Form.Control
//                     type="email"
//                     name="email"
//                     placeholder="Email"
//                     onChange={this.handleChange}
//                     required
//                   />
//                 </Form.Group>

//                 <Form.Group controlId="formBasicPassword">
//                   <Form.Control
//                     type="password"
//                     name="password"
//                     placeholder="Password"
//                     onChange={this.handleChange}
//                     required
//                   />
//                 </Form.Group>

//                 <Form.Group controlId="formBasicButton">
//                   <Button onClick={this.handleLogin} className="botao_login">
//                     Login
//                   </Button>
//                 </Form.Group>

//                 <Link to="/registration" className="criar_conta">
//                   Criar sua conta
//                 </Link>

//                 <Link to="/registration" className="esqueceu_senha">
//                   Esqueceu sua senha?
//                 </Link>
//               </Form.Group>
//             </Form>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

function LoginPage(props){
  const {authenticated,handleLogin,user} = useContext(Context)

  if(authenticated){
        return (<Redirect {...props} to={props.dashboardPath}/>)
  }

  console.debug('Login',authenticated)
  console.debug('token',localStorage.getItem('token'))
  console.debug('user',user)
  var input = {
    email : '',
    password : ''
  }
  function handleChange(e){
    e.preventDefault()
    if(e.target.name === 'password'){
      input[e.target.name]= crypto.createHash('sha1').update(e.target.value).digest('hex')
    }else{
    input[e.target.name]= e.target.value
  }
}
  async function handleFormCompleted(){

    await handleLogin(input);
    console.debug("No botão",authenticated)
    if(authenticated){
      console.log('Aqui')
      console.log(props.dashboardPath)
      return <Redirect to={props.dashboardPath} />
    }else{
      return
    }
  }


  return (
          <div className="container">
            <div>
              <Link to="/">
                <div className="container_login_imagem">
                  {/* <div className='container_login_imagem_img'></div> */}
                  <Card.Img
                    src={logo_login}
                    style={{ maxWidth: "95%", maxHeight: "95%", margin: "2.5%" }}
                  ></Card.Img>
                </div>
              </Link>
              <div className="container_login_form">
                <div className="container_login_form_welcome">
                  <h3>Bem vindo</h3>
                </div>
                <Form className="container_login_form_preenche">
                  <Form.Label>Conecte sua conta</Form.Label>
                  <Form.Group>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
    
                    <Form.Group controlId="formBasicPassword">
                      <Form.Control
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
    
                    <Form.Group controlId="formBasicButton">
                      <Button type="button" className="botao_login" onClick={handleFormCompleted.bind(this)}>
                        Login
                      </Button>
                    </Form.Group>
    
                    <Link to="/registration" className="criar_conta">
                      Criar sua conta
                    </Link>
    
                    <Link to="/registration" className="esqueceu_senha">
                      Esqueceu sua senha?
                    </Link>
                  </Form.Group>
                </Form>
              </div>
            </div>
          </div>
        );
}

export default LoginPage;