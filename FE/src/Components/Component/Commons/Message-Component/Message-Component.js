import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import classes from './Message-Component.module.css';

const MessageComponent = (props) => {

    return ReactDOM.createPortal(
        <div className={classes['message-component']}>
            {props.message}
        </div>,
        document.getElementById('error')
    )
}

export default MessageComponent;