import React from "react";
import { useSelector } from "react-redux";
import LoadComponent from '../Commons/Load-Component/Load-Component';
import MessageComponent from "../Commons/Message-Component/Message-Component";
import classes from "./Footer-Component.module.css";

const FooterComponent = (props) => {
    const page = useSelector((state) => state.component.page);

    return (
        <footer>
            {page.loader?.status && (<LoadComponent />)}
            {/* {props.error.status && <MessageComponent message={props.error.message} />} */}
        </footer>
    )
}

export default FooterComponent;