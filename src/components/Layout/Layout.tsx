import React from 'react'
import Header from '../Header/Header'
import Routes from '../../routes/Routers'

const Layout = () => {
  return (
    <>
      <Header />
      <div>
          <Routes />
      </div>
    </>
  )
}

export default Layout