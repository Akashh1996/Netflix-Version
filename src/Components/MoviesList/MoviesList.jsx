/* eslint-disable react/prop-types */

import React, { useState } from 'react';
import { connect } from 'react-redux';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Link } from 'react-router-dom';
import './MoviesList.scss';

function MoviesListComponent({ movies, allMovies }) {
  const [moviesCategories] = useState(allMovies[movies]);
  return (
    <div id={movies}>
      <div className="now-playing" id="now-playing">
        <p className="movie-category">{movies}</p>
      </div>
      <ul className="image-wrapper">
        {
          moviesCategories && moviesCategories.map((movieList) => (
            <li key={movieList.id} className="movie-card">
              {
              movieList.poster_path !== null
              && (
              <>
                <button type="button" className="favorite-button">
                  <FavoriteIcon />
                </button>
                <Link to={`/detail/${movieList.id}`}>
                  {' '}
                  <img className="movie-photo" src={`https://image.tmdb.org/t/p/w500/${movieList.poster_path}`} alt={movieList.original_title} />
                </Link>

              </>
              )
            }
            </li>
          ))
      }

      </ul>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    allMovies: state.movieReducer.allMovies,
  };
}
export default connect(mapStateToProps)(MoviesListComponent);
