import {Link} from 'react-router-dom'
import './index.css'

const MovieCard = props => {
  const {movieDetails} = props
  const {id, title, posterPath, voteAverage} = movieDetails

  return (
    <li className="movie-li-card">
      <img className="movie-li-image" alt={title} src={posterPath} />
      <h1 className="movie-li-title">{title}</h1>
      <p className="movie-li-rating">Rating: {voteAverage.toFixed(1)}</p>
      <Link to={`/movie/${id}`} className="movie-li-view-details-btn-link">
        <button className="movie-li-view-details-btn" type="button">
          View Details
        </button>
      </Link>
    </li>
  )
}

export default MovieCard

/*
import './index.css'
import {Link} from 'react-router-dom'

const MovieCard = props => {
  const {movieDetails} = props
  const {id, title, posterPath, voteAverage} = movieDetails
  const imgUrl = `https://image.tmdb.org/t/p/w500/${posterPath}`
  return (
    <Link to={`/movie/${id}`} className="movie-link">
      <li className="movie-card">
        <img className="img" src={imgUrl} alt={id} />
        <div className="wrapper-div">
          <h1 className="movie-name">{title}</h1>
          <p className="rating">{`${voteAverage.toFixed(1)}/10`}</p>
        </div>
      </li>
    </Link>
  )
}

export default MovieCard
*/
