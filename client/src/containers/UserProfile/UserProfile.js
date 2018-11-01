import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import avatar from '../../assets/images/avatar.jpg';
import styles from './UserProfile.module.css';

class UserProfile extends Component {
    state = {
        isMinimized: false
    }

    handleLeftSidebarToggle() {
        this.setState((prevState) => {
            return {isMinimized: !prevState.isMinimized};
        });
    }

    render() {
        let user = this.props.user.auth;
        
        return (
            <div className={styles.Container}>
                <div className={this.state.isMinimized ? styles.LeftSidebarMinimized : styles.LeftSidebar}>
                    <div className={styles.UserProfile}>
                        <div className={styles.UserImage}>
                            <img src={avatar} alt="avatar" />
                        </div>
                        <div className={styles.UserInfo}>
                            <p>{user.name} {user.lastname}</p>
                            <p>{user.email}</p>
                        </div>
                    </div>
                    <FontAwesome 
                        name="arrows-h"
                        className={styles.ToggleButton}
                        onClick={() => {this.handleLeftSidebarToggle()}}
                    />
                </div>
            </div>
        )
    }
}

export default UserProfile;
