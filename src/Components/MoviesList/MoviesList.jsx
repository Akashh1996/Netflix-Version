/* eslint-disable react/prop-types */

import React, { useState } from 'react';
import { connect } from 'react-redux';
import './MoviesList.scss';

function MoviesListComponent({ movies, allMovies }) {
  const [moviesCategories] = useState(allMovies[movies]);
  return (
    <div id={movies}>
      <div className="now-playing" id="now-playing">
        <p>{movies.match(/[A-Z][a-z]+|[0-9]+/g).join(' ')}</p>
      </div>
      <ul className="image-wrapper">
        {
          moviesCategories && moviesCategories.map((movieList) => (
            <li key={movieList.id} className="movie-card">
              {
              movieList.poster_path !== null
              && (
              <>
                <button type="button" className="favorite-button">+</button>
                <img className="movie-photo" src={`https://image.tmdb.org/t/p/w500/${movieList.poster_path}`} alt={movieList.original_title} />

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
