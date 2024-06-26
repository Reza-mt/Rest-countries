import React from 'react'
import ThemeSwitch from './themeSwitcher'

const Navbar = () => {
  return (
    <div className='flex font-bold text-normal justify-around md:space-x-96 m-3  '>
        <h1>Where in the world?</h1>
        <p><ThemeSwitch/> </p>
        
    </div>
  )
}

export default Navbar