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

/* import './index.css'
import {Component} from 'react'
//import { FiSearch } from "react-icons/fi"

class Navbar extends Component {
  state = {searchInput: '', showMobileSearchbar: false}

  onClickShowMobileSearchbar = () => {
    const {showMobileSearchbar} = this.state
    this.setState({showMobileSearchbar: !showMobileSearchbar})
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearchInput = () => {
    const {searchInput} = this.state
    console.log(searchInput)
  }

  render() {
    const {showMobileSearchbar, searchInput} = this.state
    //console.log(searchInput)
    return (
      <>
        <div className="navbar-container">
          <h1 className="navbar-title-heading">movieDB</h1>

          <div className="navigation-btn-card">
            <button
              className="mobile-searchbar-btn"
              type="button"
              onClick={this.onClickShowMobileSearchbar}
            >
              Search
            </button>
            <div className="desktop-navbar-searchbar-card">
              <input
                className="searchinput"
                type="search"
                placeholder="Search your movie"
                onChange={this.onChangeSearchInput}
              />
              <button
                className="search-btn"
                type="button"
                onClick={this.onClickSearchInput}
              >
                search
              </button>
            </div>
            <button className="navigation-btn" type="button">
              <p>Popular</p>
            </button>
            <button className="navigation-btn" type="button">
              <p>Top Rated</p>
            </button>
            <button className="navigation-btn" type="button">
              <p>Upcoming</p>
            </button>
          </div>
        </div>
        {showMobileSearchbar && (
          <div className="mobile-navbar-searchbar-card">
            <input
              className="searchinput"
              type="search"
              placeholder="Search your movie"
              onChange={this.onChangeSearchInput}
            />
            <button
              className="search-btn"
              type="button"
              onClick={this.onClickSearchInput}
            >
              search
            </button>
          </div>
        )}
      </>
    )
  }
}

export default Navbar
*/
