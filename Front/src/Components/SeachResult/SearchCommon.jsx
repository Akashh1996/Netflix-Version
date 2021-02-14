/* eslint-disable no-plusplus */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Loading from '../Loading/Loading';
import checkFav from '../../util/function';
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

  function handleClick(movieList) {
    if (loggedUser) {
      const bool = fav?.some((e) => e.id === movieList.id);
      if (bool) {
        dispatch(deleteFav({
          id: movieList?.id,
          email: loggedUser,
        }));
      } else {
        dispatch(addFav({
          id: movieList?.id,
          email: loggedUser,
          image: movieList?.poster_path,
        }));
      }
    }
  }

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
                onClick={() => handleClick(movie)}

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
