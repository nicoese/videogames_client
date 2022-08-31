import axios from "axios";

export const GET_VIDEOGAME_PAGE = 'GET_VIDEOGAME_PAGE'
export const GET_VIDEOGAME_DETAIL = 'GET_VIDEOGAME_DETAIL'
export const GET_VIDEOGAME_GENRES = 'GET_VIDEOGAME_GENRES'
export const GET_VIDEOGAME_PLATFORMS = 'GET_VIDEOGAME_PLATFORMS'
export const CREATE_VIDEOGAME = 'CREATE_VIDEOGAME'
export const SORT_VIDEOGAMES_DESC = "SORT_VIDEOGAMES_DESC"
export const SORT_VIDEOGAMES_ASC = "SORT_VIDEOGAMES_ASC"
export const FILTER_GAMES_BY_GENRE = 'FILTER_GAMES_BY_GENRE'
export const FILTER_GAMES_BY_PLATFORM = 'FILTER_GAMES_BY_PLATFORM'
export const SEARCH_GAME = 'SEARCH_GAME'
export const CLEAR_STATE = 'CLEAR_STATE'
export const SET_SEARCH_PARAM = 'SET_SEARCH_PARAM'
export const CLEAR_SEARCH_PARAM = 'CLEAR_SEARCH_PARAM'
export const SET_VIDEOGAMES_BEFORE_FILTER = 'SET_VIDEOGAMES_BEFORE_FILTER'
export const SET_VIDEOGAMES_BACK = 'SET_VIDEOGAMES_BACK'
export const GET_EXCLUSIVES = 'GET_EXCLUSIVES'
export const SET_PAGE_NUMBER = 'SET_PAGE_NUMBER'
export const SET_ERROR = 'SET_ERROR'
export const CLEAN_ERROR = 'CLEAN_ERROR'


export const cleanError = () => {
    return (dispatch) => {
        return dispatch({
            type: CLEAN_ERROR
        })
    }
}


export const setPageNumber = (pageNumber) => {
    return (dispatch) => {
        return dispatch({
            type: SET_PAGE_NUMBER,
            payload: pageNumber
        })
    }
}

export const getExclusives = () => {
    return async (dispatch) => {
        return axios.get(`https://videogames-api-nice.onrender.com/videogames/exclusives`)
            .then(json => {
                dispatch({
                    type: GET_EXCLUSIVES,
                    payload: json.data.games
                })
            })
            .catch(err => {
                dispatch({
                    type: SET_ERROR,
                    payload: err
                })
            })
    }
}

export const setVideogamesBeforeFilter = () => {
    return (dispatch) => {
        return dispatch({
            type: SET_VIDEOGAMES_BEFORE_FILTER,
        })
    }
}

export const setVideogamesBack = (gamesBeforeFilter) => {
    return (dispatch) => {
        return dispatch({
            type: SET_VIDEOGAMES_BACK,
            payload: gamesBeforeFilter
        })
    }
}

export const getVidegamePlatforms = () => {
    return async (dispatch) => {
        return axios.get(`https://videogames-api-nice.onrender.com/videogames/platforms`)
            .then(json => {
                dispatch({
                    type: GET_VIDEOGAME_PLATFORMS,
                    payload: json.data
                })
            })
            .catch(err => {
                dispatch({
                    type: SET_ERROR,
                    payload: err
                })
            })
    }
}

export const setSearchParam = (param) => {
    return (dispatch) => {
        dispatch({
            type: SET_SEARCH_PARAM,
            payload: param
        })
    }
}

export const clearSearchParam = () => {
    return (dispatch) => {
        dispatch({
            type: CLEAR_SEARCH_PARAM
        })
    }
}

export const clearState = () => {
    return (dispatch) => {
        dispatch({
            type: CLEAR_STATE
        })
    }
}

export const searchGame = (name) => {
    return async (dispatch) => {
        return axios.get(`https://videogames-api-nice.onrender.com/videogames?name=${name}`)
            .then(json => {
                dispatch({
                    type: SEARCH_GAME,
                    payload: json.data
                })
            })
            .catch(err => {
                console.log(err.response.data)
                dispatch({
                    type: SET_ERROR,
                    payload: err.response.data
                })
            })
    }
}

export const filterGamesByGenre = (value) => {
    return (dispatch) => {
        dispatch({
            type: FILTER_GAMES_BY_GENRE,
            payload: value
        })
    }
}

export const filterGamesByPlatform = (value) => {
    return (dispatch) => {
        dispatch({
            type: FILTER_GAMES_BY_PLATFORM,
            payload: value
        })
    }
}

export const sortVideogamesDesc = (property) => {
    return (dispatch) => {
        dispatch({
            type: SORT_VIDEOGAMES_DESC,
            payload: property
        })
            // .catch(err => {
            //     dispatch({
            //         type: SET_ERROR,
            //         payload: err
            //     })
            // })
    }
}

export const sortVideogamesAsc = (property) => {
    return (dispatch) => {
        dispatch({
            type: SORT_VIDEOGAMES_ASC,
            payload: property
        })
            // .catch(err => {
            //     dispatch({
            //         type: SET_ERROR,
            //         payload: err
            //     })
            // })
    }
}


export const getVideogamePage = (pageNumber) => {
    return async (dispatch) => {
        return axios.get(`https://videogames-api-nice.onrender.com/videogames?page=${pageNumber}`)
            .then(json => {
                dispatch({
                    type: GET_VIDEOGAME_PAGE,
                    payload: json.data,
                    pageNumber: pageNumber
                })
            })
            .catch(err => {
                dispatch({
                    type: SET_ERROR,
                    payload: err
                })
            })
    }
}

export const getVideogameDetail = (videogameId) => {
    return async (dispatch) => {
        return axios.get(`https://videogames-api-nice.onrender.com/videogames/${videogameId}`)
            .then(json => {
                dispatch({
                    type: GET_VIDEOGAME_DETAIL,
                    payload: json.data
                })
            })
            .catch(err => {
                dispatch({
                    type: SET_ERROR,
                    payload: err
                })
            })
    }
}

export const getVideogameGenres = () => {
    return async (dispatch) => {
        return axios.get('https://videogames-api-nice.onrender.com/videogames/genres')
            .then(json => {
                dispatch({
                    type: GET_VIDEOGAME_GENRES,
                    payload: json.data
                })
            })
            .catch(err => {
                dispatch({
                    type: SET_ERROR,
                    payload: err
                })
            })
    }
}

export const createVideogame = (videogame) => {
    return async (dispatch) => {
        return axios.post('https://videogames-api-nice.onrender.com/videogames', videogame)
            .then(json => {
                dispatch({
                    type: CREATE_VIDEOGAME,
                    payload: json.data
                })
            })
            .catch(err => {
                dispatch({
                    type: SET_ERROR,
                    payload: err.response.data
                })
            })
    }

}