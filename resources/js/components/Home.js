/**
 *
 */

import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Link
} from "react-router-dom";

import 'typeface-roboto';

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline'

import Teams from './Teams/Teams';
import CategoryList from './Categories/CategoryList';

import { withStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const styles = {
	list: {
		width: 300,
	},
	fullList: {
		width: 'auto',
	},
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

	handleClose() {
		this.setState({open: false});
	}

	handleClick() {
		alert('onClick triggered on the title component');
	}

	render() {

		const { classes } = this.props;

		let routes = [
			{
				name: 'Kategorien',
				link: '/categories'
			},
			{
				name: 'Teams',
				link: '/teams'
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
					<Route path="/teams" component={Teams} />
					<Route path="/categories" component={CategoryList} />
				</div>
			</Router>
		);
	}

}

export default withStyles(styles)(Home);




















