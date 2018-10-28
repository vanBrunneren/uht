/**
 *
 * 	Games Component
 *
 * 	@author Pascal Brunner <info@pascalbrunner.ch>
 *  @copyright Pascal Brunner 2018-10-28
 *
 */

'use strict';

import React, { Component } from 'react';

import Button 				from '@material-ui/core/Button';
import Dialog 				from '@material-ui/core/Dialog';
import DialogActions 		from '@material-ui/core/DialogActions';
import DialogContent 		from '@material-ui/core/DialogContent';
import DialogContentText 	from '@material-ui/core/DialogContentText';
import DialogTitle 			from '@material-ui/core/DialogTitle';
import TextField 			from '@material-ui/core/TextField';
import CircularProgress 	from '@material-ui/core/CircularProgress';
import InputLabel           from '@material-ui/core/InputLabel';
import MenuItem             from '@material-ui/core/MenuItem';
import FormControl          from '@material-ui/core/FormControl';
import Select               from '@material-ui/core/Select';
import { withStyles } 		from '@material-ui/core/styles';

import AddIcon 				from '@material-ui/icons/Add';
import DeleteIcon 			from '@material-ui/icons/Delete';

const styles = theme => ({

    formControl: {
        margin: theme.spacing.unit,
        minWidth: '90%',
    },

    fab: {
		position: 'absolute',
		bottom: theme.spacing.unit * 2,
		right: theme.spacing.unit * 2,
	}

});

class Games extends Component {

    constructor() {
        super();

        this.state ={
            games: [],
            isLoading: true,
            open: false
        }
    }

    onSavePress() {
        console.log("save");
    }

    handleToggle() {
        this.setState({open: !this.state.open})
    }

    loadGames() {
        fetch('/api/games', {
			method: 'GET'
		})
		  .then(response => response.json())
		  .then(jsonResponse => this.setState({games: jsonResponse, isLoading: false}))
		  .catch(e => console.log(e));
    }

    componentDidMount() {
        this.loadGames();
    }

    render() {

        const { classes } = this.props;

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

        const fab = {
			color: 'primary',
			className: classes.fab,
			icon: <AddIcon />,
		};

        return(
            <div>
                <Button variant="fab" className={fab.className} color={fab.color} onClick={ () => this.handleToggle() }>
					{fab.icon}
				</Button>
                <Dialog
					open={this.state.open}
					onClose={ () => this.handleToggle() }
					aria-labelledby="form-dialog-title">
          			<DialogTitle id="form-dialog-title">Spiel erstellen</DialogTitle>
					<DialogContent>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="category">Kategorie</InputLabel>
                            <Select
                                value={10}
                                onChange={this.handleChange}
                                inputProps={{
                                    name: 'Kategorie',
                                    id: 'category',
                                }}>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="team_id_1">Team 1</InputLabel>
                            <Select
                                value={20}
                                onChange={this.handleChange}
                                inputProps={{
                                    name: 'Team 1',
                                    id: 'team_id_1',
                                }}>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="team_id_2">Team 2</InputLabel>
                            <Select
                                value={30}
                                onChange={this.handleChange}
                                inputProps={{
                                    name: 'Team 2',
                                    id: 'team_id_2',
                                }}>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <TextField
                                id="time"
                                label="Länge (hh:mm:ss)"
                                type="time"
                                defaultValue="00:12:00"
                                className={classes.textField}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                inputProps={{
                                  step: 30, // 5 min
                                }} />
                        </FormControl>
                        <FormControl className={classes.formControl}>
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
                        </FormControl>
					</DialogContent>
         			<DialogActions>
            			<Button onClick={ () => this.handleToggle() } color="primary">
              				Abbrechen
            			</Button>
            			<Button onClick={ () => this.onSavePress() } color="primary">
            				Speichern
            			</Button>
          			</DialogActions>
        		</Dialog>
            </div>
        )
    }

}

export default withStyles(styles)(Games);
