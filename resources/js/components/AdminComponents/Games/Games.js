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
import EditIcon 			from '@material-ui/icons/Edit';
import TouchApp 			from '@material-ui/icons/TouchApp';
import Done 			    from '@material-ui/icons/Done';
import Clear 			    from '@material-ui/icons/Clear';

import Table 				from '@material-ui/core/Table';
import TableBody 			from '@material-ui/core/TableBody';
import TableCell 			from '@material-ui/core/TableCell';
import TableHead 			from '@material-ui/core/TableHead';
import TableRow 			from '@material-ui/core/TableRow';

const styles = theme => ({

    formControl: {
        margin: theme.spacing.unit,
        minWidth: '90%',
    },

    fab: {
		position: 'absolute',
		bottom: theme.spacing.unit * 2,
		right: theme.spacing.unit * 2,
	},

    goalCell: {
        width: '40px'
    },

    deleteLink: {
		cursor: 'pointer'
	},

    actionCell: {
		width: '5px'
	},

});

class Games extends Component {

    constructor() {
        super();

        this.state ={
            games: [],
            categories: [],
            isLoading: true,
            open: false,
            editOpen: false,
            selectedCategory: 19,
            teams: [],
            selectedTeam_1: '',
            selectedTeam_2: '',
            category: [],
        }
    }

    onDeleteClick(id) {
		fetch('/api/games/'+id, {
			method: 'DELETE'
		})
			.then(response => response.json())
			.then(jsonResponse => {
				if(jsonResponse == 1) {
					this.setState({isLoading: true});
					this.loadGames();
				}
			})
			.catch(e => console.log(e));
	}

    onSavePress() {

        let gameFormData = new FormData();
        gameFormData.append("team_1_id", this.state.selectedTeam_1);
        gameFormData.append("team_2_id", this.state.selectedTeam_2);
        gameFormData.append("length", this.state.gameLength);
        gameFormData.append("start_datetime", this.state.gameDate);

        fetch('/api/games', {
            method: 'POST',
            body: gameFormData
        })
          .then(response => response.json())
          .then(jsonResponse => this.setState({games: jsonResponse, isLoading: false}))
          .catch(e => console.log(e));

    }

    onEditPress() {

        let gameFormData = new FormData();
        gameFormData.append("length", this.state.gameLength);
        gameFormData.append("start_datetime", this.state.gameDate);

        console.log(gameFormData, this.state);

        /*
        fetch('/api/games/'+this.state.editId, {
            method: 'PUT',
            body: gameFormData
        })
          .then( response => response.json())
          .then(jsonResponse => this.setState({games: jsonResponse, isLoading: false}))
          .catch(e => console.log(e));
          */
    }

    handleToggle() {
        this.setState({open: !this.state.open});
    }

    closeEdit() {
        this.setState({editOpen: false, editId: false});
    }

    openEdit(id) {
        this.setState({
            editOpen: true,
            editId: id
        });
    }

    onCategorySelect(event, value) {
        this.setState({selectedCategory: value.props.value}, () => {
            this.loadTeams();
        });
    }

    onTeam1Select(event, value) {
        this.setState({selectedTeam_1: value.props.value});
    }

    onTeam2Select(event, value) {
        this.setState({selectedTeam_2: value.props.value});
    }

    onGoalPress(gameId, inputGoals, teamId, mode) {

        let goals
        if(mode === "+") {
            goals = ++inputGoals
        } else {
            if(inputGoals > 0) {
                goals = --inputGoals
            }
        }

        let goalData = new FormData();
        goalData.append('game_id', gameId);
        goalData.append('team_id', teamId);
        goalData.append('goals', goals);

        fetch('/api/games/goal', {
            method: 'POST',
            body: goalData
        })
            .then( () => {
                this.setState({isLoading: true})
                this.loadGames()
            })
            .catch(e => console.log(e));

    }

    onCategoryChange(e) {
        if(e.target.name === "category-select") {
            this.setState({selectedCategory: e.target.value, isLoading: true}, () => this.loadGames());
        }
    }

    finishGame(gameId) {
        this.setState({isLoading: true});
        fetch('/api/games/finish/'+gameId, {
			method: 'GET'
		})
		  .then( () => this.loadGames() )
    }

    loadGames() {
        fetch('/api/games/getgamesbycategory/'+this.state.selectedCategory, {
			method: 'GET'
		})
		  .then(response => response.json())
		  .then(jsonResponse => this.setState({games: jsonResponse, isLoading: false}))
		  .catch(e => console.log(e));
    }

    loadCategories() {
        fetch('/api/categories', {
            method: 'GET'
        })
            .then(response => response.json())
            .then(jsonResponse => this.setState({categories: jsonResponse}))
            .catch(e => console.log(e));
    }

    loadTeams() {
        fetch('/api/teams/list/'+this.state.selectedCategory, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(jsonResponse => {
                this.setState({
                    teams: jsonResponse.teams,
                    category: jsonResponse.category,
                    isLoading: false,
                    gameDate: jsonResponse.category.start_datetime,
                    gameLength: "00:12:00"
                });
            })
            .catch(e => console.log(e));
    }

    componentDidMount() {
        this.loadGames();
        this.loadCategories();
        this.loadTeams();
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

        let categories = [];
        let select;
        if(this.state.categories) {
            for(let cat of this.state.categories) {
                categories.push(
                    <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
                );
            }

            let values = [];
            for(let cat of this.state.categories) {
                values.push(
                    <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
                );
            }

            select = (
                <form className={classes.root} autoComplete="off">
                    <FormControl className={classes.formControl}>
                        <Select
                            value={this.state.selectedCategory}
                            onChange={this.onCategoryChange.bind(this)}
                            inputProps={{
                                name: 'category-select',
                                id: 'category-select',
                            }}>
                            {values}
                        </Select>
                    </FormControl>
                </form>
            );

        }

        let teams = [];
        if(this.state.teams) {
            teams = this.state.teams.map( team => {
                return(
                    <MenuItem key={team.id} value={team.id}>{team.name}</MenuItem>
                );
            });
        }

        let games = [];
		if(this.state.games) {
			for(let game of this.state.games) {

                let finishedIcon;
                if(game.finished) {
                    finishedIcon = <Clear />
                } else {
                    finishedIcon = <Done />
                }

                games.push(
                    <TableRow key={game.id}>
                        <TableCell>{game.id}</TableCell>
						<TableCell>{game.start_datetime}</TableCell>
						<TableCell>{game.length}</TableCell>
						<TableCell>
                            <button onClick={ () => this.onGoalPress(game.id, game.team_1_goals, 1, "+")}>+</button>
                            {game.t1Name}
                            <button onClick={ () => this.onGoalPress(game.id, game.team_1_goals, 1, "-")}>-</button>
                        </TableCell>
						<TableCell>
                            <button onClick={ () => this.onGoalPress(game.id, game.team_2_goals, 2, "+")}>+</button>
                            {game.t2Name}
                            <button onClick={ () => this.onGoalPress(game.id, game.team_2_goals, 2, "-")}>-</button>
                        </TableCell>
						<TableCell className={classes.goalCell}>{game.team_1_goals}:{game.team_2_goals}</TableCell>
                        <TableCell className={classes.actionCell}>
                            <a className={classes.deleteLink} onClick={() => this.finishGame(game.id)}>{finishedIcon}</a>
                        </TableCell>
                        <TableCell>
                            <a href={"/matchview/" + game.id}>
                                <TouchApp />
                            </a>
                        </TableCell>
                        <TableCell className={classes.actionCell}>
                            <a className={classes.deleteLink} onClick={() => this.openEdit(game.id)}><EditIcon /></a>
                        </TableCell>
                        <TableCell className={classes.actionCell}>
                            <a className={classes.deleteLink} onClick={() => this.onDeleteClick(game.id)}><DeleteIcon /></a>
                        </TableCell>
					</TableRow>
                )
            }
        }

        let category_starttime;
        if(this.state.category && this.state.category.start_datetime) {
            category_starttime = this.state.category.start_datetime.replace(" ", "T");
        }

        return(
            <div>
                {select}
                <Table>
					<TableHead>
						<TableRow>
							<TableCell>#</TableCell>
							<TableCell>Startzeit</TableCell>
							<TableCell>Länge</TableCell>
							<TableCell>Team 1</TableCell>
							<TableCell>Team 2</TableCell>
							<TableCell>Resultat</TableCell>
							<TableCell>Spiel beendet</TableCell>
							<TableCell>Spiel starten</TableCell>
                            <TableCell>Bearbeiten</TableCell>
                            <TableCell>Löschen</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{games}
					</TableBody>
				</Table>
                <Button variant="fab" className={fab.className} color={fab.color} onClick={ () => this.handleToggle() }>
					{fab.icon}
				</Button>

                <Dialog
                    open={this.state.editOpen}
                    onClose={ () => this.closeEdit() }
                    aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Spiel bearbeiten</DialogTitle>
                    <DialogContent>
                        <FormControl className={classes.formControl}>
                            <TextField
                                onChange={ (e) => this.setState({gameLength: e.target.value})}
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
    							onChange={ (e) => this.setState({gameDate: e.target.value})}
    							id="datetime-local"
    							label="Startzeit"
    							type="datetime-local"
    							defaultValue={category_starttime}
    							className={classes.textField}
    							InputLabelProps={{
    								shrink: true,
    							}} />
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
            			<Button onClick={ () => this.closeEdit() } color="primary">
              				Abbrechen
            			</Button>
            			<Button onClick={this.onEditPress.bind(this) } color="primary">
            				Speichern
            			</Button>
          			</DialogActions>
                </Dialog>

                <Dialog
					open={this.state.open}
					onClose={ () => this.handleToggle() }
					aria-labelledby="form-dialog-title">
          			<DialogTitle id="form-dialog-title">Spiel erstellen</DialogTitle>
					<DialogContent>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="category">Kategorie</InputLabel>
                            <Select
                                value={this.state.selectedCategory}
                                onChange={this.onCategorySelect.bind(this)}
                                inputProps={{
                                    name: 'Kategorie',
                                    id: 'category',
                                }}>
                                {categories}
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="team_id_1">Team 1</InputLabel>
                            <Select
                                value={this.state.selectedTeam_1}
                                onChange={this.onTeam1Select.bind(this)}
                                inputProps={{
                                    name: 'Team 1',
                                    id: 'team_id_1',
                                }}>
                                {teams}
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="team_id_2">Team 2</InputLabel>
                            <Select
                                value={this.state.selectedTeam_2}
                                onChange={this.onTeam2Select.bind(this)}
                                inputProps={{
                                    name: 'Team 2',
                                    id: 'team_id_2',
                                }}>
                                {teams}
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <TextField
                                onChange={ (e) => this.setState({gameLength: e.target.value})}
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
    							onChange={ (e) => this.setState({gameDate: e.target.value})}
    							id="datetime-local"
    							label="Startzeit"
    							type="datetime-local"
    							defaultValue={category_starttime}
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
            			<Button onClick={this.onSavePress.bind(this) } color="primary">
            				Speichern
            			</Button>
          			</DialogActions>
        		</Dialog>
            </div>
        )
    }

}

export default withStyles(styles)(Games);
