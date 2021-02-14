import React from 'react';
import { connect } from 'react-redux';
import { deleteFav } from '../../redux/actions/userAction';
import './MyList.scss';

function MyList({ getUserDB }) {
  const fav = getUserDB?.favourites;
  return (
    <div className="favourites-container">
      {fav && fav?.length > 0
        ? fav.map((user) => (
          <div className="movie-photo__container">
            <img key={user.favourites?.id} className="movie-photo" src={`https://image.tmdb.org/t/p/w500/${user.image}`} alt="user-fav" />
            <button onClick="">BORRAR</button>
          </div>
        )) : (
          <h1 style={{ marginTop: '80px' }}>You dont have any movies in fav list</h1>
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
