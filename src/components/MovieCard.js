import React from 'react'
import default_image_placeholder from '../images/image-placeholder.jpg'
import {
	Card,
	CardBody, CardTitle, CardSubtitle, 
	CardLink, Badge
} from 'reactstrap'

export default function MovieCard({movie}) {
	let poster = movie.Poster === "N/A" ? default_image_placeholder : movie.Poster

	return (
		<Card>
			<CardBody className="py-1">
				<CardTitle className="text-center"><strong>{movie.Title}</strong></CardTitle>
			</CardBody>
	        <img src={poster} alt={movie.Title} className="custom-image-responsive" />
	        <CardBody className="text-center py-0">
	        	<CardSubtitle className="text-center my-1">
	        		<Badge className="mr-1" color="light" pill>IMDB-ID: {movie.imdbID}</Badge>
	        		<br />
	        		<Badge className="mr-1" color="dark" pill>{movie.Year}</Badge>
			        <Badge className="mr-1" color="primary" pill>{movie.Type}</Badge>
	        	</CardSubtitle>
				<CardLink href="#" className="btn btn-primary my-1" style={{borderRadius: 20}}>View Detail</CardLink>
	        </CardBody>
		</Card>
	)
}