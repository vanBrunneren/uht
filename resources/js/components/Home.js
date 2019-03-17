/**
 *
 * 	Home Component to set defaults
 *
 * 	@author Pascal Brunner <info@pascalbrunner.ch>
 *  @copyright Pascal Brunner 2018-10-28
 *
 */

import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Link
} from "react-router-dom";

import 'typeface-roboto';

import AppBar 				from '@material-ui/core/AppBar';
import Drawer 				from '@material-ui/core/Drawer';
import MenuItem 			from '@material-ui/core/MenuItem';
import Toolbar 				from '@material-ui/core/Toolbar';
import IconButton 			from '@material-ui/core/IconButton';
import Typography 			from '@material-ui/core/Typography';
import Button 				from '@material-ui/core/Button';
import CssBaseline 			from '@material-ui/core/CssBaseline';
import List 				from '@material-ui/core/List';
import Divider 				from '@material-ui/core/Divider';
import ListItem 			from '@material-ui/core/ListItem';
import ListItemIcon 		from '@material-ui/core/ListItemIcon';
import ListItemText 		from '@material-ui/core/ListItemText';
import { withStyles } 		from '@material-ui/core/styles';

import MenuIcon 			from '@material-ui/icons/Menu';

import AdminTeams 			from './AdminComponents/Teams/Teams';
import AdminCategories 		from './AdminComponents/Categories/Categories';
import AdminGames 			from './AdminComponents/Games/Games';
import AdminGameBoard		from './AdminComponents/GameBoard/GameBoard';

import Frontpage			from './Frontpage/Frontpage';
import Games 				from './Games/Games';
import MatchView			from './MatchView/MatchView';
import Score				from './Score/Score';

const styles = {

	list: {
		width: 300,
	}

};

class Home extends Component {

	constructor(props) {
		super(props);

		this.state = {
			open: false
		};
	}

	handleToggle() {
		this.setState({open: !this.state.open});
	}

	render() {

		const { classes } = this.props;

		/*
		{
			name: 'Kategorien',
			link: '/admin/categories'
		},
		{
			name: 'Teams',
			link: '/admin/teams'
		},
		{
			name: 'Spiele',
			link: '/admin/games'
		},
		*/

		let routes = [
			{
				name: 'Teams',
				link: '/'
			},
			{
				name: 'Rangliste',
				link: '/score'
			}
		];

		const sideList = (
			<div className={classes.list}>
				<List>
					{routes.map((route, index) => (
						<Link to={route.link} key={route.name}>
							<ListItem button >
								<ListItemText primary={route.name} />
							</ListItem>
						</Link>
					))}
				</List>
			</div>
		);

		return(
			<Router>
				<div>
					<CssBaseline />
					<AppBar title="Menü" position="relative" color="primary">
						<Toolbar>
							<IconButton color="inherit" aria-label="Menu" onClick={() => this.handleToggle()}>
								<MenuIcon />
							</IconButton>
							<Typography variant="h6" color="inherit">
								Unihockey Turnier Brunegg
							</Typography>
						</Toolbar>
					</AppBar>
					<Drawer open={this.state.open} onClose={ () => this.handleToggle()}>
						<div
							tabIndex={0}
							role="button"
							onClick={ () => this.handleToggle()}
							onKeyDown={ () => this.handleToggle()}>
							{sideList}
						</div>
					</Drawer>
					<Route path="/admin/teams" component={AdminTeams} />
					<Route path="/admin/categories" component={AdminCategories} />
					<Route path="/admin/games" component={AdminGames} />
					<Route path="/admin/gameboard" component={AdminGameBoard} />
					<Route exact path="/" component={Frontpage} />
					<Route exact path="/score" component={Score} />
					<Route path="/matchview" component={MatchView} />
					<Route path="/games/:id" component={Games} />

				</div>
			</Router>
		);
	}

}

export default withStyles(styles)(Home);
