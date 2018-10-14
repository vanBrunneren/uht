/**
 *
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
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

import Teams from './Teams/Teams';
import CategoryList from './Categories/CategoryList';
import CategoryCreate from './Categories/CategoryCreate';

const styles = {
    title: {
        cursor: 'pointer',
    },
};

export default class App extends Component {

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

        return(
            <Router>
                <div>
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
                    <Drawer
                        onClose={() => this.handleToggle()}
                        open={this.state.open}>
                        <MenuItem component={Link} to="/category/create" onClick={this.handleClose.bind(this)}>Kategorie erstellen</MenuItem>
                        <MenuItem component={Link} to="/category/list" onClick={this.handleClose.bind(this)}>Kategorien anzeigen</MenuItem>
                        <MenuItem component={Link} to="/teams" onClick={this.handleClose.bind(this)}>Teams</MenuItem>
                    </Drawer>
                    <Route path="/teams" component={Teams} />
                    <Route path="/category/list" component={CategoryList} />
                    <Route path="/category/create" component={CategoryCreate} />
                </div>
            </Router>
        );
    }

}


ReactDOM.render(
  <App />,
  document.getElementById('app')
);
