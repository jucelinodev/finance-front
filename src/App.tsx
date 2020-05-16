import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import Routes from './Routes'
import Header from './components/Header'

const App: React.FC = () => (
  <>
    <Router>
      <Header />
      <Routes />
    </Router>
  </>
)

export default App
