import React, { Component } from 'react';

export default class Teams extends Component {

    constructor() {
        super();

        this.state = {
            isLoading: true,
            teams: []
        }
    }

    componentDidMount() {
        fetch('/api/teams', {
            method: 'GET'
        })
          .then(response => response.json())
          .then(jsonResponse => this.setState({teams: jsonResponse, isLoading: false}))
          .catch(e => console.log(e));
    }

    render() {

        console.log(this.state);
        if(this.state.isLoading) {
            return(
                <div>
                    <p>Laden...</p>
                </div>
            )
        }

        let teams = [];
        if(this.state.teams) {
            for(let team of this.state.teams) {
                teams.push(
                    <div key={team.id}>
                        <p>{team.name}</p>
                    </div>
                );
            }
        }
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Alle Teams</div>

                            <div className="card-body">
                                {teams}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
