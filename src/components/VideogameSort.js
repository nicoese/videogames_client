import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {getVideogameDetail, sortVideogames, sortVideogamesAsc, sortVideogamesDesc} from "../redux/actions";
import {StyledMain} from "./Main";
import styled from "styled-components";


 const VideogameSort = (props) => {

    const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(getVideogameDetail())
    // }, [])

    // const details = useSelector(state => state.)

     const handleClick = (sort, prop) => {
         if (sort === "Desc") dispatch(sortVideogamesDesc(prop))
         if (sort === "Asc") dispatch(sortVideogamesAsc(prop))

        // dispatch(sortVideogamesDesc())
     }


    return (
        <>
            <button value={'name'} onClick={(event) => handleClick(event.target.innerText, event.target.value)}>
                Desc
            </button>
            <button value={'name'} onClick={(event) => handleClick(event.target.innerText, event.target.value)}>
                Asc
            </button>
        </>
    )


};

export default VideogameSort