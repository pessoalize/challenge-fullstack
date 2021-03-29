// import logo from './logo.svg';
import React, { Component } from "react";

import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import {Switch, Route, Link} from "react-router-dom";

import AuthService from "./services/auth";

import AddProduto from "./components/Produtos/add-produto";
import Produto from "./components/Produtos/produto";
import ListProdutos from "./components/Produtos/list-produto";

import Login from "./components/Auth/login";
import Register from "./components/Auth/register";
import Profile from "./components/Auth/profile";

import Home from "./components/User/home";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user
      });
    }
  }

  logOut() {
    AuthService.logout();
  }
  render() {
    const {currentUser} = this.state;
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Teste Pessalize
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>
            {currentUser && (
            <li className="nav-item">
              <Link to={"/produtos"} className="nav-link">
                Produtos
              </Link>
            </li>)}
            {currentUser && (
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Adicionar Produtos
              </Link>
            </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/profile" component={Profile}/>

            <Route exact path={["/", "/produtos"]} component={ListProdutos}/>
            <Route exact path="/add" component={AddProduto}/>
            <Route path="/produtos/:_id" component={Produto}/>
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
