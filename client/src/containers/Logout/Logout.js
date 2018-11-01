import React, { Component } from 'react';
import { logoutUser } from '../../actions';
import { connect } from 'react-redux';
import styles from './Logout.module.css';

class Logout extends Component {

    componentWillMount() {
        setTimeout(() => {
            this.props.dispatch(logoutUser())
        }, 1500);
    }

    render() {
        return (
            <div className={styles.Container}>
                <h1>Sorry to see you leave :(</h1>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Logout);



/* const logout = (props) => {
    let request = axios.get('/logout')
                .then(request => {
                    setTimeout(() => {
                        props.history.push('/')
                    }, 2000); */
 
