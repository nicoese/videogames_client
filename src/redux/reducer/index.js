import {
    GET_VIDEOGAME_GENRES,
    CREATE_VIDEOGAME,
    GET_VIDEOGAME_DETAIL,
    GET_VIDEOGAME_PAGE,
    SORT_VIDEOGAMES_DESC,
    SORT_VIDEOGAMES_ASC,
    FILTER_GAMES,
    FILTER_GAMES_BY_GENRE,
    FILTER_GAMES_BY_PLATFORM,
    SEARCH_GAME,
    CLEAR_STATE,
    SET_SEARCH_PARAM,
    CLEAR_SEARCH_PARAM,
    GET_VIDEOGAME_PLATFORMS,
    SET_VIDEOGAMES_BEFORE_FILTER,
    SET_VIDEOGAMES_BACK,
    GET_EXCLUSIVES, SET_PAGE_NUMBER, SET_ERROR, CLEAN_ERROR
} from "../actions";

const initialState = {
    videogames: [],
    videogamesBeforeFilter: [],
    videogameDetail: {},
    genres: [],
    platforms: [],
    searchParam: '',
    pageNumber: '',
    pageNumbers: [1,2,3,4,5,6,7,8,9,10],
    error: ''
}

const rootReducer = (state = initialState, action) => {
        switch (action.type) {
            // Acá va tu código:
            case GET_VIDEOGAME_PAGE:
                return {
                    ...state,
                    videogames: action.payload,
                    videogamesBeforeFilter: action.payload,
                    pageNumber: action.pageNumber,
                    pageNumbers: action.pageNumber < 5 ? [1,2,3,4,5,6,7,8,9,10] : state.pageNumbers.map(
                        num => -4 + action.pageNumber++
                    )
                }
            case GET_VIDEOGAME_GENRES:
                return {
                    ...state,
                    genres: action.payload
                }
            case GET_VIDEOGAME_DETAIL:
                return {
                    ...state,
                    videogameDetail: action.payload
                }
            case CREATE_VIDEOGAME:
                return {
                    ...state,
                    videogameDetail: action.payload
                }
            case SORT_VIDEOGAMES_DESC:
                return {
                    ...state,
                    videogames: state.videogames.sort((a, b) => {
                        if (Array.isArray(a[action.payload])) {
                            if (a[action.payload][0].name > b[action.payload][0].name) return -1
                            if (a[action.payload][0].name < b[action.payload][0].name) return 1
                            return 0
                        }
                        if (a[action.payload] > b[action.payload]) return -1
                        if (a[action.payload] < b[action.payload]) return 1
                        return 0
                    })
                        .map(elem => elem)
                }
            case SORT_VIDEOGAMES_ASC:
                return {
                    ...state,
                    videogames: state.videogames.sort((a, b) => {
                        if (Array.isArray(a[action.payload])) {
                            if (a[action.payload][0].name < b[action.payload][0].name) return -1
                            if (a[action.payload][0].name > b[action.payload][0].name) return 1
                            return 0
                        }
                        if (a[action.payload] < b[action.payload]) return -1
                        if (a[action.payload] > b[action.payload]) return 1
                        return 0
                    })
                        .map(elem => elem)
                }
            case FILTER_GAMES_BY_GENRE:
                return {
                    ...state,
                    videogames: state.videogames.filter(game => {
                        const value = action.payload
                        const match = game.genres.find(el => el.name.toLowerCase() === value.toLowerCase())
                        return !!match;
                    }),
                    error: state.videogames.filter(game => {
                        const value = action.payload
                        const match = game.genres.find(el => el.name.toLowerCase() === value.toLowerCase())
                        return !!match;
                    }).length === 0 ? 'No results' : ''
                }
            case FILTER_GAMES_BY_PLATFORM:
                return {
                    ...state,
                    videogames: state.videogames.filter(game => {
                        const value = action.payload
                        const match = game.platforms.find(el => {
                            if (el.name) return el.name.toLowerCase() === value.toLowerCase()
                            if (el.platform.name.toLowerCase() === value.toLowerCase()) return true
                        })
                        return !!match;
                    }),
                    error: state.videogames.filter(game => {
                        const value = action.payload
                        const match = game.platforms.find(el => {
                            if (el.name) return el.name.toLowerCase() === value.toLowerCase()
                            if (el.platform.name.toLowerCase() === value.toLowerCase()) return true
                        })
                        return !!match;
                    }).length === 0 ? 'No results' : ''

                }
            case SEARCH_GAME:
                return {
                    ...state,
                    videogames: action.payload,
                    pageNumbers: []
                }
            case CLEAR_STATE:
                return {
                    ...state,
                    videogames: []
                }
            case SET_SEARCH_PARAM:
                return {
                    ...state,
                    searchParam: action.payload
                }
            case CLEAR_SEARCH_PARAM:
                return {
                    ...state,
                    searchParam: ''
                }
            case GET_VIDEOGAME_PLATFORMS:
                return {
                    ...state,
                    platforms: action.payload.platforms.results
                }
            case SET_VIDEOGAMES_BACK:
                return {
                    ...state,
                    videogames: action.payload.map(el => {
                        return el
                    }),
                }
            case SET_VIDEOGAMES_BEFORE_FILTER:
                return {
                    ...state,
                    videogamesBeforeFilter: state.videogames
                }
            case GET_EXCLUSIVES:
                return {
                    ...state,
                    videogames: action.payload.map(elem => {
                        // console.log(elem)
                        return elem
                    }),
                    videogamesBeforeFilter: action.payload
                }
            case SET_PAGE_NUMBER:
                return {
                    ...state,
                    pageNumber: action.payload
                }
            case SET_ERROR:
                return {
                    ...state,
                    error: action.payload
                }
            case CLEAN_ERROR:
                return {
                    ...state,
                    error: ''
                }


            default:
                return state
        }
    }
;

export default rootReducer;

