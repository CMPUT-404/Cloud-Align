import React from 'react';
import './App.css';
import Friends from './pages/Friends';
import Profile from './pages/Profile';
import Timeline from './pages/Timeline'
import NavBar from './components/NavBar'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
class App extends React.Component {
  render(){  
    return (
      <div className="App">
        <Router>
          <NavBar />
          <Switch>
            <Route path="/profile" component={Profile}/>
            <Route path="/friends" component={Friends}/>
            <Route path="/timeline" component={Timeline}/>
          </Switch>
        </Router>
      </div>
    )

  }
}
export default App