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
