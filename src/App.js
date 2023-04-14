import {Switch, Route} from 'react-router-dom'

import Home from './components/Home'
import LoginForm from './components/LoginForm'
import NotFound from './components/NotFound'
import Jobs from './components/Jobs'
import JobItemDetails from './components/JobItemDetails'
import './App.css'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={LoginForm} />
      <Route exact path="/jobs" component={Jobs} />
      <Route exact path="/jobs/:id" component={JobItemDetails} />
      <Route exact path="/not-found" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  </>
)

export default App
