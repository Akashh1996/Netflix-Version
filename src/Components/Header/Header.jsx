/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import PropTypes from 'prop-types';
import { Link as ScrollLink } from 'react-scroll';
import { loadBySearch } from '../../redux/actions/movieAction';
import './header.scss';

const categoryNames = ['Up Comming', 'Popular', 'Now Playing'];

function Header({ dispatch }) {
  const history = useHistory();

  const [query, setQuery] = useState('');
  const handleOnChange = (event) => {
    setQuery(event.target.value);
    dispatch(loadBySearch(query));
  };

  useEffect(() => {
    if (query?.length > 0) {
      return history.push(`/search?q=${query}`);
    }
    return history.push(history.push('/'));
  }, [query]);

  const [show, handleShow] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) {
        handleShow(true);
      } else {
        handleShow(false);
      }
    });
  }, []);

  return (
    <header>

      <nav className={`nav ${show && 'nav__black'}`} id="nav">
        <div className="nav-items">
          <div className="nav-items-left">
            <div className="nav-logo">
              <Link to="/">
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="logo" />
              </Link>
            </div>
            <div className="nav-item__home">
              {' '}
              <Link to="/">Home</Link>
              {' '}
            </div>
            <div className="nav-item__category">
              {categoryNames.map((category, index) => (
                <ScrollLink
                  activeClass="active"
                  to={category}
                  spy
                  smooth
                  offset={-70}
                  duration={500}
                  key={category}
                >
                  {category}
                </ScrollLink>
              ))}
            </div>
          </div>
          <div className="nav-items-right">
            <div className="nav-search">
              <div className="nav-search__icon">
                {' '}
                <SearchIcon />
                {' '}
              </div>
              <div>
                <input
                  type="text"
                  name=""
                  id="input_search"
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
                  style={{ width: '34px', borderRadius: '4px', marginTop: '3px' }}
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
