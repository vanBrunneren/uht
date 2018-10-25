/**
 *
 */

import React, { Component } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CircularProgress from '@material-ui/core/CircularProgress';

export default class Teams extends Component {

	constructor() {
		super();

		this.state = {
			isLoading: true,
			data: []
		}
	}

	componentDidMount() {
		fetch('/api/teams/list/all', {
			method: 'GET'
		})
		  .then(response => response.json())
		  .then(jsonResponse => this.setState({data: jsonResponse, isLoading: false}))
		  .catch(e => console.log(e));
	}

	render() {

		if(this.state.isLoading) {
			return(
				<CircularProgress
					size={40}
					left={-20}
					top={-20}
					status={'loading'}
					style={{marginLeft: '50%', marginTop: '25%'}} />
			);
		}

		let categories = [];
		let teams = [];
		if(this.state.data) {
			for(let data of this.state.data) {
				teams = [];
				for(let team of data.teams) {
					teams.push(
						<TableRow key={team.id}>
							<TableCell>{team.name}</TableCell>
						</TableRow>
					);
				}

				categories.push(
					<Table key={data.category.id}>
						<TableHead>
							<TableRow>
								<TableCell>{data.category.name}</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{teams}
						</TableBody>
					</Table>
				);
			}
		}
		return (
			<div>
				{categories}
			</div>
		);
	}
}
