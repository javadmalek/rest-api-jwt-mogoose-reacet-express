import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { registerUser } from '../actions';

const form = reduxForm({
    form: 'register',
    validate
});

const renderField = field => (
    <div>
        <input className="form-control" {...field.input}/>
        {field.touched && field.error && <div className="error">{field.error}</div>}
    </div>
);

function validate(formProps) {
    const errors = {};

    if (!formProps.firstName) {
        errors.firstName = 'Please enter a first name';
    }

    if (!formProps.lastName) {
        errors.lastName = 'Please enter a last name';
    }

    if (!formProps.email) {
        errors.email = 'Please enter an email';
    }

    if (!formProps.password) {
        errors.password = 'Please enter a password';
    }

    return errors;
}

class Register extends Component {
    handleFormSubmit(formProps) {
        this.props.registerUser(formProps);
    }

    renderAlert() {
        if(this.props.errorMessage) {
            return (
                <div>
                    <span><strong>Error!</strong> {this.props.errorMessage}</span>
                </div>
            );
        }
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                {this.renderAlert()}
                <div className="row">
                    <div className="col-md-6">
                        <label>First Name</label>
                        <Field name="firstName" className="form-control" component={renderField} type="text" />
                    </div>
                    <div className="col-md-6">
                        <label>Last Name</label>
                        <Field name="lastName" className="form-control" component={renderField} type="text" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <label>Email</label>
                        <Field name="email" className="form-control" component={renderField} type="text" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <label>Password</label>
                        <Field name="password" className="form-control" component={renderField} type="password" />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        );
    }
}

function mapStateToProps(state) {
    return {
        errorMessage: state.auth.error,
        message: state.auth.message
    };
}

export default connect(mapStateToProps, { registerUser })(form(Register));



/*
* Steps:
*   1. Create a component
*       1.1. Map the required variables from the state to the current component's Props
*       1.2. Import all the related actions to this component
*       1.3. Connect the 1.1&1.2 to the component
*   2. handel the Actions
*   3. Action will try to do somthing
*       3.1. HTTP requests or etc
*       3.2. Provides new data wants to store in root state
*       3.3. Dispatch the action => by calling the dispatcher
*           3.3.1. Passing all the provided data to reducer in payload
*           3.3.2. passing the type of action
*   4. Reducer will modify the root state and back to the line of calling dispatch
*   5. done.
*
* */