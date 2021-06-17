import React, { Component } from "react";
import axios from "axios";
import { CardDeck, Card, Button, Modal } from 'react-bootstrap';
import { Redirect } from "react-router-dom";

class Pets extends Component {
    state = {
        pets : [],
        loggedInStatus: false,
        user:null,
        show:null
    }

    componentPet() {
    axios.get(
        "http://localhost:8080/pet"
      )
      .then(response => {
        this.setState({pets:response.data.filter(e => e.client.id === this.state.user.id),status:response.status})
      })
      .catch((error) => {
        console.log("register error", error);
      });

    }

    isLogged(){
      if (!window.$isLoggedIn) {
        return (<Redirect to={this.props.loginPath} />)
      }
    }

    saveStateToLocalStorage(){
        for (let key in this.state){
            localStorage.setItem(key,JSON.stringify(this.state[key]))
        }
    }

    reloadState(){
        for (let key in this.state){
            this.state[key]= JSON.parse(localStorage.getItem(key))
        }
        console.log('Reload')
        console.log('Props: ' + this.props.loggedInStatus)
        console.log('State: ' + this.state.loggedInStatus)
        console.log('Local: ' + localStorage.getItem("loggedInStatus"))
        console.log(this.state.pets)
    }

    componentDidMount(){
        this.reloadState()
        this.isLogged()
        this.componentPet()
        window.addEventListener(
            "beforeunload",
            this.saveStateToLocalStorage.bind(this)
          );
    }

    componentWillUnmount(){
        window.removeEventListener(
            "beforeunload",
            this.saveStateToLocalStorage.bind(this)
          );

        this.saveStateToLocalStorage();
    }

    deletePet(id){
        console.log(id)
        axios.delete(
            "http://localhost:8080/pet/"+id
          )
          .then(response => {
            console.log('Deletas')
            console.log(response)
            window.location.reload()
            
          })
          .catch(error => {
            console.log("register error", error);
          });
        
    }


    handleClose(){ this.setState({show:false});}
    handleShow(){ this.setState({show:true});}


    putNewPet(e){
        console.log('Inicio Cadastro')
        console.log(e)
        this.handleClose();
    }

    render() {

        console.log('Pessoa')
        console.log(this.props.User)
        return (<div>
            
            <CardDeck>
                {this.state.pets.map(pet => 
                <Card>
                    <Card.Title>Pet Name: {pet.name}</Card.Title>
                    <Card.Title>ID: {pet.id}</Card.Title>
                    <Card.Title>Pet Specie: {pet.species}</Card.Title>
                    <Button onClick={this.deletePet.bind(this,pet.id)}>Delete</Button>
                </Card>)
                }
            </CardDeck>
            <Button variant="primary" onClick={this.handleShow.bind(this)}>
        Cadastrar Novo Pet
      </Button>

      <Modal show={this.state.show} onHide={this.handleClose.bind(this)}>
        <Modal.Header closeButton>
          <Modal.Title>Cadastro de Novo Pet</Modal.Title>
        </Modal.Header>
        <Modal.Body>


        </Modal.Body>

      </Modal>
        </div>
        )
    }
}

export default Pets;
