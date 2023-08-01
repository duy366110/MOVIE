import { useLoaderData, Await } from "react-router-dom";
import enviroment from "../../../enviroment/enviroment";
import HeaderComponent from "../../Component/Header-Component/Header-Component";
import GenresComponent from "./Genres-Component/Genres-Component";
import SectionMovieItemComponent from "../../sections/Home/Section-Movie-Item.Component/Section-Movie-Item-Component";

const PageHomeComponent = (props) => {
    const loadGenres = useLoaderData();    

    return (
        <>
            <HeaderComponent show={true}/>
            <SectionMovieItemComponent type='trending' title="Trending movies" />
            <SectionMovieItemComponent type='rating' title="Rating movies"/>
            <Await resolve={loadGenres}>
                {(loader) => (<GenresComponent results={loader.results}/>)}
            </Await>
        </>
    )
}

export default PageHomeComponent;

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