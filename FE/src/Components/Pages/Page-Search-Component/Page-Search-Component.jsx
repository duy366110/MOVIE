import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import HeaderComponent from "../../Component/Header-Component/Header-Component";
import FooterComponent from "../../Component/Footer-Component/Footer-Component";
import CardComponent from '../../Component/Commons/Card-Component/Card-Component';
import useHttp from "../../../hook/use-http";
import enviroment from "../../../enviroment/enviroment";
import classes from './Page-Search-Component.module.css';

const PageSearchComponent = (props) => {
    const {loader, errorInfor, httpRequest: requestHTTP} = useHttp();
    const loaderGenres = useLoaderData();
    const [search, setSearch] = useState('');
    const [movies, setMovies] = useState([]);
    const [listGenres, setListGenres] = useState([]);
    const [genres, setGenres] = useState('');
    const [media, setMedia] = useState('');
    const [language, setLanguage] = useState('');
    const [year, setYear] = useState('');

    useEffect(() => {
        const {results} = loaderGenres;
        setListGenres(results);

    }, [])

    const display = (data) => {
        const { results } = data;
        setMovies(results);
    }

    const searchSubmitHandler = (event) => {
        event.preventDefault();

        requestHTTP({
            url: `${enviroment.API.url}${enviroment.API.endpoint.movie_search}?keyword=${search}&genres=${genres}&media=${media}&language=${language}&year=${year}`,
            method: 'GET',
            author: enviroment.authorization.token
        }, display);
    }

    const searchHandler = (event) => {        
        setSearch(event.target.value);
    }

    const genresHandler = (event) => {
        setGenres(event.target.value);
    }

    const mediaHandler = (event) => {
        setMedia(event.target.value);
    }

    const languageHandler = (event) => {
        setLanguage(event.target.value);
    }

    const yearHandler = (event) => {
        setYear(event.target.value);
    }

    const searchResetHandler = (event) => {
        setSearch('');
        setGenres('');
        setMedia('');
        setLanguage('');
        setYear('');
        
    }

    return (
        <div className={classes['search-component']}>
            <HeaderComponent show={false}/>
            <div className="container-fluid">
                <div className={classes['search-form']}>
                    <form onSubmit={searchSubmitHandler}>
                        <div className={classes['form-group']}>
                            <Input
                                id="search-movie"
                                type="search"
                                onChange={searchHandler}
                                value={search}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <SearchIcon />
                                    </InputAdornment>
                                }/>
                        </div>

                        <div className={classes['search-option']}>
                            <div className={classes['form-group']}>
                                <label htmlFor="genres">Genres</label>
                                <select className="form-control" id="genres" onChange={genresHandler}>
                                    {listGenres.length > 0 && listGenres.map((elm, index) => {
                                        return (
                                            <option key={elm.id} value={elm.id}>{elm.name}</option>
                                        )
                                    })}
                                </select>
                            </div>

                            <div className={classes['form-group']}>
                                <label htmlFor="media">Type media</label>
                                <select className="form-control" id="media" onChange={mediaHandler}>
                                    <option value="all">All</option>
                                    <option value="movie">Movie</option>
                                    <option value="tv">Tv</option>
                                    <option value="person">Person</option>
                                </select>
                            </div>

                            <div className={classes['form-group']}>
                                <label htmlFor="language">Language</label>
                                <select className="form-control" id="language" onChange={languageHandler}>
                                    <option value="en-us">En-us</option>
                                    <option value="jp">Jp</option>
                                    <option value="kr">Kr</option>
                                </select>
                            </div>

                            <div className={classes['form-group']}>
                                <label htmlFor="year">Year</label>
                                <select className="form-control" id="year" onChange={yearHandler}>
                                    <option value="2023">2023</option>
                                    <option value="2022">2022</option>
                                    <option value="2021">2021</option>
                                    <option value="2020">2020</option>
                                    <option value="2019">2019</option>
                                    <option value="2018">2018</option>
                                    <option value="2017">2017</option>
                                </select>
                            </div>
                        </div>
                        <div className={`${classes['search-action']} d-flex justify-content-end pr-4`}>
                            <Button variant="text" type="button" onClick={searchResetHandler}>Reset</Button>
                            <Button variant="contained" type="submit">Search</Button>
                        </div>
                    </form>
                </div>

                <div className={classes['search-content']}>
                    <h2 className={classes['search-content__title']}>Search result</h2>
                    <div className={classes['search-content__result']}>
                        {movies.length > 0 && (
                            movies.map((movie, index) => {
                                return (
                                    <CardComponent
                                    key={movie.key}
                                    id={movie.id}
                                    date={movie.release_date}
                                    overview={movie.overview}
                                    votecount={movie.vote_count}
                                    voteaverage={movie.vote_average}
                                    image={movie.poster_path}
                                    title={movie.title}
                                    height="255px"
                                    width={`calc((100% / 10) - 15px)`}/>
                                )
                            })
                        ) }

                        { movies.length === 0  && (
                            <div className={classes['bland-wrapper']}>
                                <h2 className={classes['bland-title']}>Không có nội dung phù hợp</h2>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            
            <FooterComponent load={loader} error={errorInfor}/>
        </div>
    )
}

export default PageSearchComponent;

export const loader = async () => {
    try {
        const res = await fetch(`${enviroment.API.url}${enviroment.API.endpoint.genres}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': enviroment.authorization.token
            }
        });
        const genres = await res.json();
        return genres;

    } catch (error) {
        throw error;
    }
}