import React from 'react';
import styles from './Loader.module.css';

const loader = () => (
    <div className={styles.Container}>
        <div className={styles.Loader}></div>
        <div className={styles.LoadingText}>Loading...</div>
    </div>
)

export default loader;
