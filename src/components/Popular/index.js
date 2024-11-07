import React from 'react'
import Loader from 'react-loader-spinner'

import MovieCard from '../MovieCard'
import NavBar from '../NavBar'
import Pagination from '../Pagination'

import './index.css'

class Popular extends React.Component {
  state = {
    isLoading: true,
    popularMovieResponse: {},
  }

  componentDidMount() {
    this.getPopularMoviesResponse()
  }

  getUpdatedData = responseData => ({
    totalPages: responseData.total_pages,
    totalResults: responseData.total_results,
    results: responseData.results.map(eachMovie => ({
      id: eachMovie.id,
      posterPath: `https://image.tmdb.org/t/p/w500${eachMovie.poster_path}`,
      voteAverage: eachMovie.vote_average,
      title: eachMovie.title,
    })),
  })

  getPopularMoviesResponse = async (page = 1) => {
    const API_KEY = 'f32b79895b21468afbdd6d5342cbf3da'
    const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
    const response = await fetch(apiUrl)
    const data = await response.json()
    const newData = this.getUpdatedData(data)
    this.setState({isLoading: false, popularMovieResponse: newData})
  }

  renderLoadingView = () => (
    <div className="popular-loader-container">
      <Loader type="TailSpin" color="#032541" />
    </div>
  )

  renderPopularMoviesList = () => {
    const {popularMovieResponse} = this.state
    const {results} = popularMovieResponse

    return (
      <>
        <ul className="popular-movies-ul">
          {results.map(movie => (
            <MovieCard key={movie.id} movieDetails={movie} />
          ))}
        </ul>
        <Pagination
          totalPages={popularMovieResponse.totalPages}
          apiCallback={this.getPopularMoviesResponse}
        />
      </>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <>
        <NavBar />
        {isLoading ? this.renderLoadingView() : this.renderPopularMoviesList()}
      </>
    )
  }
}

export default Popular

/*
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import './index.css'
import Navbar from '../Navbar'
import MovieCard from '../MovieCard'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class PopularMovies extends Component {
  state = {apiStatus: apiStatusConstants.initial, popularMovies: []}

  componentDidMount() {
    this.getPopularMovies()
  }

  getPopularMovies = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    //const key = 'f32b79895b21468afbdd6d5342cbf3da'
    const key = '76a3b00b83c8438422c7b7eb425b0645'
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=${1}`
    const response = await fetch(url)
    const data = await response.json()
    //console.log(response.ok, '1')
    //console.log(data.results)
    if (response.ok) {
      const updatedData = data.results.map(each => ({
        adult: each.adult,
        backdropPath: each.backdrop_path,
        genreIds: each.genre_ids,
        id: each.id,
        originalLanguage: each.original_language,
        originalTitle: each.original_title,
        overview: each.overview,
        popularity: each.popularity,
        posterPath: each.poster_path,
        releaseDate: each.release_date,
        title: each.title,
        video: each.video,
        voteAverage: each.vote_average,
        voteCount: each.vote_count,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        popularMovies: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {popularMovies} = this.state
    console.log(popularMovies)
    return (
      <div className="movies-container">
        <h1 className="heading">Popular Movies</h1>
        <ul className="movies-list-container">
          {popularMovies.map(each => (
            <MovieCard key={each.id} movieDetails={each} />
          ))}
        </ul>
      </div>
    )
  }

  renderFailureView = () => {
    //
  }

  renderApiStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        null
    }
  }

  render() {
    return (
      <div className="home-container">
        <Navbar />
        {this.renderApiStatus()}
      </div>
    )
  }
}

export default PopularMovies
*/
