import React, { Component } from "react";
import { TextInput, Button, Row, Col } from "react-materialize";

import NewRouteModal from "../NewRouteModal"

import "./style.css";

class Jumbotron extends Component {
  signedOutJumbotronStyle = {
    fontFamily: 'Arial, Helvetica, sans-serif',
    padding: '20px',
    paddingBottom: '500px',
    color: 'white',
    backgroundImage: 'url(/icons/background.png)',
    backgroundRepeat: 'no-repeat', 
    backgroundSize: 'cover',
    overflow: 'hidden'
  }

  signedInJumbotronStyle = {
    fontFamily: 'Arial, Helvetica, sans-serif',
    padding: '20px',
    paddingBottom: '0px',
    color: 'white',
    backgroundImage: 'url(/icons/background.png)',
    backgroundRepeat: 'no-repeat', 
    backgroundSize: 'cover',
    overflow: 'hidden'
  }

  render() {
    const addRouteTrigger = <Button style={ {margin: '0'}} waves='orange'>+</Button>;
    return (
      <div id="jumbotron" style={this.props.loggedIn ? this.signedInJumbotronStyle : this.signedOutJumbotronStyle}>
      <Row>
        <Col m={2} s={12}></Col>
        <Col m={8} s={12}>
          <div className="bigIcon">
              <img src="/icons/adventure_routes.png" alt="adventure-route-cover-img"></img>
          </div>
        </Col>
        <Col m={2} s={12}></Col>
      </Row>
      <Row>
        <Col m={2} s={12}></Col>
        <Col m={8} s={12}>
          <h1 className="welcome">
            {this.props.loggedIn ?
              `Hi ${this.props.username}! click on the + button to create a new route.` :
              "Welcome, Adventure Routes will map out a user’s journey from point A to point B with as many stops needed inbetween. Test out building a route on a map... to start click on the + button!"}
          </h1>
        </Col>
        <Col m={2} s={12}></Col>
      </Row>
      <Row>
          <div className="flexbox">
          <TextInput
            label="search saved routes"
            style={ {margin: '0'}}
            m={8}
            value={this.props.search}
            onChange={this.props.filterRoute}
          />
          {/* <Button className="button btnfav" waves="orange"><i><img src="/icons/heart_icon.png" alt="like" height="15px" width="auto"/></i></Button> */}
          <NewRouteModal routes={this.props.routes} addRoute={this.props.addRoute} loggedIn={this.props.loggedIn} trigger={addRouteTrigger}/>
          </div>
      </Row>
    </div>
    )
  }
}

export default Jumbotron;
