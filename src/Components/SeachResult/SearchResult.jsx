/* eslint-disable no-debugger */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './search-result.scss';
import { getSimilarMovie } from '../../redux/actions/movieAction';

function SearchResult({
  movieList, location: { search }, similar, dispatch,
}) {
  const query = search.split('=')[1];

  let id;

  if (movieList && movieList[0]?.id) {
    id = movieList[0].id;
  }

  useEffect(() => {
    debugger;
    dispatch(getSimilarMovie(id));
  }, [id, query]);

  return (
    <section className="search-result">
      <p className="search-result__query">
        Explore title related to:
        {' '}
        <span className="query">{query}</span>
      </p>
      <ul className="image-wrapper">
        {movieList && movieList.length > 0 ? movieList.slice(0, 5).map((movie) => (
          <li key={movie.id} className="movie-card">
            {
            movie.poster_path !== null
            && (
            <>
              <button type="button" className="favorite-button">+</button>
              <img className="movie-photo" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movieList.original_title} />

            </>
            )
          }
          </li>
        )) : (
          <h2 style={{ marginLeft: '7px', marginTop: '40px' }}>There is no such movie. Please type correctly.</h2>
        )}
      </ul>

      <p className="search-result__query">
        Similar movies
      </p>
      <ul className="image-wrapper">
        {id && similar
         && similar.length > 0 && similar.slice(0, 9).map((movie) => (
           <li key={movie.id} className="movie-card">
             {
            movie.poster_path !== null
            && (
            <>
              <button type="button" className="favorite-button">+</button>
              <img className="movie-photo" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movieList.original_title} />

            </>
            )
          }
           </li>
        ))}
      </ul>

    </section>

  );
}

function mapStateToProps(state) {
  return {
    movieList: state.movieReducer.moviesList,
    query: state.movieReducer.query,
    similar: state.movieReducer.similar,
  };
}

export default connect(mapStateToProps)(SearchResult);
