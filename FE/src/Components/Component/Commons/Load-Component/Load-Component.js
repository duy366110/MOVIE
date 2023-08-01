import React from 'react';
import ReactDOM from 'react-dom';
import classes from './Load-Component.module.css';

const LoadComponent = (props) => {

    return ReactDOM.createPortal(
        <div className={classes['loader-component']}>
            <div className={`${classes["spinner-borders"]} spinner-border`} role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>,
        document.getElementById('loader')
    )
}

export default LoadComponent;