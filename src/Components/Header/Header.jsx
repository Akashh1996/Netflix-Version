import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import PropTypes from 'prop-types';
import { loadBySearch, saveQuery } from '../../redux/actions/movieAction';
import './header.scss';

function Header({ dispatch }) {
  const history = useHistory();

  const [query, setQuery] = useState('');
  const handleOnChange = (event) => {
    setQuery(event.target.value);
    if (query.length > 0) {
      dispatch(loadBySearch(query));
    }
  };

  useEffect(() => {
    if (query?.length > 0) {
      return history.push(`/search?q=${query}`);
    }
    return history.push(history.push('/'));
  }, [query]);

  useEffect(() => {
    dispatch(saveQuery(query));
  }, [query]);

  return (
    <header>

      <nav className="nav">
        <div className="nav-items">
          <div className="nav-items-left">
            <div className="nav-logo">
              <Link to="/">
                <img src="https://trello-attachments.s3.amazonaws.com/5f9fe516582bea5ce01d06b2/5ffc633b4dead97ec390f11b/741e7b7ee8502992cd8e9bafc0150771/netflix.jpg" alt="logo" />
              </Link>
            </div>
            <div className="nav-item__home">Home</div>
            <div className="nav-item__latest">Latest</div>
            <div className="nav-item__myList">My List</div>
          </div>
          <div className="nav-items-right">
            <div className="nav-search">
              <div>
                {' '}
                <SearchIcon />
                {' '}
              </div>
              <div>
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Search"
                  className="search-input"
                  value={query}
                  onChange={handleOnChange}
                />

              </div>
            </div>
            <div className="user">
              <Link to="/">
                <img
                  src="https://i.pinimg.com/originals/30/db/47/30db479e1558c3ed46b4ed23b3cd98ae.png"
                  alt="logo"
                  style={{ width: '36px', borderRadius: '4px', marginTop: '3px' }}
                />
              </Link>

            </div>

          </div>
        </div>
      </nav>
    </header>
  );
}

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,

};
export default connect()(Header);
