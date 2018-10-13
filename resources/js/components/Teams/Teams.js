/**
 *
 */

import React, { Component } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

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
                    <TableRow key={team.id}>
                        <TableCell>{team.name}</TableCell>
                    </TableRow>
                );
            }
        }
        return (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {teams}
                </TableBody>
            </Table>
        );
    }
}
