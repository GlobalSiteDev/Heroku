import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import Home from './components/Home/Home';
import LoginForm from './containers/LoginForm/LoginForm';
import UserProfile from './containers/UserProfile/UserProfile';
import Auth from './hoc/Auth/Auth';
import SignupForm from './containers/SignupForm/SignupForm';
import Logout from './containers/Logout/Logout';

const routes = () => {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact component={Auth(Home, false)} />
                <Route path="/login" exact component={Auth(LoginForm, false)} />
                <Route path="/user" exact component={Auth(UserProfile, true)} />
                <Route path="/user/logout" exact component={Auth(Logout, true)} />
                <Route path="/register" exact component={Auth(SignupForm, false)} />
            </Switch>
        </Layout>
    );
}

export default routes;
