import React, {useEffect, useReducer} from 'react'
import { Container, Row, Col, Spinner } from 'reactstrap'
import {api_url} from '../env.json'
import InfiniteScroll from 'react-infinite-scroll-component'
import SearchBar from './SearchBar'
import MovieCard from './MovieCard'
import {initialState, movieSearchReducer, defaultUrl} from '../reducers/MovieSearchReducer'

export default function Content() {
	const [state, dispatch] = useReducer(movieSearchReducer, initialState)
	// let [page, setPage] = useState(1)
	// let [url, setUrl] = useState(defaultUrl)
	// let [loading, setLoading] = useState(true)
	// let [hasMore, setHasMore] = useState(true)
	// let [movies, setMovies] = useState([])
	// let [errorMsg, setErrorMsg] = useState(null)

	useEffect(() => {
		fetchData()
	}, [])

	let fetchData = async (refresh = false) => {
		let {url, page, movies} = state

		if(refresh) {
			page = 1
			movies = []
		}

		url = `${url}${page}`
		await fetch(url).then(res => res.json())
			.then(json => {
				if(json.Response === 'True') {
					dispatch({
						type: 'SEARCH_MOVIES_SUCCESS',
						payload: {
							movies: [...movies, ...json.Search],
							page: page + 1,
						}
					})
					// setPage(page + 1)
					// setHasMore(true)
					// setMovies([...movies, ...json.Search])
					// setErrorMsg(null)
					// setLoading(false)
				} else {
					dispatch({
						type: 'SEARCH_MOVIES_FAIL',
						payload: {
							errorMsg: json.Error
						}
					})
					// setErrorMsg(json.Error)
					// setHasMore(false)
					// setLoading(false)
				}
			})
	}

	let refreshData = async () => {
		// setPage(1)
		// setMovies([])
		// setHasMore(true)
		// setLoading(true)
		dispatch({
			type: 'SEARCH_MOVIES_REFRESH'
		})
		await fetchData(true)
	}

	let handleSearch = async (input) => {
		let url = ''

		if(input.length < 1) {
			// setUrl(defaultUrl)
			url = defaultUrl
		} else {
			// setUrl(`${api_url}&s=${input}&page=`)
			url = `${api_url}&s=${input}&page=`
		}

		dispatch({
			type: 'SEARCH_URL_UPDATE',
			payload: {url}
		})
	}

	let renderMovies = () => {
		let {movies, hasMore} = state

		return (
			<Container>
				<InfiniteScroll
					className="row"
					dataLength={movies.length} //This is important field to render the next data
					next={fetchData}
					hasMore={hasMore}
					loader={<div className="col-sm-12 text-center"><Spinner type="grow" color="primary" /></div>}
					endMessage={
						<div className="col-sm-12 text-center text-white">
							<b>No More Data!</b>
						</div>
					}
					// below props only if you need pull down functionality
					// refreshFunction={refreshData}
										
					// pullDownToRefresh
					// pullDownToRefreshContent={
					//	<div className="col-sm-12 text-center text-white">&#8595; Pull down to refresh</div>
					// }
					// releaseToRefreshContent={
						// <div className="col-sm-12 text-center text-white">&#8593; Release to refresh</div>
					// }
				>
					{
						movies.map((each_movie, index) => {
							return (
								<Col sm="3" className="my-1" key={index}>
									<MovieCard movie={each_movie} />
								</Col>
							)
						})
					}
				</InfiniteScroll>
			</Container>
		)
	}

	return (
		<Container className="py-3">
			<Row className="my-3">
				<Col>
					<SearchBar search={handleSearch} clickSearch={refreshData} />
				</Col>
			</Row>

			<Row>
				{renderMovies()}
			</Row>
		</Container>
	)
}