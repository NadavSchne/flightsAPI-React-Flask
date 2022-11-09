import React from 'react'
import logo from "../logo.JPG"
function Header({title,title2}) {
  return (
        <header>

        <div className='header'>
        <h1 className='title'>{title}</h1>
        
        </div>
        <h2 className='title2'>{title2}</h2>


        </header>
  )
}


Header.defaultProps = {
    title: 'Welcome to Star Next',
    title2: 'search your next flight'
}


export default Header
