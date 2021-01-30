import React from 'react'
import { Switch, Route } from 'react-router-dom'

import PrivateRoute from './auth'

import Home from './pages/Home'
import Products from './pages/Product'
import ProductForm from './pages/Product/Form'
import Login from './pages/Login/index'


const Routes: React.FC = () => {
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <PrivateRoute path="/produtos" exact component={Products} />
            <Route path="/produtos_cadastro" exact component={ProductForm} />
            <Route path="/produtos_cadastro/:id" exact component={ProductForm} />
            <Route path="/login" exact component={Login} />
        </Switch>
    )
}


export default Routes