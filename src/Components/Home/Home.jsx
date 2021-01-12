/* eslint-disable no-debugger */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { loadNowPlaying, loadPopular, loadUpComming } from '../../redux/actions/movieAction';
import './home.scss';

function Home({
  nowPlaying, dispatch, popular, upComming,
}) {
  useEffect(() => {
    if (!nowPlaying || !nowPlaying?.length) {
      dispatch(loadNowPlaying());
    }
  }, [nowPlaying?.length]);

  useEffect(() => {
    if (!nowPlaying || !nowPlaying?.length) {
      dispatch(loadPopular());
    }
  }, [popular?.length]);

  useEffect(() => {
    if (!upComming || !upComming?.length) {
      dispatch(loadUpComming());
    }
  }, [upComming?.length]);

  return (
    <>
      <div className="cover-photo">
        <div className="movie-titile">
          <img src="https://occ-0-3898-360.1.nflxso.net/dnm/api/v6/LmEnxtiAuzezXBjYXPuDgfZ4zZQ/AAAABTJxQjyxnIx-LtrusuM5QngSU94C0mEzqw_G0nT-gYTRiBuxMXPqlj7sM6F9UDtQiDMm0WX4UdvNjwA8BSwiXYzxJGvubqKBgothb-e3PEEHkjW-iCgjAscMR8Ivw_Jrh0H11Gs4HX3_8TYSVBjZI1bw4arbxZe7hmw37CGmf9ZG7Q.webp?r=366" alt="" />
          <div className="movie-description-wrapper">
            <p>
              Waking from a coma, Vanessa finds lone soldier Axel protecting her
              from a vampire apocalypse called
              {' '}
              <strong>The Rising</strong>
              {' '}
              and discovers she has unusual powers.
            </p>
          </div>
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

      {' '}
      <div className="now-playing">
        <p>Popular</p>
      </div>
      <div className="image-wrapper">
        {popular
        && popular.length > 0
            && popular.map((movies) => (
              <>
                {movies.poster_path !== null
                              && <img src={`https://image.tmdb.org/t/p/w500/${movies.poster_path}`} alt="" />}
              </>
            ))}
      </div>
      <div className="now-playing">
        <p>UpComming</p>
      </div>
      <div className="image-wrapper">
        {upComming
        && upComming.length > 0
            && upComming.map((movies) => (
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
  debugger;
  return {
    nowPlaying: state.movieReducer.nowPlaying,
    popular: state.movieReducer.popular,
    upComming: state.movieReducer.upComming,
  };
}

export default connect(mapStateToProps)(Home);
