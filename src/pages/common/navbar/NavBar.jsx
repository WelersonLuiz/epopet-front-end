import React from 'react'
import './NavBar.css'

function NavBar () {
    return(
        <section className='navbar'>
            <a href='/' className='navbar-item'>Home</a>
            <a href='/login' className='navbar-item'>Login</a>
            <a href='/sobre' className='navbar-item'>Sobre</a>
            <a href='/planos' className='navbar-item'>Planos</a>
            <a href='/contato' className='navbar-item'>Contato</a>   
        </section>
    )
}

export default NavBar;