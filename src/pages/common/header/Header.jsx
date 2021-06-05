import React from 'react'
import {NavBar} from '../../common';

import './Header.css'

function Header () {
    return(
        <section className='header'>
            <section className='header-top'>
                <section className='header-top_logo'>
                    <a href="/" className='header-top_logo_image'></a>
                </section>
                <section className='header-top_navbar'>
                    <section className='header-top_navigation'>
                        <NavBar/>
                    </section>
                    <hr className='header-top_separator'/>
                    
                </section>

            </section>

        </section>
    )
}

export default Header;