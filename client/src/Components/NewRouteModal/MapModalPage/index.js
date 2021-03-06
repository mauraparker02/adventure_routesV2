import React, { Component } from "react";
import { Button } from "react-materialize";

import Map from "../../Map";

class MapModalPage extends Component {
    handleModalSubmit = () => {
        this.props.update({
            modalPage: true,
        });
    }
    render() {
        return (
            <div>
                <h5>{this.props.description}</h5>
                <h5>{(this.props.price_category) && <b>{this.props.price_category}</b>} {this.props.activities && <b>{this.props.activities}</b>}</h5>

                <Map
                    origin={this.props.origin}
                    waypoints={this.props.waypoints}
                    destination={this.props.destination}
                />

                {!this.props.viewMapOnly && <Button onClick={this.handleModalSubmit} waves="#orange">Back to Form</Button>}
            </div>
        );
    }
}

export default MapModalPage;