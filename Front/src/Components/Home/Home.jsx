import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import PropTypes from 'prop-types';
import MoviesList from '../MoviesList/MoviesList';
import { loadMovies, clearDetail } from '../../redux/actions/movieAction';
import Loading from '../Loading/Loading';
import './home.scss';
import Footer from '../Footer/Footer';

function Home({
  dispatch, allMovies, categories, videoKey, movieDetail, cast, loading,
}) {
  useEffect(() => {
    if (!allMovies) {
      dispatch(loadMovies());
    }
  }, []);

  useEffect(() => {
    if (videoKey || movieDetail || cast) {
      dispatch(clearDetail());
    }
  }, []);

  return (
    <>
      <div className="cover-photo">
        <div className="movie-titile">
          <img src="https://occ-0-3898-360.1.nflxso.net/dnm/api/v6/LmEnxtiAuzezXBjYXPuDgfZ4zZQ/AAAABXW3pllmB9IbwsmLWIqP7O4Rxd-1psQMl1BN5B0vsrj8wodd7IdRUoqrs2RDfNMF4uv7Q1dwgQZNEILArcjYP9tcfAgEGTC6cacriS4vQZMUb35v8a0YNVqzvPx2ebBHyn5PyhkIigBM9KGhiJzfgEXn1JRX-oUvQx-Flzlxne8QQw.webp?r=e46" alt="" />
          <div className="movie-description-wrapper">
            <p className="movie-description">
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

      { loading ? <Loading /> : categories?.map((movies) => (
        <MoviesList key={movies} movies={movies} />
      ))}
      <Footer />

    </>
  );
}
Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
  allMovies: PropTypes.shape({}),
  categories: PropTypes.arrayOf(PropTypes.string),
};

Home.defaultProps = {
  categories: null,
  allMovies: null,
};
function mapStateToProps({ movieReducer }) {
  return {
    allMovies: movieReducer.allMovies,
    categories: movieReducer.categories,
    videoKey: movieReducer.videoKey,
    movieDetail: movieReducer.movieDetail,
    cast: movieReducer.cast,
    loading: movieReducer.loading,
  };
}

export default connect(mapStateToProps)(Home);
