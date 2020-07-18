import React, { Component } from 'react';
import { Select, Switch, Checkbox } from "react-materialize";
import {
    GoogleMap,
    DirectionsRenderer,
    DirectionsService,
    TrafficLayer,
    TransitLayer,
    LoadScript
} from "@react-google-maps/api";

class Map extends Component {
    state = {
        response: null,
        directionSummary: '',
        trafficLayer: false,
        // transitLayer: false,
        totalDistance: 0, // Value is in meters
        totalDuration: 0, // Value is in seconds
        renderCount: 0,
        travelMode: 'DRIVING'
    }

    // shouldComponentUpdate() {
    //     if (this.state.response !== null) {
    //         return false;
    //     }
    //     else {
    //         return true;
    //     }
    // }

    getRouteInfo = response => {
        let tempDistance = 0;
        let tempDuration = 0;
        response.routes[0].legs.forEach(leg => {
            tempDistance += leg.distance.value;
            tempDuration += leg.duration.value;
        });

        this.setState({
            totalDistance: tempDistance,
            totalDuration: tempDuration,
            directionSummary: response.routes[0].summary
        });
    }

    switchTrafficLayer = () => {
        this.setState({ trafficLayer: !this.state.trafficLayer });
    }

    // switchTransitLayer = () => {
    //     this.setState({ transitLayer: !this.state.transitLayer });
    // }

    directionsCallback = response => {
        if (response !== null) {
            if (response.status === 'OK') {
                this.setState({ response });
                this.getRouteInfo(response);
            } else {
                console.log('directions response: ', response);
            }
        }
    }

    changeTransportationState = ({ target: { value } }) => {
        this.setState({ travelMode: value });
    }

    onMapClick = (...args) => console.log('onClick args: ', args);

    render() {
        console.log("Response: ", this.state.response);
        var minutes = Math.round(this.state.totalDuration / 60);
        var hours = this.state.totalDuration / 60 / 60;

        var miles = this.state.totalDistance * 0.00062137;
        var feet = Math.round(miles * 5280);

        console.log("Distance in miles: ", miles, "mi");
        console.log("Distance in feet: ", feet, "ft");

        return (
            <div>
                <h6>{this.state.directionSummary}</h6>
                <h6>Distance: {(feet >= 5280) ? (Math.round(this.state.totalDistance * 0.00062137) + " mi") : (feet + " ft")}</h6>
                <h6>ETA: {(minutes >= 60) ? Math.floor(hours) : minutes}
                    {(minutes >= 60) ? (" h ") : (" min ")}
                    {(minutes > 60) && (Math.round((hours - Math.floor(hours)) * 60) + " min")}</h6>
                <div className='map'>
                    <div className='map-settings'>

                        {/* <span><p>Traffic</p> <Switch
                            offLabel="Off"
                            onChange={this.switchTrafficLayer}
                            onLabel="On"
                        /></span>

                        <span><p>Transit</p> <Switch
                            offLabel="Off"
                            onChange={this.switchTransitLayer}
                            onLabel="On"
                        /></span> */}

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
                                        <div>
                                            <DirectionsRenderer
                                                // required
                                                options={{
                                                    directions: this.state.response
                                                }}
                                                // optional
                                                onLoad={directionsRenderer => {
                                                    console.log('DirectionsRenderer onLoad directionsRenderer: ', directionsRenderer)
                                                }}
                                                // optional
                                                onUnmount={directionsRenderer => {
                                                    console.log('DirectionsRenderer onUnmount directionsRenderer: ', directionsRenderer)
                                                }}
                                            />
                                            {this.state.trafficLayer &&
                                                <TrafficLayer />
                                            }

                                            {/* {this.state.transitLayer &&
                                                <TransitLayer />
                                            } */}
                                        </div>
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