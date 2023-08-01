import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SearchIcon from '@mui/icons-material/Search';
import classes from "./Header-Component.module.css";

const HeaderComponent = (props) => {
    const Page = useSelector((state) => state.component);
    const navigate = useNavigate();

    const rediectSearch = (event) => {
        navigate('/search');
    }

    const homeHandler = (event) => {
        navigate('/');
    }

    return (
        <header className={classes.header} style={{backgroundImage: props.show? `linear-gradient(90deg, rgb(0 0 0 / 70%) 0%, rgb(134 134 134 / 15%) 51%, rgb(0 0 0 / 70%) 100%), url("https://image.tmdb.org/t/p/original${Page.page.home.poster?  Page.page.home.poster : ''}")` : '', minHeight: props.show? '550px' : '50px'}}>
            <div className={`${classes['header-nav']} ${classes[Page.page.header.scroll? 'active' : '']}`}>
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-6">
                            <h1 className={classes.brand} onClick={homeHandler}>Movie app</h1>
                        </div>
                        <div className="col-6 d-flex align-items-center justify-content-end">
                            <button className={classes.search} onClick={rediectSearch}><SearchIcon /></button>
                        </div>
                    </div>
                </div>
            </div>

            {props.show && (
                <div className={classes["header-des"]}>
                    <div className="container-fluid">
                        <div className={classes['des-content']}>
                            <h2 className={classes['content-title']}>{Page.page.home.title}</h2>
                            <div className={classes['content-action']}>
                                <button className={`${classes["btn-action"]} mr-2`}>Play</button>
                                <button className={classes["btn-action"]}>my list</button>
                            </div>
                            <p className={classes['content-des']}>{Page.page.home.overview}</p>
                        </div>
                    </div>
                </div>
            )}
        </header>
    )
}

export default HeaderComponent;