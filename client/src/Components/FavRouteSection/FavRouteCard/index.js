import React, { Component } from "react";
import { Modal, Button, Card, Row, Col } from "react-materialize";

import MapModalPage from "../../NewRouteModal/MapModalPage";

import "./style.css";

class FavRouteCard extends Component {
  state = {
    isClicked: false
  }

  // deleteRoute = () => {
  //   this.props.deleteRoute(this.props.route);
  // }

  routeCardTrigger = (
    <Row>
      <Col
        m={12}
        s={12}
      >
        <Card>
          <div className="card-body">
            <a href="#">
              <div className="card-action">
                {/* <div className="card-content"> */}
                <img src="/icons/empty_user.png" alt="user-icon" height="35px" width="auto" />
                <Button className="btn-padding" onClick={this.deleteRoute}>X</Button>
                <div className="username">
                  <a href="#">{this.props.username}</a>
                </div>
                {/* </div> */}
              </div>
              <div className="image-wrapper">
                <div className="card-image">
                  <img src="/testimgs/stock_image.jpg" alt="stock-img" />
                </div>
                <div className="card-content">
                  <span className="card-title">{this.props.route.name}</span>
                  <b>{this.props.route.price_category}</b>
                  <p>{this.props.route.description}</p>
                </div>
                <div className="card-action">
                  {/* <button type="submit"><img src="/icons/heart_icon.png" alt="like" height="15px" width="auto"/></button> */}
                  <div className="card-content">
                    <a className="btn-floating  waves-effect waves-red white">
                      <i className="material-icons">
                        <img
                          src="/icons/heart_icon.png"
                          alt="like"
                          height="15px"
                          width="auto"
                        />
                      </i>
                    </a>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </Card>
      </Col>
    </Row>
  )

  render() {
    return (
      <Modal
        header={this.props.route.name}
        trigger={this.routeCardTrigger}
        options={{
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
