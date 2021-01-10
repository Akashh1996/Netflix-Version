/* eslint-disable no-debugger */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadNowPlaying } from '../../redux/actions/latestMovieAction';
import './home.scss';

function Home({ nowPlaying, dispatch }) {
  useEffect(() => {
    if (!nowPlaying || !nowPlaying?.length) {
      dispatch(loadNowPlaying());
    }
  }, [nowPlaying?.length]);

  return (
    <>
      <div className="cover-photo" />
      <div className="now-playing">
        <p>Now Playing</p>
      </div>
      <div className="image-wrapper">
        {nowPlaying
        && nowPlaying.length > 0
            && nowPlaying.map((movies) => (
              <>
                {movies.poster_path !== null
                              && <img src={`https://image.tmdb.org/t/p/w500/${movies.poster_path}`} alt="" />}
              </>
            ))}
      </div>
    </>
  );
}

function mapStateToProps(state) {
  return {
    nowPlaying: state.movieReducer.nowPlaying,
  };
}

export default connect(mapStateToProps)(Home);
