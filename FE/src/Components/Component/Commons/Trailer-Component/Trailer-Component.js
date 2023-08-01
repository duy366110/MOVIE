import React from 'react';
import Youtube from 'react-youtube';
import classes from './Trailer-Component.module.css';

const TrailerComponent = (props) => {
    const opt = {
        height: '350px',
        width: '100%'
    }

    return (
        <div className={classes['trailer-component']}>
            <div className="row">
                <div className="col-6">
                    <h2 className={classes['trailer-title']}>{props.infor.title}</h2>
                    {props.infor.blank && (<h3 className={classes['trailer-blank']}>Trailer blank please come back later. Here is the alternative link, enjoy the music video</h3>)}
                    <p className={classes['trailer-release']}>Relase date: {props.infor.date}</p>
                    <p className={classes['trailer-vote']}>
                        Vote: 
                        <span>{props.infor.votecount}</span>
                        <span>{props.infor.voteaverage}</span>
                    </p>
                    <p className={classes['trailer-des']}>{props.infor.overview}</p>
                </div>
                <div className="col-6">
                    <Youtube videoId={props.infor.token} opts={opt} />
                </div>
            </div>
        </div>
    )
}

export default TrailerComponent;