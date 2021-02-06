/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import PropTypes from 'prop-types';
import { Link as ScrollLink } from 'react-scroll';
import { loadBySearch } from '../../redux/actions/movieAction';
import { signInWithGoogle, signOut } from '../../redux/actions/userAction';
import './header.scss';

function Header({ dispatch, user }) {
  const categoryNames = ['Upcoming', 'Popular', 'Now Playing'];
  const history = useHistory();
  const [show, handleShow] = useState(false);
  const [query, setQuery] = useState('');

  const handleOnChange = (event) => {
    const eventValue = event.target.value;
    setQuery(eventValue);
    if (eventValue.length > 0) {
      dispatch(loadBySearch(eventValue));
    }
  };

  function handleScroll() {
    if (window.scrollY > 10) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  }

  useEffect(() => {
    if (query?.length > 0) {
      return history.push(`/search?q=${query}`);
    }
    return history.push(history.push('/'));
  }, [query]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  function handleSignIn() {
    if (!user) {
      dispatch(signInWithGoogle());
    } else {
      dispatch(signOut());
    }
  }

  return (
    <header>
      <nav className={`nav ${show && 'nav__black'}`} id="nav">
        <div className="nav-items">
          <div className="nav-items-left">
            <div className="nav-logo">
              <Link to="/">
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="logo" id="logo" />
              </Link>
            </div>
            <div className="nav-item__category">
              {categoryNames.map((category) => (
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
            {user
            && (
            <div className="nav-item__myList">
              {' '}
              <Link to="/">My List</Link>
              {' '}
            </div>
            )}
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
              <Link
                to="/"
                onClick={() => handleSignIn()}

              >
                <img
                  src={!user ? 'https://i.pinimg.com/originals/30/db/47/30db479e1558c3ed46b4ed23b3cd98ae.png' : 'https://trello-attachments.s3.amazonaws.com/5f9fe516582bea5ce01d06b2/601ea1de7e048c855c38996e/de93a82da9b5d8d211bb570ff9089abc/logout.png'}
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

function mapStateToProps(state) {
  return {
    user: state.userReducer.user,
  };
}

export default connect(mapStateToProps)(Header);
