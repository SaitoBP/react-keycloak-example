import React from 'react'

import { Link } from 'react-router-dom'

const MainPage = () => {
  return (
    <div className='container'>
      <h1>Area Principal</h1>

      <Link to='/public'>
        <button variant='outlined'>Componente Publico</button>
      </Link>

      <Link to='/private'>
        <button variant='outlined'>Componente Privado</button>
      </Link>
    </div>
  )
}

export default MainPage
