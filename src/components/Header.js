import React from 'react'
import {Row} from 'reactstrap'
import {api_url} from '../env.json'

export default function Header() {
	return (
		<Row className="justify-content-center text-white">
			<header>
			    <h1 className="text-center">Hooked Movies</h1>
			    <small>OMDB Movie Api (<a className="App-link" href={api_url}>{api_url}</a>)</small>
			</header>
		</Row>
	)
}