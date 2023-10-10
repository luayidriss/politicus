import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Home from './pages/Home';
import Questions from './pages/Questions';
import Profiles from './pages/Profiles';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Logout from './pages/Logout';
import "./api/axiosDefaults";
import { AuthProvider } from './components/AuthContext'; // Import AuthProvider

function App() {
  return (
    <Router>
      <AuthProvider> {/* Wrap the entire app with AuthProvider */}
        <div>
          <NavigationBar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/questions" component={Questions} />
            <Route path="/user-profiles" component={Profiles} />
            <Route path="/register" component={Registration} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
          </Switch>
        </div>
      </AuthProvider> {/* Close AuthProvider */}
    </Router>
  );
}

export default App;
