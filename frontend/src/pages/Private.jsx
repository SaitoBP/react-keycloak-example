import React, { useState, useEffect } from 'react'

import { Link, useHistory } from 'react-router-dom'

import Keycloak from 'keycloak-js'

/* Components */
import UserInfo from '../components/UserInfo'

const Private = () => {
  const [keycloak, setKeycloak] = useState(null)
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    const keycloakConfig = Keycloak('./keycloak.json')
    keycloakConfig.init({ onLoad: 'login-required' }).then(authenticated => {
      setKeycloak(keycloakConfig)
      setAuthenticated(authenticated)
    })
  }, [])

  const history = useHistory()

  const handleLogout = () => {
    history.push('/')
    keycloak.logout()
  }

  if (keycloak) {
    if (authenticated) {
      return (
        <div className='container'>
          <h1>Pagina Privada</h1>

          <UserInfo keycloak={keycloak} />

          <Link to='/'>
            <button onClick={handleLogout}>Logout</button>
          </Link>
        </div>
      )
    } else {
      return (
        <div className='container'>
          <h1>Não foi possivel autenticar!</h1>
        </div>
      )
    }
  }
  return (
    <div className='container'>
      <h1>Inicializando Keycloak...</h1>
    </div>
  )
}

export default Private
