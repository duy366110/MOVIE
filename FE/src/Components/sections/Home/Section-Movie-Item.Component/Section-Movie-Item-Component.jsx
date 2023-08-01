import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setInforHomePage } from "../../../../store/store-page";
import useHttp from "../../../../hook/use-http";
import enviroment from '../../../../enviroment/enviroment';
import CardComponent from "../../../Component/Commons/Card-Component/Card-Component";
import classes from "./Section-Movie-Item-Component.module.css";

const SectionMovieItemComponent = (props) => {
    const dispath = useDispatch();
    const [movies, setMovies] = useState([]);
    const {loader, errorInfor, httpRequest: movieItemRequest} = useHttp();

    const display = (listMovie, element) => {
        const { results } = listMovie;
        let index = Math.trunc((Math.random() * (results.length - 1)) + 1);

        setMovies(results);
        dispath(setInforHomePage({poster: results[index].poster_path, title: results[index].title, overview: results[index].overview}));

    }

    useEffect(() => {
        let page = Math.trunc((Math.random() * (20 - 1)) + 1);
        movieItemRequest({
            url: `${enviroment.API.url}${enviroment.API.endpoint.movie_trending}?type=${props.type}&page=${page? page : 1}`,
            method: 'GET',
            author: enviroment.authorization.token
        }, display);
    }, [])

    return (
        <div className={classes["section-item-movie-component"]}>
            <div className="container-fluid">
                <h2 className='title-list'>{props.title}</h2>
                <div className={classes['movie-wrapper']}>
                    {movies.length && movies.map((movie) => {
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
                    }
                </div>
            </div>
        </div>
    )
}

export default SectionMovieItemComponent;