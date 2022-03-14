/**
 *
 * 	Team List Component
 *
 * 	@author Pascal Brunner <info@pascalbrunner.ch>
 *  @copyright Pascal Brunner 2018-10-28
 *
 */

import React, { Component } from 'react';

import FormControl          from '@material-ui/core/FormControl';
import Select               from '@material-ui/core/Select';
import InputLabel           from '@material-ui/core/InputLabel';
import MenuItem             from '@material-ui/core/MenuItem';
import CircularProgress 	from '@material-ui/core/CircularProgress';
import Button               from '@material-ui/core/Button';
import { withStyles } 		from '@material-ui/core/styles';

import { Link } 			from "react-router-dom";

import Table 				from '@material-ui/core/Table';
import TableBody 			from '@material-ui/core/TableBody';
import TableCell 			from '@material-ui/core/TableCell';
import TableHead 			from '@material-ui/core/TableHead';
import TableRow 			from '@material-ui/core/TableRow';

import Paper from '@material-ui/core/Paper';

const styles = theme => ({

    frontpageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column'
    },

    frontPageTeamListItem: {
        flex: 1,
        alignItems: 'center',
        margin: '10px'
    },

    root: {
        marginTop: '10px',
        marginBottom: '10px'
    },

    secondTable: {
        marginTop: '20px'
    },

    tablePaper: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },

});

class Frontpage extends Component {

	constructor() {
		super();

		this.state = {
			isLoading: true,
			categories: [],
            selectedCategory: 32,
            score: []
		}
	}

    onCategoryChange(e) {
        if(e.target.name === "category-select") {
            this.setState({selectedCategory: e.target.value, isLoading: true}, () => this.loadScore());
        }
    }

    loadCategories() {
        fetch('/api/categories', {
			method: 'GET'
		})
		  .then(response => response.json())
		  .then(jsonResponse => this.setState({categories: jsonResponse, isLoading: false}))
		  .catch(e => console.log(e));
    }

    loadScore() {
		fetch('/api/games/getscore/' + this.state.selectedCategory, {
			method: 'GET'
		})
		  .then(response => response.json())
		  .then(jsonResponse => this.setState({score: jsonResponse, isLoading: false}))
		  .catch(e => console.log(e));

    }

    componentDidMount() {
        this.loadCategories();
        this.loadScore();

        const interval = setInterval(
            function() {
                this.loadScore();
            }
            .bind(this),
            10000
        );

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

        let select;
        if(this.state.categories) {

            let values = [];
            for(let cat of this.state.categories) {
                values.push(
                    <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
                );
            }

            select = (
                <form className={classes.root} autoComplete="off">
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="category-select">Kategorie ändern</InputLabel>
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

        let table1;
        let table2;
        if(this.state.score) {

            if(this.state.score.group1) {
                let group1 = [];
                let counter = 1;
                for(let team of this.state.score.group1) {
                    group1.push(
                        <TableRow key={team.team_name}>
                            <TableCell>{counter}</TableCell>
                            <TableCell>{team.team_name}</TableCell>
                            <TableCell>{team.gameCount}</TableCell>
                            <TableCell>{team.wins}</TableCell>
                            <TableCell>{team.eq}</TableCell>
                            <TableCell>{team.loos}</TableCell>
                            <TableCell>{team.shotGoals}</TableCell>
                            <TableCell>{team.receiveGoals}</TableCell>
                            <TableCell>{team.points}</TableCell>
                        </TableRow>
                    )
                    counter++;
                }
                table1 = (
                    <Paper className={classes.tablePaper}>
                        <Table>
        					<TableHead>
                                <TableRow>
                                    <TableCell colSpan={9}><b>Gruppe 1</b></TableCell>
                                </TableRow>
        						<TableRow>
        							<TableCell>#</TableCell>
        							<TableCell>Name</TableCell>
                                    <TableCell>Sp</TableCell>
        							<TableCell>S</TableCell>
        							<TableCell>U</TableCell>
        							<TableCell>N</TableCell>
        							<TableCell>T</TableCell>
        							<TableCell>GT</TableCell>
        							<TableCell>P</TableCell>
        						</TableRow>
        					</TableHead>
        					<TableBody>
        						{group1}
        					</TableBody>
        				</Table>
                    </Paper>
                )
            }

            if(this.state.score.group2) {
                let group2 = [];
                let counter2 = 1;
                for(let team of this.state.score.group2) {
                    group2.push(
                        <TableRow key={team.team_name}>
                            <TableCell>{counter2}</TableCell>
                            <TableCell>{team.team_name}</TableCell>
                            <TableCell>{team.gameCount}</TableCell>
                            <TableCell>{team.wins}</TableCell>
                            <TableCell>{team.eq}</TableCell>
                            <TableCell>{team.loos}</TableCell>
                            <TableCell>{team.shotGoals}</TableCell>
                            <TableCell>{team.receiveGoals}</TableCell>
                            <TableCell>{team.points}</TableCell>
                        </TableRow>
                    )
                    counter2++;
                }
                table2 = (
                    <Paper className={classes.tablePaper}>
                        <Table className={classes.secondTable}>
        					<TableHead>
                                <TableRow>
                                    <TableCell colSpan={9}><b>Gruppe 2</b></TableCell>
                                </TableRow>
        						<TableRow>
                                    <TableCell>#</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Sp</TableCell>
                                    <TableCell>S</TableCell>
                                    <TableCell>U</TableCell>
                                    <TableCell>N</TableCell>
                                    <TableCell>T</TableCell>
                                    <TableCell>GT</TableCell>
                                    <TableCell>P</TableCell>
        						</TableRow>
        					</TableHead>
        					<TableBody>
        						{group2}
        					</TableBody>
        				</Table>
                    </Paper>
                )
            }

        }

		return (
			<div className={classes.frontpageContainer}>
                {select}
                {table1}
                {table2}
			</div>
		);
	}
}

export default withStyles(styles)(Frontpage);
