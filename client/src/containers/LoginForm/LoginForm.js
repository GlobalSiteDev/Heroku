import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../actions';
import styles from './LoginForm.module.css';
import Input from '../../components/UI/Input/Input';

class LoginForm extends Component {

    state = {
        loginForm: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    label: 'Email',
                    placeholder: 'Enter your email',
                    autoComplete: 'username'
                },
                value: '',
                validation: {
                    required: true,
                    email: true
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    label: 'Password',
                    placeholder: 'Enter your password',
                    autoComplete: 'current-password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false,
                validationMessage: ''
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.user.login.isAuth) {
            this.props.history.push('/user');
        }
    }

    submitForm = (e) => {
        e.preventDefault();

        let requestBody = {
            email: this.state.loginForm.email.value,
            password: this.state.loginForm.password.value
        }

        this.props.dispatch(loginUser(requestBody));
    }

    checkValidity = (element, rules) => {
        let isValid = true;
        let error = [true, ''];

        // If validation rule is not passed setting field as unvalid and passing an error message in the 'error' array

        if(rules.required) {
            isValid = element.value.trim() !== '' && isValid;
            const message = `${ !isValid ? 'This field is required' : ''}`;

            error = !isValid ? [isValid, message] : error;
        }

        if(rules.email) {
            isValid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(element.value);
            const message = `${ !isValid ? 'Email should be valid' : ''}`;

            error = !isValid ? [isValid, message] : error;
        }

        if(rules.minLength) {
            isValid = element.value.length >= rules.minLength && isValid;
            const message = `${ !isValid ? `Your ${element.elementConfig.type} should be at least ${rules.minLength} characters long` : ''}`;

            error = !isValid ? [isValid, message] : error;
        }

        if(rules.maxLength) {
            isValid = element.value.length <= rules.minLength && isValid;
            const message = `${ !isValid ? `Your ${element.elementConfig.type} should be less than ${rules.minLength} characters long` : ''}`;

            error = !isValid ? [isValid, message] : error;
        }

        return error;
    }

    inputChangedHandler = (event, inputIdentifier) => {

        // Clone deeply with spread operator

        const updatedLoginForm = {
            ...this.state.loginForm
        };
        const updatedFormElement = {
            ...updatedLoginForm[inputIdentifier]
        };

        // Updating the field value
        updatedFormElement.value = event.target.value;

        // Setting up the validity of the field
        updatedFormElement.valid = this.checkValidity(updatedFormElement, updatedFormElement.validation)[0];
        
        // Setting up the error message
        updatedFormElement.validationMessage = this.checkValidity(updatedFormElement, updatedFormElement.validation)[1];

        updatedFormElement.touched = true;
        updatedLoginForm[inputIdentifier] = updatedFormElement;

        this.setState({loginForm: updatedLoginForm});
    }

    render() {
        const formElements = [];
        let user = this.props.user;

        for (let key in this.state.loginForm) {
            formElements.push({
                id: key,
                config: this.state.loginForm[key]
            });
        }


        return (
            <div className={styles.Container}>
                <form onSubmit={this.submitForm}>
                    {formElements.map(formElement => (
                        <Input
                            key={formElement.id}
                            label={formElement.config.elementConfig.label}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            invalid={!formElement.config.valid}
                            touched={formElement.config.touched}
                            changed={(event) => this.inputChangedHandler(event, formElement.id)}
                            errorMessage={formElement.config.validationMessage}
                            />
                    ))}
                    <button type="submit" className={styles.submitButton}>Log in</button>
                    {
                    // Showing error message if auth is failes

                        user.login ?
                        <div className={styles.errorMessage}><i>{user.login.message}</i></div>
                        : null
                    }
                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(LoginForm);
