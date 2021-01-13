/* eslint-disable react/prop-types */

import React, { useState } from 'react';
import { connect } from 'react-redux';
import './MoviesList.scss';

function MoviesListComponent({ movies, allMovies }) {
  const [moviesCategories] = useState(allMovies[movies]);
  return (
    <>
      <div className="now-playing">
        <p id={movies}>{movies.toUpperCase()}</p>
      </div>
      <ul className="image-wrapper">
        {
          moviesCategories && moviesCategories.map((movieList) => (
            <li key={movieList.id} className="movie-card">
              {
              movieList.poster_path !== null
              && (
              <>
                <img className="movie-photo" src={`https://image.tmdb.org/t/p/w500/${movieList.poster_path}`} alt={movieList.original_title} />
                <div className="favorite-container">
                  <button type="button" className="favorite-button">+</button>
                </div>
              </>
              )
            }
            </li>
          ))
      }

      </ul>
    </>
  );
}

function mapStateToProps(state) {
  return {
    allMovies: state.movieReducer.allMovies,
  };
}
export default connect(mapStateToProps)(MoviesListComponent);
