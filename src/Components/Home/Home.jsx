import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import PropTypes from 'prop-types';
import MoviesList from '../MoviesList/MoviesList';
import { loadMovies, clearDetail } from '../../redux/actions/movieAction';
import Loading from '../Loading/Loading';

import './home.scss';

function Home({
  dispatch, allMovies, categories, video, movieDetail, cast, loading,
}) {
  useEffect(() => {
    if (!allMovies) {
      dispatch(loadMovies());
    }
  }, []);

  useEffect(() => {
    if (video || movieDetail || cast) {
      dispatch(clearDetail());
    }
  }, []);

  return (
    <>
      <div className="cover-photo">
        <div className="movie-titile">
          <img src="https://occ-0-3898-360.1.nflxso.net/dnm/api/v6/LmEnxtiAuzezXBjYXPuDgfZ4zZQ/AAAABTJxQjyxnIx-LtrusuM5QngSU94C0mEzqw_G0nT-gYTRiBuxMXPqlj7sM6F9UDtQiDMm0WX4UdvNjwA8BSwiXYzxJGvubqKBgothb-e3PEEHkjW-iCgjAscMR8Ivw_Jrh0H11Gs4HX3_8TYSVBjZI1bw4arbxZe7hmw37CGmf9ZG7Q.webp?r=366" alt="" />
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
function mapStateToProps(state) {
  return {
    allMovies: state.movieReducer.allMovies,
    categories: state.movieReducer.categories,
    video: state.movieReducer.video,
    movieDetail: state.movieReducer.movieDetail,
    cast: state.movieReducer.cast,
    loading: state.movieReducer.loading,
  };
}

export default connect(mapStateToProps)(Home);
