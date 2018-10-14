/**
 *
 */

import React, { Component } from 'react';
import { Link } from "react-router-dom";

import AddIcon from '@material-ui/icons/Add';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import CircularProgress from '@material-ui/core/CircularProgress';

export default class CategoryList extends Component {

    constructor() {
        super();

        this.state = {
            isLoading: true,
            categories: []
        }
    }

    onXClick(id) {

        fetch('/api/categories/'+id, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(jsonResponse => {
                console.log(jsonResponse);
                if(jsonResponse == 1) {
                    this.setState({isLoading: true});
                    this.loadCategories();
                }
            })
            .catch(e => console.log(e));

    }

    loadCategories() {
        fetch('/api/categories', {
            method: 'GET'
        })
          .then(response => response.json())
          .then(jsonResponse => this.setState({categories: jsonResponse, isLoading: false}))
          .catch(e => console.log(e));
    }

    componentDidMount() {
        this.loadCategories();
    }

    render() {

        if(this.state.isLoading) {
            return(
                <div>
                    <CircularProgress />
                </div>
            )
        }

        let categories = [];
        if(this.state.categories) {
            for(let category of this.state.categories) {
                categories.push(
                    <TableRow key={category.id}>
                        <TableCell>{category.name}</TableCell>
                        <TableCell><a onClick={() => this.onXClick(category.id)}><DeleteIcon /></a></TableCell>
                    </TableRow>
                );
            }
        }
        return (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {categories}
                </TableBody>
            </Table>
        );
    }
}
