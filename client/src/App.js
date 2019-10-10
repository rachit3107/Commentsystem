import React, { Component } from 'react';
import './App.css';
import PostSection from './Comments';
import Post from './Posts';
import queryString from 'query-string';
import Home from './Login';


class App extends Component {
  constructor(props) {
    super(props);
    this.path = window.location.pathname;
    this.page = 'login';
    if (window.location.search && window.location.search.length > 0) {
      let q = queryString.parse(window.location.search);
      if (q.p) {
        this.page = q.p;
      }
      if (q.state) {
        this.stateId = q.state;
      }
    }
  }
  render() {
    if (this.page == 'login') {
      return (
        <React.Fragment><Home></Home></React.Fragment>
      );
    }
    else if (this.page == 'home') {
      return (
        <React.Fragment><Post></Post></React.Fragment>
      );
    } else if (this.page == 'dashboard') {
      return (
        <React.Fragment><PostSection></PostSection></React.Fragment>
      );
    }
  }
}

export default App;
