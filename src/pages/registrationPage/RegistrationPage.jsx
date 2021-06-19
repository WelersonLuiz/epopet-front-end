import React, { Component } from "react";
import { Form, Modal,Button } from "react-bootstrap";
import axios from "axios";
import "./RegistrationPage.css";
const crypto = require('crypto');

class RegistrationPage extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      name:'',
      cpf:'',
      cep:'',
      address: {state:'',
                city:'',
                district:'',
                address:'',
                numero:null,
                status:false},
      email:'',
      senha:'',
      senha1:'',
      error: {show:false,message:null},
      sucess: {show:false,message:null},
    };
    
  }

  validarCPF(nr_cpf) {	
    var cpf = nr_cpf.replace(/[^\d]+/g,'');	
    if(cpf === '') return false;	
    // Elimina CPFs invalidos conhecidos	
    if (cpf.length !== 11 || 
      cpf === "00000000000" || 
      cpf === "11111111111" || 
      cpf === "22222222222" || 
      cpf === "33333333333" || 
      cpf === "44444444444" || 
      cpf === "55555555555" || 
      cpf === "66666666666" || 
      cpf === "77777777777" || 
      cpf === "88888888888" || 
      cpf === "99999999999")
        return false;		
    // Valida 1o digito	
    var add = 0;	
    for (var i=0; i < 9; i ++)		
      add += parseInt(cpf.charAt(i)) * (10 - i);	
      var rev = 11 - (add % 11);	
      if (rev === 10 || rev === 11)		
        rev = 0;	
      if (rev !== parseInt(cpf.charAt(9)))		
        return false;		
    // Valida 2o digito	
    add = 0;	
    for (i = 0; i < 10; i ++)		
      add += parseInt(cpf.charAt(i)) * (11 - i);	
    rev = 11 - (add % 11);	
    if (rev == 10 || rev == 11)	
      rev = 0;	
    if (rev != parseInt(cpf.charAt(10)))
      return false;		
    return true;   
  }

  checkName = (e) => {
    this.setState({[e.target.name]:e.target.value})
  }
  async handleClose(){
    await this.setState({error:{show:false,message:null}})
    console.log(this.state.error)
  }

  async handleShow(){
    await this.setState({error:{show:true,message:this.state.error.message}})
    console.log(this.state.error)
  }

  async checkCPF (e) {
    e.preventDefault()
    if (e.target.value.length != 11){
    }else{
      if(this.validarCPF(e.target.value) === false){
        console.log('CPF Invalido')
        await this.setState({error:{show:this.state.error.show,message:'CPF Invalido'}})
        console.log('State now:')
        console.log(this.state.error)
        this.handleShow()
      }else{
        console.log('CPF Valido')
        this.setState({cpf:e.target.value})
      }
    }
  }




  renderAlert(message){

    if(message.message === null) return null
    return (
      <div>
        <Modal show={message.show} onHide={this.handleClose.bind(this)} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Erro</Modal.Title>
          </Modal.Header>
          <Modal.Body>{message.message}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose.bind(this)}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }

  renderSucesso(message){

    if(message.message === null) return null
    return (
      <div>
        <Modal show={message.show} onHide={this.handleClose.bind(this)} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Sucesso</Modal.Title>
          </Modal.Header>
          <Modal.Body>{message.message}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.history.push('/login')}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }

  async getDetailAdress(e){
    console.log(this.state.address.status)

    if (!/[0-9]{5}-[0-9]{3}/.test(e.target.value) & !this.state.address.status){
      console.log('Não fez a busca')
    }else{
    axios.get(
      //"https://ws.apicep.com/cep.json?code=" + e.target.value
      "https://viacep.com.br/ws/"+e.target.value.replace('-','')+"/json/"
    )
    .then(response => {
      console.log('Fez a busca')
      if (response.status !== 200){
        this.setState({error:{show:this.state.error.show,message:'Ocorreu um erro durante a busca do CEP'}})
        this.handleShow()
      }
      var pseudoState = {
        state:response.data.uf,
        city:response.data.localidade,
        district:response.data.bairro,
        address:response.data.logradouro,
        numero:this.state.address.numero,
        status:true
      }   
      this.setState({address:pseudoState}) 
      console.log(this.state.address)
    })
    .catch(error => {
      console.log("register error", error);
      this.setState({error:{show:this.state.error.show,message:'Ocorreu um erro.'}})
      this.handleShow()

    });
    }
  }

  setAddress(e){
    this.state.address[e.target.name]=e.target.value
    console.log(this.state.address)
  }

  validEmail = (e) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(e)

  }

  async checkEmail(e){
    let emailValido = false

    console.log('Inicio validacao email')
    if (!this.validEmail(e.value)){
      console.log('Email Invalido')
    }else{
      console.log('Email Válido')
      await axios.get(
        "http://localhost:8080/client/email/"+e.value
      )
      .then(response => {
        console.log("Retorno: ")
        console.log(response.data)
    
        this.setState({error:{show:this.state.error.show,message:'Email já está sendo usado.'}})
        this.handleShow()
        emailValido = false
      })
      .catch(error => {
        if (error.response.data.errorCode === 1){
          this.state['email'] = e.value
          console.log('Email a ser cadastrado: ')
          console.log(this.state.email)
          emailValido = true
        }else{
          console.log("register error", error);
          this.setState({error:{show:this.state.error.show,message:'Ocorreu um erro.'}})
          this.handleShow()
          emailValido = false
      }
  
      });

    }

  return emailValido;
    
  }

  checkDateBirth = (e) => {
    console.log('aqui')
    console.log(e.target.value)
  }

  async setPassword(e){
    var hashPwd = crypto.createHash('sha1').update(e.target.value).digest('hex');
  
    if(e.target.name==='password'){
      await this.setState({senha:hashPwd})
    }
    if(e.target.name==='password1'){
      await this.setState({senha1:hashPwd})
    }
    console.log(this.state.senha)
    console.log(this.state.senha1)
  
  }


  async handleFormCompleted (e) {
    e.preventDefault();
    console.log('Chama validador de email')
    var emailValida = await this.checkEmail(e.target[10])
    console.log(emailValida)
    if (!emailValida){

    }else{
    console.log('Validacao Finalizada')
    if(this.state.senha !== this.state.senha1){
      await this.setState({error:{show:this.state.error.show,message:'Confirmação de senha não confere com a senha'}})
      this.handleShow()
    }else{

    let body = {
      name:this.state.name,
      email:this.state.email,
      password:this.state.senha,
      cpf:this.state.cpf,
    }
    console.log("Call State",this.state)
    console.log("Call with ", body);
    axios.post(
      "http://localhost:8080/client",
      body
    )
    .then(response => {
      console.log("register response", response);
      if (response.status === 200) {
        this.setState({error:{show:this.state.error.show,message:'Cadastro realizado com sucesso'}})
        this.handleShow()
        // this.props.history.push("/login");
        console.log(response.data)
        console.log('Cadastro realizado com sucesso')
      }
    })
    .catch(error => {
      console.log("register error", error);
      this.setState({error:{show:this.state.error.show,message:'Ocorreu um erro.'}})
      this.handleShow()
    });
  }
  }
  }
  render() {
    return (
      <div>
        {this.renderAlert(this.state.error)}
        {this.renderSucesso(this.state.sucess)}
        <div className='formdiv'>
          <Form className="form" onSubmit={this.handleFormCompleted.bind(this)}>
            <div>
              <Form.Group className="name" controlId="formBasicName">
                <Form.Label>Nome:</Form.Label>
                <Form.Control name='name' type="string" placeholder="Coloque seu nome aqui" required onChange={this.checkName} />
              </Form.Group>
              <Form.Group className="cpf" controlId="formBasicCPF">
                <Form.Label>CPF:</Form.Label>
                <Form.Control name='cpf' type="string" placeholder="Coloque seu CPF aqui" required onChange={this.checkCPF.bind(this)}/>
              </Form.Group>
              <Form.Group className="sexo" controlId="formBasicSexo">
                <Form.Label>Sexo:</Form.Label>
                <Form.Control name='sexo' as="select" placeholder="Sexo">
                  <option value='Masculino'>Masculino</option>
                  <option value='Feminino'>Feminino</option>
                </Form.Control>
              </Form.Group>

            </div>
            <div>
              <Form.Group className="databirth" controlId="formBasicDateofBirth">
                <Form.Label>Data de Nascimento:</Form.Label>
                <Form.Control name='databirth' type="date" required onChange={this.checkDateBirth.bind(this)}/>
              </Form.Group>
              <Form.Group className="cep" controlId="formBasicCEP" >
                <Form.Label>CEP:</Form.Label>
                <Form.Control name='cep' type="string" placeholder="Coloque seu CEP" required onChange={this.getDetailAdress.bind(this)} />
              </Form.Group>
              <Form.Group className="state"  controlId="formBasicUF" onChange={this.setAddress.bind(this)}>
                <Form.Label>Estado:</Form.Label>
                <Form.Control name='state' defaultValue={this.state.address.state} type="string" placeholder="Ex: SP" required onChange={this.setAddress.bind(this)}/>
              </Form.Group>
              <Form.Group className="city" controlId="formBasicCidade">
                <Form.Label>Cidade:</Form.Label>
                <Form.Control name='city' defaultValue={this.state.address.city}type="string" placeholder="Ex: São Paulo" required onChange={this.setAddress.bind(this)}/>
              </Form.Group>
            </div>
            <div>
              <Form.Group className="bairro"  controlId="formBasicBairro">
                <Form.Label>Bairro:</Form.Label>
                <Form.Control name='district' defaultValue={this.state.address.district}type="string" placeholder="Ex: Bom Retiro" required onChange={this.setAddress.bind(this)}/>
              </Form.Group>
              <Form.Group className="address"  controlId="formBasicEndereco">
                <Form.Label>Endereco:</Form.Label>
                <Form.Control name='address' defaultValue={this.state.address.address} type="string" placeholder="Ex: Avenida Tiradentes" required onChange={this.setAddress.bind(this)}/>
              </Form.Group>
              <Form.Group className="numero" controlId="formBasicNumero">
                <Form.Label>Numero:</Form.Label>
                <Form.Control name='numero' type="string" placeholder="Ex: 21" required onChange={this.setAddress.bind(this)}/>
              </Form.Group>
            </div>
            <div>
              <Form.Group className="email" controlId="formBasicEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control name='email' type="email" placeholder="Coloque seu email" required/>
              </Form.Group>
              <Form.Group className="password" controlId="formBasicPassword">
                <Form.Label>Senha:</Form.Label>
                <Form.Control name='password' type="password" placeholder="Coloque a senha" required onChange={this.setPassword.bind(this)}/>
              </Form.Group>
              <Form.Group className="password1" controlId="formBasicPasswordConf">
                <Form.Label>Confirmação de senha:</Form.Label>
                <Form.Control name='password1' type="password" placeholder="Coloque a senha novamente" required onChange={this.setPassword.bind(this)}/>
              </Form.Group>
            </div>
            <Button variant="primary" type='submit'>Submit</Button>

          </Form>
        </div>
      </div>
    );
  }
}

export default RegistrationPage;