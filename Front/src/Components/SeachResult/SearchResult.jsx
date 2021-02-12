import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './search-result.scss';
import { useLocation } from 'react-router-dom';
import { getSimilarMovie } from '../../redux/actions/movieAction';
import Loading from '../Loading/Loading';
import SearchCommon from './SearchCommon';

function SearchResult({
  searchMovieResult, similarMovie, dispatch, similarMovieError, loading,
}) {
  const msearch = useLocation().search;

  const query = msearch.split('=')[1];
  let id;

  if (searchMovieResult?.length > 0) {
    id = searchMovieResult[0]?.id;
  }

  function loadingAlt() {
    if (loading) {
      return <Loading />;
    }
    return <h2 className="not-exist">There is no such movie. Try with other keyword</h2>;
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
      {!loading && searchMovieResult?.length > 0
        ? <SearchCommon movies={searchMovieResult} /> : loadingAlt()}

      <p className="search-result__query">
        Similar movies
      </p>

      {searchMovieResult?.length > 0 && similarMovie?.length > 0
        ? <SearchCommon movies={similarMovie} /> : (
          <h2 className="not-exist">
            There is no similar movie realted to
            {' '}
            {query}
          </h2>
        ) }

      {!loading && similarMovieError
      && <h2 className="similar-movie__error">similar movie error</h2>}
    </section>

  );
}

function mapStateToProps({ movieReducer }) {
  return {
    searchMovieResult: movieReducer.moviesList,
    searchError: movieReducer.searchError,
    query: movieReducer.query,
    similarMovie: movieReducer.similar,
    similarMovieError: movieReducer.similarMovieError,
    loading: movieReducer.loading,
  };
}

export default connect(mapStateToProps)(SearchResult);
