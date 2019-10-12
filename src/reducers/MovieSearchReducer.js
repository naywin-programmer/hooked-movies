import {api_url, default_search} from '../env.json'

const defaultUrl = `${api_url}&s=${default_search}&page=`

const initialState = {
	loading: true,
	hasMore: true,
	url: defaultUrl,
	movies: [],
	page: 1,
	errorMsg: null
}

const movieSearchReducer = (state, action) => {
	switch(action.type) {
		case 'SEARCH_MOVIES_FAIL':
			return {
				...state,
				hasMore: false,
				loading: false,
				errorMsg: action.payload.errorMsg
			}
		case 'SEARCH_MOVIES_SUCCESS':
			return {
				...state,
				hasMore: true,
				loading: false,
				errorMsg: null,
				movies: action.payload.movies,
				page: action.payload.page
			}
		case 'SEARCH_MOVIES_REFRESH':
			return {
				...state,
				page: 1,
				movies: [],
				hasMore: true,
				loading: true,
			}
		case 'SEARCH_URL_UPDATE':
			return {
				...state,
				url: action.payload.url
			}
		default:
			return state
	}
}

export {initialState, movieSearchReducer, defaultUrl}

