import React from 'react'
import './NavBar.css'



function NavBar () {
    return(
            <div className='sub_cont_2'>
                <a href='/' className='navbar-item'>Home</a>
                <a href='/nos' className='navbar-item'>Nós</a>
                <a href='/planos' className='navbar-item'>Planos</a>
                <a href='/rede-referenciada' className='navbar-item'>Rede Referenciada</a>
                <a href='/contato' className='navbar-item'>Contato</a>   
            </div>
    )
}

export default NavBar;