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
    }

});

class Frontpage extends Component {

	constructor() {
		super();

		this.state = {
			isLoading: true,
			categories: [],
            selectedCategory: 32,
            teams: []
		}
	}

    onCategoryChange(e) {
        if(e.target.name === "category-select") {
            this.setState({selectedCategory: e.target.value, isLoading: true}, () => this.loadTeams());
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

    loadTeams() {
		fetch('/api/teams/list/' + this.state.selectedCategory, {
			method: 'GET'
		})
		  .then(response => response.json())
		  .then(jsonResponse => this.setState({teams: jsonResponse, isLoading: false}))
		  .catch(e => console.log(e));
    }

    componentDidMount() {
        this.loadCategories();
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

        let teamList = [];
        if(this.state.teams.teams) {
            for(let team of this.state.teams.teams) {
                teamList.push(
                    <Link to={'/games/'+team.id} key={team.id}>
                        <Button variant="contained" color="primary" className={classes.frontPageTeamListItem}>
                            {team.name}
                        </Button>
                    </Link>
                )
            }
        }

		return (
			<div className={classes.frontpageContainer}>
                {select}
                {teamList}
			</div>
		);
	}
}

export default withStyles(styles)(Frontpage);
