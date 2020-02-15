/**
 *
 * 	Games Component
 *
 * 	@author Pascal Brunner <info@pascalbrunner.ch>
 *  @copyright Pascal Brunner 2018-10-28
 *
 */

import React, { Component } from 'react';
import { withStyles } 		from '@material-ui/core/styles';
import CircularProgress 	from '@material-ui/core/CircularProgress';

import Table 				from '@material-ui/core/Table';
import TableBody 			from '@material-ui/core/TableBody';
import TableCell 			from '@material-ui/core/TableCell';
import TableHead 			from '@material-ui/core/TableHead';
import TableRow 			from '@material-ui/core/TableRow';

import Paper                from '@material-ui/core/Paper';

const styles = theme => ({

    gamesContainer: {
        display: 'flex',
        flexDirection: 'column'
    },

    gamesContainerTitle: {
        marginLeft: '10px',
        marginTop: '10px'
    },

    tablePaper: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },

});

class Games extends Component {

	constructor() {
		super();

		this.state = {
			isLoading: true,
            games: []
		}
	}

    loadGames(teamId) {
        fetch('/api/games/getgamesbyteamid/'+teamId, {
			method: 'GET'
		})
		  .then(response => response.json())
		  .then(jsonResponse => this.setState({games: jsonResponse, isLoading: false}))
		  .catch(e => console.log(e));
    }

    loadAllGames() {
        fetch('/api/games/getgamesbycategory/21', {
			method: 'GET'
		})
		  .then(response => response.json())
		  .then(jsonResponse => this.setState({games: jsonResponse, isLoading: false}))
          .catch(e => console.log(e));
    }

	componentDidMount() {
        if(this.props.match.params.id !== "all") {
            this.loadGames(this.props.match.params.id)
        } else {
            this.loadAllGames();
        }
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

        let games = [];
        if(this.state) {
            for(let game of this.state.games) {
                let parsedDate = new Date(game.start_datetime);
                games.push(
                    <TableRow key={game.id}>
                        <TableCell>{parsedDate.toTimeString().substr(0,8)}</TableCell>
                        <TableCell>{game.t1Name}</TableCell>
                        <TableCell>{game.t2Name}</TableCell>
                    </TableRow>
                );
            }
        }

		return (
			<div className={classes.gamesContainer}>
                <h1 className={classes.gamesContainerTitle}>Die nächsten Spiele</h1>
                <Paper className={classes.tablePaper}>
                    <Table>
    					<TableHead>
    						<TableRow>
    							<TableCell>Startzeit</TableCell>
    							<TableCell>Team 1</TableCell>
    							<TableCell>Team 2</TableCell>
    						</TableRow>
    					</TableHead>
    					<TableBody>
    						{games}
    					</TableBody>
    				</Table>
                </Paper>
			</div>
		);
	}
}

export default withStyles(styles)(Games);
