import React, { Component } from "react";
import { Modal } from "react-materialize";

import FormModalPage from "./FormModalPage";
import MapModalPage from "./MapModalPage";

import "./style.css"

class NewRouteModal extends Component {
    state = {
        modalPage: true,
        name: '',
        description: '',
        price_category: '',
        activities: '',
        origin: '',
        waypoints: [],
        destination: ''
    }

    update = change => {
        this.setState(change);
    };

    render() {
        return (
            <Modal
                trigger={this.props.trigger}
                header={(this.state.modalPage) ? "New Route" : this.state.name}
                options={{
                    dismissible: false
                }}
            >
                {(this.state.modalPage) ? (
                    <FormModalPage
                        update={this.update}
                        addRoute={this.props.addRoute}
                        loggedIn={this.props.loggedIn}
                    />
                ) : (
                    <MapModalPage
                        update={this.update}
                        viewMapOnly={false}
                        name={this.state.name}
                        description={this.state.description}
                        price_category={this.state.price_category}
                        activities={this.state.activities}
                        origin={this.state.origin}
                        waypoints={this.state.waypoints}
                        destination={this.state.destination}
                    />
                )}
            </Modal>
        );
    }
}

export default NewRouteModal;