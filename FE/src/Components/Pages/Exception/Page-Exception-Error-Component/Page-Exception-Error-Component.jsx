import React from "react";
import classes from "./Page-Exception-Error-Component.module.css";

const PageExceptionErrorComponent = (props) => {

    return  (
        <div className={classes['exception-error-component']}>
            <h2>Error</h2>
            <p>Has error please wait!!</p>
        </div>
    )
}

export default PageExceptionErrorComponent;