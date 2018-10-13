/**
 *
 */

import React, { Component } from 'react';
import { Link } from "react-router-dom";

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
                    <p>Laden...</p>
                </div>
            )
        }

        let categories = [];
        if(this.state.categories) {
            for(let category of this.state.categories) {
                categories.push(
                    <div key={category.id}>
                        <p>{category.name}</p><a onClick={() => this.onXClick(category.id)}>x</a>
                    </div>
                );
            }
        }
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Alle Kategorien</div>
                            <Link to="/category/create">+</Link>
                            <div className="card-body">
                                {categories}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
