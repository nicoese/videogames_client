import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {getVideogameDetail} from "../redux/actions";
import {StyledMain} from "./Main";
import styled from "styled-components";
import {useLocation} from "react-router-dom";

const StyledVideogameDetail = styled.div`

`

export const VideogameDetail = ({match}) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getVideogameDetail(match.params.id))
    }, [])

    const details = useSelector(state => state.videogameDetail.game)

    const loc = useLocation().search
    const justCreated = new URLSearchParams(loc).get('justCreated')
    // console.log(justCreated)


    return (
        <>
            {details && match.params.id.toString() === details.id.toString() ? <StyledMain>
                {justCreated ? <p>Game created Succesfully!</p> : ''}
                <p>{details.name}</p>
                <p>{details.description_raw}</p>
                <p>{details.genres.map(genre => {
                    if (details.genres[details.genres.length - 1] === genre) return `${genre.name.toUpperCase()}.`
                    return `${genre.name.toUpperCase()}, `
                })}</p>
                <p>rawg: {details.rating}/5</p>
                <p>metacritic: {details.metacritic}%</p>
                <img src={details.background_image} style={{'width': '60%'}} alt=""/>
                <p>platforms: {details.platforms.map(plat => {
                    return `${plat.name ? plat.name : plat.platform.name} `
                })}</p>
            </StyledMain> : <StyledMain>
                <h3>
                    loading...
                </h3>
            </StyledMain>}
        </>
    )


};

export default VideogameDetail
