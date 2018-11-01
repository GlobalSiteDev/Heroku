import React from 'react';
import styles from './Input.module.css';

const input = (props) => {
    let inputElement = null;
    let errorMessage = null;
    const inputClasses = [styles.inputElement];

    if(props.invalid && props.touched) {
        inputClasses.push(styles.Invalid);
        errorMessage = props.errorMessage;
    }

// Using the switch statement to make input fields more flexible and not hardcoded for future use. Just add new input element case if need to create other fields in future.

    switch(props.elementType) {
        case('input'):
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        
        default:
            inputElement = <input
                className={styles.InputElement}
                {...props.elementConfig}
                value={props.value} 
                onChange={props.changed} />;
            break;

    }

    return (
        <div className={styles.Input}>
            <label className={styles.Label}>{props.label}</label>
            {inputElement}
            <div className={styles.errorMessage}>
                <i>{errorMessage}</i>
            </div>
        </div>
    )
}

export default input;
