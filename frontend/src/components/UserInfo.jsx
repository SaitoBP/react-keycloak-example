import React, { useState, useEffect } from 'react'

const UserInfo = props => {
  const { keycloak } = props

  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    id: '',
  })

  useEffect(() => {
    if (keycloak !== null) {
      keycloak.loadUserInfo().then(userInfo => {
        setUserInfo({
          name: userInfo.name,
          email: userInfo.email,
          id: userInfo.sub,
        })
      })
    }
  }, [keycloak])

  return (
    <>
      <h3 variant='h6'>nome: {userInfo.name}</h3>
      <h3 variant='h6'>email: {userInfo.email}</h3>
      <h3 variant='h6'>id: {userInfo.id}</h3>
    </>
  )
}

export default UserInfo
