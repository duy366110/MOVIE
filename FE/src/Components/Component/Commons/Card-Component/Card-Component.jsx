import React, { useRef, useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import enviroment from "../../../../enviroment/enviroment";
import TrailerComponent from '../Trailer-Component/Trailer-Component';
import useHttp from '../../../../hook/use-http';
import classes from "./Card-Component.module.css";


const trailerReducer = (state, action) => {
    if(action.type === 'OPEN') {
        return {
            status: true,
            infor: {
                token: action.infor.key,
                blank: action.infor.trailer,
                date: action.dataset.date,
                id: action.dataset.id,
                title: action.dataset.title,
                overview: action.dataset.overview,
                voteaverage: action.dataset.voteaverage,
                votecount: action.dataset.votecount
            }

        }
    }

    if(action.type === "CLOSE") {
        return {
            status: false,
            youtube_token: '',
        }
    }
    return state;
}

const CardComponent = (props) => {
    const cardRef = useRef();
    const {loader, errorInfor, httpRequest: getMovieTrailer} = useHttp();
    const [trailer, trailerDispatch] = useReducer(trailerReducer, {status: false, infor: {}});

    const displayMvieTrailer = (data, element) => {
        console.log(data);
        const { results } = data;
        let { videos } = results;
        const { dataset } = element.target;
        trailerDispatch({type: 'OPEN', dataset, infor: {key: videos.length? videos[0].key: 't-yxjQAVcbs', trailer: results.length > 0? false : true}});
    }

    useEffect(() => {
        document.addEventListener('click', function(event) {
            if(cardRef.current && !cardRef.current.contains(event.target)) {
                trailerDispatch({type: 'CLOSE'});
            }
        })
    }, [])

    const trailerHandler = (event) => {
        console.log(event.target.dataset.id);

        getMovieTrailer({
            url: `${enviroment.API.url}${enviroment.API.endpoint.movie_trailer}?movie_id=${event.target.dataset.id}`,
            method: 'GET',
            author: enviroment.authorization.token
        }, displayMvieTrailer, event);

    }

    return (
        <div ref={cardRef} className={classes['card-component']} style={{width: props.width}}>

            <div className={classes["card-wrapper"]} style={{height: props.height}}>
                <Link to={`#`} >
                    <img
                        onClick={trailerHandler}
                        data-id={props.id}
                        data-date={props.date}
                        data-votecount={props.votecount}
                        data-voteaverage={props.voteaverage}
                        data-title={props.title}
                        data-overview={props.overview}
                        src={`${props.image? enviroment.image.card+props.image : './assest/image/blank.png'}`}
                        alt="movie image"/>
                </Link>
            </div>

            { trailer.status && (
                <div className={classes['card-trailer']}>
                    <div className={classes['card-content']}>
                        <TrailerComponent infor={trailer.infor} />
                    </div>
                </div>)
            }
        </div>
    )
}

export default CardComponent;