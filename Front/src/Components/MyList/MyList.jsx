import React from 'react';
import { connect } from 'react-redux';
import './MyList.scss';
import RemoveCircleOutlineOutlinedIcon from '@material-ui/icons/RemoveCircleOutlineOutlined';
import { Link } from 'react-router-dom';
import { deleteFav } from '../../redux/actions/userAction';

function MyList({ getUserDB, dispatch }) {
  const favourites = getUserDB?.favourites;
  function handleClick(id) {
    dispatch(deleteFav({
      email: getUserDB?.email,
      id,
    }));
  }
  return (
    <div className="favourites-container">
      {favourites && favourites?.length > 0
        ? favourites.map((fav) => (
          <div className="movie-photo__container" key={fav?.id || Math.random() * Date.now()}>
            <button
              type="button"
              className="remove-button"
              onClick={() => handleClick(fav?.id)}
            >
              <RemoveCircleOutlineOutlinedIcon />
            </button>
            <Link to={`/detail/${fav.id}`}>
              <img className="movie-photo" src={`https://image.tmdb.org/t/p/w500/${fav.image}`} alt="user-fav" />
            </Link>
          </div>

        )) : (
          <h1 style={{ marginTop: '80px' }}>
            {' '}
            {getUserDB?.displayName.split(/\s(.+)/)[0]}
            {' '}
            ,
            {' '}
            You dont have any movies in your watch list
          </h1>
        )}
    </div>
  );
}

function mapStateToProps({ userReducer }) {
  return {
    getUserDB: userReducer.getUserDB,
  };
}
export default connect(mapStateToProps)(MyList);
