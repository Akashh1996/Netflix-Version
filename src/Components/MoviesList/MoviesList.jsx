/* eslint-disable react/prop-types */

import React, { useState } from 'react';
import { connect } from 'react-redux';

function MoviesListComponent({ movies, allMovies }) {
  const [moviesCategories] = useState(allMovies[movies]);
  return (
    <div id={movies}>
      <div className="now-playing" id="now-playing">
        <p>{movies}</p>
      </div>
      <ul className="image-wrapper">
        {
          moviesCategories && moviesCategories.map((movieList) => (
            <li key={movieList.id}>
              {
              movieList.poster_path !== null
              && <img src={`https://image.tmdb.org/t/p/w500/${movieList.poster_path}`} alt={movieList.original_title} />
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
