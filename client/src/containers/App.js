import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logout } from '../actions/index';
import decode from 'jwt-decode';

import NavbarComponent from '../components/Navbar';
import RouterRoot from '../components/routing/RouterRoot';
import'../styles/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.state = {isAuthed: false, user: {}};
    this.updateIsAuthed = this.updateIsAuthed.bind(this);
  }

  componentWillMount() {
    let token = localStorage.getItem('token');
    
    if (!token || token == 'undefined') {
      this.setState({isAuthed: false});
    } else {
      let user = decode(token);
      this.setState({isAuthed: true, user});
    }
  }

  render() {
    return (
      <Router>
        <div>
          <NavbarComponent logout={this.logout} isAuthed={this.state.isAuthed}/>
          <Route path="/" render={props => <RouterRoot 
            updateIsAuthed={this.updateIsAuthed} 
            isAuthed={this.state.isAuthed} 
            user={this.state.user}/>} 
          />
        </div>
      </Router>
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.props.logout();
    this.setState({isAuthed: false, user: {}});
    <Redirect to="/login" />
  }

  updateIsAuthed() {
    let token = localStorage.getItem('token');
    
    if (!token || token == 'undefined') {
      this.setState({isAuthed: false});
    } else {
      let user = decode(token);
      this.setState({isAuthed: true, user});
    }
  }
}

const mapStateToProps = ({authenticationReducer}) => authenticationReducer;
const mapDispatchToProps = dispatch => bindActionCreators({logout}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
