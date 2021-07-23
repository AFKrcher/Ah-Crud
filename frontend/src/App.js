import React from 'react'
import './App.css'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

//Components
import Form from './components/Form'
import Navigation from './components/Navigation'
import Blog from './components/Blog'
import About from './components/About'

function App() {
  return (
    <div className="App">
        <Router>
          <Navigation />
          <Switch>
            <Route exact path="/" component={Form} />
            <Route path='/About' component={About} />
            <Route path='/:id' component={Blog} />
          </Switch>
        </Router>
    </div>
  );
}

export default App;