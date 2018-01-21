import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from './actions';

class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.props.protectedTest();
    }

    renderContent() {
        if (this.props.content) {
            return (
                <p>{this.props.content}</p>
            );
        }
    }

    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {content: state.auth.content};
}

// connect: connects our React component to our Redux store
export default connect(mapStateToProps, actions)(Dashboard);



/*
*
* We are calling our protectedTest() function to run when the component is first called.
* This function (which we will soon write) will send an HTTP GET request to our API's protected test route.
* We wrote a function, renderContent(), which will return this.props.content if it exists, otherwise it will do nothing.
* We mapped state.auth.content (a piece of our Redux state) to this.props.content.
* After our protectedTest() request returns, it will dispatch the payload, or response, from that request to our auth reducer, which will map the response to the appropriate piece of state and send back the updated state.
* Our component, which is subscribed to updates in this piece of state, will then be updated with the new state
* */