import React from 'react';
import SectionGenresItemComponent from "../../../sections/Home/Section-Genres-Item-Component/Section-Genres-Item-Component";
import classes from "./Genres-Component.module.css";

const GenresComponent = (props) => {

    return (
        <div className="container-fluid">
            {props.results.length > 0 && props.results.map((genres, index) => {
                return (
                    <SectionGenresItemComponent key={genres.id} genres={genres} page={(index + 1)} />
                )
            })}
        </div>
    )
}

export default GenresComponent;