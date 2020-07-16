import React from "react";
import { TextInput, Button, Row, Col } from "react-materialize";

import NewRouteModal from "../NewRouteModal"

import "./style.css";

function Jumbotron(props) {
  const addRouteTrigger = <Button style={ {margin: '0'}} waves='orange'>+</Button>;
  return (
    <div id="jumbotron">
      <Row>
        <Col m={2} s={12}></Col>
        <Col m={8} s={12}>
          <div className="bigIcon">
              <img src="/icons/Adv.png" alt="adventure-route-cover-img"></img>
          </div>
        </Col>
        <Col m={2} s={12}></Col>
      </Row>
      <Row>
        <Col m={2} s={12}></Col>
        <Col m={8} s={12}>
          <h1 className="welcome">
            {props.loggedIn ?
              `${props.username}, click on the + button to add a new route!` :
              "Welcome, click on the + button to test your route! Sign in/up to save your routes!"}
          </h1>
        </Col>
        <Col m={2} s={12}></Col>
      </Row>
      <Row>
          <div className="flexbox">
          {props.loggedIn &&
          <TextInput
            label="search route"
            style={ {margin: '0'}}
            m={8}
            value={props.search}
            onChange={props.filterRoute}
          />}
          <Button className="button btnfav" waves="orange"><i><img src="/icons/heart_icon.png" alt="like" height="15px" width="auto"/></i></Button>
          <NewRouteModal routes={props.routes} addRoute={props.addRoute} loggedIn={props.loggedIn} trigger={addRouteTrigger}/>
          </div>
      </Row>
    </div>
  );
}

export default Jumbotron;
