/**
 *
 */

import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import TextField from '@material-ui/core/TextField';

export default class CategoryCreate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            start: '',
            redirect: false
        };

        this.changeName = this.changeName.bind(this);
        this.changeStart = this.changeStart.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    changeName(event) {
        this.setState({name: event.target.value});
    }

    changeStart(event) {
        this.setState({start: event.target.value});
    }

    handleSubmit(event) {
        if(this.state.name && this.state.start) {
            fetch('/api/categories', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: this.state.name,
                    start: this.state.start
                })
            })
                .then(response => response.json())
                .then(jsonResponse => {

                    if(jsonResponse === 1) {
                        console.log(jsonResponse);
                        this.setState({redirect: true});
                    }
                })
                .catch(e => console.log(e));

        } else {
            console.log("notsend", this.state);
        }
        event.preventDefault();
    }

    render() {

        if(this.state.redirect) {
            return <Redirect to="/category/list" />;
        }

        console.log(this.state);

        /*
        <form onSubmit={this.handleSubmit}>
            <TextField hintText="Name" fullWidth={true} onChange={this.changeName} />
            <TextField hintText="Start Datetime" fullWidth={true} onChange={this.changeStart} />
            <RaisedButton label="Primary" primary={true} onClick={this.handleSubmit} style={{marginTop: 12}} />
        </form>
        */

        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Kategorie erstellen</div>
                            <div className="card-body">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}
