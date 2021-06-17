import React, { Component } from "react";
import { Form, Modal,Button } from "react-bootstrap";
import axios from "axios";
const crypto = require('crypto');

class Registration extends Component {
  
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

    if (!this.validEmail(e.target.value)){
      console.log('Email Invalido')
    }else{

      axios.get(
        "http://localhost:8080/client"
      )
      .then(response => {
    
        var existe = 0
        response.data.map(client => {
          if (client.email === e.target.value){
            existe += 1
          }else{

          }
        }
        )
        if (existe !== 0){
          this.setState({error:{show:this.state.error.show,message:'Email já está sendo usado.'}})
          this.handleShow()
        }else{
          this.setState ({email:e.target.value})
          console.log(this.state.email)
        }
      })
      .catch(error => {
        console.log("register error", error);
        this.setState({error:{show:this.state.error.show,message:'Ocorreu um erro.'}})
        this.handleShow()
  
      });

    }

    
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
    if(this.state.senha !== this.state.senha1){
      await this.setState({error:{show:this.state.error.show,message:'Confirmação de senha não confere com a senha'}})
      this.handleShow()
    }

    let body = {
      name:this.state.name,
      email:this.state.email,
      password:this.state.senha,
      cpf:this.state.cpf,


    }
    axios.post(
      "http://localhost:8080/client", body
    )

  }
  render() {
    return (
      <div>
        {this.renderAlert(this.state.error)}
        <Form style={{position:'relative',maxHeight:'50%',maxWidth:'50%'}} >
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Nome:</Form.Label>
            <Form.Control name='name' type="string" placeholder="Coloque seu nome aqui" required onChange={this.checkName} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCPF">
            <Form.Label>CPF:</Form.Label>
            <Form.Control name='cpf' type="string" placeholder="Coloque seu CPF aqui" required onChange={this.checkCPF.bind(this)}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicDateofBirth">
            <Form.Label>Data de Nascimento:</Form.Label>
            <Form.Control name='cpf' type="date" required onChange={this.checkDateBirth.bind(this)}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCEP" >
            <Form.Label>CEP:</Form.Label>
            <Form.Control name='cep' type="string" placeholder="Coloque seu CEP" required onChange={this.getDetailAdress.bind(this)} />
          </Form.Group>
          <Form.Group className="mb-3"  controlId="formBasicUF" onChange={this.setAddress.bind(this)}>
            <Form.Label>Estado:</Form.Label>
            <Form.Control name='state' defaultValue={this.state.address.state} type="string" required onChange={this.setAddress.bind(this)}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCidade">
            <Form.Label>Cidade:</Form.Label>
            <Form.Control name='city' defaultValue={this.state.address.city}type="string" required onChange={this.setAddress.bind(this)}/>
          </Form.Group>
          <Form.Group className="mb-3"  controlId="formBasicBairro">
            <Form.Label>Bairro:</Form.Label>
            <Form.Control name='district' defaultValue={this.state.address.district}type="string" required onChange={this.setAddress.bind(this)}/>
          </Form.Group>
          <Form.Group className="mb-3"  controlId="formBasicEndereco">
            <Form.Label>Endereco:</Form.Label>
            <Form.Control name='address' defaultValue={this.state.address.address} type="string" required onChange={this.setAddress.bind(this)}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicNumero">
            <Form.Label>Numero:</Form.Label>
            <Form.Control name='numero' type="string" placeholder="Coloque o número da sua residência" requiredonChange={this.setAddress.bind(this)}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control name='email' type="email" placeholder="Coloque seu email" required onChange={this.checkEmail.bind(this)}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Senha:</Form.Label>
            <Form.Control name='password' type="password" placeholder="Coloque a senha" required onChange={this.setPassword.bind(this)}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPasswordConf">
            <Form.Label>Confirmação de senha:</Form.Label>
            <Form.Control name='password1' type="password" placeholder="Coloque a senha novamente" required onChange={this.setPassword.bind(this)}/>
          </Form.Group>
          <Button variant="primary" type='subimit' onClick={this.handleFormCompleted.bind(this)}>Submit</Button>

        </Form>
      </div>
    );
  }
}

export default Registration;