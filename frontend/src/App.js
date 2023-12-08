import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HashRouter as Router, Route, Switch } from 'react-router-dom'; // Change BrowserRouter to HashRouter
import NavigationBar from './components/NavigationBar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Logout from './pages/Logout';
import QuestionDetail from './components/QuestionDetail';
import EditProfile from './components/EditProfile';
import QuestionForm from './components/QuestionForm';
import NF404 from './components/NF404';
import './api/axiosDefaults';
import { AuthProvider } from './components/AuthContext';
import './App.css';

function App() {
    return (
        <Router>
            <AuthProvider>
                <div className='App'>
                    <NavigationBar />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route
                            path="/questions/:questionId/edit"
                            render={({ match }) => (
                                <QuestionForm questionId={match.params.questionId} />
                            )}
                        />
                        <Route path="/questions/:questionId" component={QuestionDetail} />
                        <Route path="/profile/:userId" component={Profile} />
                        <Route path="/user/edit" component={EditProfile} />
                        <Route path='/add-question' component={QuestionForm} />
                        <Route path="/register" component={Registration} />
                        <Route path="/login" component={Login} />
                        <Route path="/logout" component={Logout} />
                        <Route component={NF404} />
                    </Switch>
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App;