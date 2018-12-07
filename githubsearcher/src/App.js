import React, { Component } from 'react';
import {connect} from 'react-redux';
import logo from './logo.svg';
import './App.css';
import Routing from './Routing';
import {Provider} from 'react-redux'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {

  onHandleChange = (e) => {
    let {dispatch} = this.props;
    dispatch({type: 'UPDATE_USERNAME', username: e.target.value})
  }

  onUserSearch = () => {
    let {dispatch} = this.props;
    let {username} = this.props;
    fetch(`https://api.github.com/users/${username}`)
      .then(res => {
        return res.json()
      })
      .then(res => {
        dispatch({type: 'UPDATE_USERPROFILE', userprofile: res})
      })
  }

  onRepoFetch = () => {
    let {dispatch} = this.props;
    let {repos_url} = this.props.userprofile;
    console.log(repos_url)
    fetch(repos_url)
      .then(res => {
        return res.json()
      })
      .then(res => {
        dispatch({type: 'UPDATE_REPOS', repos: res})
      })
  }

  render() {
    let {userprofile} = this.props;
    let repos = this.props.repos.map((repos, i)=> {
      return <li key={i}>{repos.name}</li>
    })
    return (
      <div>
        <h1>{this.props.username}</h1>
       <input type="text"
              onChange={this.onHandleChange}
              value={this.props.user} />
        <button onClick={this.onUserSearch}>Search</button>
        <hr/>
        <h3>{userprofile.login}</h3>
        <img src={userprofile.avatar_url} alt=""/>
        <button onClick={this.onRepoFetch}>Fetch Repos</button>
        {repos}
      </div>
    );
  }
}



const mapStateToProps = (state) => {
  return {
    username: state.username,
    userprofile: state.userprofile,
    repos: state.repos
  }
}


export default connect(mapStateToProps)(App);
