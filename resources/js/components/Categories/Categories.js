/**
 *
 * 	Category Component
 *
 * 	@author Pascal Brunner <info@pascalbrunner.ch>
 *  @copyright Pascal Brunner 2018-10-28
 *
 */

import React, { Component } from 'react';
import { Link } 			from "react-router-dom";

import Table 				from '@material-ui/core/Table';
import TableBody 			from '@material-ui/core/TableBody';
import TableCell 			from '@material-ui/core/TableCell';
import TableHead 			from '@material-ui/core/TableHead';
import TableRow 			from '@material-ui/core/TableRow';
import CircularProgress 	from '@material-ui/core/CircularProgress';
import Button 				from '@material-ui/core/Button';
import Dialog 				from '@material-ui/core/Dialog';
import DialogActions 		from '@material-ui/core/DialogActions';
import DialogContent 		from '@material-ui/core/DialogContent';
import DialogContentText 	from '@material-ui/core/DialogContentText';
import DialogTitle 			from '@material-ui/core/DialogTitle';
import TextField 			from '@material-ui/core/TextField';
import { withStyles } 		from '@material-ui/core/styles';

import AddIcon 				from '@material-ui/icons/Add';
import DeleteIcon 			from '@material-ui/icons/Delete';


const styles = theme => ({

	fab: {
		position: 'absolute',
		bottom: theme.spacing.unit * 2,
		right: theme.spacing.unit * 2,
	}

});

class Categories extends Component {

	constructor() {
		super();

		this.state = {
			isLoading: true,
			categories: [],
			open: false
		}
	}

	onSavePress() {

		if(this.state.categoryName && this.state.categoryDate) {

			let categoryFormData = new FormData();
			categoryFormData.append("name", this.state.categoryName);
			categoryFormData.append("start", this.state.categoryDate);

			fetch('/api/categories', {
				method: 'POST',
				body: categoryFormData
			})
			  .then(response => response.json())
			  .then(jsonResponse => this.setState({categories: jsonResponse, isLoading: false}))
			  .catch(e => console.log(e));


			this.setState({open: false});

		}
	}

	handleClickOpen() {
		this.setState({ open: true });
	}

	handleClose() {
		this.setState({ open: false });
	}

	onXClick(id) {

		/*
		fetch('/api/categories/'+id, {
			method: 'DELETE'
		})
			.then(response => response.json())
			.then(jsonResponse => {
				console.log(jsonResponse);
				if(jsonResponse == 1) {
					this.setState({isLoading: true});
					this.loadCategories();
				}
			})
			.catch(e => console.log(e));
		*/

	}

	loadCategories() {
		fetch('/api/categories', {
			method: 'GET'
		})
		  .then(response => response.json())
		  .then(jsonResponse => this.setState({categories: jsonResponse, isLoading: false}))
		  .catch(e => console.log(e));
	}

	componentDidMount() {
		this.loadCategories();
	}

	render() {

		if(this.state.isLoading) {
			return(
				<div className={this.props.classes.loadingContainer}>
					<CircularProgress
						size={40}
						left={-20}
						top={-20}
						status={'loading'}
						style={{marginLeft: '50%', marginTop: '25%'}} />
				</div>
			)
		}

		const { classes } = this.props;

		const fab = {
			color: 'primary',
			className: classes.fab,
			icon: <AddIcon />,
		};

		let categories = [];
		if(this.state.categories) {
			for(let category of this.state.categories) {
				categories.push(
					<TableRow key={category.id}>
						<TableCell>{category.name}</TableCell>
						<TableCell>{category.start_datetime}</TableCell>
					</TableRow>
				);
				//<TableCell><a onClick={() => this.onXClick(category.id)}><DeleteIcon /></a></TableCell>
			}
		}

		//<TableCell>Action</TableCell>
		return (
			<div>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell>Startzeit</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{categories}
					</TableBody>
				</Table>
				<Button variant="fab" className={fab.className} color={fab.color} onClick={ () => this.handleClickOpen() }>
					{fab.icon}
				</Button>
				<Dialog
					open={this.state.open}
					onClose={ () => this.handleClose() }
					aria-labelledby="form-dialog-title">
          			<DialogTitle id="form-dialog-title">Kategorie erstellen</DialogTitle>
					<DialogContent>
						<TextField
							onChange={ (e) => this.setState({categoryName: e.target.value})}
							autoFocus
							margin="dense"
							id="name"
							label="Name"
							type="text"
							fullWidth />
						<TextField
							onChange={ (e) => this.setState({categoryDate: e.target.value})}
							id="datetime-local"
							label="Startzeit"
							type="datetime-local"
							defaultValue=""
							className={classes.textField}
							InputLabelProps={{
								shrink: true,
							}} />
					</DialogContent>
         			<DialogActions>
            			<Button onClick={ () => this.handleClose() } color="primary">
              				Abbrechen
            			</Button>
            			<Button onClick={ () => this.onSavePress() } color="primary">
            				Speichern
            			</Button>
          			</DialogActions>
        		</Dialog>
			</div>
		);
	}
}

export default withStyles(styles)(Categories);
