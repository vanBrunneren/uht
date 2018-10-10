import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Example extends Component {

    componentDidMount() {
        fetch('/api/test', {
            method: 'POST'
        })
          .then(response => response.json())
          .then(jsonResponse => console.log(jsonResponse))
          .catch(e => console.log(e));
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Example Component</div>

                            <div className="card-body">
                                I'm an example component!
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<Example />, document.getElementById('app'));
}
