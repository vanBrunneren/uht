/**
 *
 * 	MatchView Component
 *
 * 	@author Pascal Brunner <info@pascalbrunner.ch>
 *  @copyright Pascal Brunner 2018-12-28
 *
 */

'use strict';

import React, { Component } from 'react';

import Countdown from 'react-countdown-now';

import CircularProgress 	from '@material-ui/core/CircularProgress';
import { withStyles }       from '@material-ui/core/styles';

const styles = theme => ({

    container: {
		backgroundColor: '#FFFFFF',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1101,
        display: 'flex'
	},

    content: {
        display: 'flex',
        flexDirection: 'column',
    //    backgroundColor: 'green',
        width: '100%'
    },

    firstRow: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%'
    },

    secondRow: {
        display: 'flex',
        flexDirection: 'row'
    },

    goalsPlaceholder: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 80,
    //    backgroundColor: 'orange'
    },

    team1: {
        fontSize: 74,
        padding: 0,
        margin: 0,
        width: '45%',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },

    team2: {
        fontSize: 74,
        padding: 0,
        margin: 0,
        width: '45%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },

    teamPlaceholder: {
        fontSize: 74,
        padding: 0,
        margin: 0,
    //    backgroundColor: 'lightblue',
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    team1Goals: {
        fontSize: 120,
        padding: 0,
        margin: 0,
        marginRight: 80,
        width: '45%',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },

    team2Goals: {
        fontSize: 120,
        padding: 0,
        margin: 0,
        marginLeft: 80,
        width: '45%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center'
    }

});

class MatchView extends Component {

    constructor() {
        super();

        this.state = {
            game: [],
            isLoading: true
        };

    }

    loadGame() {
        fetch('/api/games/8', {
            method: 'GET'
        })
            .then(response => response.json())
            .then(jsonResponse => {
                this.setState({
                    isLoading: false,
                    game: jsonResponse[0]
                });
            })
            .catch(e => console.log(e));
    }

    componentDidMount() {
        this.loadGame();
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

        return(
            <div className={classes.container}>
                <div className={classes.content}>
                    <div className={classes.firstRow}>
                        <div className={classes.team1}>
                            <p >{this.state.game.team_1}</p>
                        </div>
                        <div className={classes.teamPlaceholder}>
                            <p>:</p>
                        </div>
                        <div className={classes.team2}>
                            <p >{this.state.game.team_2}</p>
                        </div>
                    </div>
                    <div className={classes.secondRow}>
                        <div className={classes.team1Goals}>
                            <p>{this.state.game.team_1_goals}</p>
                        </div>
                        <div className={classes.goalsPlaceholder}>
                            <p>
                                <Countdown
                                    date={Date.now() + 10000}
                                    intervalDelay={0}
                                    precision={1}
                                    renderer={props => <div>{props.minutes}:{props.seconds}</div>}
                                />
                            </p>
                        </div>
                        <div className={classes.team2Goals}>
                            <p>{this.state.game.team_2_goals}</p>
                        </div>
                    </div>
                    <div>
                        <div>SPONSOR</div>
                    </div>
                </div>
            </div>
        )

    }

}

export default withStyles(styles)(MatchView);
