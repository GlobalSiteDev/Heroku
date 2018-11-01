import React, { Component } from 'react';
import  { connect } from 'react-redux';
import { registerUser } from '../../actions';
import Input from '../../components/UI/Input/Input';
import styles from './SignupForm.module.css';

class SignupForm extends Component {
    state = {
        signupForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    label: 'Name',
                    placeholder: 'Enter your first name',
                },
                value: '',
                validation: {
                    required: true,
                    maxLength: 100
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
            lastname: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    label: 'Last name',
                    placeholder: 'Enter your last name',
                },
                value: '',
                validation: {
                    required: true,
                    maxLength: 100
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    label: 'Email',
                    placeholder: 'Enter your email',
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
        if(nextProps.user.user.isAuth) {
            this.props.history.push('/user');
        }
    }
    
    submitForm = (e) => {
        e.preventDefault();

        let requestBody = {
            name: this.state.signupForm.name.value,
            lastname: this.state.signupForm.lastname.value,
            email: this.state.signupForm.email.value,
            password: this.state.signupForm.password.value
        }

        this.props.dispatch(registerUser(requestBody));
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
            isValid = element.value.length >= rules.minLength;
            const message = `${ !isValid ? `Your ${element.elementConfig.label} should be at least ${rules.minLength} characters long` : ''}`;

            error = !isValid ? [isValid, message] : error;
        }

        if(rules.maxLength) {
            isValid = element.value.length <= rules.maxLength;
            const message = `${ !isValid ? `Your ${element.elementConfig.label} should be less than ${rules.maxLength} characters long` : ''}`;

            error = !isValid ? [isValid, message] : error;
        }

        return error;
    }

    inputChangedHandler = (event, inputIdentifier) => {

        // Clone deeply with spread operator

        const updatedSignupForm = {
            ...this.state.signupForm
        };
        const updatedFormElement = {
            ...updatedSignupForm[inputIdentifier]
        };

        // Updating the field value
        updatedFormElement.value = event.target.value;

        // Setting up the validity of the field
        updatedFormElement.valid = this.checkValidity(updatedFormElement, updatedFormElement.validation)[0];
        
        // Setting up the error message
        updatedFormElement.validationMessage = this.checkValidity(updatedFormElement, updatedFormElement.validation)[1];

        updatedFormElement.touched = true;
        updatedSignupForm[inputIdentifier] = updatedFormElement;

        this.setState({signupForm: updatedSignupForm});
    }








    render() {
        const formElements = [];
        let user = this.props.user;

        for (let key in this.state.signupForm) {
            formElements.push({
                id: key,
                config: this.state.signupForm[key]
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
                    <button type="submit" className={styles.submitButton}>Sign Up</button>
                    {
                    // Showing error message if account already exists
                        
                        user.user ?
                            <div className={styles.errorMessage}><i>{user.user.message}</i></div>
                        :   
                            null
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

export default connect(mapStateToProps)(SignupForm);
