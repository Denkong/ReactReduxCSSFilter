//React
import React, { Component } from 'react';
//REDUX
import {Provider} from 'react-redux';
import store from './store'
//Router
import { HashRouter as Router, Route, Switch,Link} from "react-router-dom";

//COMPONENTS
import Main from "./components/Main"
import About from "./components/About"
//ANTD
import 'antd/dist/antd.css';
//Detect-Browser
const { detect } = require('detect-browser');
const browser = detect();


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" render={()=>{
              switch (browser && browser.name) {
                case 'opera':
                case 'safari':
                case 'edge':
                case 'internetexplorer':
                  return<div>Ваш браузер не поддерживается</div>
                default:
                  return<Main/>
              }
              
              }} />
            <Route path="/about" component={About} />
            <Route  component={() => <Link to="/">На главную</Link>} />
          </Switch>
          
        </Router>
      </Provider>
    );
    
  }
}

export default App;
