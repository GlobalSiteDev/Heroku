import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import FontAwesome from 'react-fontawesome';
import SideNav from '../../components/SideNav/SideNav';


class Header extends Component {
    state = {
        showNav: false
    }

    render() {
        return (
            <header className={styles.Header}>
                <Link to="/">
                    LOGO
                </Link>
                <FontAwesome 
                    name="bars"
                    onClick={() => {this.setState({showNav: true})}}
                    style={{
                        color: '#fff',
                        float: 'right',
                        marginRight: '15px',
                        cursor: 'pointer'
                    }}
                />
                <SideNav
                    showNav={this.state.showNav}
                    onHideNav={() => this.setState({showNav: false})}
                    onClick={() => this.setState({showNav: false})}
                    />
            </header>
        )
    }
}

export default Header;
