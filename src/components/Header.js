import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {
    cleanError,
    clearSearchParam,
    clearState, getExclusives,
    getVideogamePage,
    searchGame,
    setSearchParam,
    setVideogamesBeforeFilter
} from "../redux/actions";
import {Link} from "react-router-dom";

const StyledHeader = styled.header`
  min-height: 150px;
  display: flex;
  //flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  border-bottom: 2px solid black;
  
  h1{
    //min-width: 300px;
    margin-right: 30px;
    color: black;
    font-size: xx-large;
  }
  
  &:hover h1{
    cursor: pointer;
    filter: drop-shadow(0 0.2rem 0.25rem rgba(0, 0, 0, 0.3));

  }
  
  input{
    margin-right: 10px;
    min-width: 250px;
    min-height: 35px;
    border: 1px solid black;
    font-size: large;
    text-align: center;

  }
  
  button{
    margin-right: 50px;
    min-height: 39px;
    min-width: 39px;
    font-size: large;
    background-color: white;
    
    :hover{
      cursor: pointer;
      filter: drop-shadow(0 0.2rem 0.25rem rgba(0, 0, 0, 0.8));
    }
    
    
  }
  
`

export const Header = () => {

    const dispatch = useDispatch()

    const handleSearch = async (value) => {
        dispatch(clearState())
        dispatch(setSearchParam(value))
        await dispatch(searchGame(value))
        dispatch(setVideogamesBeforeFilter())
    }

    return (
        <StyledHeader>
            <Link to={'/'} style={{textDecoration: 'none'}}>
                <h1 onClick={() => {
                    dispatch(cleanError())
                    dispatch(clearSearchParam())
                    dispatch(clearState())
                    dispatch(getVideogamePage(1))
                }}>N1CE GAMES</h1>
            </Link>

            <input type="text" placeholder={'Search...'}/>
            <Link to={'/'}>
                <button onClick={(event) => {
                    dispatch(cleanError())
                    handleSearch(event.target.parentNode.previousSibling.value)
                    event.target.parentNode.previousSibling.value = ''
                }}>⟵</button>
            </Link>
            <Link to={'/'}>
                <button style={{
                    width: '250px',
                    'margin-right': '10px'

                }} onClick={(event) => {
                    dispatch(clearState())
                    dispatch(cleanError())
                    dispatch(getExclusives())
                }}> Exclusive ★
                </button>
            </Link>
            <Link to={'/exclusives'}>
                <button>+</button>
            </Link>
        </StyledHeader>
    )
}

