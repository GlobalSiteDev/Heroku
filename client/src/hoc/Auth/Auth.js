import React, { Component } from 'react';
import { auth } from '../../actions';
import { connect } from 'react-redux';
import Loader from '../../components/UI/Loader/Loader';

export default function(ComposedClass, reload) {
    class AuthenticationCheck extends Component {
        state = {
            loading: true
        }

        componentWillMount() {
            this.props.dispatch(auth())
        }

        componentWillReceiveProps(nextProps) {
            
            console.log(nextProps);
            this.setState({loading: false})

            /* 
            ** Checkin if a user is auth-ed then redirecting to the Profile page from Login/Signup.
            ** If not - throwing back to the Home screen when trying to enter the Profile page.
            */ 

            if(!nextProps.user.auth.isAuth) {
                if(reload) {
                    this.props.history.push('/');
                }
            } else {
                if(!reload) {
                    this.props.history.push('/user');
                }
            }
    }

        render() {
            if(this.state.loading) {
                return (
                    <Loader />
                )
            }
            return (
                <ComposedClass {...this.props} user={this.props.user} />
            )
        }
    }

    function mapStateToProps(state){
        return {
            user: state.user
        }
    }
    return connect(mapStateToProps)(AuthenticationCheck)

}