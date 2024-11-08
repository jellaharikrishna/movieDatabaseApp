import {Link, withRouter} from 'react-router-dom'

import SearchMoviesContext from '../../context/SearchMoviesContext'

import './index.css'

const NavBar = props => {
  const renderSearchBar = () => (
    <SearchMoviesContext.Consumer>
      {value => {
        const {
          onTriggerSearchingQuery,
          onChangeSearchInput,
          searchInput,
        } = value

        const onChangeHandler = event => onChangeSearchInput(event.target.value)

        const onSearchHandler = event => {
          event.preventDefault()
          const {history} = props
          onTriggerSearchingQuery()
          history.push(`/search`)
        }

        return (
          <div className="searchbar-card">
            <input
              type="text"
              className="search-input"
              onChange={onChangeHandler}
              value={searchInput}
              placeholder="Search"
            />
            <button
              className="search-btn"
              type="button"
              onClick={onSearchHandler}
            >
              Search
            </button>
          </div>
        )
      }}
    </SearchMoviesContext.Consumer>
  )

  return (
    <nav className="navbar-container">
      <Link className="topic-link" to="/">
        <h1 className="page-logo">movieDB</h1>
      </Link>
      <div className="topics-card">
        {renderSearchBar()}
        <ul className=" topics-items-list">
          <Link className="topic-link" to="/">
            <li className="topic-item">Popular</li>
          </Link>
          <Link className="topic-link" to="/top-rated">
            <li className="topic-item">Top Rated</li>
          </Link>
          <Link className="topic-link" to="/upcoming">
            <li className="topic-item">Upcoming</li>
          </Link>
        </ul>
      </div>
    </nav>
  )
}

export default withRouter(NavBar)
