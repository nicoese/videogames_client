import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {
    filterGames,
    filterGamesByGenre,
    filterGamesByPlatform,
    sortVideogamesAsc,
    sortVideogamesDesc
} from "../redux/actions";


const VideogameFilter = (props) => {

    const dispatch = useDispatch()

    const videogames = useSelector(state => state.videogames)

    const handleFilter = (prop, value) => {
        switch (prop){
            case 'genres':
                return dispatch(filterGamesByGenre(value));
            case 'platforms':
                return dispatch(filterGamesByPlatform(value))
        }
        dispatch(filterGamesByGenre(value))
    }


    return (
        <>
            <p>Genres</p>
            <button value={'shooter'} onClick={(event) => {
                handleFilter(event.target.previousSibling.innerHTML.toLowerCase(), event.target.value)
            }}>
                Filter
            </button>
            <p>Platforms</p>
            <button value={'Playstation 3'} onClick={(event) => {
                handleFilter(event.target.previousSibling.innerHTML.toLowerCase(), event.target.value)
            }}>
                Filter
            </button>
        </>
    )


};

export default VideogameFilter