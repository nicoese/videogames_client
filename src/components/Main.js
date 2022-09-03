import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Link} from "react-router-dom";
import styled from "styled-components";
import {
    clearState,
    filterGamesByGenre,
    filterGamesByPlatform, getExclusives,
    getVideogamePage, setPageNumber, setVideogamesBack, setVideogamesBeforeFilter,
    sortVideogamesAsc,
    sortVideogamesDesc
} from "../redux/actions";
import {VideogameContainer} from "./VideogameContainer";
import VideogameSort from "./VideogameSort";
import VideogameFilter from "./VideogameFilter";
import {findAllByDisplayValue} from "@testing-library/react";

export const StyledMain = styled.div`
  display: flex;
  width: 80%;
  max-width: 1200px;
  min-height: 100vh;
  flex-direction: column;
  align-self: center;
  align-items: center;
  //border-left: 2px solid black;
  //border-right: 2px solid black;

  ul {
    list-style: none;
    width: 100%;
    text-align: left;
    padding: 0;
    margin-bottom: 0;
  }

  li {
    display: inline-block;
    margin-right: 9px;
  }

  h1 {
    width: 100%;
    text-align: left;
    margin-top: 10px;
    margin-bottom: 30px;
  }

  h3 {
    margin-top: 250px;
  }
`
const TopVgContainer = styled.div`
  display: flex;
  max-width: 960px;
  min-width: 960px;
  height: 50px;
  justify-content: space-between;
  //background-color: blue;
  align-self: flex-end;
  margin: 0;

  span {
    justify-self: center;
  }

  select {
    align-self: flex-start;
    //width: 260px;
    border: 0;
    text-align: center;
    font-size: medium;
    font-weight: 550;
  }

  option {
    text-align: left;
  }

  img {
    //margin-top: 5px;
    margin-right: 5px;
    width: 16px;
    height: 16px;
  }
`
const AsideFilters = styled.aside`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  width: 180px;
  padding: 20px;
  min-height: ${({height}) => `${height}px`};
  background-color: cornflowerblue;
  position: absolute;
  margin-top: 165px;
  filter: drop-shadow(0 0.2rem 0.25rem rgba(0, 0, 0, 0.4));


  input {
    height: 30px;
    border: 0;
    margin: 0;
    width: 100%;
    text-align: center;
  }

  .check {
    height: 20px;
    width: 20px;
    margin-right: 15px;
  }

  label {
    display: flex;
    width: 100%;
    margin-top: 10px;
  }

  .filterLabel {
    font-size: larger;
    font-weight: 700;
    margin-top: 30px;
    margin-bottom: 15px
  }

  &:active input {
    border-radius: 0;
  }

  &:focus input {
    border-radius: 0;
  }
`
const Pagination = styled.div`
  display: flex;
  width: 1200px;
  align-items: center;
  justify-content: center;
  min-height: 100px;
  max-height: 200px;

`
const PageButton = styled.button`
  font-family: "JetBrainsMono Nerd Font Mono";
  background-color: white;
  border: none;
  font-size: x-large;
  margin-right: 20px;
  height: 45px;
  width: 45px;
  background-color: lightgrey;
  filter: drop-shadow(0 0.2rem 0.25rem rgba(0, 0, 0, 0.2));

  //align-self: center;

  :hover {
    background-color: cornflowerblue;
    cursor: pointer;
    filter: drop-shadow(0 0.2rem 0.25rem rgba(0, 0, 0, 0.8));

  }
`

export class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    handleSelect(element) {
        const sortBy = element.options[element.selectedIndex].value
        switch (sortBy) {
            case 'name asc':
                return this.props.sortVideogamesAsc('name')
            case 'name desc':
                return this.props.sortVideogamesDesc('name')
            case 'rating asc':
                return this.props.sortVideogamesAsc('rating')
            case 'rating desc':
                return this.props.sortVideogamesDesc('rating')
        }
    }

    async handleCheckBoxes(prop, checkboxesParent) {
        const genresBoxes = checkboxesParent.parentNode.parentNode.querySelectorAll(`[title="genres"]`)
        const platformBoxes = checkboxesParent.parentNode.parentNode.querySelectorAll(`[title="platforms"]`)

        this.props.setVideogamesBack(this.props.BeforeFilter)

        genresBoxes.forEach(box => {
            if (box.checked) this.props.filterGamesByGenre(box.value)
        })
        platformBoxes.forEach(box => {
            if (box.checked) this.props.filterGamesByPlatform(box.value)
        })

    }

    render() {

        return (
            <>
                {
                    this.props.error ?
                        <StyledMain>
                            <h3>{this.props.error}</h3>
                        </StyledMain>
                        :
                        this.props.videogames.length > 0
                            ?
                            <StyledMain>
                                <ul>
                                    <li>nice ></li>
                                    <li>Games</li>
                                </ul>
                                <h1>
                                    {this.props.searchParam ? `Results for ${this.props.searchParam[0].toUpperCase() + this.props.searchParam.slice(1, this.props.searchParam.length)}` : 'Recommended for you!'}
                                </h1>
                                <TopVgContainer>
                                    <span>Results: {this.props.videogames.length}</span>
                                    <div>

                                        <img src="https://flyclipart.com/thumbs/file-svg-sort-by-icon-1168140.png"
                                             alt=""/>
                                        <select onChange={(event => this.handleSelect(event.target))} id="sortSelect">
                                            <option value="">- Sort -</option>
                                            <option value="name asc">Name: asc</option>
                                            <option value="name desc">Name: desc</option>
                                            <option value="rating asc">Rating: asc</option>
                                            <option value="rating desc">Rating: desc</option>
                                        </select>
                                    </div>
                                </TopVgContainer>
                                <AsideFilters height={this.props.videogames.length / 4 * 390 +
                                this.props.videogames.length / 4 * 34}>
                                    <input type="text" placeholder={'🔎'}/>
                                    <label className={'filterLabel'} htmlFor="Genres">Genres</label>

                                    {this.props.genres.genres.map(genre => {
                                        return (
                                            <label key={genre.id}>
                                                <input
                                                    onChange={(event) => this.handleCheckBoxes(event.target.title, event.target)}
                                                    className={'check'} title={'genres'} type="checkbox"
                                                    value={genre.name}/>
                                                {genre.name.split(" ").length > 1 ? genre.name.split(' ')[1] : genre.name}
                                            </label>
                                        )
                                    })}
                                    <label className={'filterLabel'} htmlFor="Platforms">Platforms</label>
                                    {this.props.platforms.map(platform => {
                                        return (
                                            <label key={platform.id} htmlFor="">
                                                <input
                                                    onChange={(event) => this.handleCheckBoxes(event.target.title, event.target)}
                                                    className={'check'} type="checkbox" title={'platforms'}
                                                    value={platform.name}/>
                                                {platform.name}
                                            </label>
                                        )
                                    })}
                                </AsideFilters>
                                <VideogameContainer
                                    videogames={
                                        this.props.videogames.length <= 40 ? this.props.videogames
                                            :
                                            this.props.pageNumber === 1 ? this.props.videogames.slice(0, 40)
                                                :
                                                this.props.videogames.slice((this.props.pageNumber - 1) * 40, this.props.pageNumber * 40)
                                    }
                                />
                                <Pagination>
                                    {
                                        this.props.pageNumbers.map(elem => {
                                            return <PageButton
                                                key={elem}
                                                onClick={(event) => {
                                                if (this.props.videogames[0].hasOwnProperty('database')) {
                                                    this.props.clearState()
                                                    this.props.setPageNumber(event.target.innerText)
                                                    return this.props.getExclusives()
                                                }
                                                this.props.clearState()
                                                return this.props.getVideogamePage(event.target.innerText)
                                            }}>{elem}</PageButton>

                                        })}
                                </Pagination>
                            </StyledMain> :
                            <StyledMain>
                                <h3>
                                    loading...
                                </h3>
                            </StyledMain>}
            </>

        )
    }
}

export const mapStateToProps = (state) => {
    return {
        videogames: state.videogames,
        genres: state.genres,
        platforms: state.platforms,
        searchParam: state.searchParam,
        BeforeFilter: state.videogamesBeforeFilter,
        pageNumber: state.pageNumber,
        pageNumbers: state.pageNumbers,
        error: state.error
    }
};

export const mapDispatchToProps = (dispatch) => {
    return {
        getVideogamePage: (pageNumber) => dispatch(getVideogamePage(pageNumber)),
        sortVideogamesAsc: (prop) => dispatch(sortVideogamesAsc(prop)),
        sortVideogamesDesc: (prop) => dispatch(sortVideogamesDesc(prop)),
        filterGamesByGenre: (value) => dispatch(filterGamesByGenre(value)),
        filterGamesByPlatform: (value) => dispatch(filterGamesByPlatform(value)),
        setVideogamesBack: (gamesBeforeFilter) => dispatch(setVideogamesBack(gamesBeforeFilter)),
        clearState: () => dispatch(clearState()),
        getExclusives: () => dispatch(getExclusives()),
        setPageNumber: (pageNumber) => dispatch(setPageNumber(pageNumber))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Main)
