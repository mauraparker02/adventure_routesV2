import React, { Component } from 'react';
import { Select } from "react-materialize";
import { GoogleMap, DirectionsRenderer, DirectionsService, LoadScript } from "@react-google-maps/api";

class Map extends Component {
    state = {
        response: null,
        renderResponse: null,
        totalDistance: 0, // Pure value is in meters
        totalDuration: 0, // Pure value is in seconds
        renderCount: 0,
        travelMode: 'DRIVING'
    }

    // shouldComponentUpdate() {
    //     if (this.state.renderResponse !== null) {
    //         return false;
    //     }
    //     else {
    //         return true;
    //     }
    // }

    addDistanceAndDuration = response => {
        let tempDistance = 0;
        let tempDuration = 0;
        response.routes[0].legs.forEach(leg => {
            tempDistance += leg.distance.value;
            tempDuration += leg.duration.value;
        });

        this.setState({
            totalDistance: tempDistance,
            totalDuration: tempDuration
        });
        console.log("Total distance: ", this.state.totalDistance, "m  (", Math.round(this.state.totalDistance * 0.00062137), "mi )");
        console.log("Total duration: ", this.state.totalDuration, "s  (", this.state.totalDuration / 60 / 60, "h ");
    }

    directionsCallback = response => {
        if (response !== null) {
            if (response.status === 'OK') {
                this.setState({ response });
                this.addDistanceAndDuration(response);
            } else {
                console.log('directions response: ', response);
            }
        }
    }

    changeTransportationState = ({ target: { value } }) => {
        this.setState({ renderResponse: null, travelMode: value });
    }

    onMapClick = (...args) => console.log('onClick args: ', args);

    render() {
        console.log("Render");
        if (this.state.response !== null) {
            console.log("Response: ", this.state.response.routes[0].legs);
        }
        return (
            <div>
                <h6>Distance: {Math.round(this.state.totalDistance * 0.00062137)} mi</h6>
                <h6>ETA: {Math.round((this.state.totalDuration / 60 >= 60) ?
                    (this.state.totalDuration / 60 / 60) : (this.state.totalDuration / 60))} 
                    {(this.state.totalDuration / 60 >= 60) ? (" h") : (" min")}</h6>
                <div className='map'>
                    <div className='map-settings'>
                        <Select
                            multiple={false}
                            label="select transportation"
                            onChange={this.changeTransportationState}
                            options={{
                                classes: '',
                                dropdownOptions: {
                                    alignment: 'left',
                                    autoTrigger: true,
                                    closeOnClick: true,
                                    constrainWidth: true,
                                    coverTrigger: true,
                                    hover: false,
                                    inDuration: 150,
                                    onCloseEnd: null,
                                    onCloseStart: null,
                                    onOpenEnd: null,
                                    onOpenStart: null,
                                    outDuration: 250
                                }
                            }}
                            value="DRIVING"
                            s={12}
                        >
                            <option value="DRIVING">Driving</option>
                            <option value="BICYCLING">Bicycling</option>
                            <option
                                value="TRANSIT"
                                disabled={(this.props.waypoints.length === 0) ? false : true}
                            >
                                Transit {this.props.waypoints.length !== 0 && "(route should have no origins to enable transit)"}
                            </option>
                            <option value="WALKING">Walking</option>
                        </Select>
                    </div>

                    <div className='map-container'>
                        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}>
                            <GoogleMap
                                // required
                                id='direction-example'
                                // required
                                mapContainerStyle={{
                                    height: '400px',
                                    width: '100%'
                                }}
                                // required
                                zoom={2}
                                // required
                                center={{
                                    lat: 42,
                                    lng: -88
                                }}
                                // optional
                                onClick={this.onMapClick}
                                // optional
                                onLoad={map => {
                                    console.log('DirectionsRenderer onLoad map: ', map)
                                }}
                                // optional
                                onUnmount={map => {
                                    console.log('DirectionsRenderer onUnmount map: ', map)
                                }}
                            >
                                <DirectionsService
                                    // required
                                    options={{
                                        origin: this.props.origin,
                                        waypoints: this.props.waypoints,
                                        destination: this.props.destination,
                                        travelMode: this.state.travelMode
                                    }}
                                    // required
                                    callback={this.directionsCallback}
                                    // optional
                                    onLoad={directionsService => {
                                        console.log('DirectionsService onLoad directionsService: ', directionsService)
                                    }}
                                    // optional
                                    onUnmount={directionsService => {
                                        console.log('DirectionsService onUnmount directionsService: ', directionsService)
                                    }}
                                />

                                {
                                    (this.state.response !== null) && (
                                        <DirectionsRenderer
                                            // required
                                            options={{
                                                directions: this.state.response
                                            }}
                                            // optional
                                            onLoad={directionsRenderer => {
                                                let tempRender = directionsRenderer;
                                                console.log("Temp render: ", tempRender);
                                                this.setState({renderResponse: tempRender});
                                                console.log("Render response: ", this.state.renderResponse);
                                                console.log('DirectionsRenderer onLoad directionsRenderer: ', directionsRenderer)
                                            }}
                                            // optional
                                            onUnmount={directionsRenderer => {
                                                this.setState({renderResponse: null});
                                                console.log('DirectionsRenderer onUnmount directionsRenderer: ', directionsRenderer)
                                            }}
                                        />
                                    )
                                }
                            </GoogleMap>
                        </LoadScript>
                    </div>
                </div>
            </div>
        )
    }
}

export default Map;