import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Home from './pages/Home';
import Questions from './pages/Questions';
import Profiles from './pages/Profiles';

function App() {
  return (
    <Router>
      <div>
        <NavigationBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/questions" component={Questions} />
          <Route path="/user-profiles" component={Profiles} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;