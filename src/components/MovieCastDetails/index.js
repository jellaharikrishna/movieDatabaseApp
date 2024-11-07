import {Component} from 'react'

import Loader from 'react-loader-spinner'

import './index.css'

const diffStates = {
  inProgress: 'LOADING',
  success: 'SUCCESS',
  fail: 'FAILURE',
}
class MovieCastDetails extends Component {
  state = {
    status: diffStates.inProgress,
    castData: [],
  }

  componentDidMount = async () => {
    const {id} = this.props
    const MOVIE_ID = id
    const API_KEY = 'f32b79895b21468afbdd6d5342cbf3da'
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${MOVIE_ID}/credits?api_key=${API_KEY}&language=en-US`,
      )
      const responseCast = await response.json()

      const updatedData = responseCast.cast.map(each => ({
        id: each.id,
        character: each.character,
        knownForDepartment: each.known_for_department,
        originalName: each.original_name,
        profilePath: each.profile_path,
      }))

      this.setState({status: diffStates.success, castData: updatedData})
    } catch (error) {
      this.setState({status: diffStates.fail})
    }
  }

  renderLoader = () => (
    <div className="cast-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {castData} = this.state
    return (
      <ul className="cast-ul-container">
        {castData.map(each => (
          <li key={each.id} className="cast-list-item">
            <img
              className="cast-img"
              src={`https://image.tmdb.org/t/p/w500/${each.profilePath}`}
              alt="cast-img"
            />
            <p className="charcter-name">{each.character}</p>
            <p className="original-name">{each.originalName}</p>
          </li>
        ))}
      </ul>
    )
  }

  renderDiffrentViews = () => {
    const {status} = this.state
    switch (status) {
      case diffStates.inProgress:
        return this.renderLoader()
      case diffStates.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderDiffrentViews()}</>
  }
}

export default MovieCastDetails
