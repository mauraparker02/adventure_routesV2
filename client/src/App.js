import React, { Component } from 'react';
import axios from 'axios';

import AdventureRouteNav from './Components/AdventureRouteNav';
import Jumbotron from './Components/Jumbotron';
import FavRouteSection from "./Components/FavRouteSection";

import './App.css';

class App extends Component {
  state = {
    loggedIn: false,
    user: {},
    routes: [],
    search: ''
  };

  componentDidMount() {
    this.getUser();
  }

  updateUser = userObject => {
    this.setState(userObject);
  }

  getUser = () => {
    axios.get('/user').then(response => {
      if (response.data.user || response.status=== 304) {
        this.setState({
          loggedIn: true,
          user: response.data.user,
          routes: response.data.user.routes,
        });
      }
      else {
        this.setState({
          loggedIn: false,
          user: {},
          routes: []
        });
      }
    });
  }

  addRoute = routeObject => {
    const id = this.state.user.id;//"5edd39c830eb27ea82204d1e";
    axios.post('/user/routes/' + id, {
      routes: [routeObject]
    })
    .then(response => {
      const temp = response.data.routes;
      temp.push(routeObject);

      if (response.status === 200) {
          this.setState(prevState => ({
            user: { ...prevState.user, routes: temp },
            routes: temp
          }));
      }
    }).catch(err => console.log(err));
  }

  filterRoute = event => {
    var filteredRoutes = this.state.user.routes.filter(route => 
      route.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    this.setState({
      search: event.target.value,
      routes: filteredRoutes
    })
  }

  render() {
    console.log(this.state.user);
    return (
      <div>
        <AdventureRouteNav updateUser={this.updateUser} loggedIn={this.state.loggedIn}/>
        <Jumbotron
          loggedIn={this.state.loggedIn}
          username={this.state.user.username}
          routes={this.state.routes}
          search={this.state.search}
          addRoute={this.addRoute}
          filterRoute={this.filterRoute}
        />
        <div className="fav-routes-section"></div>
        {this.state.loggedIn && <FavRouteSection routes={this.state.routes} deleteRoute={this.deleteRoute} username={this.state.user.username}/>}
      </div>
    );
  }
}

export default App;
