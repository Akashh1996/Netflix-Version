/* eslint-disable no-debugger */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loadNowPlaying, loadBySearch, saveQuery } from '../../redux/actions/latestMovieAction';

function Header({ nowPlaying, dispatch }) {
  const history = useHistory();

  useEffect(() => {
    if (!nowPlaying || !nowPlaying?.length) {
      dispatch(loadNowPlaying());
    }
  }, [nowPlaying?.length]);

  const [query, setQuery] = useState('');
  const handleOnChange = (event) => {
    setQuery(event.target.value);
    if (query.length > 0) {
      dispatch(loadBySearch(query));
    }
  };
  if (query.length > 0) {
    history.push(`/search?q=${query}`);
  } else {
    history.push('/');
  }
  useEffect(() => {
    dispatch(saveQuery(query));
  }, [query]);

  return (
    <div>
      <span>search</span>
      {' '}
      <form action="">
        <input
          type="text"
          name=""
          id=""
          value={query}
          onChange={handleOnChange}
          spellCheck="false"
        />
      </form>
      <br />

    </div>
  );
}

function mapStateToProps(state) {
  return {
    nowPlaying: state.movieReducer.nowPlaying,
  };
}

export default connect(mapStateToProps)(Header);
