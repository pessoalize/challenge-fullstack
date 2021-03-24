// import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import { Switch, Route, Link } from "react-router-dom";

import AddProduto from "./components/add-produto";
import Produto from "./components/produto";
import ListProdutos from "./components/list-produto";

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/produtos" className="navbar-brand">
            Teste Pessoalize
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/produtos"} className="nav-link">
                Tutorials
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/produtos"]} component={ListProdutos} />
            <Route exact path="/add" component={AddProduto} />
            <Route path="/produtos/:id" component={Produto} />
          </Switch>
        </div>
      </div>
  );
}

export default App;
