import React from 'react'
import './Login.css'



const Login = () => {
  return (
    <div className="Login">
{/*     
<head>
<meta charset="UTF-8"></meta>
<meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      </head>

      <body onload="iniciar()">
        <div class="container">
          <div class="content">
            <div  id="card-login" class="card-login">
              <div class="form-login" >
                <div class="titulo-card">ENTRAR NA MINHA CONTA</div>

              </div>

            </div>
          </div>

        </div>
        
         </body> */}
         
         <head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>e-popet - Login</title>
    <link rel="stylesheet" href="./Login.css" type="text/css" />
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap" rel="stylesheet"/>
</head>

<body onload="iniciar()">
    <div class="container">
        <div class="content">
            <div id="card-login" class="card-login">

                <div class="form-login">
                    <div class="titulo-card">ENTRAR NA MINHA CONTA</div>
                    <label for="email">Login</label>
                    <input id="nome" placeholder="Insira seu Login" type="text"/>
                    <label for="senha">Senha</label>
                    <input id="senha" placeholder="Insira sua Senha" type="password"/>
                    <div class="esqueci">
                        <input type="checkbox" value="remember-me" id="lembrar"/> Lembre-se de mim
                        <a href="./../RecuperacaoSenha/RecuperacaoSenha.html" class="forgot-password">
                            Esqueceu a senha?
                        </a>
                    </div>
                    <div class="div-botao">
                        <button id="btn-enviar" class="btn-enviar" onclick="login()">LOGIN</button>
                        <button id="btn-jogar" class="btn-enviar" onclick="entrarConvidado()">Entrar como
                            Convidado</button>
                    </div>

                </div>

            </div>
            <div class="cadastra">
                Novo por aqui? <a href="./../Cadastro/Cadastro.html">
                    Cadastre-se
                </a> de graça.
            </div>
        </div>
    </div>
    <div class="loading" id="div-loading">
        <img class="img-loading" src='./../assets/Loading.gif' alt="Loading"/>
    </div>
    <script type="text/javascript" src="./Login.js"></script>
</body>


    </div>
  )
}

export default Login
