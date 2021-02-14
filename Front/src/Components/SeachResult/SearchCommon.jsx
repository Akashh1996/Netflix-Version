/* eslint-disable no-debugger */
/* eslint-disable no-plusplus */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Loading from '../Loading/Loading';
import { checkFav, handleClick } from '../../util/functions';
import { addFav, deleteFav } from '../../redux/actions/userAction';

function SearchCommon({
  movies, loading, getUserDB, dispatch,
}) {
  let fav;
  if (getUserDB) {
    fav = getUserDB.favourites;
  }

  const userLocalStorage = JSON.parse(window.localStorage.getItem('user'));
  const loggedUser = userLocalStorage?.user?.email;

  const clickObject = {
    loggedUser,
    dispatch,
    addFav,
    deleteFav,
    fav: getUserDB?.favourites,
  };

  return (
    <div>
      <ul className="image-wrapper">
        {loading && <Loading />}
        {!loading
        && movies && movies.length > 0 && movies.map((movie) => (
          <li key={movie.id || Math.random() * Date.now()} className="movie-card">
            {
            movie.poster_path !== null
            && (
            <>
              <button
                type="button"
                className={checkFav(movie.id, fav) ? 'favorite-button favorite-button-active' : 'favorite-button'}
                onClick={() => handleClick(movie, clickObject)}
              >
                <FavoriteIcon />
              </button>
              <Link to={`/detail/${movie.id}`}>
                <img className="movie-photo" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.original_title} />
              </Link>
            </>
            )
          }
          </li>
        ))}

      </ul>
    </div>
  );
}

function mapStateToProps({ movieReducer, userReducer }) {
  return {
    loading: movieReducer.loading,
    getUserDB: userReducer.getUserDB,
  };
}

export default connect(mapStateToProps)(SearchCommon);
