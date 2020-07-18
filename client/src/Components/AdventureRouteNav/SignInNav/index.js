import React, { Component } from "react";
import { Modal, Button, TextInput, Row, Col, SearchForm } from "react-materialize";
import axios from "axios";

class SignInNav extends Component {
    state = {
        username: '',
        password: '',
        error: false,
        redirectTo: null
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = e => {
        e.preventDefault();

        axios
            .post('/user/login', {
                username: this.state.username.trim(),
                password: this.state.password.trim()
            })
            .then(response => {
                console.log('login response: ')
                console.log(response.status);
                if (response.status === 200) {
                    // update App.js state
                    this.props.updateUser({
                        loggedIn: true,
                        username: response.data.username,
                        user: response.data.user,
                        routes: response.data.user.routes
                    });
                    // update the state to redirect to home
                    this.setState({
                        redirectTo: '/'
                    });
                }
            }).catch(error => {
                console.log('login error: ')
                console.log(error);
                this.setState({error: true});
            })
    }

    render() {
        const signInTrigger = this.props.trigger;
        return (
            <Modal header="Sign In" trigger={signInTrigger}>
                <Row>
                    <Col s={12}>
                        <form>
                            <TextInput
                                s={12}
                                label="username"
                                type="text"
                                name="username"
                                className="validate"
                                value={this.state.username}
                                onChange={this.handleChange}
                            />
                            <TextInput
                                s={12}
                                label="password"
                                type="password"
                                name="password"
                                className="validate"
                                value={this.state.password}
                                onChange={this.handleChange}
                            />
                            <Button onClick={this.handleSubmit} modal="confirm">Sign In</Button>

                            {this.state.error && <p class="error">Incorrect username or password!</p>}
                        </form>
                    </Col>
                </Row>
            </Modal>
        );
    }
}

export default SignInNav;