import React, { Component } from "react";
import axios from "axios";
export const jwtToken = localStorage.getItem("authorization");

export default class Login extends Component {
    constructor() {
        super();

        this.state = {
            username: null,
            password: null
        };
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleFormSubmit = event => {
        event.preventDefault();

        const endpoint = "http://localhost:8080/authenticate";

        const username = this.state.username;
        const password = this.state.password;

        const user_object = {
            username: username,
            password: password
        };

        console.log(user_object);
        if (user_object.username === null || user_object.password === null) {
            alert('Faltan datos para el login!!!')
        } else {
            axios.post(endpoint, user_object).then(res => {
                localStorage.setItem("authorization", res.data.token);
                return this.handleDashboard();
            });
        }

    };

    handleDashboard() {
        axios.get("http://localhost:8080/dashboard", { headers: { "Authorization": `Bearer ${jwtToken}` } }).then(res => {
            console.log(res.data);
            if (res.data === "success") {
                this.props.history.push("/home");
            } else {
                alert("Authentication failure");
                this.props.history.push("/");
            }
        });
    }

    handleUsuario = (e) => {
        e.preventDefault();
        const { event, target } = e

        console.warn(target.value);
        console.log(target.value);

        this.setState({
            username: target.value,
        })
    }

    handlePassword = (e) => {
        e.preventDefault();
        const { event, target } = e

        console.log(target.value);
        console.warn(target.value);

        this.setState({
            password: target.value,
        })
    }

    render() {
        return (
            <form class="form-signin" onSubmit={this.handleFormSubmit}>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Usuario</label>
                    <input type="text" onBlur={e => this.handleUsuario(e)} className="form-control" placeholder="Usuario" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" onBlur={e => this.handlePassword(e)} className="form-control" placeholder="Password" />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </form>
        );
    }
}