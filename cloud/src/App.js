import React from 'react';
import './App.css';
import Friends from './Pages/Friends';
import Profile from './Pages/Profile';
import NavBar from './Components/NavBar'
import Timeline from './Pages/Timeline'
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
            <Route exact path="/timeline" component={Timeline}/>
          </Switch>
        </Router>
      </div>
    )

  }
}
export default App