import { Link } from 'react-router-dom';
import enviroment from '../../../../enviroment/enviroment';
import classes from './Card-Genres-Component.module.css';

const CardGenresComponent = (props) => {

    return (
        <div className={classes['card-genres-component']} id={props.movie.id}>
            <Link to={`#`} >
                <img
                    onClick={props.openTrailer}
                    data-id={props.movie.id}
                    data-date={props.movie.release_date}
                    data-votecount={props.movie.vote_count}
                    data-voteaverage={props.movie.vote_average}
                    data-title={props.movie.title}
                    data-overview={props.movie.overview}
                    src={`${props.movie.poster_path? enviroment.image.card+props.movie.poster_path : './assest/image/blank.png'}`}
                    alt="movie image"/>
            </Link>
        </div>
    )
}

export default CardGenresComponent;