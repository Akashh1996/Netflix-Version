/* eslint-disable no-unused-vars */
/* eslint-disable no-debugger */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import './search-result.scss';

function SearchResult({ movieList, query }) {
  return (

    <div>
      <br />
      <div className="image-container">
        {movieList && query
            && movieList.length > 0
            && movieList.map((movies) => (
              <img src={movies.poster_path ? `https://image.tmdb.org/t/p/w500/${movies.poster_path}` : 'https://m.media-amazon.com/images/M/MV5BMTYzODQzYjQtNTczNC00MzZhLTg1ZWYtZDUxYmQ3ZTY4NzA1XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg'} alt="" />
            ))}
      </div>

    </div>
  );
}

function mapStateToProps(state) {
  return {
    movieList: state.movieReducer.moviesList,
    query: state.movieReducer.query,
  };
}

export default connect(mapStateToProps)(SearchResult);
