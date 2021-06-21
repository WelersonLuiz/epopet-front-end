import React, { Component } from "react";
import InputMask from "react-input-mask";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import "./RegistrationPage.css";

const crypto = require("crypto");

class RegistrationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      senha: "",
      senha1: "",
      alert: { status: null, show: false, message: null },
    };
  }

  validarCPF(nr_cpf) {
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

  checkName = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

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

  async handleCloseSucess() {
    await this.setState({
      alert: { status: "Sucesso", show: false, message: null },
    });
  }

  async checkCPF(e) {
    var value = e.target;
    var cpfValido = false;
    if (value == undefined) {
      value = e;
    }
    if (value.value.length !== 11) {
    } else {
      if (this.validarCPF(value.value) === false) {
        console.log("CPF Invalido");
        await this.setState({
          alert: {
            status: this.state.alert.status,
            show: this.state.alert.show,
            message: "CPF Invalido",
          },
        });
        this.handleShow();
        cpfValido = false;
      } else {
        await axios
          .get("http://localhost:8080/client")
          .then((response) => {
            var existe = false;

            response.data.map((response) => {
              if (response.cpf === value.value) {
                existe = true;
              }
            });
            if (existe) {
              this.setState({
                alert: {
                  status: this.state.alert.status,
                  show: this.state.alert.show,
                  message: "Já temos uma conta com esse CPF.",
                },
              });
              this.handleShow();
              cpfValido = false;
            }
          })
          .catch((error) => {
            this.setState({
              alert: {
                status: this.state.alert.status,
                show: this.state.alert.show,
                message: "Ocorreu um erro.",
              },
            });
            this.handleShow();
          });
        this.setState({ cpf: value.value });
        cpfValido = true;
      }
    }

    return cpfValido;
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

  async getDetailAdress(e) {
    if (
      !/[0-9]{5}-[0-9]{3}/.test(e.target.value) & !this.state.address.status
    ) {
    } else {
      axios
        .get(
          //"https://ws.apicep.com/cep.json?code=" + e.target.value
          "https://viacep.com.br/ws/" +
            e.target.value.replace("-", "") +
            "/json/"
        )
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
          var pseudoState = {
            state: response.data.uf,
            city: response.data.localidade,
            district: response.data.bairro,
            address: response.data.logradouro,
            numero: this.state.address.numero,
            status: true,
          };
          this.setState({ address: pseudoState });
        })
        .catch((error) => {
          this.setState({
            alert: {
              status: this.state.alert.status,
              show: this.state.alert.show,
              message: "Ocorreu um erro.",
            },
          });
          this.handleShow();
        });
    }
  }

  setAddress(e) {
    this.state.address[e.target.name] = e.target.value;
  }

  validEmail = (e) => {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(e);
  };

  async checkEmail(e) {
    let emailValido = false;

    if (!this.validEmail(e.value)) {
    } else {
      await axios
        .get("http://localhost:8080/client/email/" + e.value)
        .then((response) => {
          this.setState({
            alert: {
              status: this.state.alert.status,
              show: this.state.alert.show,
              message: "Email já está sendo usado.",
            },
          });
          this.handleShow();
          emailValido = false;
        })
        .catch((error) => {
          if (error.response.data.errorCode === 1) {
            this.state["email"] = e.value;
            emailValido = true;
          } else {
            this.setState({
              alert: {
                status: this.state.alert.status,
                show: this.state.alert.show,
                message: "Ocorreu um erro.",
              },
            });
            this.handleShow();
            emailValido = false;
          }
        });
    }

    return emailValido;
  }

  async checkDateBirth(e) {
    var value = e.target;
    if (value == undefined) {
      value = e;
    }
    const SegundosNoAnos = 31557600;
    var partDate = value.value.split("-");
    var dataofbirth = new Date(partDate[0], partDate[1] - 1, partDate[2]);
    var today = new Date();
    today = new Date(today.getUTCFullYear(), today.getMonth(), today.getDate());
    var SecondsSinceBirth = Math.floor((today - dataofbirth) / 1000);
    if (SecondsSinceBirth / SegundosNoAnos < 18) {
      await this.setState({
        alert: {
          status: this.state.alert.status,
          show: this.state.alert.show,
          message:
            "Para realizar um cadastro no na E-Popet você deve ser maior de 18 anos.",
        },
      });
      this.handleShow();
      return false;
    } else {
      this.state["dateOfBirth"] = value.value;
      return true;
    }
  }

  async setPassword(e) {
    var hashPwd = crypto
      .createHash("sha1")
      .update(e.target.value)
      .digest("hex");

    if (e.target.name === "password") {
      await this.setState({ senha: hashPwd });
    }
    if (e.target.name === "password1") {
      await this.setState({ senha1: hashPwd });
    }
  }

  async handleFormCompleted(e) {
    e.preventDefault();
    console.log(e.target);
    var emailValida = await this.checkEmail(e.target[10]);
    var dataBirthValida = await this.checkDateBirth(e.target[3]);
    var cpfValido = await this.checkCPF(e.target[1]);
    if (!emailValida | !dataBirthValida | !cpfValido) {
    } else {
      if (this.state.senha !== this.state.senha1) {
        await this.setState({
          alert: {
            status: this.state.alert.status,
            show: this.state.alert.show,
            message: "Confirmação de senha não confere com a senha",
          },
        });
        this.handleShow();
      } else {
        let body = {
          name: this.state.name,
          email: this.state.email,
          dateOfBirth: this.state.dateOfBirth,
          password: this.state.senha,
          cpf: this.state.cpf,
          address: JSON.stringify(this.state.address),
        };
        console.log(body);
        axios
          .post("http://localhost:8080/client", body)
          .then((response) => {
            if (response.status === 200) {
              this.setState({
                alert: {
                  status: this.state.alert.status,
                  show: this.state.alert.show,
                  message: "Cadastro realizado com sucesso",
                },
              });
              this.handleShowSucess();
            }
          })
          .catch((error) => {
            this.setState({
              alert: {
                status: this.state.alert.status,
                show: this.state.alert.show,
                message: "Ocorreu um erro.",
              },
            });
            this.handleShow();
          });
      }
    }
  }

  componentDidMount() {
    document.body.style.backgroundColor = "#bdf2ed";
  }

  render() {
    return (
      <div>
        <div class="containerCadastro">
          <form onSubmit={this.handleFormCompleted.bind(this)}>
            <h5>Cadastro</h5>
            <div class="row">
              <div class="col-half">
                <div class="input-group input-group-icon">
                  <input
                    name="name"
                    type="text"
                    placeholder="Nome Completo"
                    required
                    onChange={this.checkName}
                  />
                  <div class="input-icon">
                    <i class="fa fa-user"></i>
                  </div>
                </div>
              </div>
              <div class="col-half">
                <div class="input-group input-group-icon">
                  <InputMask
                    mask="999.999.999-99"
                    name="cpf"
                    type="string"
                    placeholder="CPF"
                    required
                    onChange={this.checkCPF.bind(this)}
                  ></InputMask>
                  <div class="input-icon">
                    <i class="fa fa-user"></i>
                  </div>
                </div>
              </div>
              <div class="col-full">
                <div class="input-group input-group-icon">
                  <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                  />
                  <div class="input-icon">
                    <i class="fa fa-envelope"></i>
                  </div>
                </div>
              </div>
              <div class="col-half">
                <div class="input-group input-group-icon">
                  <input
                    name="password"
                    type="password"
                    placeholder="Senha"
                    required
                    onChange={this.setPassword.bind(this)}
                  />
                  <div class="input-icon">
                    <i class="fa fa-key"></i>
                  </div>
                </div>
              </div>
              <div class="col-half">
                <div class="input-group input-group-icon">
                  <input
                    name="password1"
                    type="password"
                    placeholder="Confirmar Senha"
                    required
                    onChange={this.setPassword.bind(this)}
                  />
                  <div class="input-icon">
                    <i class="fa fa-key"></i>
                  </div>
                </div>
              </div>
              <div class="col-half">
                <h4>Data de Nascimento</h4>
                <div class="input-group">
                  <div class="input-group input-group-icon">
                    <input
                      name="databirth"
                      type="date"
                      required
                      onChange={this.checkDateBirth.bind(this)}
                    />
                    <div class="input-icon">
                      <i class="fa fa-key"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-half">
                <h4>Sexo</h4>
                <div class="input-group">
                  <select name="sexo">
                    <option selected class="sexo">
                      Selecione o Sexo
                    </option>
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-half">
                <h4>CEP</h4>
                <div
                  class="input-group input-group-icon"
                  controlId="formBasicCEP"
                >
                  <InputMask
                    mask="99999-999"
                    name="cep"
                    type="string"
                    placeholder="Ex: 00000-000"
                    required
                    onChange={this.getDetailAdress.bind(this)}
                  ></InputMask>
                  <div class="input-icon">
                    <i class="fa fa-user"></i>
                  </div>
                </div>
              </div>
              <div class="col-half">
                <h4>Estado</h4>
                <div
                  class="input-group input-group-icon"
                  controlId="formBasicUF"
                  onChange={this.setAddress.bind(this)}
                >
                  <input
                    name="state"
                    defaultValue={this.state.address.state}
                    type="string"
                    placeholder="Ex: SP"
                    required
                    onChange={this.setAddress.bind(this)}
                  />
                  <div class="input-icon">
                    <i class="fa fa-user"></i>
                  </div>
                </div>
              </div>
              <div class="col-two-thirds">
                <h4>Endereço</h4>
                <div
                  class="input-group input-group-icon"
                  controlId="formBasicEndereco"
                >
                  <input
                    name="address"
                    defaultValue={this.state.address.address}
                    type="string"
                    placeholder="Ex: Avenida Tiradentes"
                    required
                    onChange={this.setAddress.bind(this)}
                  />
                  <div class="input-icon">
                    <i class="fa fa-key"></i>
                  </div>
                </div>
              </div>
              <div class="col-third">
                <h4>Numero</h4>
                <div
                  class="input-group input-group-icon"
                  controlId="formBasicNumero"
                >
                  <input
                    name="numero"
                    type="string"
                    placeholder="Ex: 21"
                    required
                    onChange={this.setAddress.bind(this)}
                  />
                  <div class="input-icon">
                    <i class="fa fa-key"></i>
                  </div>
                </div>
              </div>
              <div class="col-half">
                <h4>Cidade</h4>
                <div
                  class="input-group input-group-icon"
                  controlId="formBasicCidade"
                >
                  <input
                    name="city"
                    defaultValue={this.state.address.city}
                    type="string"
                    placeholder="Ex: São Paulo"
                    required
                    onChange={this.setAddress.bind(this)}
                  />
                  <div class="input-icon">
                    <i class="fa fa-envelope"></i>
                  </div>
                </div>
              </div>
              <div class="col-half">
                <h4>Bairro</h4>
                <div
                  class="input-group input-group-icon"
                  controlId="formBasicBairro"
                >
                  <input
                    name="district"
                    defaultValue={this.state.address.district}
                    type="string"
                    placeholder="Ex: Bom Retiro"
                    required
                    onChange={this.setAddress.bind(this)}
                  />
                  <div class="input-icon">
                    <i class="fa fa-key"></i>
                  </div>
                </div>
              </div>

              <div class="row">
                <Button
                  className="buttonSubmit"
                  variant="primary"
                  type="submit"
                >
                  Cadastrar
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default RegistrationPage;
