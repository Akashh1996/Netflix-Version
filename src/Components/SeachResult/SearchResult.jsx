import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './search-result.scss';
import { getSimilarMovie } from '../../redux/actions/movieAction';
import SearchCommon from './SearchCommon';

function SearchResult({
  movieList, location: { search }, similar, dispatch, similarMovieError,
}) {
  const query = search.split('=')[1];

  let id;

  if (movieList && movieList[0]?.id !== undefined) {
    id = movieList[0].id;
  }

  useEffect(() => {
    if (id !== undefined) {
      dispatch(getSimilarMovie(id));
    }
  }, [id, query]);

  return (
    <section className="search-result">
      <p className="search-result__query">
        Explore title related to:
        {' '}
        <span className="query">{query}</span>
      </p>
      <SearchCommon movies={movieList} />

      <p className="search-result__query">
        Similar movies
      </p>

      {movieList && similar
      && <SearchCommon movies={similar} />}

      {similarMovieError
      && <h1>Error similar</h1>}
    </section>

  );
}

function mapStateToProps(state) {
  return {
    movieList: state.movieReducer.moviesList,
    query: state.movieReducer.query,
    similar: state.movieReducer.similar,
    similarMovieError: state.movieReducer.similarMovieError,
  };
}

export default connect(mapStateToProps)(SearchResult);
