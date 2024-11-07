import Loader from 'react-loader-spinner'

import MovieCard from '../MovieCard'
import NavBar from '../NavBar'
import Pagination from '../Pagination'

import SearchMoviesContext from '../../context/SearchMoviesContext'

import './index.css'

const SearchQuery = () => {
  const renderEmptyView = () => (
    <div className="empty-view-container">
      <h1 className="empty-view-heading">No results found.</h1>
      <p className="empty-view-para">Dont get worried Try to search again.</p>
    </div>
  )

  const renderMoviesList = searchResponse => {
    const {results} = searchResponse
    console.log(results.length === 0)

    if (!results.length) {
      return renderEmptyView()
    }
    return (
      <SearchMoviesContext.Consumer>
        {value => {
          const {onTriggerSearchingQuery} = value

          return (
            <>
              <ul className="searchquery-movies-ul">
                {results.map(movie => (
                  <MovieCard key={movie.id} movieDetails={movie} />
                ))}
              </ul>
              <Pagination
                totalPages={searchResponse.totalPages}
                apiCallback={onTriggerSearchingQuery}
              />
            </>
          )
        }}
      </SearchMoviesContext.Consumer>
    )
  }

  const renderLoadingView = () => (
    <div className="searchquery-loader-container">
      <Loader type="TailSpin" color="#032541" />
    </div>
  )

  const renderSearchResultViews = value => {
    const {searchResponse, apiStatus} = value

    switch (apiStatus) {
      case 'IN_PROGRESS':
        return renderLoadingView()
      case 'SUCCESS':
        return renderMoviesList(searchResponse)
      default:
        return renderEmptyView()
    }
  }

  return (
    <SearchMoviesContext.Consumer>
      {value => (
        <>
          <NavBar />
          {renderSearchResultViews(value)}
        </>
      )}
    </SearchMoviesContext.Consumer>
  )
}

export default SearchQuery
