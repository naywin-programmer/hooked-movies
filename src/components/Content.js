import React, {useState, useEffect} from 'react'
import { Container, Row, Col, Alert, Spinner } from 'reactstrap'
import {api_url, default_search} from '../env.json'
import InfiniteScroll from 'react-infinite-scroll-component'
import SearchBar from './SearchBar'
import MovieCard from './MovieCard'

const default_url = `${api_url}&s=${default_search}&page=`

export default function Content() {
	let [url, setUrl] = useState(default_url)
	let [loading, setLoading] = useState(true)
	let [hasMore, setHasMore] = useState(true)
	let [movies, setMovies] = useState([])
	let [page, setPage] = useState(1)
	let [errorMsg, setErrorMsg] = useState(null)

	useEffect(() => {
		fetchData()
	}, [])

	let fetchData = async (refresh = false) => {
		if(refresh) {
			page = 1
			movies = []
		}

		url = `${url}${page}`
		await fetch(url).then(res => res.json())
			.then(json => {
				if(json.Response === 'True') {
					setPage(page + 1)
					setHasMore(true)
					setMovies([...movies, ...json.Search])
					setErrorMsg(null)
					setLoading(false)
				} else {
					setErrorMsg(json.Error)
					setHasMore(false)
					setLoading(false)
				}
			})
	}

	let refreshData = async () => {
		setPage(1)
		setMovies([])
		setHasMore(true)
		setLoading(true)
		await fetchData(true)
	}

	let handleSearch = async (input) => {
		if(input.length < 1) {
			setUrl(default_url)
		} else {
			setUrl(`${api_url}&s=${input}&page=`)
		}
	}

	let renderMovies = () => {
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
					refreshFunction={refreshData}
					pullDownToRefresh
					pullDownToRefreshContent={
						<h3 style={{textAlign: 'center'}}>&#8595; Pull down to refresh</h3>
					}
					releaseToRefreshContent={
						<h3 style={{textAlign: 'center'}}>&#8593; Release to refresh</h3>
					}
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