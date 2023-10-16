import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Home from './pages/Home';
import Question from './pages/Question';
import Profile from './pages/Profile';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Logout from './pages/Logout';
import QuestionDetail from './components/QuestionDetail';
import "./api/axiosDefaults";
import { AuthProvider } from './components/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div>
          <NavigationBar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/questions/:questionId" component={QuestionDetail}/>
            <Route path="/profile/:userId" component={Profile} />
            <Route path="/questions" component={Question} />
            <Route path="/register" component={Registration} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
          </Switch>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
