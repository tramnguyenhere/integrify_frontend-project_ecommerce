import React from 'react'

import Header from './Header'
import Routes from '../routes/Routers'
import Footer from './Footer'

const Layout = () => {
  return (
    <div className='layout'>
      <Header />
      <div>
          <Routes />
      </div>
      <Footer />
    </div>
  )
}

export default Layout