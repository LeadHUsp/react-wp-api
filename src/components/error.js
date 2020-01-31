import React, {Component} from 'react';
import { Jumbotron } from 'reactstrap';

export default class Error extends Component {
    
    componentDidMount() {
        this.props.hideLoading();
    }
    render(){
        document.querySelector('title').innerText = process.env.REACT_APP_TITLE + ": Page not found!";
        return (
            <div>
                <Jumbotron>
                    <h1 className="display-3">Ooops, something gone wrong!</h1>
                    <p className="lead">Looks like the page you're trying to open doesn't exist.</p>
                    <hr className="my-2" />
                    <p>Try to back to Homepage</p>
                    <p className="lead">
                        <a href="/" className="btn btn-primary">Go to Home Page</a>
                    </p>
                </Jumbotron>
            </div>
        );
    }
}