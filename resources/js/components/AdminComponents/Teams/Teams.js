/**
 *
 * 	Team List Component
 *
 * 	@author Pascal Brunner <info@pascalbrunner.ch>
 *  @copyright Pascal Brunner 2018-10-28
 *
 */

import React, { Component } from 'react';

import Table 				from '@material-ui/core/Table';
import TableBody 			from '@material-ui/core/TableBody';
import TableCell 			from '@material-ui/core/TableCell';
import TableHead 			from '@material-ui/core/TableHead';
import TableRow 			from '@material-ui/core/TableRow';
import CircularProgress 	from '@material-ui/core/CircularProgress';
import { withStyles } 		from '@material-ui/core/styles';

import DeleteIcon 			from '@material-ui/icons/Delete';

const styles = theme => ({

	actionCell: {
		width: '100px'
	},

	deleteLink: {
		cursor: 'pointer'
	}

});

class Teams extends Component {

	constructor() {
		super();

		this.state = {
			isLoading: true,
			data: []
		}
	}

	onDeleteClick(id) {
		fetch('/api/teams/'+id, {
			method: 'DELETE'
		})
			.then(response => response.json())
			.then(jsonResponse => {
				if(jsonResponse == 1) {
					this.setState({isLoading: true});
					this.loadTeams();
				}
			})
			.catch(e => console.log(e));
	}

	loadTeams() {
		fetch('/api/teams/list/all', {
			method: 'GET'
		})
		  .then(response => response.json())
		  .then(jsonResponse => this.setState({data: jsonResponse, isLoading: false}))
		  .catch(e => console.log(e));
	}

	componentDidMount() {
		this.loadTeams();
	}

	render() {

		const { classes } = this.props;

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
				let counter = 0
				for(let team of data.teams) {
					counter++
					teams.push(
						<TableRow key={team.id}>
							<TableCell width="10px">{counter}</TableCell>
							<TableCell>{team.name}</TableCell>
							<TableCell className={classes.actionCell}>
								<a className={classes.deleteLink} onClick={() => this.onDeleteClick(team.id)}><DeleteIcon /></a>
							</TableCell>
						</TableRow>
					);
				}

				categories.push(
					<Table key={data.category.id}>
						<TableHead>
							<TableRow>
								<TableCell>#</TableCell>
								<TableCell>{data.category.name}</TableCell>
								<TableCell className={classes.actionCell}>Action</TableCell>
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

export default withStyles(styles)(Teams);
