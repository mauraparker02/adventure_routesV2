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
    const id = this.state.user.id;
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

    // axios.post('https://cors-anywhere.herokuapp.com/https://up.flickr.com/services/upload/', {
    //   photo: routeObject.pictures
    // }).then(response => {
    //   if (response.status === 200) {
    //     console.log("Image uploaded successfully!", response);
    //   }
    //   else {
    //     console.log("Image upload error: ", response);
    //   }
    // })
  }

  filterRoute = event => {
    var filteredRoutes = this.state.user.routes.filter(route => 
      route.name.toLowerCase().includes(event.target.value.trim().toLowerCase())
    );

    this.setState({
      search: event.target.value,
      routes: filteredRoutes.slice()
    });
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
        <FavRouteSection routes={this.state.routes} username={this.state.user.username}/>
      </div>
    );
  }
}

export default App;
