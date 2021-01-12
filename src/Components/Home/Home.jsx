/* eslint-disable no-debugger */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { loadMovies } from '../../redux/actions/movieAction';
import './home.scss';

function Home({
  dispatch, allMovies,
}) {
  useEffect(() => {
    if (!allMovies) {
      dispatch(loadMovies());
    }
  }, []);

  return (
    <>
      <div className="cover-photo">
        <div className="movie-titile">
          <img src="https://occ-0-3898-360.1.nflxso.net/dnm/api/v6/LmEnxtiAuzezXBjYXPuDgfZ4zZQ/AAAABfKjHt3Q3fbfN1EAxsaseFT5T5_2rb14I4zhWZZHQfBdOetBrIlTePcuvKdlXH0gpsj2IwWAFnHhVudqTZUQDGFar_3i3KN9N168.webp?r=c40" alt="" />
        </div>
        <div className="movie-play-info">
          <div className="play">
            {' '}
            <PlayArrowIcon />
            {' '}
            PLAY
          </div>
          <div className="more-info">
            <InfoOutlinedIcon />
            MORE INFO
          </div>
        </div>
      </div>
      <div className="now-playing">
        <p>Now Playing</p>
      </div>

      {' '}
      <div className="now-playing">
        <p>Popular</p>
      </div>

      <div className="now-playing">
        <p>UpComming</p>
      </div>

    </>
  );
}

function mapStateToProps(state) {
  return {
    allMovies: state.movieReducer.allMovies,
  };
}

export default connect(mapStateToProps)(Home);
