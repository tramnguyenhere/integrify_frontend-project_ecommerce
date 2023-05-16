import React from 'react'

import Header from './Header'
import Routes from '../routes/Routers'
import Footer from './Footer'

const Layout = () => {
  return (
    <>
      <Header />
      <div>
          <Routes />
      </div>
      <Footer />
    </>
  )
}

export default Layout