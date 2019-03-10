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

class GameBoard extends Component {

	constructor() {
		super();

		this.state = {
			isLoading: true,
			data: []
		}
	}

	componentDidMount() {

        this.setState({
            isLoading: false
        })

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

	    return (
			<div>
                <p>Hallo</p>
            </div>
		);
	}
}

export default withStyles(styles)(GameBoard);
