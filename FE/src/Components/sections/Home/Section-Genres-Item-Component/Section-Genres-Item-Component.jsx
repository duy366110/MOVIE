import React, { useEffect, useState, useRef } from 'react';
import useHttp from "../../../../hook/use-http";
import enviroment from "../../../../enviroment/enviroment";
import CardGenresComponent from "../../../Component/Commons/Card-Genres-Component/Card-Genres-Component";
import TrailerComponent from '../../../Component/Commons/Trailer-Component/Trailer-Component';
import classes from "./Section-Genres-Item-Component.module.css";

const SectionGenresItemComponent = (props) => {
    const genresItemRef = useRef();
    const {loader, errorInfor, httpRequest: genresRequest} = useHttp();
    const [movies, setMovies] = useState([]);
    const [trailer, setTrailer] = useState({
        status: false,
        infor: {
            token: '',
            blank: 'OPEN',
            date: '',
            id: '',
            title: '',
            overview: '',
            voteaverage: '',
            votecount: ''
        }
    });

    const dispaly = (list, element) => {
        setMovies(list.results);
    }

    useEffect(() => {
        let page = Math.trunc((Math.random() * (20 - 1)) + 1);
        
        genresRequest({
            url: `${enviroment.API.url}${enviroment.API.endpoint.movie_genres}?page=(${page? page: 1})&genres=${props.genres.id}`,
            method: 'GET',
            author: enviroment.authorization.token
        }, dispaly)

        document.addEventListener('click', function(event) {
            if(genresItemRef.current && !genresItemRef.current.contains(event.target)) {
                setTrailer((pre) => {
                    return {
                        status: false,
                        infor: {
                            token: '',
                            blank: 'OPEN',
                            date: '',
                            id: '',
                            title: '',
                            overview: '',
                            voteaverage: '',
                            votecount: ''
                        }
                    }
                })
            }
        })

    }, [])

    const onpenTrailer = async (event) => {
        let id = event.target.dataset.id;
        let dataset = event.target.dataset;


        const res = await fetch(`${enviroment.API.url}${enviroment.API.endpoint.movie_trailer}?movie_id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': enviroment.authorization.token
            }
        });

        const response = await res.json();

        const { results } = response;
        const { videos } = results;

        setTrailer((pre) => {
            return {
                status: true,
                infor: {
                    token: (videos[0]?.key)? videos[0].key : 't-yxjQAVcbs',
                    blank: 'OPEN',
                    date: dataset.date,
                    id: id,
                    title: dataset.title,
                    overview: dataset.overview,
                    voteaverage: dataset.voteaverage,
                    votecount: dataset.votecount
                }
            }
        })

    }

    return (
        <div className={classes['genres-item-component']} ref={genresItemRef}>
            <h2 className='title-list'>{props.genres.name}</h2>
            <div className={classes['genres-item-wrapper']}>
                {movies.length > 0 && movies.map((elm, index) => {
                    return (
                        <CardGenresComponent openTrailer={onpenTrailer} key={elm.key} movie={elm} />
                    )
                })}
            </div>

            {trailer.status && (
                <div>
                    <TrailerComponent infor={trailer.infor}/>
                </div>
            )}
        </div>
    )
}

export default SectionGenresItemComponent;