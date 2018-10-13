/**
 *
 */

import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";

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

        event.preventDefault();
    }

    render() {

        if(this.state.redirect) {
            return <Redirect to="/category/list" />;
        }

        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Kategorie erstellen</div>
                            <div className="card-body">
                                <form onSubmit={this.handleSubmit}>
                                    <label>
                                        Name:
                                        <input type="text" value={this.state.value} onChange={this.changeName} />
                                    </label>
                                    <label>
                                        Start Datetime:
                                        <input type="text" value={this.state.value} onChange={this.changeStart} />
                                    </label>
                                    <input type="submit" value="Submit" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}
