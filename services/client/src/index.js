import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';

import UsersList from './components/UsersList';
import AddUser from './components/AddUser';


class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      username: '',
      email: '',
    };

    // bind class methods explicitly
    this.addUser = this.addUser.bind(this);
    this.handleChange = this.handleChange.bind(this)
  };


  componentDidMount() {
    this.getUsers();
  };


  getUsers() {
    axios.get(`${process.env.REACT_APP_USERS_SERVICE_URL}/users`)
    .then((res) => { this.setState({ users: res.data.data.users }); })
    .catch((err) => { console.log(err); });
  };


  addUser(event) {
    event.preventDefault();
    console.log('sanity check!')
    console.log(this.state)

    const data = {
      username: this.state.username,
      email: this.state.email
    };

    axios.post(`${process.env.REACT_APP_USERS_SERVICE_URL}/users`, data)
      .then((res) => {
          console.log(res);
          this.getUsers()
          this.setState({ username: '', email: '' });
       })
      .catch((err) => { console.log(err); });
    };


  // update the state in parent (App) when the user enters text into the form's input boxes
  handleChange(event) {
    const obj = {};
    obj[event.target.name] = event.target.value;
    this.setState(obj);
  };


  render() {
    return (
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-one-third">
              <br/>
              <h1 className="title is-1">All Users</h1>
              <hr/><br/>
              {/* add a User */}
              <AddUser
                username={this.state.username}
                email={this.state.email}
                addUser={this.addUser}
                handleChange={this.handleChange}
              />
              <br/><br/>
              {/* pass state from parent (App component) to child (UsersList Component) via props */}
              <UsersList users={this.state.users}/>
            </div>
          </div>
        </div>
      </section>
    )
  };

};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
