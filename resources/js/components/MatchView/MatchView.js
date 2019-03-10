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
    },

    buttons: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%'
    },

    oneButtons: {
        width: '35%',
        display:'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        fontSize: 30
    },

    middleButtons: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '30%',
    },

    twoButtons: {
        width: '35%',
        display:'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        fontSize: 30
    },

    image: {
        width: '200px'
    },

    imageContainer: {
        padding: '40px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }

});

let interval = null

class MatchView extends Component {

    constructor() {
        super();

        this.state = {
            game: [],
            isLoading: true,
            minutes: 12,
            seconds: 0,
            finish: false,
            isTicking: false,
            gameId: 9
        };

    }

    goal(teamId, mode) {

        let game = this.state.game
        if(mode === "+") {
            game['team_'+teamId+'_goals']++
        } else {
            if(game['team_'+teamId+'_goals'] > 0) {
                game['team_'+teamId+'_goals']--
            }
        }

        let goalData = new FormData();
        goalData.append("game_id", this.state.gameId);
        goalData.append('team_id', teamId);
        goalData.append('goals', game['team_'+teamId+'_goals']);

        fetch('/api/games/goal', {
            method: 'POST',
            body: goalData
        }).catch(e => console.log(e));

        this.setState({
            game
        })

    }

    loadGame() {
        fetch('/api/games/'+this.state.gameId, {
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

    tick() {
        if(this.state.seconds < 1) {
            if(this.state.minutes < 1) {
                this.setState({
                    minutes: 0,
                    seconds: 0,
                    finish: true
                })
                clearInterval(interval)
                this.setState({
                    isTicking: false
                })
            } else {
                this.setState({
                    minutes: this.state.minutes - 1,
                    seconds: 59
                });
            }
        } else {
            this.setState({
                seconds: this.state.seconds - 1
            });
        }
    }

    toggleTime() {
        if(this.state.isTicking) {
            clearInterval(interval)
        } else {
            interval = setInterval(
                function() {
                    this.tick();
                }
                .bind(this),
                1000
            )
        }
        this.setState({isTicking: !this.state.isTicking})
    }

    startTime() {
        this.setState({
            isTicking: true
        })
        interval = setInterval(
            function() {
                this.tick();
            }
            .bind(this),
            1000
        );
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

        let time = ''
        if(this.state.minutes < 10) {
            time += '0'+this.state.minutes
        } else {
            time += this.state.minutes
        }
        time += ':'
        if(this.state.seconds < 10) {
            time += '0'+this.state.seconds
        } else {
            time += this.state.seconds
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
                        <div className={classes.goalsPlaceholder} style={{backgroundColor: this.state.isTicking ? 'green' : 'red' }}>
                            <p>{time}</p>
                        </div>
                        <div className={classes.team2Goals}>
                            <p>{this.state.game.team_2_goals}</p>
                        </div>
                    </div>
                    <div className={classes.buttons}>
                        <div className={classes.oneButtons}>
                            <button onClick={ () => this.goal(1, '+')}>
                                +
                            </button>
                            <button onClick={ () => this.goal(1, '-')}>
                                -
                            </button>
                        </div>
                        <div className={classes.middleButtons}>
                            <button onClick={ () => {
                                if(this.state.minutes < 59) {
                                    this.setState({minutes: this.state.minutes += 1})
                                }
                            }}>
                                +
                            </button>
                            <button onClick={ () => {
                                if(this.state.minutes > 0) {
                                    this.setState({minutes: this.state.minutes -= 1})
                                }
                            }}>
                                -
                            </button>
                            <button onClick={this.toggleTime.bind(this)}>
                                {this.state.isTicking ? 'Pause' : 'Fortsetzen'}
                            </button>
                            <button onClick={ () => this.setState({minutes: 12, seconds: 0})}>
                                Zeit setzen
                            </button>
                            <button onClick={ () => {
                                if(this.state.seconds + 1 === 60) {
                                    this.setState({seconds: 0, minutes: this.state.minutes += 1})
                                } else {
                                    this.setState({seconds: this.state.seconds += 1})
                                }
                            }}>
                                +
                            </button>
                            <button onClick={ () => {
                                if(this.state.seconds - 1 < 0) {
                                    if(this.state.minutes > 0) {
                                        this.setState({seconds: 59, minutes: this.state.minutes -= 1})
                                    }
                                } else {
                                    this.setState({seconds: this.state.seconds -= 1})
                                }
                            }}>
                                -
                            </button>
                        </div>
                        <div className={classes.twoButtons}>
                            <button onClick={ () => this.goal(2, '+')}>
                                +
                            </button>
                            <button onClick={ () => this.goal(2, '-')}>
                                -
                            </button>
                        </div>
                    </div>
                    <div className={classes.imageContainer}>
                        <img src="https://unihockey-team-brunegg.ch/wp-content/uploads/2018/07/highflyers_logo.png" className={classes.image} />
                    </div>
                </div>
            </div>
        )

    }

}

export default withStyles(styles)(MatchView);
