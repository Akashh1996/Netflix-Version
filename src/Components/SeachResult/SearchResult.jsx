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
              <>
                {movies.poster_path !== null
                              && <img src={`https://image.tmdb.org/t/p/w500/${movies.poster_path}`} alt="" />}
                {' '}

              </>
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
