import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import './app.css'
import Footer from './components/footer'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
    </div>
  )
}

export default App
