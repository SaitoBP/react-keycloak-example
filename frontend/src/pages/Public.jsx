import React from 'react'

import { Link } from 'react-router-dom'

const Public = () => {
  return (
    <div className='container'>
      <h1>Area Publica</h1>

      <Link to='/'>
        <button variant='outlined'>Voltar</button>
      </Link>
    </div>
  )
}

export default Public
