import React, { Component } from 'react';
import Link from 'gatsby-link';
import Img from 'gatsby-image';


export default class Movie extends Component {
	render() {
		const movie = this.props.data.wordpressWpFilms;

		return (
			<div>
				<h1
					className="alpha"
					dangerouslySetInnerHTML={{
						__html: movie.title,
					}}
				/>
				{movie.acf.movie_poster !== null ?
					<Img
						sizes={movie.acf.movie_poster.localFile.childImageSharp.sizes}
						alt={movie.acf.movie_poster.alt_text}
						style={{
							position: 'absolute',
							left: 0,
							top: 0,
							width: '100%',
							height: '100%',
							opacity: 0.3,
							zIndex: -1,
						}}
					/> : ''
				}
				<div dangerouslySetInnerHTML={{
					__html: movie.content,
				}}
				/>
			</div>
		);
	}
}

export const movieQuery = graphql`
	query currentMovieQuery($id: String!) {
		wordpressWpFilms(id: { eq: $id }) {
			title
			content
			acf {
				rating
				movie_poster {
					localFile {
						childImageSharp {
							sizes(maxWidth: 900) {
								...GatsbyImageSharpSizes
							}
						}
					}
				}
			}
		}
	}
`;

