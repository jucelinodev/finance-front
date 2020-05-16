import React from 'react'
import { Switch, Route } from 'react-router-dom'
import NewTransaction from './pages/NewTransaction'
import Dashboard from './pages/Dashboard'

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/new-transaction" component={NewTransaction} />
  </Switch>
)

export default Routes
