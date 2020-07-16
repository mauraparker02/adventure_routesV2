import React, { Component } from "react";
import { Button, TextInput, Textarea, Select, Row } from "react-materialize";
import ImageUploader from 'react-images-upload';

import "./style.css";


class FormModalPage extends Component {
    state = {
        picture: null,
        name: '',
        description: '',
        price_category: '',
        activities: '',
        origin: '',
        waypoints: [],
        destination: '',
        error: false
    }

    handleModalSubmit = () => {
        if (this.state.name.trim() !== '' &&
            this.state.origin.trim() !== '' &&
            this.state.destination.trim() !== '') {

            let tempWaypoints = this.state.waypoints.slice();
            tempWaypoints = tempWaypoints.filter(waypoint => waypoint.location !== '');

            console.log("Route object: ", this.state);

            this.props.update({
                name: this.state.name,
                description: this.state.description,
                price_category: this.state.price_category,
                activities: this.state.activities,
                origin: this.state.origin,
                waypoints: tempWaypoints,
                destination: this.state.destination,
                modalPage: false
            });

            if (this.props.loggedIn) {
                this.props.addRoute({
                    picture: this.state.picture,
                    name: this.state.name,
                    description: this.state.description,
                    activities: this.state.activities,
                    price_category: this.state.price_category,
                    route: {
                        origin: this.state.origin,
                        waypoints: tempWaypoints,
                        destination: this.state.destination
                    }
                });
            }
        }

        else {
            this.setState({ error: true });
        }
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    changePicture = e => {
        this.setState({ picture: e.target.files[0] });
    }

    addNewWaypoint = e => {
        e.preventDefault();
        this.setState(prevState => ({ waypoints: [...prevState.waypoints, { location: '' }] }));
    }

    changeWaypoint = e => {
        const tempWaypoints = this.state.waypoints.slice();
        tempWaypoints[e.target.id].location = e.target.value;
        this.setState({ waypoints: tempWaypoints });
    }

    deleteWaypoint = e => {
        e.preventDefault();
        const tempWaypoints = this.state.waypoints.slice();
        tempWaypoints.splice(e.target.id, 1);
        this.setState({ waypoints: tempWaypoints });
    }

    deleteAllWaypoints = e => {
        e.preventDefault();
        this.setState({ waypoints: [] });
    }

    render() {
        return (
            <div>
                <div className='row'>
                    <form className="col s12">
                        {/* <Row>

                            <Button>Upload Image</Button>
                        </Row> */}
                        {/* <ImageUploader
                            withIcon={true}
                            withPreview={true}
                            singleImage={true}
                            buttonText='Choose images'
                            onChange={this.onDrop}
                            imgExtension={['.jpg', '.gif', '.png', '.gif']}
                            maxFileSize={5242880}
                        /> */}

                        <input type="file" onChange={this.changePicture}/>

                        <TextInput
                            className='form-control'
                            label="name"
                            name="name"
                            type='text'
                            s={12}
                            onChange={this.handleChange}
                            value={this.state.name}
                        />

                        <Textarea
                            className='form-control'
                            s={12}
                            label="description"
                            name="description"
                            type='text'
                            onChange={this.handleChange}
                            value={this.state.description}
                        />

                        <Select
                            s={6}
                            onChange={this.handleChange}
                            multiple={false}
                            name="activities"
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
                            value=''
                        >
                            <option
                                disabled
                                value=""
                            >
                                Pick activity categories
                            </option>
                            <option value="N/A">
                                N/A
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
                            name="price_category"
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
                            value=''
                        >
                            <option
                                disabled
                                value=""
                            >
                                Pick price category
                            </option>
                            <option value="free">Free</option>
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

                        {this.state.waypoints.map((waypoint, i) => (
                            <div>
                                <TextInput
                                    className='form-control'
                                    label="stop"
                                    type='text'
                                    key={i}
                                    id={i.toString()}
                                    s={12}
                                    onChange={this.changeWaypoint}
                                    value={waypoint.location}
                                >
                                    <Button onClick={this.deleteWaypoint} id={i.toString()}>Delete Stop</Button>
                                </TextInput>
                            </div>
                        ))}

                        <Row>
                            <Button onClick={this.addNewWaypoint}>New Stop</Button>
                            {(this.state.waypoints.length !== 0) && <Button onClick={this.deleteAllWaypoints}>Delete All Stops</Button>}
                        </Row>

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

                <Button onClick={this.handleModalSubmit} waves="orange">{(this.props.loggedIn) && "Save Route & "}Render Map</Button>

                {this.state.error && <p class="error">Not all items filled! Route name, start, and end point is required!</p>}
            </div>
        )
    }
}

export default FormModalPage;