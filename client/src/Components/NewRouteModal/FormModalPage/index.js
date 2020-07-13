import React, { Component } from "react";
import { Button, TextInput, Textarea, Select } from "react-materialize";


class FormModalPage extends Component {
    state = {
        route_name: '',
        description: '',
        price_category: '',
        activities: '',
        origin: '',
        waypoints: [],
        destination: ''
    }

    handleModalSubmit = () => {
        if (this.state.origin !== '' &&
            this.state.destination !== '') {

            this.props.update({
                origin: this.state.origin,
                waypoints: this.state.waypoints,
                destination: this.state.destination,
                modalPage: false
            });

            this.props.addRoute({
                name: this.state.route_name,
                description: this.state.description,
                activities: this.state.activities,
                price_category: this.state.price_category,
                route: {
                    origin: this.state.origin,
                    waypoints: this.state.waypoints,
                    destination: this.state.destination
                }
            });
        }
        
        else {
            console.log("Not all locations added!");
        }
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    addNewWaypoint = e => {
        e.preventDefault();
        this.setState(prevState => ({ waypoints: [...prevState.waypoints, { location: '' }] }));
    }

    changeWaypoint = event => {
        const tempWaypoints = this.state.waypoints.slice();
        tempWaypoints[event.target.id].location = event.target.value;
        this.setState({ waypoints: tempWaypoints });
    }
    
    deleteAllWaypoints = e => {
        e.preventDefault();
        this.setState({ waypoints: [] });
    }

    render() {
        return (
            <div>
                <h2>New Route</h2>
                <div className='row'>
                    <form className="col s12">
                        <TextInput
                            className='form-control'
                            label="route name"
                            name="route_name"
                            type='text'
                            s={12}
                            onChange={this.handleChange}
                            value={this.state.route_name}
                        />

                        <Textarea
                            className='form-control'
                            s={12}
                            label="route description"
                            name="description"
                            type='text'
                            onChange={this.handleChange}
                            value={this.state.description}
                        />

                        <Select
                            s={6}
                            onChange={this.handleChange}
                            multiple={false} options={{
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
                            value=''
                        >
                            <option
                                disabled
                                value=""
                            >
                                Pick activity categories
                            </option>
                            <option value="Music">
                                Music
                            </option>
                            <option value="Food/Drink">
                                Food/Drink
                            </option>
                            <option value="Sports">
                                Sports
                            </option>
                            <option value="Comedy">
                                Comedy
                            </option>
                            <option value="Movie">
                                Movie
                            </option>
                        </Select>

                        <Select
                            s={6}
                            multiple={false}
                            onChange={this.handleChange}
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
                            value='free'
                        >
                            <option value="free">Pick price category</option>
                            <option value="$">$</option>
                            <option value="$$">$$</option>
                            <option value="$$$">$$$</option>
                            <option value="$$$$">$$$$</option>
                        </Select>

                        <TextInput
                            className='form-control'
                            label="start"
                            name="origin"
                            type='text'
                            s={12}
                            onChange={this.handleChange}
                            value={this.state.origin}
                        />

                        { this.state.waypoints.map((waypoint, i) => 
                            <TextInput
                                className='form-control'
                                label="stop"
                                type='text'
                                key={i}
                                id={i.toString()}
                                s={12}
                                onChange={this.changeWaypoint}
                                value={waypoint.location}
                            />
                        )}

                        <Button onClick={this.addNewWaypoint}>Add Stop</Button>

                        { (this.state.waypoints.length !== 0) && <Button onClick={this.deleteAllWaypoints}>Delete all waypoints</Button> }

                        <TextInput
                            className='form-control'
                            label="end"
                            name="destination"
                            type='text'
                            s={12}
                            onChange={this.handleChange}
                            value={this.state.destination}
                        />
                    </form>
                </div>

                <Button onClick={this.handleModalSubmit} waves="orange">Render Map</Button>

                <p className="error"></p>
            </div>
        )
    }
}

export default FormModalPage;