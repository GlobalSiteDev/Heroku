import React from 'react';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import styles from './Items.module.css';

const Items = (props) => {

    const items = [
        {
            icon: 'user',
            text: 'Profile',
            link: '/user',
        },
        {
            icon: 'sign-in',
            text: 'Log in',
            link: '/login',
        },
        {
            icon: 'user-plus',
            text: 'Sign up',
            link: '/register',
        },
        {
            icon: 'sign-out',
            text: 'Log out',
            link: '/user/logout',
        }
    ]

    const element = (item, i) => (
        <div key={i} className={styles.navItem}>
            <Link to={item.link} onClick={props.onClick}>
                <FontAwesome name={item.icon} />
                {item.text}
            </Link>
        </div>
    )

    const showItems = () => (
        items.map((item, i) => {
            return element(item, i);
        })
    )

    return(
        <div>
            {showItems()}
        </div>
    )
}

export default Items;
