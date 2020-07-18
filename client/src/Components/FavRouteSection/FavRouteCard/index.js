import React, { Component } from "react";
import { Modal, Button, Card } from "react-materialize";

import MapModalPage from "../../NewRouteModal/MapModalPage";

import "./style.css";

class FavRouteCard extends Component {
  state = {
    isClicked: false
  }

  // deleteRoute = () => {
  //   this.props.deleteRoute(this.props.route);
  // }

  render() {
    const routeCardTrigger = (
      <Card className="route-card">
        <div className="container card-body">
          <a href="#">
            <div className="user">
              <img src="/icons/empty_user.png" alt="user-icon" height="35px" width="auto" />
              {/* <Button className="btn-padding" onClick={this.deleteRoute}>X</Button> */}
              <div className="username">
                <a href="#">{this.props.username}</a>
              </div>
            </div>
            <div className="image-wrapper">
              <div className="card-image">
                <img src={this.props.route.picture} alt="stock-img" />
              </div>
            </div>
            <div className="card-content">
              <div className="card-action">
                <span className="card-title"> {this.props.route.name}</span>
                {this.props.route.price_category !== '' && <b>{this.props.route.price_category}</b>}
                {this.props.route.activities !== '' && <b>{this.props.route.activities}</b>}
                <p>{this.props.route.description}</p>
              </div>
              <div className="card-action">
              </div>
            </div>
          </a>
        </div>
      </Card>
    )
    return (
      <Modal
        header={this.props.route.name}
        trigger={routeCardTrigger}
        options={{
          dismissible: true,
          onOpenStart: () => this.setState({ isClicked: true }),
          onCloseEnd: () => this.setState({ isClicked: false })
        }}
      >
        {
          this.state.isClicked &&
          <MapModalPage
            viewMapOnly={true}
            name={this.props.route.name}
            description={this.props.route.description}
            price_category={this.props.route.price_category}
            activities={this.props.route.activities}
            origin={this.props.route.route.origin}
            waypoints={this.props.route.route.waypoints}
            destination={this.props.route.route.destination}
          />
        }
      </Modal >
    );
  }
}

export default FavRouteCard;
