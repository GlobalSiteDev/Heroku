import React from 'react';
import styles from './Layout.module.css';
import Header from '../../containers/Header/Header';

const layout = (props) => (
    <div className={styles.MainContainer}>
        <Header />
        <div>
            {props.children}
        </div>
    </div>
)

export default layout;
