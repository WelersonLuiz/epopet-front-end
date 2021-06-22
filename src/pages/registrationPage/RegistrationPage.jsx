import React, { Component } from "react";
import InputMask from "react-input-mask";
import { Form, Modal, Button } from "react-bootstrap";
import axios from "axios";
import "./RegistrationPage.css";

const crypto = require("crypto");

class RegistrationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        name: "",
        cpf: "",
        cep: "",
        dateOfBirth: "",
        address: {
          state: "",
          city: "",
          district: "",
          address: "",
          numero: null,
          status: false,
        },
        email: "",
        password: "",
        passwordConfirmation: "",
      },
      alert: { status: null, show: false, message: null },
      validation: {
        email: false,
        cpf: false,
        dateOfBirth: false,
      },
    };
  }

  renderAlert(message) {
    if (message.message === null) return null;
    return (
      <div>
        <Modal
          show={message.show}
          onHide={this.handleClose.bind(this)}
          animation={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>{message.status}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{message.message}</Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={this.handleClose.bind(this, message.status)}
            >
              OK
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }

  handleClose(e) {
    if (e === "Erro") {
      this.setState({ alert: { status: "Erro", show: false, message: null } });
    } else {
      this.props.history.push("/login");
    }
  }

  handleShow() {
    this.setState({
      alert: { status: "Erro", show: true, message: this.state.alert.message },
    });
  }

  handleShowSucess() {
    this.setState({
      alert: {
        status: "Sucesso",
        show: true,
        message: this.state.alert.message,
      },
    });
  }
  
  async validateCpf() {
    var isValid = false;
    var cpfValue = this.state.data.cpf
  
    if (!this.validateCpfFormat(cpfValue)) {
      await this.setState({
        alert: {
          status: this.state.alert.status,
          show: this.state.alert.show,
          message: "CPF Invalido",
        },
      });
      this.handleShow();
    } else {
      await axios
        .get("http://localhost:8080/client/cpf/" + cpfValue)
        .then(() => {
          this.setState({
            alert: {
              status: this.state.alert.status,
              show: this.state.alert.show,
              message: "Já temos uma conta com esse CPF.",
            },
          });
          this.handleShow();
        })
        .catch((error) => {
          if (error.response.data.errorCode === 1) {
            isValid = true;
          } else {
            this.setState({
              alert: {
                status: this.state.alert.status,
                show: this.state.alert.show,
                message: "Ocorreu um erro CPF.",
              },
            });
            this.handleShow();
          }
        });
        
    }

    console.log("CPF isValid ", isValid);
    return isValid;
  }

  validateCpfFormat(nr_cpf) {
    var cpf = nr_cpf.replace(/[^\d]+/g, "");
    if (cpf === "") return false;
    // Elimina CPFs invalidos conhecidos
    if (
      cpf.length !== 11 ||
      cpf === "00000000000" ||
      cpf === "11111111111" ||
      cpf === "22222222222" ||
      cpf === "33333333333" ||
      cpf === "44444444444" ||
      cpf === "55555555555" ||
      cpf === "66666666666" ||
      cpf === "77777777777" ||
      cpf === "88888888888" ||
      cpf === "99999999999"
    )
      return false;
    // Valida 1o digito
    var add = 0;
    for (var i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
    var rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) rev = 0;
    if (rev !== parseInt(cpf.charAt(9))) return false;
    // Valida 2o digito
    add = 0;
    for (i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) rev = 0;
    if (rev !== parseInt(cpf.charAt(10))) return false;
    return true;
  }

  async validateEmail() {
    var isValid = false;
    var emailValue = this.state.data.email;
    var emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!emailPattern.test(emailValue)) {
      return
    } else {
      await axios
        .get("http://localhost:8080/client/email/" + emailValue)
        .then((response) => {
          this.setState({
            alert: {
              status: this.state.alert.status,
              show: this.state.alert.show,
              message: "Email já está sendo usado.",
            },
          });
          this.handleShow();
          isValid = false;
        })
        .catch((error) => {
          if (error.response.data.errorCode === 1) {
            isValid = true;
          } else {
            this.setState({
              alert: {
                status: this.state.alert.status,
                show: this.state.alert.show,
                message: "Ocorreu um erro Email.",
              },
            });
            this.handleShow();
            isValid = false;
          }
        });
    }

    console.log("Email isValid ", isValid);
    return isValid;
  }

  validateDateOfBirth() {
    const SegundosNoAno = 31557600;
    var isValid = false;
    var dateOfBirthValue = this.state.data.dateOfBirth;
    console.log("Validating dateOfBirth ", dateOfBirthValue);
    var partDate = dateOfBirthValue.split("-");
    var dateOfBirth = new Date(partDate[0], partDate[1] - 1, partDate[2]);
    var today = new Date();
    var secondsSinceBirth = Math.floor((today - dateOfBirth) / 1000);
    
    if (secondsSinceBirth / SegundosNoAno < 18) {
      this.setState({
        alert: {
          status: this.state.alert.status,
          show: this.state.alert.show,
          message:
            "Para realizar um cadastro no na E-Popet você deve ser maior de 18 anos.",
        },
      });
      this.handleShow();
    } else {
      isValid = true;
    }
    
    console.log("DateOfBirth isValid ", isValid);
    return isValid;
  }
  
  validatePasswords(){
    console.log("Password Validation ", this.state.data.password);
    console.log("Password Validation Conf ", this.state.data.passwordConfirmation);
    var isValid = false;
    if (this.state.password != this.state.passwordConfirmation) {
      this.setState({
        alert: {
          status: this.state.alert.status,
          show: this.state.alert.show,
          message: "Confirmação de senha não confere com a senha",
        },
      });
      this.handleShow();
    } else {
      isValid = true;
    }
    
    console.log("Password is Valid ", isValid);
    return isValid;
  }

  async validateFields() {
    return (
      await this.validateCpf() && 
      await this.validateEmail() && 
      this.validateDateOfBirth() &&
      this.validatePasswords()
    );
  }
  
  async handleSubmitForm2() {
    if (!await this.validateFields()) {
      return
    } else {
      console.log("Creating user: ", this.state.data);
      this.state.data.address = JSON.stringify(this.state.data.address)
      await axios
        .post("http://localhost:8080/client/", this.state.data)
        .then((response) => {
          if (response.status === 200) {
            this.setState({
              alert:{
                status:this.state.alert.status,
                show:this.state.alert.show,message:'Cadastro realizado com sucesso'
              }
            })
            this.handleShowSucess()
          }
        })
        .catch((error) => {
          console.log("Error: ", error);
          this.setState({
            alert: {
              status: this.state.alert.status,
              show: this.state.alert.show,
              message: "Ocorreu um erro Submit.",
            },
          });
          this.handleShow();
        });
    }
  }
  
  handleSubmitForm(){
    console.log('VSF!')
  }
  
  componentDidMount() {
    document.body.style.backgroundColor = "#bdf2ed";
  }
  
  handleInputChangeCep = (e) => {
    var cepValue = e.target.value;
    var cepPattern = /[0-9]{5}-[0-9]{3}/;
    
    if (!cepPattern.test(cepValue)) {
      return;
    } else {
      cepValue.replace("-", "");
      this.state.data[e.target.name] = cepValue;
      axios
        .get("https://viacep.com.br/ws/" + cepValue + "/json/")
        .then((response) => {
          if (response.status !== 200) {
            this.setState({
              alert: {
                status: this.state.alert.status,
                show: this.state.alert.show,
                message: "Ocorreu um erro durante a busca do CEP",
              },
            });
            this.handleShow();
          }
          
          var newState = Object.assign(this.state.data, {
            address: {
              state: response.data.uf,
              city: response.data.localidade,
              district: response.data.bairro,
              address: response.data.logradouro,
              status: true,
            }
          })
          this.setState({newState});
        })
        .catch((error) => {
          console.log("Erro ", error)
          this.setState({
            alert: {
              status: this.state.alert.status,
              show: this.state.alert.show,
              message: "Ocorreu um erro CEP.",
            },
          });
          this.handleShow();
        });
    }
  }
  
  handleInputChange = (e) => {
    this.state.data[e.target.name] = e.target.value;
  };

  handleInputChangeCpf = (e) => {
    var cpfValue = e.target.value.replace('.', '').replace('.', '').replace('-', '');
    this.state.data[e.target.name] = cpfValue;
  };

  handleInputChangeAddress = (e) => {
    this.state.data.address[e.target.name] = e.target.value;
  };

  handleInputChangePassword = (e) => {
    var hashPassword = crypto
      .createHash("sha1")
      .update(e.target.value)
      .digest("hex");

    // this.state.data[e.target.name] = hashPassword;
    this.state.data[e.target.name] = e.target.value;
  };

  handleInputChangePasswordConfirmation = (e) => {
    var hashPassword = crypto
      .createHash("sha1")
      .update(e.target.value)
      .digest("hex");

    // this.state.data[e.target.name] = hashPassword;
    this.state.data[e.target.name] = e.target.value;
  };

  render() {
    return (
      <div>
        {this.renderAlert(this.state.alert)}
        <div className="containerCadastro">
          <Form>
            <h5>Cadastro</h5>
            <div className="row">
              <div className="col-half">
                <div className="input-group input-group-icon">
                  <input
                    name="name"
                    type="text"
                    placeholder="Nome Completo"
                    required
                    onChange={this.handleInputChange.bind(this)}
                  />
                  <div className="input-icon">
                    <i className="fa fa-user"></i>
                  </div>
                </div>
              </div>
              <div className="col-half">
                <div className="input-group input-group-icon">
                  <InputMask
                    mask="999.999.999-99"
                    name="cpf"
                    type="string"
                    placeholder="CPF"
                    required
                    onChange={this.handleInputChangeCpf}
                  ></InputMask>
                  <div className="input-icon">
                    <i className="fa fa-user"></i>
                  </div>
                </div>
              </div>
              <div className="col-full">
                <div className="input-group input-group-icon">
                  <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                    onChange={this.handleInputChange}
                  />
                  <div className="input-icon">
                    <i className="fa fa-envelope"></i>
                  </div>
                </div>
              </div>
              <div className="col-half">
                <div className="input-group input-group-icon">
                  <input
                    name="password"
                    type="password"
                    placeholder="Senha"
                    required
                    onChange={this.handleInputChangePassword}
                  />
                  <div className="input-icon">
                    <i className="fa fa-key"></i>
                  </div>
                </div>
              </div>
              <div className="col-half">
                <div className="input-group input-group-icon">
                  <input
                    name="passwordConfirmation"
                    type="password"
                    placeholder="Confirmar Senha"
                    required
                    onChange={this.handleInputChangePasswordConfirmation}
                  />
                  <div className="input-icon">
                    <i className="fa fa-key"></i>
                  </div>
                </div>
              </div>
              <div className="col-half">
                <h4>Data de Nascimento</h4>
                <div className="input-group">
                  <div className="input-group input-group-icon">
                    <input
                      name="dateOfBirth"
                      type="date"
                      required
                      onChange={this.handleInputChange.bind(this)}
                    />
                    <div className="input-icon">
                      <i className="fa fa-key"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-half">
                <h4>Sexo</h4>
                <div className="input-group">
                  <select
                    name="sexo"
                    onChange={this.handleInputChange.bind(this)}
                  >
                    <option defaultValue className="sexo">
                      Selecione o Sexo
                    </option>
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-half">
                <h4>CEP</h4>
                <div
                  className="input-group input-group-icon"
                >
                  <InputMask
                    mask="99999-999"
                    name="cep"
                    type="string"
                    placeholder="Ex: 00000-000"
                    required
                    onChange={this.handleInputChangeCep.bind(this)}
                  ></InputMask>
                  <div className="input-icon">
                    <i className="fa fa-user"></i>
                  </div>
                </div>
              </div>
              <div className="col-half">
                <h4>Estado</h4>
                <div
                  className="input-group input-group-icon"
                  onChange={this.handleInputChangeAddress.bind(this)}
                >
                  <input
                    name="state"
                    defaultValue={this.state.data.address.state}
                    type="string"
                    placeholder="Ex: SP"
                    required
                    onChange={this.handleInputChangeAddress.bind(this)}
                  />
                  <div className="input-icon">
                    <i className="fa fa-user"></i>
                  </div>
                </div>
              </div>
              <div className="col-two-thirds">
                <h4>Endereço</h4>
                <div
                  className="input-group input-group-icon"
                >
                  <input
                    name="address"
                    defaultValue={this.state.data.address.address}
                    type="string"
                    placeholder="Ex: Avenida Tiradentes"
                    required
                    onChange={this.handleInputChangeAddress.bind(this)}
                  />
                  <div className="input-icon">
                    <i className="fa fa-key"></i>
                  </div>
                </div>
              </div>
              <div className="col-third">
                <h4>Numero</h4>
                <div
                  className="input-group input-group-icon"
                >
                  <input
                    name="numero"
                    type="string"
                    placeholder="Ex: 21"
                    required
                    onChange={this.handleInputChangeAddress.bind(this)}
                  />
                  <div className="input-icon">
                    <i className="fa fa-key"></i>
                  </div>
                </div>
              </div>
              <div className="col-half">
                <h4>Cidade</h4>
                <div
                  className="input-group input-group-icon"
                >
                  <input
                    name="city"
                    defaultValue={this.state.data.address.city}
                    type="string"
                    placeholder="Ex: São Paulo"
                    required
                    onChange={this.handleInputChangeAddress.bind(this)}
                  />
                  <div className="input-icon">
                    <i className="fa fa-envelope"></i>
                  </div>
                </div>
              </div>
              <div className="col-half">
                <h4>Bairro</h4>
                <div
                  className="input-group input-group-icon"
                >
                  <input
                    name="district"
                    defaultValue={this.state.data.address.district}
                    type="string"
                    placeholder="Ex: Bom Retiro"
                    required
                    onChange={this.handleInputChangeAddress.bind(this)}
                  />
                  <div className="input-icon">
                    <i className="fa fa-key"></i>
                  </div>
                </div>
              </div>

              <div className="row">
                <Button
                  className="buttonSubmit"
                  variant="primary"
                  type="button"
                  onClick={this.handleSubmitForm2.bind(this)}
                >
                  Cadastrar
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

export default RegistrationPage;
